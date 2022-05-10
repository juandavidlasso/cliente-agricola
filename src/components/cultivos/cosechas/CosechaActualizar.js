import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { validarDosis, validarCostoLabor } from '../../../utils/js/validaciones'
// GraphQL
import {ACTUALIZAR_COSECHA_MUTATION} from '../../../apollo/mutations'
import {OBTENER_COSECHAS_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const CosechaActualizar = ({cosecha, suerte, corte}) => {

    const { id_cosecha, peso, rendimiento, numeroMulas, numeroVagones } = cosecha
    const id_corte = corte
    const id_suerte = suerte

    // estado del component
    const navigate = useNavigate()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarCosecha ] = useMutation(ACTUALIZAR_COSECHA_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state
    const [ nuevaCosecha, actualizarNuevaCosecha ] = useState({
        id_cosecha: id_cosecha,
        peso: peso,
        rendimiento: rendimiento,
        numeroVagones: numeroVagones,
        numeroMulas: numeroMulas,
        corte_id: id_corte
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevaCosecha({
            ...nuevaCosecha,
            [e.target.name]: e.target.value
        })
    }
    
    // extraer valores
    const input = {
        id_cosecha,
        peso: Number(nuevaCosecha.peso),
        rendimiento: Number(nuevaCosecha.rendimiento),
        numeroVagones: Number(nuevaCosecha.numeroVagones),
        numeroMulas: Number(nuevaCosecha.numeroMulas),
        corte_id: id_corte
    }
    
    
    const submitActualizarCosecha = async (e) => {
        e.preventDefault()

        if(nuevaCosecha.peso.toString().trim() === '') {
            mostrarWarning('Los campos marcados con * son obligatorios.')
            return
        }

        if(validarDosis(nuevaCosecha.peso) === false) {
            mostrarWarning('El peso debe ser numérico. Ej: 5000 - 5.000')
            return
        }

        if(nuevaCosecha.rendimiento !== '' && nuevaCosecha.rendimiento <= 0) {
            mostrarWarning('El rendimiento debe ser mayor a 0.')
            return
        }

        if(validarDosis(nuevaCosecha.rendimiento) === false) {
            mostrarWarning('El rendimiento debe ser numérico. Ej: 12 - 12.5')
            return
        }

        if(validarCostoLabor(nuevaCosecha.numeroVagones) === false || validarCostoLabor(nuevaCosecha.numeroMulas) === false) {
            mostrarWarning('El número de mulas y vagones debe ser numérico. Ej: 12')
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await actualizarCosecha({
                variables: {
                    id_cosecha,
                    input
                },
                refetchQueries: [{
                  query: OBTENER_COSECHAS_POR_CORTE_QUERY,
                  variables: {id_corte}
                }]
            })
            
            // reiniciar form
            actualizarNuevaCosecha({
                peso: '',
                rendimiento: '',
                numeroVagones: '',
                numeroMulas: ''
            })
            Swal.fire({
                title: 'Éxito!',
                text: 'La cosecha se actualizó correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }).then(function () {
                navigate(`/corte/detalle/${id_corte}/${id_suerte}`, { state: {id_corte:id_corte, id_suerte:id_suerte}})
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
            actualizarActivo(true)
        }
    }
    

    return (
        <form onSubmit={submitActualizarCosecha}>
            <h4 className="center"> Registrar Rendimiento </h4>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

           <div className="input-field">
                <label htmlFor="peso"><span className="red-text fw-bold">*</span> Peso </label>
                <input id="peso" type="text" className="validate" name="peso" defaultValue={peso} onChange={actualizarState} />
                <small className="form-text text-muted center">Ej: 10000 - 10.000</small>
            </div>
            <div className="input-field">
                <label htmlFor="rendimiento"> Rendimiento </label>
                <input id="rendimiento" type="text" className="validate" name="rendimiento" defaultValue={rendimiento} onChange={actualizarState} />
                <small className="form-text text-muted center">Ej: 12 - 12.5</small>
            </div>
            <div className="input-field">
                <label htmlFor="numVagones"> # Vagones </label>
                <input id="numVagones" type="text" className="validate" name="numeroVagones" defaultValue={numeroVagones} onChange={actualizarState} />
                <small className="form-text text-muted center">Ej: 12</small>
            </div>
            <div className="input-field">
                <label htmlFor="numMulas"> # Mulas </label>
                <input id="numMulas" type="text" className="validate" name="numeroMulas" defaultValue={numeroMulas} onChange={actualizarState} />
                <small className="form-text text-muted center">Ej: 12</small>
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} state={{ id_corte:id_corte, id_suerte:id_suerte }} className="btnlink">Cancelar</Link>
            </div>
        </form>
    )

}

export default CosechaActualizar
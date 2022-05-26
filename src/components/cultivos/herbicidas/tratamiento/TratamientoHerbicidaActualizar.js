import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { validarDosis, validarCostoTratamientos } from '../../../../utils/js/validaciones'
// Graphql
import {ACTUALIZAR_TRAHE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRHE_POR_APHE_QUERY, OBTENER_TRAHE_QUERY, TOTAL_HERBI_QUERT} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'


const TratamientoHerbicidaActualizar = ({data, id_corte, id_suerte, id_aphe}) => {

    const { id_trahe, producto, dosis, presentacion, valor, aplico, nota } = data.obtenerTratamientoHerbicida

    // estado del component
    const navigate = useNavigate()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarTRAHE ] = useMutation(ACTUALIZAR_TRAHE_MUTATION) 
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevoTratamientoHerbicida, actualizarNuevoTratamientoHerbicida ] = useState({
        id_trahe: id_trahe,
        producto: producto,
        dosis: dosis,
        presentacion: presentacion,
        valor: valor,
        aplico: aplico,
        nota: nota,
        aphe_id: id_aphe
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevoTratamientoHerbicida({
        ...nuevoTratamientoHerbicida,
        [e.target.name]: e.target.value
        })
    }

    // extraer valores
    const input = {
        producto: nuevoTratamientoHerbicida.producto,
        dosis: Number(nuevoTratamientoHerbicida.dosis),
        presentacion: nuevoTratamientoHerbicida.presentacion,
        valor: Number(nuevoTratamientoHerbicida.valor),
        aplico: nuevoTratamientoHerbicida.aplico,
        nota: nuevoTratamientoHerbicida.nota,
        aphe_id: id_aphe
    }    

    // submit
    const submitActualizarTratamientoHerbicida = async (e) => {
        e.preventDefault()

        // Campos obligatorios
        if( nuevoTratamientoHerbicida.producto.trim() === '' || 
            nuevoTratamientoHerbicida.dosis.toString().trim() === '' || 
            nuevoTratamientoHerbicida.presentacion.trim() === '') {
                mostrarWarning('Los campos marcados con * son obligatorios.')
                return
        }

        if(nuevoTratamientoHerbicida.dosis <= 0) {
            mostrarWarning('La dosis debe ser mayor a 0.')
            return
        }

        if(validarDosis(nuevoTratamientoHerbicida.dosis) === false) {
            mostrarWarning('La dosis no tiene el formato correcto. Ej: 2 - 2.4')
            return
        }

        if(nuevoTratamientoHerbicida.valor <= 0) {
            mostrarWarning('El valor debe ser mayor a 0.')
            return
        }

        if(validarCostoTratamientos(nuevoTratamientoHerbicida.valor) === false) {
            mostrarWarning('El valor debe ser numérico. Ej: 2000')
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await actualizarTRAHE({
                variables: {
                    input,
                    id_trahe
                },
                refetchQueries: [
                    { query: OBTENER_TRHE_POR_APHE_QUERY, variables: {id_aphe} },
                    { query: OBTENER_TRAHE_QUERY, variables: {id_trahe} },
                    { query: TOTAL_HERBI_QUERT, variables: {id_aphe} }
                ]
            })

            // reiniciar el form
            actualizarNuevoTratamientoHerbicida({
                producto: '',
                dosis: '',
                presentacion: '',
                valor: '',
                aplico: '',
                nota: ''
            })

            Swal.fire({
                title: 'Éxito!',
                text: 'Los datos se actualizaron correctamente!',
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
        <form onSubmit={submitActualizarTratamientoHerbicida}>
            <h4 className="center"> Actualizar Tratamiento Herbicida </h4>
            
            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }           
            
            <div className="input-field">
                <label htmlFor="producto"><span className="red-text fw-bold">*</span> Producto </label>
                <input id="producto" placeholder="Producto" type="text" className="validate" name="producto" defaultValue={producto} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="dosis"><span className="red-text fw-bold">*</span> Dosis </label>
                <input id="dosis" placeholder="Dosis" type="text" className="validate" name="dosis" defaultValue={dosis} onChange={actualizarState} />
                <small className="form-text text-muted center">(Ej: 5 - 20 - 0.34)</small>
            </div>
            <div className="input-field">
                <label htmlFor="presentacion"><span className="red-text fw-bold">*</span> Presentación </label>
                <input id="presentacion" placeholder="Presentación" type="text" className="validate" name="presentacion" defaultValue={presentacion} onChange={actualizarState} />
                <small className="form-text text-muted center">(Ej: BTO - KL - LT)</small>
            </div>
            <div className="input-field">
                <label htmlFor="valor"> Valor </label>
                <input id="valor" placeholder="Valor" type="text" className="validate" name="valor" defaultValue={valor} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="realizado_por"> Realizado por </label>
                <input id="realizado_por" placeholder="Realizado por" type="text" className="validate" name="aplico" defaultValue={aplico} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="nota"> Nota </label>
                <input id="nota" placeholder="Nota" type="text" className="validate" name="nota" defaultValue={nota} onChange={actualizarState} />
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} state={{ id_corte:id_corte, id_suerte:id_suerte }} className="btnlink">Cancelar</Link>
            </div>
        </form>
    )
}

export default TratamientoHerbicidaActualizar
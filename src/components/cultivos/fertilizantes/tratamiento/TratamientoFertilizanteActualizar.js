import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import { validarDosis, validarCostoTratamientos } from '../../../../utils/js/validaciones'
// Graphql
import {ACTUALIZAR_TRAFE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRFE_POR_APFE_QUERY, OBTENER_TRAFE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const TratamientoFertilizanteActualizar = ({data, props}) => {

    const id_corte = Number(props.match.params.id_corte)
    const id_suerte = Number(props.match.params.id_suerte)
    const id_apfe = Number(props.match.params.id_apfe)
    const { id_trafe, producto, dosis, presentacion, valor, aplico, nota } = data.obtenerTratamientoFertilizante

    // extraer los valores del context
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarTRAFE ] = useMutation(ACTUALIZAR_TRAFE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevoTratamientoFertilizante, actualizarNuevoTratamientoFertilizante ] = useState({
        id_trafe: id_trafe,
        producto: producto,
        dosis: dosis,
        presentacion: presentacion,
        valor: valor,
        aplico: aplico,
        nota: nota,
        apfe_id: id_apfe
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevoTratamientoFertilizante({
            ...nuevoTratamientoFertilizante,
            [e.target.name]: e.target.value
        })
    }

    // extraer valores
    const input = {
        producto: nuevoTratamientoFertilizante.producto, 
        dosis: Number(nuevoTratamientoFertilizante.dosis),
        presentacion: nuevoTratamientoFertilizante.presentacion,
        valor: Number(nuevoTratamientoFertilizante.valor),
        aplico: nuevoTratamientoFertilizante.aplico,
        nota: nuevoTratamientoFertilizante.nota,
        apfe_id: id_apfe
    }    

    // submit
    const submitActualizarTratamientoFertilizante = async (e) => {
        e.preventDefault()

        // Campos obligatorios
        if( nuevoTratamientoFertilizante.producto.trim() === '' || 
            nuevoTratamientoFertilizante.presentacion.trim() === '' || 
            nuevoTratamientoFertilizante.dosis.toString().trim() === '') {
                mostrarWarning('Los campos marcados con * son obligatorios.')
                return
        }

        if(nuevoTratamientoFertilizante.dosis <= 0) {
            mostrarWarning('La dosis debe ser mayor a 0.')
            return
        }

        if(validarDosis(nuevoTratamientoFertilizante.dosis) === false) {
            mostrarWarning('La dosis debe ser numérica. Ej: 2 - 2.4')
            return
        }

        if(nuevoTratamientoFertilizante.valor <= 0) {
            mostrarWarning('El valor debe ser mayor a 0.')
            return
        }

        if(validarCostoTratamientos(nuevoTratamientoFertilizante.valor) === false) {
            mostrarWarning('El valor debe ser numérico. Ej: 2000')
            return
        }
        
        // guardar en la db
        try {
            await actualizarTRAFE({
                variables: {
                    input,
                    id_trafe
                },
                refetchQueries: [
                    {query: OBTENER_TRFE_POR_APFE_QUERY, variables: {id_apfe} },
                    {query: OBTENER_TRAFE_QUERY, variables: {id_trafe} }
                ]
            })
            actualizarActivo(false)
            // console.log(data);

            // reiniciar el form
            actualizarNuevoTratamientoFertilizante({
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
                history.push(`/corte/detalle/${id_corte}/${id_suerte}`)
            })     
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))  
        }
    }    
  
  
    return (
        <form onSubmit={submitActualizarTratamientoFertilizante}>
            <h4 className="center"> Actualizar Tratamiento Fertilizante </h4>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }                                   

            <div className="input-field">
                <label htmlFor="producto"><span className="red-text font-weight-bold">*</span> Producto </label>
                <input id="producto" placeholder="Producto" type="text" className="validate" name="producto" defaultValue={producto} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="dosis"><span className="red-text font-weight-bold">*</span> Dosis </label>
                <input id="dosis" placeholder="Dosis" type="text" className="validate" name="dosis" defaultValue={dosis} onChange={actualizarState} />
                <small className="form-text text-muted center">(Ej: 5 - 20 - 0.34)</small>
            </div>
            <div className="input-field">
                <label htmlFor="presentacion"><span className="red-text font-weight-bold">*</span> Presentación </label>
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
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} className="btnlink">Cancelar</Link>
            </div>
        </form>        
    )
}

export default TratamientoFertilizanteActualizar
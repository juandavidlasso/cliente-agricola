import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import { validarDosis } from '../../../../utils/js/validaciones'
// GraphQL
import {ACTUALIZAR_TRAPL_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRAPL_QUERY, OBTENER_TRAPLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const ProductoActualizar = ({data, props}) => {

    const id_trapl = Number(props.match.params.id_trapl)
    const id_corte = Number(props.match.params.id_corte)
    const id_suerte = Number(props.match.params.id_suerte)
    const {producto, unidad, cantidad, tiempo} = data.obtenerTratamientoPlaga
    // estado del componente
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarTRAPL ] = useMutation(ACTUALIZAR_TRAPL_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevoTratamientoPlaga, actualizarNuevoTratamientoPlaga ] = useState({
        producto: producto,
        unidad: unidad,
        cantidad: cantidad,
        tiempo: tiempo
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevoTratamientoPlaga({
            ...nuevoTratamientoPlaga,
            [e.target.name]: e.target.value
        })
    }

    // extraer valores
    const input = {
        producto: nuevoTratamientoPlaga.producto,
        unidad: nuevoTratamientoPlaga.unidad,
        cantidad: Number(nuevoTratamientoPlaga.cantidad),
        tiempo: nuevoTratamientoPlaga.tiempo
    }

    // submit
    const submitActualizarTratamientoPlaga = async (e) => {
        e.preventDefault()

        // Campos obligatorios
        if( nuevoTratamientoPlaga.producto.trim() === '' || 
            nuevoTratamientoPlaga.unidad.trim() === '' ||
            nuevoTratamientoPlaga.cantidad.toString().trim() === '' || 
            nuevoTratamientoPlaga.tiempo.trim() === '') {
                mostrarWarning('Los campos marcados con * son obligatorios.')
                return
        }

        if(nuevoTratamientoPlaga.cantidad <= 0) {
            mostrarWarning('La dósis debe ser mayor a 0.')
            return
        }

        if(validarDosis(nuevoTratamientoPlaga.cantidad) === false) {
            mostrarWarning('La dósis debe ser numérica. Ej: 20 - 2.5')
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await actualizarTRAPL({
                variables: {
                    input,
                    id_trapl
                },
                refetchQueries: [
                    {query: OBTENER_TRAPL_QUERY},
                    {query: OBTENER_TRAPLA_QUERY, variables: {id_trapl} }
                ]
            })
            // console.log(data);

            // Reiniciar el form
            actualizarNuevoTratamientoPlaga({
                producto: '',
                unidad: '',
                cantidad: '',
                tiempo: ''
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
            actualizarActivo(true)
        }
    }

    
    return (
        <form onSubmit={submitActualizarTratamientoPlaga}>
            <h4 className="center"> Actualizar Tratamiento Plaga </h4>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div className="input-field">
                <label htmlFor="producto"><span className="red-text font-weight-bold">*</span> Producto </label>
                <input id="producto" placeholder="Producto" type="text" className="validate" name="producto" defaultValue={producto} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="unidad"><span className="red-text font-weight-bold">*</span> Unidad</label>
                <input id="unidad" placeholder="Unidad" type="text" className="validate" name="unidad" defaultValue={unidad} onChange={actualizarState} />
                <small className="form-text text-muted center">(Ej: GRAMOS - UNIDAD - can pul2)</small>
            </div>
            <div className="input-field">
                <label htmlFor="dosis"><span className="red-text font-weight-bold">*</span> Dósis </label>
                <input id="dosis" placeholder="Dósis" type="text" className="validate" name="cantidad" defaultValue={cantidad} onChange={actualizarState} />
                <small className="form-text text-muted center">(Ej: 2 - 30 - 5.2)</small>
            </div>
            <div className="input-field">
                <label htmlFor="tiempo"><span className="red-text font-weight-bold">*</span> Tiempo Aplicación </label>
                <input id="tiempo" placeholder="Tiempo Aplicación" type="text" className="validate" name="tiempo" defaultValue={tiempo} onChange={actualizarState} />
                <small className="form-text text-muted center">(Ej: 0-3 MESES)</small>
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} className="btnlink">Cancelar</Link>
            </div>
        </form>
    )
}

export default ProductoActualizar
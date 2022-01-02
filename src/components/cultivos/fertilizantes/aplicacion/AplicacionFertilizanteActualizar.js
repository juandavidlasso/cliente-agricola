import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Graphql
import {ACTUALIZAR_APFE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APFE_POR_CORTE_QUERY, OBTENER_APFE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const AplicacionFertilizanteActualizar = ({data, id_corte, id_suerte, ficorte}) => {

    const { id_apfe, fecha, tipo } = data.obtenerAlicacionFertilizante

    // estado del component
    const navigate = useNavigate()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarAPFE ] = useMutation(ACTUALIZAR_APFE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

      // state del componente
    const [ nuevaAplicacionFertilizante, actualizarNuevaAplicacionFertilizante ] = useState({
        id_apfe: id_apfe,
        fecha: fecha,
        tipo: tipo,
        corte_id: id_corte
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevaAplicacionFertilizante({
            ...nuevaAplicacionFertilizante,
            [e.target.name]: e.target.value
        })
    }

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        actualizarNuevaAplicacionFertilizante({
            ...nuevaAplicacionFertilizante,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }    

    // extraer valores
    const input = {
        fecha: nuevaAplicacionFertilizante.fecha,
        tipo: nuevaAplicacionFertilizante.tipo,
        corte_id: id_corte
    }   
    
    const fiapfe = moment(nuevaAplicacionFertilizante.fecha)

    // submit
    const submitActualizarAplicacionFertilizante = async (e) => {
        e.preventDefault()

        // Campos obligatorios
        if(nuevaAplicacionFertilizante.fecha.trim() === '' || nuevaAplicacionFertilizante.tipo.trim() === '') {
            mostrarWarning('Debe ingresar la fecha y tipo de aplicación.')
            return
        }

        if(fiapfe < ficorte) {
            mostrarWarning('La fecha de la aplicación no puede ser inferior a la fecha de corte.')
            return
        }

        actualizarActivo(false)

        // gaurdar en la db
        try {
            await actualizarAPFE({
                variables: {
                    input,
                    id_apfe
                },
                refetchQueries: [
                    {query: OBTENER_APFE_POR_CORTE_QUERY, variables: {id_corte} },
                    {query: OBTENER_APFE_QUERY, variables: {id_apfe} }
                ]
            })

            // reiniciar el form
            actualizarNuevaAplicacionFertilizante({
                fecha: '',
                tipo: '',
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
        <form onSubmit={submitActualizarAplicacionFertilizante}>
            <h4 className="center"> Actualizar Aplicación Fertilizante </h4>
    
            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }
    
            <div className="input-field">
                <label htmlFor="tipo_aplicacion"><span className="red-text fw-bold">*</span> Tipo Aplicación </label>
                <input id="tipo_aplicacion" placeholder="Tipo Aplicación" type="text" className="validate" name="tipo" defaultValue={tipo} onChange={actualizarState} />
            </div>
            <div>
                <label htmlFor="fecha"><span className="red-text fw-bold">*</span> Fecha Aplicación </label>
                <br />
                <DayPickerInput 
                    id="fecha" 
                    selectedDay={fecha}
                    onDayChange={handleDayChange} 
                    placeholder="DD-MM-YYYY" 
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={moment(fecha).format('DD-MM-YYYY')}
                />
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} state={{ id_corte:id_corte, id_suerte:id_suerte }} className="btnlink">Cancelar</Link>
            </div>
        </form>
    )
}

export default AplicacionFertilizanteActualizar
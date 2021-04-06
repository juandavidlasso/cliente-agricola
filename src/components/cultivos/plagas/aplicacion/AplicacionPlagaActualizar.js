import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import {ACTUALIZAR_APLA_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APLA_QUERY, OBTENER_APPLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const AplicacionPlagaActualizar = ({data, props}) => {

    const {id_apla, fecha} = data.obtenerAplicacionPlaga
    const id_corte = Number(props.match.params.id_corte)
    const id_suerte = Number(props.match.params.id_suerte)
    const id_tablon = Number(props.match.params.id_tablon)
    const id_trapl = Number(props.match.params.id_trapl)
    const ficorte = moment(props.location.state.fecha_inicio)

    // estado del componente
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarAPLA ] = useMutation(ACTUALIZAR_APLA_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaAplicacionPlaga, actualizarNuevaAplicacionPlaga ] = useState({
        id_apla: id_apla,
        fecha: fecha,
        corte_id: id_corte,
        tablon_id: id_tablon,
        trapl_id: id_trapl
    })

    // Funcion que ejecuta cada que el usuario escribe
    // const actualizarState = e => {
    //     actualizarNuevaAplicacionPlaga({
    //         ...nuevaAplicacionPlaga,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        actualizarNuevaAplicacionPlaga({
            ...nuevaAplicacionPlaga,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }    

    // extraer valores
    const input = {
        fecha: nuevaAplicacionPlaga.fecha,
        corte_id: Number(id_corte),
        tablon_id: Number(id_tablon),
        trapl_id: Number(id_trapl)
    }

    const fiappla = moment(nuevaAplicacionPlaga.fecha)

    // submit
    const submitActualizarAplicaionPlaga = async (e) => {
        e.preventDefault()

        if(nuevaAplicacionPlaga.fecha.trim() === '') {
            mostrarWarning('Debe ingresar la fecha.')
            return
        }

        if(fiappla < ficorte) {
            mostrarWarning('La fecha de la aplicación no puede ser inferior a la fecha de corte.')
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await actualizarAPLA({
                variables: {
                    id_apla,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_APLA_QUERY, variables: {id_corte, id_tablon, id_trapl} },
                    {query: OBTENER_APPLA_QUERY, variables: {id_apla} }
                ]
            })
            // console.log(data);

            // Reiniciar form
            actualizarNuevaAplicacionPlaga({
                fecha: ''
            })

            // Redirigir
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
        <form onSubmit={submitActualizarAplicaionPlaga}>
                            
            <h1 className="h3 font-weight-normal center"> Actualizar Aplicación Plaga </h1>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div>
                <label htmlFor="fecha"><span className="red-text font-weight-bold">*</span> Fecha </label>
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
            <div className="input-field center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} className="btnlink">Cancelar</Link>
            </div>
        </form>
    )
}

export default AplicacionPlagaActualizar
import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import { ACTUALIZAR_CORTE_MUTATION, NUEVO_CORTE_MUTATION } from '../../../apollo/mutations'
import {OBTENER_CORTE_ACTUAL_QUERY, VER_CORTE_QUERY, OBTENER_CORTES_RENOVADOS_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const CorteActualizar = ({props, corte, nombre}) => {

    const id_suerte = props
    const {id_corte, numero, fecha_siembra, fecha_inicio, fecha_corte, activo, estado} = corte
    

    // estado del component
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarCorte ] = useMutation(ACTUALIZAR_CORTE_MUTATION)
    const [ agregarCorte ] = useMutation(NUEVO_CORTE_MUTATION)
    const [ btnactivo, actualizarActivo ] = useState(true)

    // state
    const [ nuevoCorte, actualizarNuevoCorte ] = useState({
        id_corte: id_corte,
        numero: numero,
        fecha_inicio: fecha_inicio,
        fecha_siembra: fecha_siembra,
        fecha_corte: fecha_corte,
        activo: activo,
        estado: estado,
        suerte_id: id_suerte
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevoCorte({
            ...nuevoCorte,
            [e.target.name]: e.target.value
        })
    }  

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        actualizarNuevoCorte({
            ...nuevoCorte,
            fecha_corte: moment(selectedDay).format('YYYY-MM-DD')
        })
    }     
    
    // extraer valores
    const input = {
        id_corte,
        numero : Number(numero),
        fecha_siembra,
        fecha_inicio,
        fecha_corte: nuevoCorte.fecha_corte,
        activo: false,
        estado: true,
        suerte_id: id_suerte
    }

    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(nuevoCorte.fecha_corte)

    const submitActualizarCorte = async (e) => {
        e.preventDefault()

        // validar
        if(nuevoCorte.fecha_corte === null ) {
            mostrarWarning('Debe ingresar la fecha de corte.')
            return
        }

        if(ffcorte < ficorte) {
            mostrarWarning('La fecha de corte no puede ser inferior a la fecha de inicio.')
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await actualizarCorte({
                variables: {
                    id_corte,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_CORTES_RENOVADOS_QUERY, variables: {nombre}},
                    {query: OBTENER_CORTE_ACTUAL_QUERY, variables: {id_suerte} },
                    {query: VER_CORTE_QUERY, variables: {id_corte} }
                ]
            })
            // console.log(data);

            const { data } = await agregarCorte({
                variables: {
                    input: {
                        numero: Number(nuevoCorte.numero+1),
                        fecha_siembra: nuevoCorte.fecha_siembra,
                        fecha_inicio: nuevoCorte.fecha_corte,
                        activo: true,
                        estado: true,
                        suerte_id: id_suerte
                    }
                },
                refetchQueries: [
                    {query: OBTENER_CORTES_RENOVADOS_QUERY, variables: {nombre} },
                    {query: OBTENER_CORTE_ACTUAL_QUERY, variables: {id_suerte} }
                ]
            })

            // reiniciar form
            actualizarNuevoCorte({
                numero: '',
                fecha_inicio: '',
                fecha_siembra: '',
                fecha_corte: ''
            })
            Swal.fire({
                title: 'Éxito!',
                text: 'La fecha de corte se registró correctamente!',
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
                history.push(`/corte/register/tablones/${id_corte}/${id_suerte}/${data.agregarCorte.numero}/${data.agregarCorte.id_corte}`)
                //history.push(`/suerte/detalle/${id_suerte}`)
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
            actualizarActivo(true)       
        }
    }


    // Renovar suerte
    const renovarSuerte = async() => {

        // validar
        if(nuevoCorte.fecha_corte === null) {
            mostrarWarning('Debe ingresar la fecha de corte.')
            return
        }

        if(ffcorte < ficorte) {
            mostrarWarning('La fecha de corte no puede ser inferior a la fecha de inicio.')
            return
        }

        actualizarActivo(false)

        Swal.fire({
            title: 'Atención',
            text: "Si renueva la suerte ya no podrá editar las fechas de los cortes, asegúrese de revisar la información antes de renovar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d47a1',
            cancelButtonColor: '#b71c1c',
            confirmButtonText: 'Si, Renovar',
            cancelButtonText: 'No, Cancelar',
            allowOutsideClick: false,
            customClass: {
                popup: 'borde-popup-war',
                content: 'contenido-popup-war',
                title: 'title-popup-war'
            }
          }).then( async (result) => {
            if (result.value) {
                // guardar en la db
                try {
                    await actualizarCorte({
                        variables: {
                            id_corte,
                            input
                        },
                        refetchQueries: [
                            {query: OBTENER_CORTES_RENOVADOS_QUERY, variables: {nombre}},
                            {query: OBTENER_CORTE_ACTUAL_QUERY, variables: {id_suerte} },
                            {query: VER_CORTE_QUERY, variables: {id_corte} }
                        ]
                    })
                    // console.log(data);

                    // reiniciar form
                    actualizarNuevoCorte({
                        numero: '',
                        fecha_inicio: '',
                        fecha_siembra: '',
                        fecha_corte: ''
                    })
                    Swal.fire({
                        title: 'Éxito!',
                        text: 'La fecha de corte se registró correctamente! Ahora registre los datos de la nueva suerte.',
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
                        history.push(`/suerte/renovar/datos/${id_suerte}`)
                    })
                } catch (error) {
                    mostrarAlerta(error.message.replace('GraphQL error: ', ''))
                    actualizarActivo(true)     
                }
            } else {
                actualizarActivo(true)
            }
        })
    }

    const pendienteRenovar = async() => {
        // validar
        if(nuevoCorte.fecha_corte === null) {
            mostrarWarning('Debe ingresar la fecha de corte.')
            return
        }

        if(ffcorte < ficorte) {
            mostrarWarning('La fecha de corte no puede ser inferior a la fecha de inicio.')
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await actualizarCorte({
                variables: {
                    id_corte,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_CORTES_RENOVADOS_QUERY, variables: {nombre}},
                    {query: OBTENER_CORTE_ACTUAL_QUERY, variables: {id_suerte} },
                    {query: VER_CORTE_QUERY, variables: {id_corte} }
                ]
            })

            // reiniciar form
            actualizarNuevoCorte({
                numero: '',
                fecha_inicio: '',
                fecha_siembra: '',
                fecha_corte: ''
            })

            Swal.fire({
                title: 'Éxito!',
                text: 'La fecha de corte se registró correctamente!',
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
                history.push(`/suerte/detalle/${id_suerte}`)
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
            actualizarActivo(true)
        }
    }


    return (
        <form onSubmit={submitActualizarCorte}>
            <h4 className="center"> Registrar fecha de corte </h4>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div className="input-field">
                <label htmlFor="numero"> Número corte </label>
                <input disabled id="numero" type="text" className="validate" name="numero" defaultValue={numero} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="fecha_siembra"> Fecha de siembra </label>
                <input disabled id="fecha_siembra" type="date" className="validate center" name="fecha_siembra" defaultValue={fecha_siembra} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="fecha_inicio"> Fecha de inicio </label>
                <input disabled id="fecha_inicio" type="date" className="validate center" name="fecha_inicio" defaultValue={fecha_inicio} onChange={actualizarState} />
            </div>
            <div>
                <label htmlFor="fecha_corte"><span className="red-text font-weight-bold">*</span> Fecha de corte </label>
                <br />
                <DayPickerInput 
                    id="fecha_corte" 
                    selectedDay={fecha_corte} 
                    onDayChange={handleDayChange} 
                    placeholder="DD-MM-YYYY" 
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                />
            </div>
            <p className="red-text">
                <b className="black-text">*<i>Nota:</i></b>
                <i> Si desea seguir en la misma soca, presione registrar.</i>
                <i> Si desea renovar la suerte, presione renovar.</i>
                <b className="black-text">*</b>
            </p>
            <div className="center">
                <input type="submit" className="btnlink" value="Registrar" disabled={!btnactivo} />
                <button type="button" className="btnlink" onClick={() => renovarSuerte()} disabled={!btnactivo}>Renovar</button>
                <button type="button" className="btnlink" onClick={() => pendienteRenovar()} disabled={!btnactivo}>Pendiente Renovar</button>
            </div>
        </form> 
    )
} 

export default CorteActualizar
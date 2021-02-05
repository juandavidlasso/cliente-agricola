import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import useTitle from '../../../../utils/context/hooks/useSEO'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import {NUEVA_APLA_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'


const AplicacionPlagaRegister = (props) => {

    useTitle({ title: 'Aplicación Plaga' })

    const {id_trapl, producto} = props.location.state.trapl
    const {numero} = props.location.state.tablon
    const id_suerte = Number(props.match.params.id_suerte)
    const id_corte =  Number(props.match.params.id_corte)
    const id_tablon =  Number(props.match.params.id_tablon)
    const finicio = props.location.state.fecha_inicio

    // estado del componente
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ agregarAplicacionPlaga ] = useMutation(NUEVA_APLA_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ aplicacionPlaga, actualizarAplicacionPlaga ] = useState({
        id_apla: '',
        fecha: '',
        corte_id: id_corte,
        tablon_id: id_tablon,
        trapl_id: id_trapl
    })

    // Funcion que ejecuta cada que el usuario escribe
    // const actualizarState = e => {
    //     actualizarAplicacionPlaga({
    //     ...aplicacionPlaga,
    //     [e.target.name]: e.target.value
    //     })
    // }

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        actualizarAplicacionPlaga({
        ...aplicacionPlaga,
        fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }     

    // extraer valores
    const { fecha } = aplicacionPlaga
    const input = {
        fecha,
        corte_id: Number(id_corte),
        tablon_id: Number(id_tablon),
        trapl_id: Number(id_trapl)
    }

    const ficorte = moment(finicio)
    const fiappla = moment(fecha)

    // submit
    const submitNuevaAplicaionPlaga = async (e) => {
        e.preventDefault()

        if(fecha.trim() === '') {
            mostrarWarning('Debe ingresar la fecha.')
            return
        }

        if(fiappla < ficorte) {
            mostrarWarning('La fecha de la aplicación no puede ser inferior a la fecha de inicio del corte.')
            return
          }

        // guardar en la db
        try {
            await agregarAplicacionPlaga({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APLA_QUERY,
                    variables: {id_corte, id_tablon, id_trapl}
                }]
            })
            actualizarActivo(false)
            // console.log(data);

            // Reiniciar form
            actualizarAplicacionPlaga({
                fecha: ''
            })

            // Redirigir
            Swal.fire({
                title: 'Éxito!',
                text: 'La aplicación se registró correctamente!',
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

    const cancelar = () => {
        history.push(`/corte/detalle/${id_corte}/${id_suerte}`)
    }


    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
  
                    <div className="row">
                        <div className="col-md-7 offset-md-3">

                            <form onSubmit={submitNuevaAplicaionPlaga}>
                            
                                <h1 className="h3 font-weight-normal center"> Ingrese la fecha de Aplicación </h1>

                                { alerta ? <p className="error"> {alerta.msg} </p> : null }
                                { warning ? <p className="warning"> {warning.msg} </p> : null }

                                <div className="input-field">
                                    <label>Tablón</label>
                                    <input disabled type="text" defaultValue={numero}/>
                                </div>
                                <div className="input-field">
                                    <label>Producto a Aplicar</label>
                                    <input disabled type="text" className="text-capitalize" defaultValue={producto}/>
                                </div>
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
                                    />
                                </div>
                                <div className="input-field center">
                                    <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
                                    <button type="button" onClick={() => cancelar() } className="btnlink">Cancelar</button>
                                </div>

                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AplicacionPlagaRegister
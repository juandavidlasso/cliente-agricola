import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Spinner from '../../Spinner'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import { ACTUALIZAR_CORTE_MUTATION } from '../../../apollo/mutations'
import {OBTENER_CORTE_ACTUAL_QUERY, VER_CORTE_QUERY, OBTENER_CORTES_RENOVADOS_QUERY, OBTENER_COSECHAS_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useMutation, useQuery } from '@apollo/client'

const CorteActualizarDatos = ({props, corte, nombre}) => {

    const id_suerte = props
    const {id_corte, numero, fecha_siembra, fecha_inicio, fecha_corte, activo, estado} = corte
    // query hook
    const { data, loading, error } = useQuery(OBTENER_COSECHAS_POR_CORTE_QUERY, { variables: {id_corte} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    // estado del component
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarCorte ] = useMutation(ACTUALIZAR_CORTE_MUTATION)
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

    // actualizar fecha siembra
    const handleDayChangeS = (selectedDay, modifiers, dayPickerInput) => {
        actualizarNuevoCorte({
            ...nuevoCorte,
            fecha_siembra: moment(selectedDay).format('YYYY-MM-DD')
        })
    }  
    
    // actualizar fecha inicio
    const handleDayChangeI = (selectedDay, modifiers, dayPickerInput) => {
        actualizarNuevoCorte({
            ...nuevoCorte,
            fecha_inicio: moment(selectedDay).format('YYYY-MM-DD')
        })
    } 

    // actualizar fecha corte
    const handleDayChangeC = (selectedDay, modifiers, dayPickerInput) => {
        const fecha_corte_previa = selectedDay ? moment(selectedDay).format('YYYY-MM-DD') : null
        actualizarNuevoCorte({
            ...nuevoCorte,
            fecha_corte: fecha_corte_previa
        })
    }

    // extraer valores
    const input = {
        id_corte,
        numero : Number(numero),
        fecha_siembra: nuevoCorte.fecha_siembra,
        fecha_inicio: nuevoCorte.fecha_inicio,
        fecha_corte: nuevoCorte.fecha_corte,
        activo: activo,
        estado: estado,
        suerte_id: id_suerte
    }

    if(loading) return <Spinner />
    if(error) return null  
    const hayCosecha = data.obtenerCosechaPorCorte

    const submitActualizarCorte = async (e) => {
        e.preventDefault()

        // validar
        if(nuevoCorte.fecha_corte !== null & nuevoCorte.fecha_corte < nuevoCorte.fecha_inicio) {
            mostrarWarning('La fecha de corte no puede ser menor a la fecha de inicio.')
            return
        }

        if(hayCosecha.length === 0 & nuevoCorte.fecha_corte !== null) {
            mostrarWarning('No puede registrar la fecha de corte hasta registrar la cosecha.')
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
                    {query: OBTENER_CORTE_ACTUAL_QUERY, variables: {id_suerte} },
                    {query: VER_CORTE_QUERY, variables: {id_corte} },
                    {query: OBTENER_CORTES_RENOVADOS_QUERY, variables: {nombre} }
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
        <form onSubmit={submitActualizarCorte}>
            <h4 className="center"> Actualizar Corte </h4>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div className="input-field">
                <label htmlFor="numero"> Número corte </label>
                <input disabled id="numero" type="text" className="validate" name="numero" defaultValue={numero} onChange={actualizarState} />
            </div>
            <div>
                <label htmlFor="fecha_siembra"> Fecha de siembra </label>
                <br />
                <DayPickerInput 
                    id="fecha_de_siembra" 
                    selectedDay={fecha_siembra} 
                    onDayChange={handleDayChangeS} 
                    placeholder="DD-MM-YYYY" 
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={moment(fecha_siembra).format('DD-MM-YYYY')}
                />
            </div>
            <div>
                <label htmlFor="fecha_inicio"> Fecha de inicio </label>
                <br />
                <DayPickerInput 
                    id="fecha_inicio" 
                    selectedDay={fecha_inicio} 
                    onDayChange={handleDayChangeI} 
                    placeholder="DD-MM-YYYY" 
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={moment(fecha_inicio).format('DD-MM-YYYY')}
                />
            </div>
            <div>
                <label htmlFor="fecha_corte"> Fecha de corte </label>
                <br />
                <DayPickerInput 
                    id="fecha_corte" 
                    selectedDay={fecha_corte} 
                    onDayChange={handleDayChangeC} 
                    placeholder="DD-MM-YYYY" 
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={fecha_corte ? moment(fecha_corte).format('DD-MM-YYYY') : null}
                />
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!btnactivo} />
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`}  className="btnlink">Cancelar</Link>
            </div>
        </form> 
    )
}

export default CorteActualizarDatos
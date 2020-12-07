import React, { useState, useContext, Fragment } from 'react'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import ProntuarioResultado from './ProntuarioResultado'
import Spinner from '../Spinner'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import {OBTENER_SUERTES_RENOVADAS_QUERY} from '../../apollo/querys'
import { useQuery } from '@apollo/client'

const ProntuarioBuscar = () => {

    const alertaContext = useContext(AlertaContext)
    const { warning, mostrarWarning} = alertaContext
    // query hook
    const { data, loading, error } = useQuery(OBTENER_SUERTES_RENOVADAS_QUERY)
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    const [ busqueda, actualizarBusqueda ] = useState({
        inicial: '',
        final: '',
        nombre: ''
    })

    const [ valido , setValido ] = useState(false)

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    // actualizar fecha inicial
    const handleDayChangeI = (selectedDay, modifiers, dayPickerInput) => {
        actualizarBusqueda({
            ...busqueda,
            inicial: moment(selectedDay).format('YYYY-MM-DD')
        })
    }   
    
    // actualizar fecha final
    const handleDayChangeF = (selectedDay, modifiers, dayPickerInput) => {
        actualizarBusqueda({
            ...busqueda,
            final: moment(selectedDay).format('YYYY-MM-DD')
        })
    }    

    const { inicial, final } = busqueda

    if(loading) return <Spinner />
    if(error) return null  
    

    const nuevaConsulta = async () => {
        
        if(inicial.trim() === '' || final.trim() === '') {
            mostrarWarning('Debe ingresar las fechas.')
            return
        }

        setValido(true)
    }

    return (
        <Fragment>
        <div className="row">
            <div className="col s12 m12 l12 xl12 p-0">
                <h4 className="center mb-2">Ingrese los datos de búsqueda</h4>
                
                { warning ? <p className="warning"> {warning.msg} </p> : null }

                <div className="col s4">
                    <label htmlFor="inicial"><span className="red-text font-weight-bold">*</span> Fecha inicial</label>
                    <br />
                    <DayPickerInput 
                        id="inicial" 
                        selectedDay={inicial} 
                        onDayChange={handleDayChangeI}
                        placeholder="DD-MM-YYYY" 
                        format="DD-MM-YYYY"
                        formatDate={formatDate}
                        parseDate={parseDate}
                    />
                </div>
                <div className="col s4">
                    <label htmlFor="final"><span className="red-text font-weight-bold">*</span> Fecha final</label>
                    <br />
                    <DayPickerInput 
                        id="final" 
                        selectedDay={final} 
                        onDayChange={handleDayChangeF}
                        placeholder="DD-MM-YYYY" 
                        format="DD-MM-YYYY"
                        formatDate={formatDate}
                        parseDate={parseDate}
                    />
                </div>
                <div className="input-field col s4">
                    {data.obtenerSuertesRenovadas.length === 0 ? 'No hay suertes' : (
                        <select style={{display: "block",border: "2px solid #e1e1e1"}} name="nombre" onChange={actualizarState}>
                            <option value="">-- Seleccione La Suerte --</option>
                            <option value=""> Todas Las Suertes </option>
                            {data.obtenerSuertesRenovadas.map(suerte => (
                                <option key={suerte.id_suerte} value={suerte.nombre}>{suerte.nombre}</option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="col s12 center">
                    <button type="button" className="btnlink" onClick={() => nuevaConsulta() } disabled={data.obtenerSuertesRenovadas.length === 0}>Consultar</button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col s12 m12 l12 xl12 p-0">
                {valido ? <ProntuarioResultado setValido={setValido} busqueda={busqueda} />  : null }
            </div>
        </div>
        </Fragment>
    )
}

export default ProntuarioBuscar
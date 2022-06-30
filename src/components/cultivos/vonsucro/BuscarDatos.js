import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import InformeVonsucro from './InformeVonsucro';
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'

const BuscarDatos = () => {

    // State
    const [ busqueda, actualizarBusqueda ] = useState({
        inicial: '',
        final: ''
    })

    const [ valido , setValido ] = useState(false)

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

    // Submit fechas
    const submitFechas = async (e) => {
        e.preventDefault()
        
        if(inicial.trim() === '' || final.trim() === '') {
            toast.error('Debe ingresar las fechas', {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }

        setValido(true)
    }

    return (
        <div className="container-fluid grey lighten-4 p-0">
            <div className="row">
                <div className="col s12 p-1">

                    <div className='col s12 p-1'>
                        <div className="col s12 p-2">
                            <div className='col s2 p-2 center'>
                                <Link to='/suerte/list' className='btnVerDatos text-white'><i className="fas fa-arrow-alt-circle-left me-2"></i>Atras</Link>
                            </div>
                            <div className='col s8'>
                                <h1 className="center title"> Seleccione las fechas </h1>
                            </div>
                        </div>

                        <div className="col s12 p-2">
                            <div className='col s12 m6 l6 xl6 p-3 center'>
                                <div style={{width: '40%', marginLeft: '60%', textAlign: 'left'}}>
                                    <p>Fecha Inicial:</p>
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
                            </div>
                            <div className='col s12 m6 l6 xl6 p-3 ps-5 center'>
                                <div style={{width: '40%', marginRight: '60%', textAlign: 'left'}}>
                                    <p>Fecha Final:</p>
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
                            </div>
                            <div className='col s12 p-2 center'>
                                <button type='button' className='Content_registro_button_registro_11' onClick={(e) => submitFechas(e)}>Consultar</button>
                            </div>

                            
                            {valido === true ?
                                <div className='col s12 p-1'>
                                    <InformeVonsucro inicial={inicial} final={final} />
                                </div>
                            :
                                null
                            }    
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default BuscarDatos;
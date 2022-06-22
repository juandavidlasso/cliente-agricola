import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import {ACTUALIZAR_APLICACION_MANTENIMIENTO} from '../../../../apollo/mutations'
import {OBTENER_MANTENIMIENTO} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const AplicacionMantenimientoActualizar = ({datos, idMaquinaria}) => {

    const {fecha, idApMant, maquinariaId, nombre} = datos
    // estado del component
    const navigate = useNavigate()
    // mutation hook
    const [ editarAplicacionMantenimiento ] = useMutation(ACTUALIZAR_APLICACION_MANTENIMIENTO)  
    const [ activo, actualizarActivo ] = useState(true) 
    
    // state del componente
    const [ nuevaApliMant, setNuevaApliMant ] = useState({
        idApMant: idApMant,
        fecha: fecha,
        nombre: nombre,
        maquinariaId: maquinariaId
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        setNuevaApliMant({
            ...nuevaApliMant,
            [e.target.name]: e.target.value
        })
    }
    
    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setNuevaApliMant({
            ...nuevaApliMant,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }

    // extraer valores
    const input = {
        fecha: nuevaApliMant.fecha,
        nombre: nuevaApliMant.nombre,
        maquinariaId: maquinariaId
    }

    // submit
    const submitActualizarAplMant = async (e) => {
        e.preventDefault()

        // Campos obligatorios
        if( nuevaApliMant.fecha.trim() === '' || nuevaApliMant.nombre.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar todos los campos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await editarAplicacionMantenimiento({
                variables: {
                    idApMant,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_MANTENIMIENTO, variables: {idMaquinaria} }
                ]
            })

            // reiniciar el form
            setNuevaApliMant({
                fecha: '',
                nombre: ''
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
                navigate('/maquinaria/detalle', { state: { data: idMaquinaria }})
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: (error.message.replace('GraphQL error: ', '')),
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            actualizarActivo(true)
        }
    }

    return (
        <form className='p-3' onSubmit={submitActualizarAplMant}>
            <div className='input-field'>
                <label htmlFor='date'>Fecha:</label>
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
            <div className='input-field'>
                <label htmlFor='name' className='form-label'>Fecha:</label>
                <input type='text' id='name' className='validate' name='nombre' defaultValue={nombre} onChange={actualizarState} />
            </div>
            <div className='input-field center'>
                <input type='submit' value='Actualizar' className='btnlink2' disabled={!activo} />
                <Link to='/maquinaria/detalle' state={{ data: idMaquinaria }} className='btnlink2'>Cancelar</Link>
            </div>
        </form>
    );
}
 
export default AplicacionMantenimientoActualizar;
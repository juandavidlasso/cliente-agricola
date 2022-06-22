import React, { useState } from 'react';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import { NUEVA_APLICACION_MANTENIMIENTO } from '../../../../apollo/mutations'
import { OBTENER_MANTENIMIENTO } from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const AplicacionMantenimientoRegistro = ({setRegistroApMant, idMaquinaria}) => {

    // State
    const [ agregarAplicacionMantenimiento ] = useMutation(NUEVA_APLICACION_MANTENIMIENTO)
    const [ activo, actualizarActivo ] = useState(true)
    const [aplicacionMant, setAplicacionMant] = useState({
        idApMant: '',
        fecha: '',
        nombre: '',
        maquinariaId: idMaquinaria
    })

    // OnChange
    const actualizarState = (e) => {
        setAplicacionMant({
            ...aplicacionMant,
            [e.target.name]: e.target.value
        })
    }

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setAplicacionMant({
        ...aplicacionMant,
        fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }

    // Extract
    const { fecha, nombre, maquinariaId } = aplicacionMant
    const input = {
        fecha,
        nombre,
        maquinariaId
    }

    // Submit
    const submitAplicacionMantenimiento = async (e) => {
        e.preventDefault()

        // Valida
        if (fecha.trim() === '' || nombre.trim() === '') {
            toast.error('Debe ingresar todos los datos', {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }

        actualizarActivo(false)

        // Save
        try {
            await agregarAplicacionMantenimiento({
                variables: {
                  input
                },
                refetchQueries: [
                    { query: OBTENER_MANTENIMIENTO, variables: {idMaquinaria} }
                ]
            })
        
            // Reiniciar el form
            setAplicacionMant({
                fecha: '',
                nombre: ''
            })

            Swal.fire({
                title: 'Exito',
                text: "La aplicación mantenimiento se registro exitosamente",
                icon: 'success',
                confirmButtonColor: '#0d47a1',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(() => {
                actualizarActivo(true)
                setRegistroApMant(false)
            })

        } catch (error) {
            actualizarActivo(true)
            toast.error( error.message.replace('GraphQL error: ', ''), {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })   
        }
    }

    return (
        <div className='p-3 Content_show_form'>
            <h1 className='mb-5 center'>Registrar Aplicación Mantenimiento</h1>
            <form onSubmit={submitAplicacionMantenimiento}>
                <div className="mb-3">
                    <label htmlFor="fecha"><span className="red-text fw-bold">*</span> Fecha Aplicación Mantenimiento </label>
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
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="validate" id="name" placeholder='Nombre' name='nombre' value={nombre} onChange={actualizarState} />
                </div>
                <div className='center'>
                    <button type="submit" className="Content_registro_button_registro_1 me-5" disabled={!activo}>Registrar</button>
                    <button type='button' className='Content_registro_button_registro_2' onClick={() => setRegistroApMant(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
 
export default AplicacionMantenimientoRegistro;
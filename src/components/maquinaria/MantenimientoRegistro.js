import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import Switch from "react-switch"
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Select
import Select from 'react-select'
// GraphQL
import {OBTENER_INSUMOS, OBTENER_MANTENIMIENTO} from '../../apollo/querys'
import {NUEVO_MANTENIMIENTO} from '../../apollo/mutations'
import { useQuery, useMutation } from '@apollo/client'

const MantenimientoRegistro = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const idMaquinaria = location.state.data.idMaquinaria
    const name = location.state.data.marca
    // mutation hook
    const [ agregarMantenimiento ] = useMutation(NUEVO_MANTENIMIENTO)
    // State
    const [form, setForm] = useState([
        {
            fecha: '',
            detalle: '',
            horaCambio: '',
            tipoCambio: false,
            proximoCambio: '',
            cantidad: '',
            insumoId: '',
            maquinariaId: idMaquinaria
        }
    ])

    // OnChnage
    const handleFormChange = (index, event) => {
        let data = [...form];
        data[index][event.target.name] = event.target.value;
        setForm(data);
    }

    // OnChnage fecha
    const handleDayChange = (selectedDay, index) => {
        let data = [...form]
        data[index].fecha = moment(selectedDay).format('YYYY-MM-DD')
        setForm(data)
    }

    // OnChnage insumo
    const handleInsumoChange = (index, idInsumo) => {
        let data = [...form]
        data[index].insumoId = idInsumo
        setForm(data)
    }

    // OnChnage Tipo cambio
    const handleTipoChange = (index, nextChecked) => {
        let data = [...form]
        data[index].tipoCambio = nextChecked
        setForm(data)
    }

    // OnChnage fecha cambio
    const handleCambioChange = (selectedDay, index) => {
        let data = [...form]
        data[index].horaCambio = moment(selectedDay).format('YYYY-MM-DD')
        setForm(data)
    }

    // Add form
    const addFields = () => {
        let newfield = { fecha: '', detalle: '', horaCambio: '', tipoCambio: false, proximoCambio: '', cantidad: '', insumoId: '', maquinariaId: idMaquinaria }
        setForm([...form, newfield])
    }

    // Remove Form
    const removeForm = (index) => {
        let data = [...form];
        data.splice(index, 1)
        setForm(data)
    }

    // Query
    const {data, loading, error} = useQuery(OBTENER_INSUMOS)
    if(error) return null
    if(loading) return <Spinner />

    const {obtenerInsumos} = data

    // Submit
    const submitMantenimiento = async (e) => {
        e.preventDefault()

        const input = form
        let patron = /^[0-9\s]+$/

        for (let i = 0; i < input.length; i++) {
            if(patron.test(input[i].proximoCambio) === false || input[i].proximoCambio === '') {
                Swal.fire({
                    title: 'Error',
                    text: 'El campo próximo cambio debe ser numérico sin puntos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d47a1',
                    allowOutsideClick: false,
                    customClass: {
                        popup: 'borde-popup',
                        content: 'contenido-popup',
                        title: 'title-popup'
                    }
                })
                return
            }

            if(input[i].tipoCambio === true && patron.test(input[i].horaCambio) === false) {
                Swal.fire({
                    title: 'Error',
                    text: 'La hora de cambio debe ser numérico sin puntos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d47a1',
                    allowOutsideClick: false,
                    customClass: {
                        popup: 'borde-popup',
                        content: 'contenido-popup',
                        title: 'title-popup'
                    }
                })
                return
            }
            input[i].proximoCambio = Number(input[i].proximoCambio)
            input[i].insumoId = Number(input[i].insumoId)
        }

        // guardar en la db
        try {
            await agregarMantenimiento({
            variables: {
                input
            },
              refetchQueries: [{
                query: OBTENER_MANTENIMIENTO, variables: {idMaquinaria}
              }]
            })

            // Mensaje
            Swal.fire({
                title: 'Éxito!',
                text: 'El mantenimiento se registró correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }).then( () => navigate('/maquinaria/detalle', { state: {data: idMaquinaria} }))
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message.replace('GraphQL error: ', ''),
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
        }
    }

    return (
        <div className='row'>
            <div className='col-md-10 offset-md-2 p-2'>
                <div className='col s12 p-1'>
                    <div className='col s12 m12 l2 xl2 p-2'>
                        <div className='Content_titulo center p-2'>
                            <Link to='/maquinaria/detalle' state={{ data: idMaquinaria}} className='Content_titulo_btn'><i className="fas fa-arrow-alt-circle-left me-3"></i>Atras</Link>
                        </div>
                    </div>
                    <div className='col s12 m12 l8 xl8 p-1'>
                        <div className='Content_titulo center p-2'>
                            <h1 style={{fontSize: '2rem'}}>Registrar Mantenimiento - {name}</h1>
                        </div>
                    </div>
                    <div className='col s12 m12 l2 xl2 p-2'>
                        <div className='Content_titulo center p-2'>
                            <button type='button' className='Content_titulo_btn_form' onClick={addFields}><i className="fas fa-plus me-3"></i>Agregar</button>
                        </div>
                    </div>
                </div>
                <div className='col s12 p-1'>
                    <form onSubmit={submitMantenimiento}>
                        <div className='col s12 p-1'>
                            {form.map( (item, index) => (
                                <div className='col s12 Content_show_form_registro p-1 mb-3' key={index}>
                                    <div className='col s2 p-1'>
                                        <DayPickerInput 
                                            id="fecha"
                                            selectedDay={item.fecha}
                                            onDayChange={ (selectedDay) => handleDayChange(selectedDay, index)}
                                            placeholder="DD-MM-YYYY"
                                            format="DD-MM-YYYY"
                                            formatDate={formatDate}
                                            parseDate={parseDate}
                                            classNames={{
                                                wrapper: 'Day'
                                            }}
                                        />
                                    </div>
                                    <div className='col s3 p-1'>
                                        <Select
                                            options={obtenerInsumos}
                                            closeMenuOnSelect={true}
                                            className="selectAno"
                                            onChange={ opcion => handleInsumoChange(index, opcion.idInsumo)}
                                            placeholder="Seleccione insumo"
                                            getOptionValue={ opciones => opciones.idInsumo}
                                            getOptionLabel={ opciones => `${opciones.nombre} - ${opciones.referencia} - ${opciones.marca}`}
                                        />
                                    </div>
                                    <div className='col s2 p-1'>
                                        <input type='text' name='cantidad' placeholder='Cantidad' value={item.cantidad} onChange={event => handleFormChange(index, event)} />
                                    </div>
                                    <div className='col s2 p-1 center'>
                                        <div className='mb-2' style={{width: '100%'}}>
                                            <span>Tipo cambio</span>
                                            <br />
                                            <span className='me-2'>Fecha</span>
                                            <Switch
                                                checked={item.tipoCambio}
                                                onChange={(check) => handleTipoChange(index, check)}
                                                offHandleColor='#1a237e'
                                                offColor='#3949ab'
                                                onHandleColor='#b71c1c'
                                                onColor='#e53935'
                                                checkedIcon={false}
                                                uncheckedIcon={false}
                                            />
                                            <span className='ms-2'>Hora</span>
                                        </div>
                                        <div className='mb-2' style={{width: '100%'}}>
                                            {item.tipoCambio === false ?
                                                (
                                                    <DayPickerInput 
                                                        id="fecha"
                                                        selectedDay={item.horaCambio}
                                                        onDayChange={ (selectedDay) => handleCambioChange(selectedDay, index)}
                                                        placeholder="DD-MM-YYYY"
                                                        format="DD-MM-YYYY"
                                                        formatDate={formatDate}
                                                        parseDate={parseDate}
                                                        classNames={{
                                                            wrapper: 'Day'
                                                        }}
                                                    />
                                                )
                                            :
                                                (
                                                    <input type='text' placeholder='Hora cambio' name='horaCambio' value={item.horaCambio} onChange={event => handleFormChange(index, event)} />
                                                )
                                            }
                                        </div>
                                        <div style={{width: '100%'}}>
                                            <input type='text' placeholder='Próximo cambio' name='proximoCambio' value={item.proximoCambio} onChange={event => handleFormChange(index, event)} />
                                        </div>
                                    </div>
                                    <div className={form.length === 1 ? 'col s3 p-1' : 'col s2 p-1'}>
                                        <input type='text' name='detalle' placeholder='Nota' value={item.detalle} onChange={event => handleFormChange(index, event)} />
                                    </div>
                                    {form.length === 1 ?
                                        null
                                    :
                                        <div className='col s1 p-1'>
                                            <button type='button' className='Content_titulo_btn p-1 right' style={{fontSize: '.8rem'}} onClick={() => removeForm(index)}><i className="fas fa-minus-circle"></i>Eliminar</button>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                        <div className='col s12 p-2 center'>
                            <input type='submit' value='Registrar' className='Content_registro_button_registro' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default MantenimientoRegistro;
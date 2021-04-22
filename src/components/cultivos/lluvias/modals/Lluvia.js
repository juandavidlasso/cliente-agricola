import React, { useState } from 'react';
import {validarDosis} from '../../../../utils/js/validaciones'
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import {ACTUALIZAR_LLUVIA_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_LLUVIAS_ACTUALES_QUERY, OBTENER_LLUVIA_MES_ANO_QUERY, OBTENER_RESUMEN_PLUVIOMETROS_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Lluvia = (props) => {

    const {id_lluvia, fecha, cantidad} = props.props.datosl
    const id_pluviometro = props.props.idpluviome
    const fechanueva = props.props.date
    const [ activo, actualizarActivo ] = useState(true)
    const [actualizarLluvia] = useMutation(ACTUALIZAR_LLUVIA_MUTATION)
    // Estado
    const [nuevaLluvia, setnuevaLluvia] = useState({
        id_lluvia: id_lluvia,
        fecha: fecha,
        cantidad: cantidad,
        pluviometro_id: id_pluviometro,
    })
    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        setnuevaLluvia({
            ...nuevaLluvia,
            [e.target.name]: e.target.value
        })
    }

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setnuevaLluvia({
            ...nuevaLluvia,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }

    // extraer valores
    const input = {
        fecha: nuevaLluvia.fecha,
        cantidad: Number(nuevaLluvia.cantidad),
        pluviometro_id: id_pluviometro
    }

    // submit
    const submitnuevaLluvia = async(e) => {
        e.preventDefault()

        // validar
        if(nuevaLluvia.fecha === '' || nuevaLluvia.cantidad === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar todos los datos.',
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
  
        if(nuevaLluvia.cantidad <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La cantidad debe ser mayor a cero (0).',
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
  
        if(validarDosis(nuevaLluvia.cantidad) === false) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La dosis debe ser numérica.',
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

        actualizarActivo(false)

        // guardar
        try {
            await actualizarLluvia({
                variables: {
                    id_lluvia,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_LLUVIAS_ACTUALES_QUERY, variables: {id_pluviometro}},
                    {query: OBTENER_LLUVIA_MES_ANO_QUERY, variables: {fechanueva, id_pluviometro}},
                    {query: OBTENER_RESUMEN_PLUVIOMETROS_QUERY}
                ]
            })

            Swal.fire({
                title: 'Éxito!',
                text: 'La lluvia se actualizó correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                  popup: 'borde-popup',
                  content: 'contenido-popup',
                  title: 'title-popup'
                }
            }).then(() => {
                props.props.onHide()
                window.location.reload()
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: (error.message.replace('GraphQL error: ', '')),
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                    customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
            actualizarActivo(true)
        }
    }

    return (
        <form onSubmit={submitnuevaLluvia}>
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
            <div className="input-field">
                <label htmlFor="cantidad"><span className="red-text font-weight-bold">*</span> Cantidad (MM) </label>
                <input placeholder="Cantidad" type="text" className="validate" name="cantidad" defaultValue={cantidad} onChange={actualizarState}  />
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <button type="button" className="btnlink" onClick={props.props.onHide}>Terminar</button>
            </div>
        </form>
    );
}
 
export default Lluvia;
import React, { useState } from 'react';
import { validarCostoLabor } from '../../../utils/js/validaciones'
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import { ACTUALIZAR_LLUVIA_MUTATION } from '../../../apollo/mutations'
import {OBTENER_PLUVIOMETROS_Y_LLUVIAS} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const LluviaActualizar = ({id, fec, cant, pluvio, close}) => {

    const id_lluvia = id
    const fecha = fec
    const cantidad = cant
    const id_pluviometro = pluvio

    // Estado
    const [ btnactivo, actualizarActivo ] = useState(true)
    const [nuevaLluvia, setNuevaLluvia] = useState({
        id_lluvia: id_lluvia,
        fecha: fecha,
        cantidad: cantidad,
        pluviometro_id: id_pluviometro
    })

    // Mutation
    const [ actualizarLluvia ] = useMutation(ACTUALIZAR_LLUVIA_MUTATION)

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        setNuevaLluvia({
            ...nuevaLluvia,
            [e.target.name]: e.target.value
        })
    }

    // actualizar fecha siembra
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setNuevaLluvia({
            ...nuevaLluvia,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }

    // extraer valores
    const input = {
        id_lluvia,
        fecha: nuevaLluvia.fecha,
        cantidad: Number(nuevaLluvia.cantidad),
        pluviometro_id: id_pluviometro
    }

    const submitActualizarLluvia = async (e) => {
        e.preventDefault()

        // validar
        if(validarCostoLabor(nuevaLluvia.cantidad) === false) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La cantidad debe ser numérica.',
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
            await actualizarLluvia({
                variables: {
                    id_lluvia,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_PLUVIOMETROS_Y_LLUVIAS}
                ]
            })

            // reiniciar form
            setNuevaLluvia({
                fecha: '',
                cantidad: ''
            })
            Swal.fire({
                title: 'Éxito!',
                text: 'La lluvia se actualizó correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                allowEscapeKey: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }).then(function () {
                actualizarActivo(true)
                close.onHide()
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
        <form onSubmit={submitActualizarLluvia}>
            <div className="mb-3">
                <label htmlFor="fechall" className="form-label">Fecha</label>
                <br />
                <DayPickerInput 
                    id="fechall" 
                    selectedDay={fecha}
                    onDayChange={handleDayChange}
                    placeholder="DD-MM-YYYY"
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={moment(fecha).format('DD-MM-YYYY')}
                />
            </div>
                <div className="mb-3">
                    <label htmlFor="cantidadll" className="form-label">Cantidad (MM)</label>
                    <input type="text" className="form-control" id="cantidadll" name='cantidad' defaultValue={cantidad} onChange={actualizarState} />
            </div>
            <div className='center'>
                <input type='submit' className='btnlink2' value='Actualizar' disabled={!btnactivo} />
                <button type='button' className='btnlink5' onClick={() => close.onHide()}>Cancelar</button>
            </div>
        </form>
    );
}
 
export default LluviaActualizar;
import React, { useState } from 'react';
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Graphql
import {ACTUALIZAR_RIEGO} from '../../../../apollo/mutations'
import {OBTENER_RIEGO_MAX_QUERY, OBTENER_RIEGOS_CORTE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const ModalEditarRiego = (props) => {

    const {feceditar, idcoreditar, idriegeditar, numriegeditar} = props.props
    const id_riego = idriegeditar
    const fecha = feceditar
    const num_riego = numriegeditar
    const id_corte = idcoreditar
    // mutation hook
    const [ actualizarRiego ] = useMutation(ACTUALIZAR_RIEGO)
    const [ activo, actualizarActivo ] = useState(true)
    // estado
    const [nuevoRiego, setNuevoRiego] = useState({
        id_riego: id_riego,
        fecha: fecha,
        num_riego: num_riego,
        corte_id: id_corte
    })

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setNuevoRiego({
            ...nuevoRiego,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }

    // extraer valores
    const input = {
        fecha: nuevoRiego.fecha,
        num_riego: nuevoRiego.num_riego,
        corte_id: id_corte
    }

    // submit
    const submitEditarRiego = async (e) => {
        e.preventDefault()

        actualizarActivo(false)

        // guardar en la db
        try {
            await actualizarRiego({
                variables: {
                    id_riego,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_RIEGO_MAX_QUERY, variables: {id_corte}},
                    {query: OBTENER_RIEGOS_CORTE_QUERY, variables: {id_corte}}
                ]
            })

            Swal.fire({
                title: 'Éxito!',
                text: 'El riego se actualizó correctamente!',
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
        <form onSubmit={submitEditarRiego}>
            <div>
                <label htmlFor="fecha"> Fecha de riego </label>
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
                <label htmlFor="numRiego"> Número riego: </label>
                <input id="numRiego" type="text" name="num_riego" defaultValue={num_riego} disabled />
            </div>
            <div className="input-field center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <button type="button" className="btnlink" onClick={() => props.props.onHide()}>Cancelar</button>
            </div>
        </form>
    );
}
 
export default ModalEditarRiego;
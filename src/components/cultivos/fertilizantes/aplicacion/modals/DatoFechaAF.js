import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Graphql
import {NUEVA_APFE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_APFE_POR_CORTE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoFechaAF = ({fechaValida, setFechaValida, afertilizantes, cortes, setTF, setUserIdApfe}) => {

    const {id_apfe, tipo} = afertilizantes
    const {id_corte, fecha_inicio, fecha_corte} = cortes
    const [nuevaFecha, setNuevaFecha] = useState('')
    const handleClose = () => setFechaValida(false);
    // mutation hook
    const [ agregarAplicacionFertilizante ] = useMutation(NUEVA_APFE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaAF ] = useState({
        id_apfe: id_apfe,
        fecha: nuevaFecha,
        tipo: tipo,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaFecha,
        tipo: nuevaAF.tipo,
        corte_id: id_corte
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const fapfe = moment(nuevaFecha)

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setNuevaFecha(moment(selectedDay).format('YYYY-MM-DD'))
    }

    // submit
    const submitNuevaAF = async (e) => {
        e.preventDefault()

        // validar
        if(fapfe < ficorte) {
            Swal.fire({
                title: 'Atención',
                text: "La fecha de aplicación no puede ser inferior a la fecha de inicio del corte.",
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            return
        }

        if(ffcorte !== null && fapfe > ffcorte) {
            Swal.fire({
                title: 'Atención',
                text: "La fecha de aplicación no puede ser mayor a la fecha de fin del corte.",
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            return
        }
        
        actualizarActivo(false)

        // guardar en la db
        try {
            const { data } = await agregarAplicacionFertilizante({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APFE_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })

            // Mensaje
            Swal.fire({
                title: 'Exito',
                text: "La aplicación se registró correctamente! Ahora seleccione los tratamientos que desea registrar.",
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then( () => {
                setFechaValida(false);
                setTF(false)
                setUserIdApfe(data.agregarAplicacionFertilizante.id_apfe)
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: (error.message.replace('GraphQL error: ', '')),
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            actualizarActivo(true) 
        }
    }

    return (
        <Modal show={fechaValida} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Ingrese la nueva fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-12 mb-2'>
                        <p>Fechas del nuevo corte: Inicio: {fecha_inicio ? fecha_inicio : null} - Corte: {fecha_corte ? fecha_corte : null}</p>
                    </div>
                    <div className='col-12'>
                        <form>
                            <div className="input-field">
                                <label htmlFor="fecha"><span className="red-text fw-bold">*</span> Fecha Labor </label>
                                <br />
                                <DayPickerInput 
                                    id="fecha" 
                                    selectedDay={nuevaFecha}
                                    onDayChange={handleDayChange} 
                                    placeholder="DD-MM-YYYY" 
                                    format="DD-MM-YYYY"
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btnLinkFecha me-3' onClick={handleClose}>
                    Cancelar
                </Button>
                <Button className='btnLinkFecha' onClick={(e) => submitNuevaAF(e)} disabled={!activo}>
                    Registrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default DatoFechaAF;
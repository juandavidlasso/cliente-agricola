import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Graphql
import {NUEVA_APHE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_APHE_POR_CORTE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoFechaH = ({fechaValida, setFechaValida, aherbicidas, cortes, setTH, setUserIdAphe}) => {

    const {id_aphe, tipo} = aherbicidas
    const {id_corte, fecha_inicio, fecha_corte} = cortes

    const [nuevaFecha, setNuevaFecha] = useState('')
    const handleClose = () => setFechaValida(false);
    // mutation hook
    const [ agregarAplicacionHerbicida ] = useMutation(NUEVA_APHE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaAHerbicida ] = useState({
        id_aphe: id_aphe,
        fecha: nuevaFecha,
        tipo: tipo,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaFecha,
        tipo: nuevaAHerbicida.tipo,
        corte_id: id_corte
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const faphe = moment(nuevaFecha)

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setNuevaFecha(moment(selectedDay).format('YYYY-MM-DD'))
    }

    // submit
    const submitNuevaAHerbicida = async (e) => {
        e.preventDefault()

        // validar
        if(faphe < ficorte) {
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

        if(ffcorte !== null && faphe > ffcorte) {
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
            const {data} = await agregarAplicacionHerbicida({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APHE_POR_CORTE_QUERY, variables: {id_corte}
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
                setTH(false)
                setUserIdAphe(data.agregarAplicacionHerbicida.id_aphe)
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
                <Button className='btnLinkFecha' onClick={(e) => submitNuevaAHerbicida(e)} disabled={!activo}>
                    Registrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default DatoFechaH;
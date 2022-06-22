import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Graphql
import {NUEVA_LABOR_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_LABORES_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoFecha = ({fechaValida, setFechaValida, labor, cortes}) => {

    const {id_labor, actividad, equipo, estado, pases, aplico, costo, nota} = labor
    const {id_corte, fecha_inicio, fecha_corte} = cortes

    const [nuevaFecha, setNuevaFecha] = useState('')
    const handleClose = () => setFechaValida(false);
    // mutation hook
    const [ agregarLabor ] = useMutation(NUEVA_LABOR_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaLabor ] = useState({
        id_labor: id_labor,
        fecha: nuevaFecha,
        actividad: actividad,
        equipo: equipo,
        estado: estado,
        pases: pases,
        aplico: aplico,
        costo: costo,
        nota: nota,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaFecha,
        actividad: nuevaLabor.actividad,
        equipo: nuevaLabor.equipo,
        estado: nuevaLabor.estado,
        pases: Number(nuevaLabor.pases),
        aplico: nuevaLabor.aplico,
        costo: Number(nuevaLabor.costo),
        nota: nuevaLabor.nota,
        corte_id: id_corte
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const felabor = moment(nuevaFecha)

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setNuevaFecha(moment(selectedDay).format('YYYY-MM-DD'))
    }

    // Submit
    const submitLabor = async (e) => {
        e.preventDefault()

        // validar
        if(felabor < ficorte) {
            Swal.fire({
                title: 'Atención',
                text: "La fecha de la labor no puede ser inferior a la fecha de inicio del corte.",
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            return
        }

        if(ffcorte !== null && felabor > ffcorte) {
            Swal.fire({
                title: 'Atención',
                text: "La fecha de la labor no puede ser mayor a la fecha de fin del corte.",
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await agregarLabor({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_LABORES_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })

            // Mensaje
            Swal.fire({
                title: 'Exito',
                text: "La labor se registró correctamente!",
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then( () => {
                setFechaValida(false);
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
          <Button className='btnLinkFecha' onClick={(e) => submitLabor(e)} disabled={!activo}>
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
 
export default DatoFecha;
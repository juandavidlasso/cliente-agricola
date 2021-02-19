import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from '../../../Spinner'
import ModalDatoPL from './ModalDatoPL'
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import {OBTENER_TABLONES_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'
import { Fragment } from 'react';

const ModalDatosPL = (props) => {

  const { trapl, useidcorte, fechaicorte, fechafcorte } = props
  const id_corte = Number(useidcorte)
  const [ date, actualizarDate ] = useState(false)
  const [ fechaAP, actualizarFechaAP ] = useState({
    fecha: ''
  })

  // query hook
  const { data, loading, error } = useQuery(OBTENER_TABLONES_POR_CORTE_QUERY, {variables: {id_corte}})
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if(loading) return <Spinner />
  if(error) return null

  // actualizar fecha
  const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    actualizarFechaAP({
      ...fechaAP,
      fecha: moment(selectedDay).format('YYYY-MM-DD')
    })
  }

  const { fecha } = fechaAP
  const ficorte = moment(fechaicorte)
  const ffcorte = moment(fechafcorte)
  const fapla = moment(fecha)

  const cambiar = () => {
    // validar
    if(fecha.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ingresar la fecha',
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

    if(fapla < ficorte) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de aplicación no puede ser inferior a la fecha de inicio del corte.',
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

    if(ffcorte !== null && fapla > ffcorte) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de aplicación no puede ser mayor a la fecha de fin del corte.',
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
    actualizarDate(true)
  }

  const regresar = () => {
    actualizarDate(false)
  }

  const {producto} = trapl


  return ( 
    <Modal
      {...props}
      className="w-50 mt-5 grey lighten-2"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
        {date === false ?
          <Modal.Title className="center">Seleccione la fecha de aplicación</Modal.Title>
        :
          <Modal.Title className="center">Seleccione los tablones para aplicar {producto}</Modal.Title>
        }
      </Modal.Header>
      <Modal.Body>
        {date === false ? 
          <DayPickerInput 
            id="fecha" 
            selectedDay={fecha} 
            onDayChange={handleDayChange} 
            placeholder="DD-MM-YYYY" 
            format="DD-MM-YYYY"
            formatDate={formatDate}
            parseDate={parseDate}
          />
        :
          data.obtenerTablonesPorCorte.length === 0 ? 
            'No hay tablones registrados' 
          :
          data.obtenerTablonesPorCorte.map(listado => (
            <ModalDatoPL 
              key={listado.id_tablon} 
              listado={listado} 
              trapl={trapl} 
              fecha={fecha}
              id_corte={id_corte}
            />
          ))  
        }
      </Modal.Body>
      <Modal.Footer>
        {date === false ?
          <Fragment>
            <Button className="btn btn-dark mx-auto" onClick={() => cambiar()}>
              Siguiente
            </Button>
            <Button className="btn btn-dark mx-auto" onClick={props.onHide}>
              Terminar
            </Button>
          </Fragment>
        :
          <Fragment>
            <Button className="btn btn-dark mx-auto" onClick={() => regresar()}>
              Regresar
            </Button>
            <Button className="btn btn-dark mx-auto" onClick={props.onHide}>
              Terminar
            </Button>
          </Fragment>
        }
      </Modal.Footer>
    </Modal>
  );
}
 
export default ModalDatosPL;
import React, { useState } from 'react'
import { validarDosis } from '../../../utils/js/validaciones'
import Swal from 'sweetalert2'
import useTitle from '../../../utils/context/hooks/useSEO'
import { Modal } from 'react-bootstrap'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import {NUEVA_LLUVIA_MUTATION} from '../../../apollo/mutations'
import {OBTENER_LLUVIAS_ACTUALES_QUERY, OBTENER_RESUMEN_PLUVIOMETROS_QUERY, OBTENER_TOTAL_LLUVIA_ACTUAL_PLUVIOMETRO} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const LluviaRegister = (props) => {

  useTitle({ title: 'Lluvias' })
  const id_pluviometro = props.idpluviometro
  const nombre = props.namepluviometro
  // mutation hook
  const [ agregarLluvia ] = useMutation(NUEVA_LLUVIA_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  // state del componente
  const [ lluvia, actualizarLluvia ] = useState({
    id_lluvia: '',
    fecha: '',
    cantidad: '',
    pluviometro_id: id_pluviometro
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarLluvia({
      ...lluvia,
      [e.target.name]: e.target.value
    })
  }

  // actualizar fecha
  const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    actualizarLluvia({
      ...lluvia,
      fecha: moment(selectedDay).format('YYYY-MM-DD')
    })
  }    

  // extraer valores
  const { fecha, cantidad } = lluvia
  const input = {
    fecha,
    cantidad: Number(cantidad),
    pluviometro_id: id_pluviometro
  }

  // submit
  const submitNuevaLluvia = async (e) => {
    e.preventDefault()

    // validar
    if(fecha.trim() === '' || cantidad.trim() === '') {
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

    if(cantidad <= 0) {
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

    if(validarDosis(cantidad) === false) {
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

    // guardar en la db
    try {
      await agregarLluvia({
        variables: {
          input
        },
        refetchQueries: [
          {query: OBTENER_LLUVIAS_ACTUALES_QUERY, variables: {id_pluviometro} },
          {query: OBTENER_RESUMEN_PLUVIOMETROS_QUERY},
          {query: OBTENER_TOTAL_LLUVIA_ACTUAL_PLUVIOMETRO, variables: {id_pluviometro}}
        ]
      })
      // console.log(data);

      Swal.fire({
        title: 'Éxito!',
        text: 'La lluvia se registró correctamente!',
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
        Swal.fire({
            title: 'Atención',
            text: "Desea registrar más lluvias?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'No, Terminar',
            confirmButtonColor: '#b71c1c',
            cancelButtonText: 'Si, Registrar',
            cancelButtonColor: '#1b5e20',
            allowOutsideClick: false,
            customClass: {
              popup: 'borde-popup',
              content: 'contenido-popup',
              title: 'title-popup'
            }
        }).then((result) => {
            if (result.value) {
              actualizarActivo(true)
                props.onHide()
                window.location.reload()
            } else {
                actualizarActivo(true)
            }
        })
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
    <Modal
      {...props}
      className="w-50 mt-5 grey lighten-2"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
        <Modal.Title bsPrefix="titleModal" className="center">Registrar Lluvia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitNuevaLluvia}>
          <div className="input-field">
            <input disabled id="nombre" type="text" defaultValue={`Pluviómetro No. ${nombre}`} />
          </div>
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
            />
          </div>
          <div className="input-field">
            <label htmlFor="cantidad"><span className="red-text font-weight-bold">*</span> Cantidad (MM) </label>
            <input placeholder="Cantidad" type="text" className="validate" name="cantidad" value={cantidad} onChange={actualizarState} />
          </div>
          <div className="center">
            <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
            <button type="button" className="btnlink" onClick={props.onHide}>Terminar</button>
          </div>
        </form>
      </Modal.Body>
      
    </Modal>    
  )
}

export default LluviaRegister

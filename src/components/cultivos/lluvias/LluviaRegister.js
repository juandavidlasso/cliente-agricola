import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { validarDosis } from '../../../utils/js/validaciones'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import useTitle from '../../../utils/context/hooks/useSEO'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// GraphQL
import {NUEVA_LLUVIA_MUTATION} from '../../../apollo/mutations'
import {OBTENER_PLUVIOMETROS_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const LluviaRegister = (props) => {

  useTitle({ title: 'Lluvia' })

  const nombre = props.location.state.pluviometro.nombre

  const {id} = props.match.params
  // console.log(props);
  const id_pluviometro = Number(id)
  //console.log(id_pluviometro);
  const id_corte = Number(props.match.params.id_corte)
  const id_suerte = Number(props.match.params.id_suerte)
  //console.log(id_corte);
  //console.log(id_suerte);  
  

  // estado del component
  const history = useHistory()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
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
      mostrarWarning('Los campos marcados con * son obligatorios.')
      return
    }

    if(cantidad <= 0) {
      mostrarWarning('La cantidad debe ser mayor a 0.')
      return
    }

    if(validarDosis(cantidad) === false) {
      mostrarWarning('El valor debe ser numérico. Ej: 1 - 1.1')
      return
    }

    // guardar en la db
    try {
      await agregarLluvia({
        variables: {
          input
        },
        refetchQueries: [{
            query: OBTENER_PLUVIOMETROS_QUERY
        }]
      })
      actualizarActivo(false)
      // console.log(data);

      // reiniciar el form
      actualizarLluvia({
        fecha: '',
        cantidad: ''
      })
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
        history.push(`/corte/detalle/${id_corte}/${id_suerte}`)
      })
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))
    }
  }

  const cerrar = () => {
    history.push(`/corte/detalle/${id_corte}/${id_suerte}`)
  }


  return (
    <div className="container-fluid white">
      <div className="row">
        <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">

          <div className="row">
            <div className="col-md-7 offset-md-3">
              <form onSubmit={submitNuevaLluvia}>
                <h4 className="center"> Registrar Lluvias </h4>

                { alerta ? <p className="error"> {alerta.msg} </p> : null }
                { warning ? <p className="warning"> {warning.msg} </p> : null } 
                 
                <div className="input-field">
                  <label htmlFor="nombre"> Pluviómetro No. </label>
                  <input disabled id="nombre" type="text" defaultValue={nombre} />
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
                  <label htmlFor="cantidad"><span className="red-text font-weight-bold">*</span> Cantidad </label>
                  <input placeholder="Cantidad" type="text" className="validate" name="cantidad" value={cantidad} onChange={actualizarState} />
                </div>
                <div className="center">
                  <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
                  <button type="button" onClick={() => cerrar() } className="btnlink">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  )
}

export default LluviaRegister

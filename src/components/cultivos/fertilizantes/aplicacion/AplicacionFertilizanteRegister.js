import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroAF } from '../../../../utils/redux/actions/aplicacionFertilizanteActions'
// Graphql
import {NUEVA_APFE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APFE_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const AplicacionFertilizanteRegister = ({corte, fecha_inicio}) => {

  //console.log(corte);
  const {id_corte} = corte
  //console.log(id_corte);

  // extraer los valores del context
  const dispatch = useDispatch()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarAplicacionFertilizante ] = useMutation(NUEVA_APFE_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)


  // state del componente
  const [ aplicacionFertilizante, actualizarAplicacionFertilizante ] = useState({
    id_apfe: '',
    fecha: '',
    tipo: '',
    corte_id: ''
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarAplicacionFertilizante({
      ...aplicacionFertilizante,
      [e.target.name]: e.target.value
    })
  }

  // actualizar fecha
  const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    actualizarAplicacionFertilizante({
      ...aplicacionFertilizante,
      fecha: moment(selectedDay).format('YYYY-MM-DD')
    })
  }   

  // extraer valores
  const { fecha, tipo } = aplicacionFertilizante
  const input = {
    fecha,
    tipo,
    corte_id: id_corte
  }

  const ficorte = moment(fecha_inicio)
  const fiapfe = moment(fecha)

  // submit
  const submitNuevaAplicacionFertilizante = async (e) => {
    e.preventDefault()

    // Campos obligatorios
    if(fecha.trim() === '' || tipo.trim() === '') {
      mostrarWarning('Debe ingresar la fecha y tipo de aplicación.')
      return
    }

    if(fiapfe < ficorte) {
      mostrarWarning('La fecha de la aplicación no puede ser inferior a la fecha de inicio del corte.')
      return
    }

    // gaurdar en la db
    try {
      await agregarAplicacionFertilizante({
        variables: {
          input
        },
        refetchQueries: [{
          query: OBTENER_APFE_POR_CORTE_QUERY,
          variables: {id_corte}
        }]
      })
      actualizarActivo(false)
      // console.log(data);

      // reiniciar el form
      actualizarAplicacionFertilizante({
        fecha: '',
        tipo: '',
      })
      dispatch( ocultarRegistroAF() )
      Swal.fire({
        title: 'Éxito!',
        text: 'La aplicación se registró correctamente! Ahora registre los productos',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d47a1',
        allowOutsideClick: false,
        customClass: {
          popup: 'borde-popup',
          content: 'contenido-popup',
          title: 'title-popup'
        }
      })
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))  
    }
  }

  const cerrar = () => {
    dispatch( ocultarRegistroAF() )
  }


  return (
    <form onSubmit={submitNuevaAplicacionFertilizante}>
      <h4 className="center"> Registrar Aplicación Fertilizante </h4>

      { alerta ? <p className="error"> {alerta.msg} </p> : null }
      { warning ? <p className="warning"> {warning.msg} </p> : null }

      <div className="input-field">
      <label htmlFor="tipo_aplicacion"><span className="red-text font-weight-bold">*</span> Tipo Aplicación </label>
        <input id="tipo_aplicacion" placeholder="Tipo Aplicación" type="text" className="validate" name="tipo" value={tipo} onChange={actualizarState} />
      </div>
      <div>
        <label htmlFor="fecha"><span className="red-text font-weight-bold">*</span> Fecha Aplicación </label>
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
      <div className="center">
        <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
        <button type="button" onClick={() => cerrar()} className="btnlink">Cancelar</button>
      </div>
    </form>
  )
}

export default AplicacionFertilizanteRegister

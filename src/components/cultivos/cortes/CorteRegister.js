import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroCorte } from '../../../utils/redux/actions/corteActions'
// Graphql
import {NUEVO_CORTE_MUTATION} from '../../../apollo/mutations'
import {OBTENER_CORTES_RENOVADOS_QUERY, OBTENER_CORTE_ACTUAL_QUERY, OBTENER_CORTES_POR_SUERTE_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'


const CorteRegister = ({suerte}) => {

  //console.log(suerte)
  const {id_suerte, nombre} = suerte
  //console.log(nombre)

  // estado del component
  const dispatch = useDispatch()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarCorte ] = useMutation(NUEVO_CORTE_MUTATION, {
    update(cache, { data: { agregarCorte } }) {
      // obtener el objeto de cache
      const { obtenerCortesRenovados } = cache.readQuery({ 
        query: OBTENER_CORTES_RENOVADOS_QUERY,
        variables: {nombre} 
      })
      //reescribir ese objeto
      cache.writeQuery({
        query: OBTENER_CORTES_RENOVADOS_QUERY,
        variables: {nombre},
        data: {
          obtenerCortesRenovados: [...obtenerCortesRenovados, agregarCorte]
        }
      })
    }
  })
  const [ btnactivo, actualizarActivo ] = useState(true)

  // state del componente
  const activo = true
  const estado = true
  const [ corte, actualizarCorte ] = useState({
    id_corte: '',
    numero: '',
    fecha_siembra: '',
    fecha_inicio: '',
    activo,
    estado,
    suerte_id: id_suerte
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarCorte({
      ...corte,
      [e.target.name]: e.target.value
    })
  }

  // actualizar fecha siembra
  const handleDayChangeS = (selectedDay, modifiers, dayPickerInput) => {
    actualizarCorte({
      ...corte,
      fecha_siembra: moment(selectedDay).format('YYYY-MM-DD')
    })
  }

  // actualizar fecha inicio
  const handleDayChangeI = (selectedDay, modifiers, dayPickerInput) => {
    actualizarCorte({
      ...corte,
      fecha_inicio: moment(selectedDay).format('YYYY-MM-DD')
    })
  }

  // extraer valores
  const { numero, fecha_siembra, fecha_inicio } = corte
  const input = {
    numero : Number(numero),
    fecha_siembra,
    fecha_inicio,
    activo,
    estado,
    suerte_id: id_suerte
  }

  // Submit
  const submitNuevoCorte = async (e) => {
    e.preventDefault()

    // validar
    if(numero.trim() === '' || fecha_siembra.trim() === '' || fecha_inicio.trim() === '') {
      mostrarWarning('Los campos marcados con * son obligatorios.')
      return
    }

    // validar corte
    if(isNaN(numero)) {
      mostrarWarning('El corte debe ser numérico. Ej: 1')
      return
    }
    
    if(numero <= 0) {
      mostrarWarning('El número de corte debe ser mayor a 0.')
      return
    }

    // if(fecha_siembra !== fecha_inicio) {
    //   mostrarWarning('Las fechas deben ser iguales.')
    //   return
    // }

    // guardar en la db
    try {
      await agregarCorte({
        variables: {
          input
        },
        refetchQueries: [
          {query: OBTENER_CORTE_ACTUAL_QUERY, variables: {id_suerte}},
          {query: OBTENER_CORTES_POR_SUERTE_QUERY, variables: {id_suerte}}
        ]
      })
      actualizarActivo(false)
      // console.log(data)

      // reiniciar el form
      actualizarCorte({
        numero: '',
        fecha_siembra: '',
        fecha_inicio: ''
      })

      dispatch( ocultarRegistroCorte() )
      Swal.fire({
        title: 'Éxito!',
        text: 'El corte se registró correctamente!',
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

  const onclick = () => {
    dispatch( ocultarRegistroCorte() )
  }

  return (
    <form onSubmit={submitNuevoCorte}>
      <h4 className="center"> Registrar corte </h4>  

      { alerta ? <p className="error"> {alerta.msg} </p> : null }
      { warning ? <p className="warning"> {warning.msg} </p> : null }
      
      <div className="input-field">
        <label htmlFor="numero_corte "><span className="red-text font-weight-bold">*</span> Número de corte </label>
        <input id="numero_corte" placeholder="Número corte" type="text" className="validate" name="numero" value={numero} onChange={actualizarState}/>
      </div>
      <div>
        <label htmlFor="fecha_de_siembra "><span className="red-text font-weight-bold">*</span> Fecha de siembra </label>
        <br />
        <DayPickerInput 
          id="fecha_de_siembra" 
          selectedDay={fecha_siembra} 
          onDayChange={handleDayChangeS} 
          placeholder="DD-MM-YYYY" 
          format="DD-MM-YYYY"
          formatDate={formatDate}
          parseDate={parseDate}
        />
      </div>
      <div>
        <label htmlFor="fecha_de_inicio "><span className="red-text font-weight-bold">*</span> Fecha de inicio </label>
        <br />
        <DayPickerInput 
          id="fecha_de_inicio" 
          selectedDay={fecha_inicio} 
          onDayChange={handleDayChangeI} 
          placeholder="DD-MM-YYYY" 
          format="DD-MM-YYYY"
          formatDate={formatDate}
          parseDate={parseDate}
        />
      </div>
      <div className="center">
        <input type="submit" className="btnlink" value="Registrar" disabled={!btnactivo} />
        <button type="button" onClick={ () => onclick() } className="btnlink">Cancelar</button>
      </div>
    </form>
  )
}

export default CorteRegister

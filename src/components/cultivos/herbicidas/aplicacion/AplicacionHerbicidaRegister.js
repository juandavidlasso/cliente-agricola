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
import { ocultarRegistroAH } from '../../../../utils/redux/actions/aplicacionHerbicidaActions'
// Graphql
import {NUEVA_APHE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APHE_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const AplicacionHerbicidaRegister = ({corte, fecha_inicio}) => {

  //console.log(corte);
  const {id_corte} = corte
  //console.log(id_corte);

  // extraer los valores del context
  const dispatch = useDispatch()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarAplicacionHerbicida ] = useMutation(NUEVA_APHE_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  // state del componente
  const [ aplicacionHerbicida, actualizarAplicacionHerbicida ] = useState({
    id_aphe: '',
    fecha: '',
    tipo: '',
    corte_id: id_corte
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarAplicacionHerbicida({
      ...aplicacionHerbicida,
      [e.target.name]: e.target.value
    })
  }

  // actualizar fecha
  const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    actualizarAplicacionHerbicida({
      ...aplicacionHerbicida,
      fecha: moment(selectedDay).format('YYYY-MM-DD')
    })
  }   

  // extraer valores
  const { fecha, tipo } = aplicacionHerbicida
  const input = {
    fecha,
    tipo,
    corte_id: id_corte
  }

  const ficorte = moment(fecha_inicio)
  const fiaphe = moment(fecha)

  // submit
  const submitNuevaAplicacionHerbicida = async (e) => {
    e.preventDefault()

    // Campos obligatorios
    if(fecha.trim() === '' || tipo.trim() === '') {
      mostrarWarning('Debe seleccionar la fecha y tipo de aplicación.')
      return
    }

    if(fiaphe < ficorte) {
      mostrarWarning('La fecha de la aplicación no puede ser inferior a la fecha de inicio del corte.')
      return
    }

    // guardar en la db
    try {
      await agregarAplicacionHerbicida({
        variables: {
          input
        },
        refetchQueries: [{
          query: OBTENER_APHE_POR_CORTE_QUERY,
          variables: {id_corte}
        }]
      })
      actualizarActivo(false)
      // console.log(data)

      // reiniciar el form
      actualizarAplicacionHerbicida({
        fecha: '',
        tipo: '',
      })
      dispatch( ocultarRegistroAH() )
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
    dispatch( ocultarRegistroAH() )
  }

  return (
    <form onSubmit={submitNuevaAplicacionHerbicida}>
      <h4 className="center"> Registrar Aplicación Herbicida </h4>
      
      { alerta ? <p className="error"> {alerta.msg} </p> : null }
      { warning ? <p className="warning"> {warning.msg} </p> : null }
            
      <div className="input-field" style={{marginBottom: "2rem"}}>
        <select style={{display: "block",border: "2px solid #e1e1e1"}} name="tipo" value={tipo} onChange={actualizarState}>
          <option value="">-- Seleccione Tipo Aplicación --</option>
          <option value="PRE-EMERGENTE">PRE-EMERGENTE</option>
          <option value="POST-EMERGENTE">POST-EMERGENTE</option>
        </select>
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

export default AplicacionHerbicidaRegister

import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import {validarCostoLabor} from '../../../utils/js/validaciones'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Redux
import { ocultarRegistroLabor } from '../../../utils/redux/actions/laborActions'
// Graphql
import {NUEVA_LABOR_MUTATION} from '../../../apollo/mutations'
import {OBTENER_LABORES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'


const LaborRegister = ({corte, fecha_inicio}) => {

  const id_corte = corte
  //console.log(fecha_inicio);

  // estado del component
  const dispatch = useDispatch()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarLabor ] = useMutation(NUEVA_LABOR_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  // state del componente
  const [ labor, actualizarLabor ] = useState({
    id_labor: '',
    fecha: '',
    actividad: '',
    equipo: '',
    estado: '',
    pases: '',
    aplico: '',
    costo: '',
    nota: '',
    corte_id: id_corte
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarLabor({
      ...labor,
      [e.target.name]: e.target.value
    })
  }

  // actualizar fecha
  const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    actualizarLabor({
      ...labor,
      fecha: moment(selectedDay).format('YYYY-MM-DD')
    })
  }  

  // extraer valores
  const { fecha, actividad, equipo, estado, pases, aplico, costo, nota  } = labor
  const input = {
    fecha,
    actividad,
    equipo,
    estado,
    pases: Number(pases),
    aplico,
    costo: Number(costo),
    nota,
    corte_id: id_corte
  }

  const ficorte = moment(fecha_inicio)
  const filabor = moment(fecha)

  // submit
  const submitNuevaLabor = async (e) => {
    e.preventDefault()

    // Campos obligatorios
    if(fecha.trim() === '' || actividad.trim() === '') {
      mostrarWarning('Los campos marcados con * son obligatorios.')
      return
    }

    if(isNaN(pases) && pases !== '') {
      mostrarWarning('El número de pases debe ser numérico. Ej: 1')
      return
    }

    if(pases <= 0 && pases !== '') {
      mostrarWarning('El número de pases debe ser mayor a 0.')
      return
    }

    if(validarCostoLabor(costo) === false && costo !== '') {
      mostrarWarning('El costo debe ser numérico. Ej: 12000')
      return
    }

    if(filabor < ficorte) {
      mostrarWarning('La fecha de labor no puede ser inferior a la fecha de corte.')
      return
    }

    // guardar en la db
    try {
      await agregarLabor({
        variables: {
          input
        },
        refetchQueries: [{
          query: OBTENER_LABORES_POR_CORTE_QUERY,
          variables: {id_corte}
        }]
      })
      actualizarActivo(false)
      //console.log(data)

      // reiniciar el form
      actualizarLabor({
        fecha: '',
        actividad: '',
        equipo: '',
        estado: '',
        pases: '',
        aplico: '',
        costo: '',
        nota: ''
      })

      dispatch( ocultarRegistroLabor() )
      Swal.fire({
        title: 'Éxito!',
        text: 'La labor se registró correctamente!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d47a1'
      })
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))    
    }
  }

  const onclick = () => {
    dispatch( ocultarRegistroLabor() )
  }

  return (
    <form onSubmit={submitNuevaLabor}>
      <h4 className="center"> Registrar labor </h4>

      { alerta ? <p className="error"> {alerta.msg} </p> : null }
      { warning ? <p className="warning"> {warning.msg} </p> : null }

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
      <div className="input-field">
        <label htmlFor="labor"><span className="red-text font-weight-bold">*</span> Labor </label>
        <input placeholder="Labor" type="text" className="validate" name="actividad" value={actividad} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="equipo"> Equipo </label>
        <input placeholder="Equipo" type="text" className="validate" name="equipo" value={equipo} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="numero_pases"> Número pases </label>
        <input placeholder="Número pases" type="text" name="pases" value={pases} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="realizado_por"> Realizado por </label>
        <input placeholder="Realizado por" type="text" className="validate" name="aplico" value={aplico} onChange={actualizarState} />
      </div>
      <div className="input-field left-add">
        <label htmlFor="costo"> Costo </label>
        <input placeholder="Costo" type="text" name="costo" value={costo} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="nota"> Nota </label>
        <input placeholder="Nota" type="text" className="validate" name="nota" value={nota} onChange={actualizarState} />
      </div>
      <div className="">
        <label htmlFor="estado"> Estado </label>
        &nbsp;&nbsp;
        <label>
          <input className="with-gap" name="estado" type="radio" value="OK" onChange={actualizarState}  />
          <span>OK</span>
        </label>
        &nbsp;&nbsp;
        <label>
          <input className="with-gap" name="estado" type="radio" value="NO" onChange={actualizarState}  />
          <span>No</span>
        </label>
      </div>
      <div className="center">
        <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
        <button type="button" onClick={ () => onclick() } className="btnlink">Cancelar</button>
      </div>
    </form>
  )
}

export default LaborRegister

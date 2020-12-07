import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { validarDosis } from '../../../../utils/js/validaciones'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroPlaga } from '../../../../utils/redux/actions/tratamientoPlagaActions'
// GraphQL
import {NUEVO_TRAPL_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRAPL_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const TratamientoPlagaRegister = () => {

  // estado del componente
  const dispatch = useDispatch()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext

  // mutation hook
  const [ agregarTratamientoPlaga ] = useMutation(NUEVO_TRAPL_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  // state del componente
  const [ tratamientoPlaga, actualizarTratamientoPlaga ] = useState({
    producto: '',
    unidad: '',
    cantidad: '',
    tiempo: ''
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarTratamientoPlaga({
      ...tratamientoPlaga,
      [e.target.name]: e.target.value
    })
  }

  // extraer valores
  const { producto, unidad, cantidad, tiempo } = tratamientoPlaga
  const input = {
    producto,
    unidad,
    cantidad: Number(cantidad),
    tiempo
  }

  // submit
  const submitNuevoTratamientoPlaga = async (e) => {
    e.preventDefault()

    // Campos obligatorios
    if(producto.trim() === '' || unidad.trim() === '' || cantidad.trim() === '' || tiempo.trim() === '') {
      mostrarWarning('Los campos marcados con * son obligatorios.')
      return
    }

    if(cantidad <= 0) {
      mostrarWarning('La dósis debe ser mayor a 0.')
      return
    }

    if(validarDosis(cantidad) === false) {
      mostrarWarning('La dósis debe ser numérica. Ej: 20 - 2.5')
      return
    }

    // guardar en la db
    try {
      await agregarTratamientoPlaga({
        variables: {
          input
        },
        refetchQueries: [{
          query: OBTENER_TRAPL_QUERY
        }]
      })
      actualizarActivo(false)
      // console.log(data);

      // Reiniciar el form
      actualizarTratamientoPlaga({
        producto: '',
        unidad: '',
        cantidad: '',
        tiempo: ''
      })

      dispatch( ocultarRegistroPlaga() )

      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'El producto se registró correctamente!',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d47a1'
      })
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))
    }
  }

  const cerrar = () => {
    dispatch( ocultarRegistroPlaga() )
  }   


  return (
    <form onSubmit={submitNuevoTratamientoPlaga}>
      <h4 className="center"> Registrar Tratamiento Plagas </h4>

      { alerta ? <p className="error"> {alerta.msg} </p> : null }
      { warning ? <p className="warning"> {warning.msg} </p> : null }

      <div className="input-field">
        <label htmlFor="producto"><span className="red-text font-weight-bold">*</span> Producto </label>
        <input id="producto" placeholder="Producto" type="text" className="validate" name="producto" value={producto} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="unidad"><span className="red-text font-weight-bold">*</span> Unidad</label>
        <input id="unidad" placeholder="Unidad" type="text" className="validate" name="unidad" value={unidad} onChange={actualizarState} />
        <small className="form-text text-muted center">(Ej: GRAMOS - UNIDAD - can pul2)</small>
      </div>
      <div className="input-field">
        <label htmlFor="dosis"><span className="red-text font-weight-bold">*</span> Dósis </label>
        <input id="dosis" placeholder="Dósis" type="text" className="validate" name="cantidad" value={cantidad} onChange={actualizarState} />
        <small className="form-text text-muted center">(Ej: 2 - 30 - 5.2)</small>
      </div>
      <div className="input-field">
        <label htmlFor="tiempo"><span className="red-text font-weight-bold">*</span> Tiempo Aplicación </label>
        <input id="tiempo" placeholder="Tiempo Aplicación" type="text" className="validate" name="tiempo" value={tiempo} onChange={actualizarState} />
        <small className="form-text text-muted center">(Ej: 0-3 MESES)</small>
      </div>
      <div className="center">
        <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
        <button type="button" onClick={ () => cerrar() } className="btnlink">Cancelar</button>
      </div>
    </form>
  )

}

export default TratamientoPlagaRegister

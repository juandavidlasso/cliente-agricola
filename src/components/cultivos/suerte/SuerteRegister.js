import React, { useState, useContext } from 'react'
import { validarVariedad, validarZona } from '../../../utils/js/validaciones'
import Swal from 'sweetalert2'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import {useHistory} from 'react-router-dom'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroSuerte } from '../../../utils/redux/actions/suerteActions'
// Graphql
import {NUEVA_SUERTE_MUTATION} from '../../../apollo/mutations'
import {OBTENER_SUERTES_RENOVADAS_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'


const SuerteRegister = () => {

  // estado del componente
  const dispatch = useDispatch()
  const history = useHistory()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarSuerte ] = useMutation(NUEVA_SUERTE_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  // state del componente
  const [ suerte, actualizarSuerte ] = useState({
    id_suerte: '',
    nombre: '',
    variedad: '',
    zona: '',
    renovada: 'SI'
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarSuerte({
      ...suerte,
      [e.target.name]: e.target.value
    })
  }

  // Extraer los valores
  const { nombre, variedad, zona, renovada } = suerte
  const input = {
    nombre,
    variedad,
    zona,
    renovada
  }

  // Submit
  const submitNuevaSuerte = async (e) => {
    e.preventDefault()

    // validar campos vacios
    if(nombre.trim() === '' || variedad.trim() === '' || zona.trim() === '') {
      mostrarWarning('Los campos marcados con * son obligatorios.')
      return
    }

    // validar variedad
    if(validarVariedad(variedad) === false) {
      mostrarWarning('La variedad no tiene el formato correcto. Ej: CC-1234')
      return
    }

    // valiadr zona
    if(validarZona(zona) === false) {
      mostrarWarning('La zona agroecologica no tiene el formato correcto. Ej: 1H1')
      return
    }

    // guardar en la db
    try {
      await agregarSuerte({
        variables: {
          input
        },
        refetchQueries: [
          {query: OBTENER_SUERTES_RENOVADAS_QUERY}
        ]
      })
      actualizarActivo(false)
      // console.log(data)

      // Reiniciar el form
      actualizarSuerte({
        nombre: '',
        variedad: '',
        zona: ''
      })
      dispatch( ocultarRegistroSuerte() )

      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'La suerte se registró correctamente!',
        confirmButtonText: 'Registrar',
        confirmButtonColor: '#0d47a1'
      }).then(function () {
        history.push('/suerte/list')
      })
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))
    }
  }

  const onclick = () => {
    dispatch( ocultarRegistroSuerte() )
  }


  return (
    <div className="col s12 mx-auto">
      <form onSubmit={submitNuevaSuerte}>
        <h1 className="h3 mb-2 font-weight-normal center-align font-weight-bold title"> Registrar suerte </h1>
              
        { alerta ? <p className="error"> {alerta.msg} </p> : null }
        { warning ? <p className="warning"> {warning.msg} </p> : null }

        <div className="input-field">
          <label htmlFor="nombre"><span className="red-text font-weight-bold">*</span> Número de suerte </label>
          <input id="nombre" placeholder="Número de suerte" name="nombre" type="text" className="validate" value={nombre} onChange={actualizarState} />
        </div>
        <div className="input-field">
          <label htmlFor="variedad"><span className="red-text font-weight-bold text-uppercase">*</span> Variedad de suerte </label>
          <input id="variedad" placeholder="Variedad de suerte" name="variedad" type="text" className="validate" value={variedad} onChange={actualizarState} />
        </div>
        <div className="input-field">
          <label htmlFor="zona"><span className="red-text font-weight-bold text-uppercase">*</span> Zona agroecológica </label>
          <input id="zona" placeholder="Zona agroecológica" name="zona" type="text" className="validate" value={zona} onChange={actualizarState} />
        </div>
        <div className="input-field center">
          <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
          <button type="button" onClick={() => onclick() } className="btnlink">Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default SuerteRegister

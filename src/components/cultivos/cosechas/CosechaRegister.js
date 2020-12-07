import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import {validarDosis} from '../../../utils/js/validaciones'
import { useHistory } from 'react-router-dom'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroCosecha } from '../../../utils/redux/actions/cosechaActions'
// Graphql
import {NUEVA_COSECHA_MUTATION} from '../../../apollo/mutations'
import {OBTENER_COSECHAS_POR_CORTE_QUERY, VER_NOMBRE_SUERTE_QUERY} from '../../../apollo/querys'
import { useMutation, useQuery } from '@apollo/client'

const CosechaRegister = ({corte, props}) => {
  
  const id_suerte = props
  const {id_corte} = corte 

  // estado del component
  const history = useHistory()
  const dispatch = useDispatch()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarCosecha ] = useMutation(NUEVA_COSECHA_MUTATION)
  const { loading, error, data } = useQuery(VER_NOMBRE_SUERTE_QUERY, { variables: {id_suerte} })
  // console.log(data)
  // console.log(loading)
  // console.log(error)
  const [ activo, actualizarActivo ] = useState(true)

  // state del componente
  const [ cosecha, actualizarCosecha ] = useState({
    id_cosecha: '',
    peso: '',
    rendimiento: '',
    corte_id: id_corte
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarCosecha({
      ...cosecha,
      [e.target.name]: e.target.value
    })
  }

  // extraer valores
  const { peso, rendimiento  } = cosecha
  const input = {
    peso: Number(peso),
    rendimiento: Number(rendimiento),
    corte_id: id_corte
  }

  // submit
  const submitNuevaCosecha = async (e) => {
    e.preventDefault()

    // validar
    if(peso.trim() === '') {
      mostrarWarning('Debe ingresar el peso.')
      return
    }

    if(peso <= 0) {
      mostrarWarning('El peso debe ser mayor a 0.')
      return
    }

    if(validarDosis(peso) === false) {
      mostrarWarning('El peso debe ser numérico. Ej: 5000 - 5.000')
      return 
    }

    if(rendimiento !== '' && rendimiento <= 0) {
      mostrarWarning('El rendimiento debe ser mayor a 0.')
      return
    }

    if(rendimiento !== '' && validarDosis(rendimiento) === false) {
      mostrarWarning('El rendimiento debe ser numérico. Ej: 12 - 12.5')
      return
    }

    // guardar en la db
    try {
      await agregarCosecha({
        variables: {
          input
        },
        refetchQueries: [{
          query: OBTENER_COSECHAS_POR_CORTE_QUERY,
          variables: {id_corte}
        }]
      })
      actualizarActivo(false)
      // console.log(data);      

      // reiniciar el form
      actualizarCosecha({
        peso: '',
        rendimiento: ''
      })

      dispatch( ocultarRegistroCosecha() )

      Swal.fire({
        title: 'Éxito!',
        text: 'La cosecha se registró correctamente! Ahora registre la fecha de corte',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d47a1'
      }).then(function () {
        history.push(`/corte/editar/${id_corte}/${id_suerte}/${nombre}`)
      }) 
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))  
    }
  }

  const onclick = () => {
    dispatch( ocultarRegistroCosecha() )
  }

  if(loading) return null
  if(error) return null

  const { nombre } = data.obtenerSuerte
  // console.log(nombre);

  return (
    <form onSubmit={submitNuevaCosecha}>
      <h4 className="center"> Registrar Cosecha </h4>

      { alerta ? <p className="error"> {alerta.msg} </p> : null }
      { warning ? <p className="warning"> {warning.msg} </p> : null }

      <div className="input-field">
        <label htmlFor="peso"><span className="red-text font-weight-bold">*</span> Peso </label>
        <input id="peso" placeholder="Peso" type="text" className="validate" name="peso" value={peso} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="rendimiento"> Rendimiento </label>
        <input id="rendimiento" placeholder="Rendimiento" type="text" className="validate" name="rendimiento" value={rendimiento} onChange={actualizarState} />
      </div>
      <div className="center">
        <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
        <button type="button" onClick={ () => onclick() } className="btnlink">Cancelar</button>
      </div>
    </form>
  )
}

export default CosechaRegister

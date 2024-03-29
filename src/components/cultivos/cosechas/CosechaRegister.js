import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import {validarDosis, validarCostoLabor} from '../../../utils/js/validaciones'
import { useNavigate } from 'react-router-dom'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroCosecha } from '../../../utils/redux/actions/cosechaActions'
// Graphql
import {NUEVA_COSECHA_MUTATION} from '../../../apollo/mutations'
import {OBTENER_COSECHAS_POR_CORTE_QUERY, VER_NOMBRE_SUERTE_QUERY, OBTENER_AREA_CORTE_QUERY} from '../../../apollo/querys'
import { useMutation, useQuery } from '@apollo/client'

const CosechaRegister = ({corte, props}) => {
  
  const id_suerte = props
  const {id_corte} = corte 

  // estado del component
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarCosecha ] = useMutation(NUEVA_COSECHA_MUTATION)
  const { loading, error, data } = useQuery(VER_NOMBRE_SUERTE_QUERY, { variables: {id_suerte} })
  
  const { loading:loadingAC, error:errorAC, data:dataAC } = useQuery(OBTENER_AREA_CORTE_QUERY, { variables: {id_corte} })
  
  const [ activo, actualizarActivo ] = useState(true)

  // state del componente
  const [ cosecha, actualizarCosecha ] = useState({
    id_cosecha: '',
    peso: '',
    rendimiento: '',
    numeroVagones: '',
    numeroMulas: '',
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
  const { peso, rendimiento, numeroVagones, numeroMulas  } = cosecha
  const input = {
    peso: Number(peso),
    rendimiento: Number(rendimiento),
    numeroVagones: Number(numeroVagones),
    numeroMulas: Number(numeroMulas),
    corte_id: id_corte
  }

  if(errorAC) return null
  if(loadingAC) return null
  const areaCorte = dataAC.obtenerAreaCorte

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

    if(validarCostoLabor(numeroVagones) === false) {
      mostrarWarning('El número de vagones debe ser numérico. Ej: 5')
      return 
    }

    if(validarCostoLabor(numeroMulas) === false) {
      mostrarWarning('El número de mulas debe ser numérico. Ej: 3')
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

    if(areaCorte === null || areaCorte === 0) {
      Swal.fire({
        title: 'Atención',
        text: 'No puede registrar la cosecha si no ha registrado los tablones del corte.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d47a1',
        allowOutsideClick: false,
        customClass: {
          popup: 'borde-popup-war',
          content: 'contenido-popup-war',
          title: 'title-popup-war'
        }
      })
      return
    }

    actualizarActivo(false)

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

      // reiniciar el form
      actualizarCosecha({
        peso: '',
        rendimiento: '',
        numeroVagones: '',
        numeroMulas: ''
      })

      dispatch( ocultarRegistroCosecha() )

      Swal.fire({
        title: 'Éxito!',
        text: 'La cosecha se registró correctamente! Ahora registre la fecha de corte',
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
        navigate(`/corte/editar/${id_corte}/${id_suerte}/${nombre}`, { state: {id_corte:id_corte, id_suerte:id_suerte, nombre:nombre}})
      }) 
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))
      actualizarActivo(true)
    }
  }

  const onclick = () => {
    dispatch( ocultarRegistroCosecha() )
  }

  if(loading) return null
  if(error) return null

  const { nombre } = data.obtenerSuerte

  return (
    <form onSubmit={submitNuevaCosecha}>
      <h4 className="center"> Registrar Cosecha </h4>

      { alerta ? <p className="error"> {alerta.msg} </p> : null }
      { warning ? <p className="warning"> {warning.msg} </p> : null }

      <div className="input-field">
        <label htmlFor="peso"><span className="red-text fw-bold">*</span> Peso </label>
        <input id="peso" placeholder="Peso" type="text" className="validate" name="peso" value={peso} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="rendimiento"> Rendimiento </label>
        <input id="rendimiento" placeholder="Rendimiento" type="text" className="validate" name="rendimiento" value={rendimiento} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="vagones"> # Vagones </label>
        <input id="vagones" placeholder="# de Vagones" type="text" className="validate" name="numeroVagones" value={numeroVagones} onChange={actualizarState} />
      </div>
      <div className="input-field">
        <label htmlFor="mulas"> # Mulas </label>
        <input id="mulas" placeholder="# de Mulas" type="text" className="validate" name="numeroMulas" value={numeroMulas} onChange={actualizarState} />
      </div>
      <div className="center">
        <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
        <button type="button" onClick={ () => onclick() } className="btnlink">Cancelar</button>
      </div>
    </form>
  )
}

export default CosechaRegister

import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import { validarDosis, validarCostoTratamientos } from '../../../../utils/js/validaciones'
import Swal from 'sweetalert2'
import useTitle from '../../../../utils/context/hooks/useSEO'
// Graphql
import {NUEVO_TRHE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRHE_POR_APHE_QUERY, TOTAL_HERBI_QUERT} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'


const TratamientoHerbicidaRegister = () => {

  useTitle({ title: 'Tratamiento Herbicida' })

  const location = useLocation()
  const id_aphe = location.state.id_aphe
  const id_corte = location.state.id_corte
  const id_suerte = location.state.id_suerte

  // extraer los valores del context
  const navigate = useNavigate()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarTratamientoHerbicida ] = useMutation(NUEVO_TRHE_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  // state del componente
  const [ tratamientoHerbicida, actualizarTratamientoHerbicida ] = useState({
    id_trahe: '',
    producto: '',
    dosis: '',
    presentacion: '',
    valor: '',
    aplico: '',
    nota: '',
    aphe_id: id_aphe
  })

  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarTratamientoHerbicida({
      ...tratamientoHerbicida,
      [e.target.name]: e.target.value
    })
  }

  // extraer valores
  const { producto, dosis, presentacion, valor, aplico, nota } = tratamientoHerbicida
  const input = {
    producto,
    dosis: Number(dosis),
    presentacion,
    valor: Number(valor),
    aplico,
    nota,
    aphe_id: id_aphe
  }

  // submit
  const submitNuevoTratamientoHerbicida = async (e) => {
    e.preventDefault()

    // Campos obligatorios
    if( producto.trim() === '' || 
        dosis.trim() === '' || 
        presentacion.trim() === '') {
          mostrarWarning('Los campos marcados con * son obligatorios.')
      return
    }

    if(dosis <= 0) {
      mostrarWarning('La dosis debe ser mayor a 0.')
      return
    }

    if(validarDosis(dosis) === false) {
      mostrarWarning('La dosis debe ser numérica. Ej: 2 - 2.4')
      return
    }

    if(valor <= 0) {
      mostrarWarning('El valor debe ser mayor a 0.')
      return
    }

    if(validarCostoTratamientos(valor) === false) {
      mostrarWarning('El valor debe ser numérico. Ej: 2000')
      return
    }

    actualizarActivo(false)

    // guardar en la db
    try {
      await agregarTratamientoHerbicida({
        variables: {
          input
        },
        refetchQueries: [
          { query: OBTENER_TRHE_POR_APHE_QUERY, variables: {id_aphe} },
          { query: TOTAL_HERBI_QUERT, variables: {id_aphe} }
        ]
      })

      // reiniciar el form
      actualizarTratamientoHerbicida({
        producto: '',
        dosis: '',
        presentacion: '',
        valor: '',
        aplico: '',
        nota: ''
      })

      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'El tratamiento se registró correctamente!',
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
            text: "Desea registrar más tratamientos?",
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
                navigate(`/corte/detalle/${id_corte}/${id_suerte}`, { state: {id_corte:id_corte, id_suerte:id_suerte}})
            } else {
                actualizarActivo(true)
            }
        })
      })
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))
      actualizarActivo(true)
    }
  }

  const cancelar = () => {
    navigate(`/corte/detalle/${id_corte}/${id_suerte}`, { state: {id_corte:id_corte, id_suerte:id_suerte}})
  }


  return (
    <div className="container-fluid white">
      <div className="row">
        <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
          <div className="row">
            <div className="col-md-7 offset-md-3">
              <form onSubmit={submitNuevoTratamientoHerbicida}>
                <h4 className="center"> Registrar Tratamiento herbicida </h4>

                { alerta ? <p className="error"> {alerta.msg} </p> : null }
                { warning ? <p className="warning"> {warning.msg} </p> : null }                   

                <div className="input-field">
                  <label htmlFor="producto"><span className="red-text fw-bold">*</span> Producto </label>
                  <input id="producto" placeholder="Producto" type="text" className="validate" name="producto" value={producto} onChange={actualizarState} />
                </div>
                <div className="input-field">
                  <label htmlFor="dosis"><span className="red-text fw-bold">*</span> Dosis </label>
                  <input id="dosis" placeholder="Dosis" type="text" className="validate" name="dosis" value={dosis} onChange={actualizarState} />
                  <small className="form-text text-muted center">(Ej: 5 - 20 - 0.34)</small>
                </div>
                <div className="input-field">
                  <label htmlFor="presentacion"><span className="red-text fw-bold">*</span> Presentación </label>
                  <input id="presentacion" placeholder="Presentación" type="text" className="validate" name="presentacion" value={presentacion} onChange={actualizarState} />
                  <small className="form-text text-muted center">(Ej: BTO - KL - LT)</small>
                </div>
                <div className="input-field">
                  <label htmlFor="valor"> Valor </label>
                  <input id="valor" placeholder="Valor" type="text" className="validate" name="valor" value={valor} onChange={actualizarState} />
                </div>
                <div className="input-field">
                  <label htmlFor="realizado_por"> Realizado por </label>
                  <input id="realizado_por" placeholder="Realizado por" type="text" className="validate" name="aplico" value={aplico} onChange={actualizarState} />
                </div>
                <div className="input-field">
                  <label htmlFor="nota"> Nota </label>
                  <input id="nota" placeholder="Nota" type="text" className="validate" name="nota" value={nota} onChange={actualizarState} />
                </div>
                <div className="center">
                  <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
                  <button type="button" onClick={ () => cancelar() } className="btnlink">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default TratamientoHerbicidaRegister

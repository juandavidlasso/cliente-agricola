import React, { useReducer } from 'react'
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'

import {MOSTRAR_ALERTA, 
        OCULTAR_ALERTA, 
        MOSTRAR_WARNING, 
        OCULTAR_WARNING, 
        MOSTRAR_SUCCESS, 
        OCULTAR_SUCCESS,
        SELECCIONAR_SUERTES } from '../../redux/types'

const AlertaState = props => {
  const initialState = {
    alerta: null,
    warning: null,
    success: null,
    suertes: []
  }

  const [ state, dispatch ] = useReducer(alertaReducer, initialState)

  // Alerta
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg
      }
    })

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 2000)
  }

    // Warning
    const mostrarWarning = (msg, categoria) => {
      dispatch({
        type: MOSTRAR_WARNING,
        payload: {
          msg
        }
      })
  
      setTimeout(() => {
        dispatch({
          type: OCULTAR_WARNING
        })
      }, 2000)
    }

      // Success
  const mostrarSuccess = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_SUCCESS,
      payload: {
        msg
      }
    })

    setTimeout(() => {
      dispatch({
        type: OCULTAR_SUCCESS
      })
    }, 2000)
  }

  // Suertes para pluviometro
  const agregarSuerte = suertesSeleccionados => {

    let nuevoState;
    if(state.suertes.length > 0 ) {
        // Tomar del segundo arreglo, una copia para asignarlo al primero
        nuevoState = suertesSeleccionados.map( suerte => {
            const nuevoObjeto = state.suertes.find( suerteState => suerteState.id_suerte === suerte.id_suerte  );
            return {...suerte, ...nuevoObjeto }
        } )
    } else {
        nuevoState = suertesSeleccionados;
    }

    dispatch({
      type: SELECCIONAR_SUERTES,
      payload: nuevoState
    })
  }

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        warning: state.warning,
        success: state.success,
        suertes: state.suertes,
        mostrarAlerta,
        mostrarWarning,
        mostrarSuccess,
        agregarSuerte
      }}
    >
      {props.children}
    </alertaContext.Provider>
  )

}

export default AlertaState

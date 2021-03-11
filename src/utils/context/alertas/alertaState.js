import React, { useReducer } from 'react'
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'

import {MOSTRAR_ALERTA, 
        OCULTAR_ALERTA, 
        MOSTRAR_WARNING, 
        OCULTAR_WARNING, 
        MOSTRAR_SUCCESS, 
        OCULTAR_SUCCESS } from '../../redux/types'

const AlertaState = props => {
  const initialState = {
    alerta: null,
    warning: null,
    success: null,
    totalH: 0,
    totalF: 0
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

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        warning: state.warning,
        success: state.success,
        mostrarAlerta,
        mostrarWarning,
        mostrarSuccess
      }}
    >
      {props.children}
    </alertaContext.Provider>
  )

}

export default AlertaState

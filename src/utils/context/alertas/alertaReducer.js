import {MOSTRAR_ALERTA, 
        OCULTAR_ALERTA,
        MOSTRAR_WARNING,
        OCULTAR_WARNING, 
        MOSTRAR_SUCCESS, 
        OCULTAR_SUCCESS } from '../../redux/types'

export default (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        alerta: action.payload
      }
    case OCULTAR_ALERTA:
      return {
        alerta: null
      }
      case MOSTRAR_WARNING:
      return {
        warning: action.payload
      }
    case OCULTAR_WARNING:
      return {
        warning: null
      }
      case MOSTRAR_SUCCESS:
      return {
        success: action.payload
      }
    case OCULTAR_SUCCESS:
      return {
        success: null
      }
    default:
      return state
  }
}

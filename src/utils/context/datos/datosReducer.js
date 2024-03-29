import {SELECCIONAR_LABORES,
        SELECCIONAR_MES_INICIAL,
        SELECCIONAR_MES_FINAL,
        SELECCIONAR_ANO,
        AGREGAR_TABLONES_STATE } from '../../redux/types'

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
      case SELECCIONAR_LABORES:
        return {
          ...state,
          labores: action.payload
        }
      case SELECCIONAR_MES_INICIAL:
        return {
          ...state,
          mesInicial: action.payload
        }
      case SELECCIONAR_MES_FINAL:
        return {
          ...state,
          mesFinal: action.payload
        }
      case SELECCIONAR_ANO:
        return {
          ...state,
          anoLluvia: action.payload
        }
      case AGREGAR_TABLONES_STATE:
        return {
          ...state,
          arrayTablones: action.payload
        }
      default:
        return state
    }
  }


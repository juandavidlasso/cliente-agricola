import { //AGREGAR_APLICACION_HERBICIDA,
         //AGREGAR_APLICACION_HERBICIDA_EXITO,
         //AGREGAR_APLICACION_HERBICIDA_ERROR,
         MOSTRAR_HERBICIDAS,
         OCULTAR_HERBICIDAS,
         MOSTRAR_REGISTRO_APLICACION_HERBICIDA,
         OCULTAR_REGISTRO_APLICACION_HERBICIDA } from '../types'

const initialState = {
  //aplicacionHerbicidas: [],
  //error: null,
  verHerbicidas: false,
  registroAH: false,
  //loading: false,
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_HERBICIDAS:
      return {
        ...state,
        verHerbicidas: true
      }
    case OCULTAR_HERBICIDAS:
      return {
        ...state,
        verHerbicidas: false
      }
    case MOSTRAR_REGISTRO_APLICACION_HERBICIDA:
      return {
        ...state,
        registroAH: true
      }
    case OCULTAR_REGISTRO_APLICACION_HERBICIDA:
      return {
        ...state,
        registroAH: false
      }
    // case AGREGAR_APLICACION_HERBICIDA:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_APLICACION_HERBICIDA_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     aplicacionHerbicidas: [...state.aplicacionHerbicidas, action.payload]
    //   }
    // case AGREGAR_APLICACION_HERBICIDA_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }


    default:
      return state

  }
}

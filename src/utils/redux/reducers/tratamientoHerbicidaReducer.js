import { //AGREGAR_TRATAMIENTO_HERBICIDA,
         //AGREGAR_TRATAMIENTO_HERBICIDA_EXITO,
         //AGREGAR_TRATAMIENTO_HERBICIDA_ERROR,
         MOSTRAR_REGISTRO_TRATAMIENTO_HERBICIDA,
         OCULTAR_REGISTRO_TRATAMIENTO_HERBICIDA } from '../types'

const initialState = {
  //tratamientoHerbicidas: [],
  //error: null,
  registroTH: null,
  //loading: false,
  //show: null
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_REGISTRO_TRATAMIENTO_HERBICIDA:
      return {
        ...state,
        registroTH: true
      }
    case OCULTAR_REGISTRO_TRATAMIENTO_HERBICIDA:
      return {
        ...state,
        registroTH: false
      }
    // case AGREGAR_TRATAMIENTO_HERBICIDA:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_TRATAMIENTO_HERBICIDA_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     showMeTratamientoHerbicida: false,
    //     tratamientoHerbicidas: [...state.tratamientoHerbicidas, action.payload]
    //   }
    // case AGREGAR_TRATAMIENTO_HERBICIDA_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }


    default:
      return state

  }
}

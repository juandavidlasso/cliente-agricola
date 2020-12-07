import { //AGREGAR_APLICACION_FERTILIZANTE,
         //AGREGAR_APLICACION_FERTILIZANTE_EXITO,
         //AGREGAR_APLICACION_FERTILIZANTE_ERROR,
         MOSTRAR_FERTILIZANTES,
         OCULTAR_FERTILIZANTES,
         MOSTRAR_REGISTRO_APLICACION_FERTILIZANTE,
         OCULTAR_REGISTRO_APLICACION_FERTILIZANTE } from '../types'

const initialState = {
  //aplicacionFertilizantes: [],
  //error: null,
  verFertilizantes: false,
  registroAF: false,
  //loading: false,
}


export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_FERTILIZANTES:
      return {
        ...state,
        verFertilizantes: true
      }
    case OCULTAR_FERTILIZANTES:
      return {
        ...state,
        verFertilizantes: false
      }
    case MOSTRAR_REGISTRO_APLICACION_FERTILIZANTE:
      return {
        ...state,
        registroAF: true
      }
    case OCULTAR_REGISTRO_APLICACION_FERTILIZANTE:
      return {
        ...state,
        registroAF: false
      }
    // case AGREGAR_APLICACION_FERTILIZANTE:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_APLICACION_FERTILIZANTE_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     aplicacionFertilizantes: [...state.aplicacionFertilizantes, action.payload]
    //   }
    // case AGREGAR_APLICACION_FERTILIZANTE_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }


    default:
      return state

  }
}

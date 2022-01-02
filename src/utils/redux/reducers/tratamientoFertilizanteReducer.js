import {  //AGREGAR_TRATAMIENTO_FERTILIZANTE,
         //AGREGAR_TRATAMIENTO_FERTILIZANTE_EXITO,
         //AGREGAR_TRATAMIENTO_FERTILIZANTE_ERROR,
         MOSTRAR_REGISTRO_TRATAMIENTO_FERTILIZANTE,
         OCULTAR_REGISTRO_TRATAMIENTO_FERTILIZANTE } from '../types'


const initialState = {
  //tratamientoFertilizantes: [],
  //error: null,
  registroTF: null,
  //loading: false,
  //showF: null
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_REGISTRO_TRATAMIENTO_FERTILIZANTE:
      return {
        ...state,
        registroTF: true
      }
    case OCULTAR_REGISTRO_TRATAMIENTO_FERTILIZANTE:
      return {
        ...state,
        registroTF: false
      }
    // case AGREGAR_TRATAMIENTO_FERTILIZANTE:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_TRATAMIENTO_FERTILIZANTE_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     showMeTratamientoFertilizante: false,
    //     tratamientoFertilizantes: [...state.tratamientoFertilizantes, action.payload]
    //   }
    // case AGREGAR_TRATAMIENTO_FERTILIZANTE_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }


      default:
        return state

  }
}

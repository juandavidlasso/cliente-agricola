import { //AGREGAR_LABOR,
         //AGREGAR_LABOR_EXITO,
         //AGREGAR_LABOR_ERROR,
         MOSTRAR_LABORES,
         OCULTAR_LABORES,
         MOSTRAR_REGISTRO_LABOR,
         OCULTAR_REGISTRO_LABOR } from '../types'

const initialState = {
  //labores: [],
  //error: null,
  verLabores: false,
  registroLabor: false,
  //loading: false,
}


// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_LABORES:
      return {
        ...state,
        verLabores: true
      }
    case OCULTAR_LABORES:
      return {
        ...state,
        verLabores: false
      }
    case MOSTRAR_REGISTRO_LABOR:
      return {
        ...state,
        registroLabor: true
      }
    case OCULTAR_REGISTRO_LABOR:
      return {
        ...state,
        registroLabor: false
      }
    // case AGREGAR_LABOR:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_LABOR_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     labores: [...state.labores, action.payload]
    //   }
    // case AGREGAR_LABOR_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }


    default:
      return state

  }
}

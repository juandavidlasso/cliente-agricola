import { //AGREGAR_TRATAMIENTO_PLAGA,
         //AGREGAR_TRATAMIENTO_PLAGA_EXITO,
         //AGREGAR_TRATAMIENTO_PLAGA_ERROR,
         MOSTRAR_PLAGAS,
         OCULTAR_PLAGAS,
         MOSTRAR_REGISTRO_PLAGA,
         OCULTAR_REGISTRO_PLAGA,
         VER_PRODUCTOS,
         OCULTAR_PRODUCTOS } from '../types'

const initialState = {
  //tratamientoPlagas: [],
  //error: null,
  //loading: false,
  verPlagas: false,
  registroPlaga: false,
  verProductos: false
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_PLAGAS:
      return {
        ...state,
        verPlagas: true
      }
    case OCULTAR_PLAGAS:
      return {
        ...state,
        verPlagas: false
      }
    case MOSTRAR_REGISTRO_PLAGA:
      return {
        ...state,
        registroPlaga: true
      }
    case OCULTAR_REGISTRO_PLAGA:
      return {
        ...state,
        registroPlaga: false
      }
    case VER_PRODUCTOS:
      return {
        ...state,
        verProductos: true
      }
    case OCULTAR_PRODUCTOS:
      return {
        ...state,
        verProductos: false
      }
    // case AGREGAR_TRATAMIENTO_PLAGA:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_TRATAMIENTO_PLAGA_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     tratamientoPlagas: [...state.tratamientoPlagas, action.payload]
    //   }
    // case AGREGAR_TRATAMIENTO_PLAGA_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }


    default:
      return state

  }
}

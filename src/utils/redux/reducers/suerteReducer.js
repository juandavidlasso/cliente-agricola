import { //AGREGAR_SUERTE,
        //AGREGAR_SUERTE_EXITO,
        //AGREGAR_SUERTE_ERROR,
        //COMENZAR_DESCARGA_SUERTES,
        //DESCARGA_SUERTES_EXITO,
        //DESCARGA_SUERTES_ERROR,
        //OBTENER_SUERTE_VER,
        MOSTRAR_REGISTRO_SUERTE,
        OCULTAR_REGISTRO_SUERTE } from '../types'

// cada reducer tiene su propio state
const initialState = {
  //suertes: [],
  //error: null,
  registroSuerte: false,
  //loading: false,
  //suertever: null
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_REGISTRO_SUERTE:
      return {
        ...state,
        registroSuerte: true
      }
    case OCULTAR_REGISTRO_SUERTE:
      return {
        ...state,
        registroSuerte: false
      }
    // case COMENZAR_DESCARGA_SUERTES:
    // case AGREGAR_SUERTE:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_SUERTE_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     suertes: [...state.suertes, action.payload]
    //   }
    // case AGREGAR_SUERTE_ERROR:
    // case DESCARGA_SUERTES_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }
    // case DESCARGA_SUERTES_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     suertes: action.payload
    //   }
    // case OBTENER_SUERTE_VER:
    //   return {
    //     ...state,
    //     suertever: action.payload
    //   }


    default:
      return state

  }
}

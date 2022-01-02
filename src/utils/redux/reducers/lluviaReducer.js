import { //AGREGAR_LLUVIA,
         //AGREGAR_LLUVIA_EXITO,
         //AGREGAR_LLUVIA_ERROR,
         MOSTRAR_LLUVIAS,
         OCULTAR_LLUVIAS,
         MOSTRAR_REGISTRO_LLUVIA,
         OCULTAR_REGISTRO_LLUVIA } from '../types'

const initialState = {
  //lluvias: [],
  //error: null,
  verLluvias: false,
  registroLluvia: false,
  //loading: false
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_LLUVIAS:
      return {
        ...state,
        verLluvias: true
      }
    case OCULTAR_LLUVIAS:
      return {
        ...state,
        verLluvias: false
      }
    case MOSTRAR_REGISTRO_LLUVIA:
      return {
        ...state,
        registroLluvia: true
      }
    case OCULTAR_REGISTRO_LLUVIA:
      return {
        ...state,
        registroLluvia: false
      }
    // case AGREGAR_LLUVIA:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_LLUVIA_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     showMeRegistroLluvia: false,
    //     lluvias: [...state.lluvias, action.payload]
    //   }
    // case AGREGAR_LLUVIA_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }


    default:
      return state

  }
}

import { MOSTRAR_REGISTRO_TABLON, OCULTAR_REGISTRO_TABLON } from '../types'

// cada reducer tiene su propio state
const initialState = {
//   tablones: [],
//   error: null,
//   loading: false,
  verRegistroTablon: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_REGISTRO_TABLON:
        return {
            ...state,
            verRegistroTablon: true
        }
    case OCULTAR_REGISTRO_TABLON:
        return {
            ...state,
            verRegistroTablon: false
        }
    // case AGREGAR_TABLON:
    //     return {
    //         ...state,
    //         loading: action.payload
    //     }
    // case AGREGAR_TABLON_EXITO:
    //     return {
    //         ...state,
    //         loading: false,
    //         showMeRegistroTablon: false,
    //         tablones: [...state.tablones, action.payload]
    //     }
    // case AGREGAR_TABLON_ERROR:
    //     return {
    //         ...state,
    //         loading: false,
    //         error: action.payload
    //     }


    default:
      return state

  }
}

import { MOSTRAR_CORTES,
         OCULTAR_CORTES,
         // AGREGAR_CORTE,
         // AGREGAR_CORTE_EXITO,
         // AGREGAR_CORTE_ERROR,
         // OBTENER_CORTE_VER,
         // OBTENER_CORTE_EDITAR,
         // CORTE_EDITADO_EXITO,
         // CORTE_EDITADO_ERROR,
         MOSTRAR_REGISTRO_CORTE,
         OCULTAR_REGISTRO_CORTE,
         //AGREGAR_FECHA_CORTE,
         //AGREGAR_FECHA_CORTE_EXITO,
         //AGREGAR_FECHA_CORTE_ERROR,
         //CANCELAR_CORTE_EDITADO
       } from '../types'

const initialState = {
  //cortes: [],
  //error: null,
  registroCorte: false,
  verCortes: false,
  //loading: false,
  //cortever: null,
  //corteeditar: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_CORTES:
      return {
        ...state,
        verCortes: true
      }
    case OCULTAR_CORTES:
    return {
      ...state,
      verCortes: false,
    }
    case MOSTRAR_REGISTRO_CORTE:
      return {
        ...state,
        registroCorte: true
      }
    case OCULTAR_REGISTRO_CORTE:
      return {
        ...state,
        registroCorte: false
      }
    // case AGREGAR_FECHA_CORTE:
    // case AGREGAR_CORTE:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_FECHA_CORTE_EXITO:
    //   return {
    //     ...state,
    //     cortes: [...state.cortes, action.payload]
    //   }
    // case AGREGAR_CORTE_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     showMeCorte: false,
    //     cortes: [...state.cortes, action.payload]
    //   }
    // case AGREGAR_FECHA_CORTE_ERROR:
    // case AGREGAR_CORTE_ERROR:
    // case CORTE_EDITADO_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }
    // case OBTENER_CORTE_VER:
    //   return {
    //     ...state,
    //     cortever: action.payload
    //   }
    // case OBTENER_CORTE_EDITAR:
    //   return {
    //     ...state,
    //     corteeditar: action.payload
    //   }
    // case CORTE_EDITADO_EXITO:
    //   return {
    //     ...state,
    //     corteeditar: null,
    //     cortes: state.cortes.map( corte =>
    //       corte.id_corte === action.payload.id_corte ? corte = action.payload : corte )
    //   }
    // case CANCELAR_CORTE_EDITADO:
    //     return {
    //       ...state,
    //       corteeditar: null
    //     }


    default:
      return state

  }
}

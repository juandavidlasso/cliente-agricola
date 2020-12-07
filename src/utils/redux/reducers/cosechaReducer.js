import { //AGREGAR_COSECHA,
         //AGREGAR_COSECHA_EXITO,
         //AGREGAR_COSECHA_ERROR,
         //OBTENER_COSECHA_EDITAR,
         MOSTRAR_COSECHAS,
         OCULTAR_COSECHAS,
         MOSTRAR_REGISTRO_COSECHA,
         OCULTAR_REGISTRO_COSECHA,
         //COSECHA_EDITADO_EXITO,
         //COSECHA_EDITADO_ERROR,
         //CANCELAR_COSECHA_EDITADO
       } from '../types'

const initialState = {
  //cosechas: [],
  //error: null,
  verCosechas: false,
  registroCosecha: false,
  //loading: false,
  //cosechaeditar: null
}


export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_COSECHAS:
      return {
        ...state,
        verCosechas: true
      }
    case OCULTAR_COSECHAS:
      return {
        ...state,
        verCosechas: false
      }
    case MOSTRAR_REGISTRO_COSECHA:
      return {
        ...state,
        registroCosecha: true
      }
    case OCULTAR_REGISTRO_COSECHA:
      return {
        ...state,
        registroCosecha: false
      }
    // case AGREGAR_COSECHA:
    //   return {
    //     ...state,
    //     loading: action.payload
    //   }
    // case AGREGAR_COSECHA_EXITO:
    //   return {
    //     ...state,
    //     loading: false,
    //     showMeRegistroCosecha: false,
    //     cosechas: [...state.cosechas, action.payload]
    //   }
    // case AGREGAR_COSECHA_ERROR:
    // case COSECHA_EDITADO_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }
    // case OBTENER_COSECHA_EDITAR:
    //   return {
    //     ...state,
    //     cosechaeditar: action.payload
    //   }
    // case COSECHA_EDITADO_EXITO:
    //   return {
    //     ...state,
    //     cosechaeditar: null,
    //     cosechas: state.cosechas.map( cosecha =>
    //       cosecha.id_cosecha === action.payload.id_cosecha ? cosecha = action.payload : cosecha )
    //   }
    // case CANCELAR_COSECHA_EDITADO:
    //   return {
    //     ...state,
    //     cosechaeditar: null
    //   }


    default:
      return state

  }
}

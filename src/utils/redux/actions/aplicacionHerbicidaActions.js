import { //AGREGAR_APLICACION_HERBICIDA,
         //AGREGAR_APLICACION_HERBICIDA_EXITO,
         //AGREGAR_APLICACION_HERBICIDA_ERROR,
         MOSTRAR_HERBICIDAS,
         OCULTAR_HERBICIDAS,
         MOSTRAR_REGISTRO_APLICACION_HERBICIDA,
         OCULTAR_REGISTRO_APLICACION_HERBICIDA } from '../types'

// mostrar AH
export function mostrarHerbicidas() {
  return (dispatch) => {
    dispatch( mostrarshowMeHerbicida() )
  }
}

const mostrarshowMeHerbicida = () => ({
  type: MOSTRAR_HERBICIDAS,
  payload: true
})

// ocultar AH
export function ocultarHerbicidas() {
  return (dispatch) => {
    dispatch( ocultarShowMeHerbicida() )
  }
}

const ocultarShowMeHerbicida = () => ({
  type: OCULTAR_HERBICIDAS,
  payload: false
})

// mostrar registro AH
export function mostrarRegistroAH() {
  return (dispatch) => {
    dispatch( mostrarRAH() )
  }
}

const mostrarRAH = () => ({
  type: MOSTRAR_REGISTRO_APLICACION_HERBICIDA,
  payload: true
})

// ocultar registro AH
export function ocultarRegistroAH() {
  return (dispatch) => {
    dispatch( ocultarRAH() )
  }
}

const ocultarRAH = () => ({
  type: OCULTAR_REGISTRO_APLICACION_HERBICIDA,
  payload: false
})


// crear nueva herbicida
// export function crearNuevaAplicacionHerbicidaAction(aplicacionHerbicida) {
//   return (dispatch) => {
//     dispatch( agregarAplicacionHerbicida() )
//
//     try {
//       dispatch( agregarAplicacionHerbicidaExito(aplicacionHerbicida) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'Registro exitoso. Ahora registre los productos!'
//       })
//       console.log(aplicacionHerbicida)
//     } catch (error) {
//       dispatch( agregarAplicacionHerbicidaError(true) )
//
//       // Alerta error
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Hubo un error, intenta de nuevo!'
//       })
//     }
//   }
// }
//
//
// const agregarAplicacionHerbicida = () => ({
//   type: AGREGAR_APLICACION_HERBICIDA,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarAplicacionHerbicidaExito = aplicacionHerbicida => ({
//   type: AGREGAR_APLICACION_HERBICIDA_EXITO,
//   payload: aplicacionHerbicida
// })
//
// // si hubo un error
// const agregarAplicacionHerbicidaError = estado => ({
//   type: AGREGAR_APLICACION_HERBICIDA_ERROR,
//   payload: estado
// })

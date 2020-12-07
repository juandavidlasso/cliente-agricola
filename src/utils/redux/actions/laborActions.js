import { //AGREGAR_LABOR,
         //AGREGAR_LABOR_EXITO,
         //AGREGAR_LABOR_ERROR,
         MOSTRAR_LABORES,
         OCULTAR_LABORES,
         MOSTRAR_REGISTRO_LABOR,
         OCULTAR_REGISTRO_LABOR } from '../types'

// mostrar labores
export function mostrarLabores() {
  return (dispatch) => {
    dispatch( mostrarshowMeLabor() )
  }
}

const mostrarshowMeLabor = () => ({
  type: MOSTRAR_LABORES,
  payload: true
})

// ocultar labores
export function ocultarLabores() {
  return (dispatch) => {
    dispatch( ocultarShowMeLabor() )
  }
}

const ocultarShowMeLabor = () => ({
  type: OCULTAR_LABORES,
  payload: false
})

// mostrar registro labor
export function mostrarRegistroLabor() {
  return (dispatch) => {
    dispatch( mostrarShowMeRegistroLabor() )
  }
}

const mostrarShowMeRegistroLabor = () => ({
  type: MOSTRAR_REGISTRO_LABOR,
  payload: true
})

// ocultar registro labor
export function ocultarRegistroLabor() {
  return (dispatch) => {
    dispatch( ocultarShowMeRegistroLabor() )
  }
}

const ocultarShowMeRegistroLabor = () => ({
  type: OCULTAR_REGISTRO_LABOR,
  payload: false
})


// crear nueva labor
// export function crearNuevaLaborAction(labor) {
//   return (dispatch) => {
//     dispatch( agregarLabor() )
//
//     try {
//       dispatch( agregarLaborExito(labor) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'La labor se agregó correctamente!'
//       })
//       console.log(labor)
//     } catch (error) {
//       dispatch( agregarLaborError(true) )
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
// const agregarLabor = () => ({
//   type: AGREGAR_LABOR,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarLaborExito = labor => ({
//   type: AGREGAR_LABOR_EXITO,
//   payload: labor
// })
//
// // si hubo un error
// const agregarLaborError = estado => ({
//   type: AGREGAR_LABOR_ERROR,
//   payload: estado
// })

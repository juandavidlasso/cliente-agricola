import { //AGREGAR_TRATAMIENTO_PLAGA,
         //AGREGAR_TRATAMIENTO_PLAGA_EXITO,
         //AGREGAR_TRATAMIENTO_PLAGA_ERROR,
         MOSTRAR_PLAGAS,
         OCULTAR_PLAGAS,
         MOSTRAR_REGISTRO_PLAGA,
         OCULTAR_REGISTRO_PLAGA,
         VER_PRODUCTOS,
         OCULTAR_PRODUCTOS } from '../types'

// mostrar plagas
export function mostrarPlagas() {
  return (dispatch) => {
    dispatch( mostrarshowMePlaga() )
  }
}

const mostrarshowMePlaga = () => ({
  type: MOSTRAR_PLAGAS,
  payload: true
})

// ocultar plagas
export function ocultarPlagas() {
  return (dispatch) => {
    dispatch( ocultarShowMePlaga() )
  }
}

const ocultarShowMePlaga = () => ({
  type: OCULTAR_PLAGAS,
  payload: false
})


// mostrar registro plagas
export function mostrarRegistroPlaga() {
  return (dispatch) => {
    dispatch( mostrarShowMeRegistroPlaga() )
  }
}

const mostrarShowMeRegistroPlaga = () => ({
  type: MOSTRAR_REGISTRO_PLAGA,
  payload: true
})

// ocultar registro plagas
export function ocultarRegistroPlaga() {
  return (dispatch) => {
    dispatch( ocultarShowMeRegistroPlaga() )
  }
}

const ocultarShowMeRegistroPlaga = () => ({
  type: OCULTAR_REGISTRO_PLAGA,
  payload: false
})


// mostrar productos
export function mostrarProductos() {
  return (dispatch) => {
    dispatch( mostrarProductosPlagas() )
  }
}

const mostrarProductosPlagas = () => ({
  type: VER_PRODUCTOS,
  payload: true
})

// ocultar productos
export function ocultarProductos() {
  return (dispatch) => {
    dispatch( ocultarProductosPlagas() )
  }
}

const ocultarProductosPlagas = () => ({
  type: OCULTAR_PRODUCTOS,
  payload: false
})

// crear nueva plaga
// export function crearNuevoTratamientoPlagaAction(tratamientoPlaga) {
//   return (dispatch) => {
//     dispatch( agregarTratamientoPlaga() )
//
//     try {
//       dispatch( agregarTratamientoPlagaExito(tratamientoPlaga) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'La aplicación se registro con exito!'
//       })
//       console.log(tratamientoPlaga)
//     } catch (error) {
//       dispatch( agregarTratamientoPlagaError(true) )
//
//     }
//   }
// }
//
//
// const agregarTratamientoPlaga = () => ({
//   type: AGREGAR_TRATAMIENTO_PLAGA,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarTratamientoPlagaExito = tratamientoPlaga => ({
//   type: AGREGAR_TRATAMIENTO_PLAGA_EXITO,
//   payload: tratamientoPlaga
// })
//
// // si hubo un error
// const agregarTratamientoPlagaError = estado => ({
//   type: AGREGAR_TRATAMIENTO_PLAGA_ERROR,
//   payload: estado
// })

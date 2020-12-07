import { MOSTRAR_CORTES,
         OCULTAR_CORTES,
         //AGREGAR_CORTE,
         //AGREGAR_CORTE_EXITO,
         //AGREGAR_CORTE_ERROR,
         // OBTENER_CORTE_VER,
         // OBTENER_CORTE_EDITAR,
         // COMENZAR_EDICION_CORTE,
         // CORTE_EDITADO_EXITO,
         // CORTE_EDITADO_ERROR,
         MOSTRAR_REGISTRO_CORTE,
         OCULTAR_REGISTRO_CORTE,
         // AGREGAR_FECHA_CORTE,
         // AGREGAR_FECHA_CORTE_EXITO,
         // AGREGAR_FECHA_CORTE_ERROR,
         // CANCELAR_CORTE_EDITADO
       } from '../types'

// mostrar cortes
export function mostrarCortes() {
  return (dispatch) => {
    dispatch( mostrarListadoCortes() )
  }
}

const mostrarListadoCortes = () => ({
  type: MOSTRAR_CORTES,
  payload: true
})

// ocultar cortes
export function ocultarCortes() {
  return (dispatch) => {
    dispatch( ocultarListadoCortes() )
  }
}

const ocultarListadoCortes = () => ({
  type: OCULTAR_CORTES,
  payload: false
})

// mostrar registro corte
export function mostrarRegistroCorte() {
  return (dispatch) => {
    dispatch( mostrarCorte() )
  }
}

const mostrarCorte = () => ({
  type: MOSTRAR_REGISTRO_CORTE,
  payload: true
})

// ocultar registro corte
export function ocultarRegistroCorte() {
  return (dispatch) => {
    dispatch( ocultarCorte() )
  }
}

const ocultarCorte = () => ({
  type: OCULTAR_REGISTRO_CORTE,
  payload: false
})

// crear corte con fecha de inicio
// export function crearCorteFechaInicio(nuevoCorte) {
//   return (dispatch) => {
//     dispatch( agregarFechaCorte() )
//
//     try {
//       dispatch( agregarFechaCorteExito(nuevoCorte) )
//       console.log(nuevoCorte)
//     } catch (error) {
//       dispatch( agregarFechaCorteError(true) )
//     }
//   }
// }
//
// const agregarFechaCorte = () => ({
//   type: AGREGAR_FECHA_CORTE,
//   payload: true
// })
//
// const agregarFechaCorteExito = nuevoCorte => ({
//   type: AGREGAR_FECHA_CORTE_EXITO,
//   payload: nuevoCorte
// })
//
// const agregarFechaCorteError = estado => ({
//   type: AGREGAR_FECHA_CORTE_ERROR,
//   payload: estado
// })
//
// // crear nuevo corte
// export function crearNuevoCorteAction(corte) {
//   return (dispatch) => {
//     dispatch( agregarCorte() )
//
//     try {
//       dispatch( agregarCorteExito(corte) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'El corte se agregó correctamente!'
//       })
//       console.log(corte)
//     } catch (error) {
//       dispatch( agregarCorteError(true) )
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
// const agregarCorte = () => ({
//   type: AGREGAR_CORTE,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarCorteExito = corte => ({
//   type: AGREGAR_CORTE_EXITO,
//   payload: corte
// })
//
// // si hubo un error
// const agregarCorteError = estado => ({
//   type: AGREGAR_CORTE_ERROR,
//   payload: estado
// })
//
//
// // colocar corte en visualizacion
// export function obtenerCorteVer(corte) {
//   return (dispatch) => {
//     dispatch( obtenerCorteAction(corte) )
//   }
// }
//
// const obtenerCorteAction = corte => ({
//   type: OBTENER_CORTE_VER,
//   payload: corte
// })
//
// // colocar corte en activo
// export function obtenerCorteEditar(corte) {
//   return (dispatch) => {
//     dispatch( obtenerCorteEditarAction(corte) )
//   }
// }
//
// const obtenerCorteEditarAction = corte => ({
//   type: OBTENER_CORTE_EDITAR,
//   payload: corte
// })
//
//
//
// // editar corte para agregar fecha de corte
// export function editarCorteAction(corte) {
//   return async (dispatch) => {
//     dispatch( editarCorte() )
//
//     try {
//       dispatch( editarCorteExito(corte) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'La fecha de corte se agregó correctamente!'
//       })
//     } catch (error) {
//       dispatch( editarCorteError(true) )
//     }
//   }
// }
//
// const editarCorte = () => ({
//   type: COMENZAR_EDICION_CORTE
// })
//
// const editarCorteExito = corte => ({
//   type: CORTE_EDITADO_EXITO,
//   payload: corte
// })
//
// const editarCorteError = estado => ({
//   type: CORTE_EDITADO_ERROR,
//   payload: estado
// })
//
// // Cancelar el corte a editar fecha de corte
// export function cancelarFechaCorte(corte) {
//   return async (dispatch) => {
//     dispatch(  cancelarCorte() )
//   }
// }
//
// const cancelarCorte = corte => ({
//   type: CANCELAR_CORTE_EDITADO,
//   payload: corte
// })

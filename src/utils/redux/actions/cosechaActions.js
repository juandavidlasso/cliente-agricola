import { //AGREGAR_COSECHA,
         // AGREGAR_COSECHA_EXITO,
         // AGREGAR_COSECHA_ERROR,
         // OBTENER_COSECHA_EDITAR,
         MOSTRAR_COSECHAS,
         OCULTAR_COSECHAS,
         MOSTRAR_REGISTRO_COSECHA,
         OCULTAR_REGISTRO_COSECHA,
         // COMENZAR_EDICION_COSECHA,
         // COSECHA_EDITADO_EXITO,
         // COSECHA_EDITADO_ERROR,
         // CANCELAR_COSECHA_EDITADO
       } from '../types'

// mostrar cosechas
export function mostrarCosechas() {
  return (dispatch) => {
    dispatch( mostrarshowMeCosecha() )
  }
}

const mostrarshowMeCosecha = () => ({
  type: MOSTRAR_COSECHAS,
  payload: true
})

// ocultar cosechas
export function ocultarCosechas() {
  return (dispatch) => {
    dispatch( ocultarShowMeCosecha() )
  }
}

const ocultarShowMeCosecha = () => ({
  type: OCULTAR_COSECHAS,
  payload: false
})

// mostrar registro cosecha
export function mostrarRegistroCosecha() {
  return (dispatch) => {
    dispatch( mostrarRC() )
  }
}

const mostrarRC = () => ({
  type: MOSTRAR_REGISTRO_COSECHA,
  payload: true
})

// ocultar registro cosecha
export function ocultarRegistroCosecha() {
  return (dispatch) => {
    dispatch( ocultarRC() )
  }
}

const ocultarRC = () => ({
  type: OCULTAR_REGISTRO_COSECHA,
  payload: false
})



// crear nueva cosecha
// export function crearNuevaCosechaAction(cosecha) {
//   return (dispatch) => {
//     dispatch( agregarCosecha() )
//
//     try {
//       dispatch( agregarCosechaExito(cosecha) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'La cosecha se agregó correctamente!'
//       })
//       console.log(cosecha)
//     } catch (error) {
//       dispatch( agregarCosechaError(true) )
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
// const agregarCosecha = () => ({
//   type: AGREGAR_COSECHA,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarCosechaExito = cosecha => ({
//   type: AGREGAR_COSECHA_EXITO,
//   payload: cosecha
// })
//
// // si hubo un error
// const agregarCosechaError = estado => ({
//   type: AGREGAR_COSECHA_ERROR,
//   payload: estado
// })
//
//
//
// // colocar cosecha en activo
// export function obtenerCosechaEditar(cosecha) {
//   return (dispatch) => {
//     dispatch( obtenerCosechaEditarAction(cosecha) )
//   }
// }
//
// const obtenerCosechaEditarAction = cosecha => ({
//   type: OBTENER_COSECHA_EDITAR,
//   payload: cosecha
// })
//
//
//
// // editar cosecha para agregar datos
// export function editarCosechaAction(cosecha) {
//   return async (dispatch) => {
//     dispatch( editarCosecha() )
//
//     try {
//       dispatch( editarCosechaExito(cosecha) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'Los datos se editaron correctamente!'
//       })
//     } catch (error) {
//       dispatch( editarCosechaError(true) )
//     }
//   }
// }
//
// const editarCosecha = () => ({
//   type: COMENZAR_EDICION_COSECHA
// })
//
// const editarCosechaExito = cosecha => ({
//   type: COSECHA_EDITADO_EXITO,
//   payload: cosecha
// })
//
// const editarCosechaError = estado => ({
//   type: COSECHA_EDITADO_ERROR,
//   payload: estado
// })
//
// // Cancelar la cosecha a editar
// export function cancelarEdicionCosecha(cosecha) {
//   return async (dispatch) => {
//     dispatch(  cancelarCosecha() )
//   }
// }
//
// const cancelarCosecha = cosecha => ({
//   type: CANCELAR_COSECHA_EDITADO,
//   payload: cosecha
// })

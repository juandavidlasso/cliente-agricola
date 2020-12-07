import { //AGREGAR_LLUVIA,
         //AGREGAR_LLUVIA_EXITO,
         //AGREGAR_LLUVIA_ERROR,
         MOSTRAR_LLUVIAS,
         OCULTAR_LLUVIAS,
         MOSTRAR_REGISTRO_LLUVIA,
         OCULTAR_REGISTRO_LLUVIA } from '../types'

// mostrar lluvias
export function mostrarLluvias() {
  return (dispatch) => {
    dispatch( mostrarshowMeLluvia() )
  }
}

const mostrarshowMeLluvia = () => ({
  type: MOSTRAR_LLUVIAS,
  payload: true
})

// ocultar lluvias
export function ocultarLluvias() {
  return (dispatch) => {
    dispatch( ocultarShowMeLluvia() )
  }
}

const ocultarShowMeLluvia = () => ({
  type: OCULTAR_LLUVIAS,
  payload: false
})

// mostrar registro lluvias
export function mostrarRegistroLluvia() {
  return (dispatch) => {
    dispatch( mostrarRL() )
  }
}

const mostrarRL = () => ({
  type: MOSTRAR_REGISTRO_LLUVIA,
  payload: true
})

// ocultar registro lluvias
export function ocultarRegistroLluvia() {
  return (dispatch) => {
    dispatch( ocultarRL() )
  }
}

const ocultarRL = () => ({
  type: OCULTAR_REGISTRO_LLUVIA,
  payload: false
})


// crear nueva lluvia
// export function crearNuevaLluviaAction(lluvia) {
//   return (dispatch) => {
//     dispatch( agregarLluvia() )
//
//     try {
//       dispatch( agregarLluviaExito(lluvia) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'La lluvia se agregó correctamente!'
//       })
//       console.log(lluvia)
//     } catch (error) {
//       dispatch( agregarLluviaError(true) )
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
// const agregarLluvia = () => ({
//   type: AGREGAR_LLUVIA,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarLluviaExito = lluvia => ({
//   type: AGREGAR_LLUVIA_EXITO,
//   payload: lluvia
// })
//
// // si hubo un error
// const agregarLluviaError = estado => ({
//   type: AGREGAR_LLUVIA_ERROR,
//   payload: estado
// })

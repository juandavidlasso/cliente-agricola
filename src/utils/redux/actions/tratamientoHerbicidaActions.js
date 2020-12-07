import { //AGREGAR_TRATAMIENTO_HERBICIDA,
         //AGREGAR_TRATAMIENTO_HERBICIDA_EXITO,
         //AGREGAR_TRATAMIENTO_HERBICIDA_ERROR,
         MOSTRAR_REGISTRO_TRATAMIENTO_HERBICIDA,
         OCULTAR_REGISTRO_TRATAMIENTO_HERBICIDA } from '../types'

// mostrar registro TH
export function mostrarRegistroTH() {
  return (dispatch) => {
    dispatch( mostrarRTH() )
  }
}

const mostrarRTH = () => ({
  type: MOSTRAR_REGISTRO_TRATAMIENTO_HERBICIDA,
  payload: true
})

// ocultar registro TH
export function ocultarRegistroTH() {
  return (dispatch) => {
    dispatch( ocultarRTH() )
  }
}

const ocultarRTH = () => ({
  type: OCULTAR_REGISTRO_TRATAMIENTO_HERBICIDA,
  payload: true
})


// crear nuevo tratamiento herbicida
// export function crearNuevoTratamientoHerbicidaAction(tratamientoHerbicida) {
//   return (dispatch) => {
//     dispatch( agregarTratamientoHerbicida() )
//
//     try {
//       dispatch( agregarTratamientoHerbicidaExito(tratamientoHerbicida) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'El producto se registro con exito!'
//       })
//       console.log(tratamientoHerbicida)
//     } catch (error) {
//       dispatch( agregarTratamientoHerbicidaError(true) )
//
//     }
//   }
// }
//
//
// const agregarTratamientoHerbicida = () => ({
//   type: AGREGAR_TRATAMIENTO_HERBICIDA,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarTratamientoHerbicidaExito = tratamientoHerbicida => ({
//   type: AGREGAR_TRATAMIENTO_HERBICIDA_EXITO,
//   payload: tratamientoHerbicida
// })
//
// // si hubo un error
// const agregarTratamientoHerbicidaError = estado => ({
//   type: AGREGAR_TRATAMIENTO_HERBICIDA_ERROR,
//   payload: estado
// })

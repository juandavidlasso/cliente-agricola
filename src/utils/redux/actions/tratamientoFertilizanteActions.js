import { //AGREGAR_TRATAMIENTO_FERTILIZANTE,
         //AGREGAR_TRATAMIENTO_FERTILIZANTE_EXITO,
         //AGREGAR_TRATAMIENTO_FERTILIZANTE_ERROR,
         MOSTRAR_REGISTRO_TRATAMIENTO_FERTILIZANTE,
         OCULTAR_REGISTRO_TRATAMIENTO_FERTILIZANTE } from '../types'

// mostrar registro TF
export function mostrarRegistroTF() {
  return (dispatch) => {
    dispatch( mostrarRTF() )
  }
}

const mostrarRTF = () => ({
  type: MOSTRAR_REGISTRO_TRATAMIENTO_FERTILIZANTE,
  payload: true
})

// ocultar registro TF
export function ocultarRegistroTF() {
  return (dispatch) => {
    dispatch( ocultarRTF() )
  }
}

const ocultarRTF = () => ({
  type: OCULTAR_REGISTRO_TRATAMIENTO_FERTILIZANTE,
  payload: true
})


// crear nuevo tratamiento fertilizante
// export function crearNuevoTratamientoFertilizanteAction(tratamientoFertilizante) {
//   return (dispatch) => {
//     dispatch( agregarTratamientoFertilizante() )
//
//     try {
//       dispatch( agregarTratamientoFertilizanteExito(tratamientoFertilizante) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'El producto se registro con exito!'
//       })
//       console.log(tratamientoFertilizante)
//     } catch (error) {
//       dispatch( agregarTratamientoFertilizanteError(true) )
//
//     }
//   }
// }
//
//
// const agregarTratamientoFertilizante = () => ({
//   type: AGREGAR_TRATAMIENTO_FERTILIZANTE,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarTratamientoFertilizanteExito = tratamientoFertilizante => ({
//   type: AGREGAR_TRATAMIENTO_FERTILIZANTE_EXITO,
//   payload: tratamientoFertilizante
// })
//
// // si hubo un error
// const agregarTratamientoFertilizanteError = estado => ({
//   type: AGREGAR_TRATAMIENTO_FERTILIZANTE_ERROR,
//   payload: estado
// })

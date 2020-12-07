import { //AGREGAR_APLICACION_FERTILIZANTE,
         //AGREGAR_APLICACION_FERTILIZANTE_EXITO,
         //AGREGAR_APLICACION_FERTILIZANTE_ERROR,
         MOSTRAR_FERTILIZANTES,
         OCULTAR_FERTILIZANTES,
         MOSTRAR_REGISTRO_APLICACION_FERTILIZANTE,
         OCULTAR_REGISTRO_APLICACION_FERTILIZANTE } from '../types'

// mostrar AF
export function mostrarFertilizantes() {
  return (dispatch) => {
    dispatch( mostrarshowMeFertilizante() )
  }
}

const mostrarshowMeFertilizante = () => ({
  type: MOSTRAR_FERTILIZANTES,
  payload: true
})

// ocultar AF
export function ocultarFertilizantes() {
  return (dispatch) => {
    dispatch( ocultarShowMeFertilizante() )
  }
}

const ocultarShowMeFertilizante = () => ({
  type: OCULTAR_FERTILIZANTES,
  payload: false
})

// mostrar registro AF
export function mostrarRegistroAF() {
  return (dispatch) => {
    dispatch( mostrarRAF() )
  }
}

const mostrarRAF = () => ({
  type: MOSTRAR_REGISTRO_APLICACION_FERTILIZANTE,
  payload: true
})

// ocultar registro AF
export function ocultarRegistroAF() {
  return (dispatch) => {
    dispatch( ocultarRAF() )
  }
}

const ocultarRAF = () => ({
  type: OCULTAR_REGISTRO_APLICACION_FERTILIZANTE,
  payload: false
})



// crear nuevo fertilizante
// export function crearNuevaAplicacionFertilizanteAction(aplicacionFertilizante) {
//   return (dispatch) => {
//     dispatch( agregarAplicacionFertilizante() )
//
//     try {
//       dispatch( agregarAplicacionFertilizanteExito(aplicacionFertilizante) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'Registro exitoso. Ahora registre los productos!'
//       })
//       console.log(aplicacionFertilizante)
//     } catch (error) {
//       dispatch( agregarAplicacionFertilizanteError(true) )
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
// const agregarAplicacionFertilizante = () => ({
//   type: AGREGAR_APLICACION_FERTILIZANTE,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarAplicacionFertilizanteExito = aplicacionFertilizante => ({
//   type: AGREGAR_APLICACION_FERTILIZANTE_EXITO,
//   payload: aplicacionFertilizante
// })
//
// // si hubo un error
// const agregarAplicacionFertilizanteError = estado => ({
//   type: AGREGAR_APLICACION_FERTILIZANTE_ERROR,
//   payload: estado
// })

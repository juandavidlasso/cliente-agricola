import { MOSTRAR_REGISTRO_TABLON, OCULTAR_REGISTRO_TABLON } from '../types'

// mostrar form registro
export function mostrarFormRegistroTablon() {
  return (dispatch) => {
    dispatch( mostrarShowMeRegistroTablon() )
  }
}

const mostrarShowMeRegistroTablon = () => ({
  type: MOSTRAR_REGISTRO_TABLON,
  payload: true
})

// ocultar form registro
export function ocultarFormRegistroTablon() {
  return (dispatch) => {
    dispatch( ocultarShowMeRegistroTablon() )
  }
}

const ocultarShowMeRegistroTablon = () => ({
  type: OCULTAR_REGISTRO_TABLON,
  payload: false
})


// crear nuevo tablon
// export function crearNuevoTablonAction(tablon) {
//   return (dispatch) => {
//     dispatch( agregarTablon() )

//     try {
//       dispatch( agregarTablonExito(tablon) )

//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'El tablón se agregó correctamente!'
//       })
//       console.log(tablon)
//     } catch (error) {
//       dispatch( agregarTablonError(true) )

//       // Alerta error
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Hubo un error, intenta de nuevo!'
//       })
//     }
//   }
// }

// const agregarTablon = () => ({
//   type: AGREGAR_TABLON,
//   payload: true
// })

// // si se guarda en la base de datos
// const agregarTablonExito = tablon => ({
//   type: AGREGAR_TABLON_EXITO,
//   payload: tablon
// })

// // si hubo un error
// const agregarTablonError = estado => ({
//   type: AGREGAR_TABLON_ERROR,
//   payload: estado
// })

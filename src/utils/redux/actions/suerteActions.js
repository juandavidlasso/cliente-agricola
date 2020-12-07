import { //AGREGAR_SUERTE,
        //AGREGAR_SUERTE_EXITO,
        //AGREGAR_SUERTE_ERROR,
        //COMENZAR_DESCARGA_SUERTES,
        //DESCARGA_SUERTES_EXITO,
        //DESCARGA_SUERTES_ERROR,
        //OBTENER_SUERTE_VER,
        MOSTRAR_REGISTRO_SUERTE,
        OCULTAR_REGISTRO_SUERTE} from '../types'

// mostrar registro suerte
export function mostrarRegistroSuerte() {
  return (dispatch) => {
    dispatch( mostrarshowMeSuerte() )
  }
}

const mostrarshowMeSuerte = () => ({
  type: MOSTRAR_REGISTRO_SUERTE,
  payload: true
})

// ocultar registro suerte
export function ocultarRegistroSuerte() {
  return (dispatch) => {
    dispatch( ocultarShowMeSuerte() )
  }
}

const ocultarShowMeSuerte = () => ({
  type: OCULTAR_REGISTRO_SUERTE,
  payload: false
})

// crear nueva suerte
// export function crearNuevaSuerteAction(suerte) {
//   return (dispatch) => {
//     dispatch( agregarSuerte() )
//
//     try {
//       dispatch( agregarSuerteExito(suerte) )
//
//       // Alerta
//       Swal.fire({
//         icon: 'success',
//         title: 'Correcto',
//         text: 'La suerte se agregó correctamente!'
//       })
//       console.log(suerte)
//     } catch (error) {
//       dispatch( agregarSuerteError(true) )
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
// const agregarSuerte = () => ({
//   type: AGREGAR_SUERTE,
//   payload: true
// })
//
// // si se guarda en la base de datos
// const agregarSuerteExito = suerte => ({
//   type: AGREGAR_SUERTE_EXITO,
//   payload: suerte
// })
//
// // si hubo un error
// const agregarSuerteError = estado => ({
//   type: AGREGAR_SUERTE_ERROR,
//   payload: estado
// })
//
//
// // Funcion que descarga los productos de la db
// export const obtenerSuertesAction = (client) => {
//   return async (dispatch) => {
//     dispatch( descargarSuertes() )
//
//     try {
//       aqui va la consulta a la db
//       const respuesta = await clienteAxios.get('/suertes')
//       dispatch( descargaSuertesExitosa(respuesta.data) )
//     } catch (error) {
//       console.log(error)
//       dispatch( descargaSuertesError() )
//     }
//   }
// }
//
// const descargarSuertes = () => ({
//   type: COMENZAR_DESCARGA_SUERTES,
//   payload: true
// })
//
// const descargaSuertesExitosa = suertes => ({
//   type: DESCARGA_SUERTES_EXITO,
//   payload: suertes
// })
//
// const descargaSuertesError = () => ({
//   type: DESCARGA_SUERTES_ERROR,
//   payload: true
// })
//
//
// // colocar suerte en visualizacion
// export function obtenerSuerteVer(suerte) {
//   return (dispatch) => {
//     dispatch( obtenerSuerteAction(suerte) )
//   }
// }
//
// const obtenerSuerteAction = suerte => ({
//   type: OBTENER_SUERTE_VER,
//   payload: suerte
// })

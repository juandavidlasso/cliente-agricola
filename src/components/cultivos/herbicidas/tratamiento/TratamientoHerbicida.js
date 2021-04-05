import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
// GraphQL
import {ELIMINAR_TRAHE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRHE_POR_APHE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const TratamientoHerbicida = ({therbicidas, props, corte, aherbicidas, estado}) => {
  
  const id_aphe = aherbicidas
  const id_corte = corte
  const id_suerte = props
  const {id_trahe, producto, dosis, presentacion, valor, aplico, nota} = therbicidas
  const rol = sessionStorage.getItem('rol')
  // mutation
  const [ eliminarTrahe ] = useMutation(ELIMINAR_TRAHE_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  // submit eliminar tratamiento herbicida
  const submitEliminarTrahe = async() => {
    Swal.fire({
      title: 'Atención',
      text: "Esta acción no se puede deshacer. Desea eliminar el tratamiento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      confirmButtonColor: '#1b5e20',
      cancelButtonText: 'No, Cancelar',
      cancelButtonColor: '#b71c1c',
      allowOutsideClick: false,
      customClass: {
        popup: 'borde-popup-war',
        content: 'contenido-popup-war',
        title: 'title-popup-war'
      }
    }).then( async (result) => {
      if (result.value) {
        try {
          await eliminarTrahe({
            variables: {
              id_trahe
            },
            refetchQueries: [{
              query: OBTENER_TRHE_POR_APHE_QUERY, variables: {id_aphe}
            }]
          })
          
          actualizarActivo(false)

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El tratamiento se eliminó correctamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d47a1',
            allowOutsideClick: false,
            customClass: {
              popup: 'borde-popup',
              content: 'contenido-popup',
              title: 'title-popup'
            }
          })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: (error.message.replace('GraphQL error: ', '')),
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d47a1',
            allowOutsideClick: false,
            customClass: {
              popup: 'borde-popup',
              content: 'contenido-popup',
              title: 'title-popup'
            }
          }) 
        }
      } else {
        actualizarActivo(true)
      }
    })
  }

  return (
    <tr key={id_trahe}>
      <th scope="row">{producto}</th>
      <td>{dosis}</td>
      <td>{presentacion}</td>
      <td> $ {valor}</td>
      <td>{aplico}</td>
      <td>{nota}</td>
      {rol === '1' ? estado === true ?
        <Fragment>
          <td>
            <Link to={`/herbicida-tratamiento/editar/${id_aphe}/${id_trahe}/${id_corte}/${id_suerte}`} className="btneditth mb-2">Editar</Link>
            <br />
            <button className="btnelitth" onClick={() => submitEliminarTrahe()} disabled={!activo}>Eliminar</button>
          </td>
        </Fragment>
      :
        null
      :
        null
      }
    </tr>
  )
}

export default TratamientoHerbicida

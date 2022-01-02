import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
// GraphQL
import {ELIMINAR_TRAFE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRFE_POR_APFE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const TratamientoFertilizante = ({tfertilizantes, afertilizantes, props, corte, estado}) => {

  const id_apfe = afertilizantes
  const id_corte = corte
  const id_suerte = props
  const { id_trafe, producto, dosis, presentacion, valor, aplico, nota } = tfertilizantes
  const rol = sessionStorage.getItem('rol')
  // mutation
  const [ eliminarTrafe ] = useMutation(ELIMINAR_TRAFE_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)  

  // submit eliminar tratamiento fertilizante
  const submitEliminarTrafe = async() => {
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
          await eliminarTrafe({
            variables: {
              id_trafe
            },
            refetchQueries: [{
              query: OBTENER_TRFE_POR_APFE_QUERY, variables: {id_apfe}
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
    <tr key={id_trafe}>
      <th scope="row">{producto}</th>
      <td>{dosis}</td>
      <td>{presentacion}</td>
      <td> $ {valor}</td>
      <td>{aplico}</td>
      <td>{nota}</td>
      {rol === '1' ? estado === true ?
        <Fragment>
          <td>
            <Link
              to={`/fertilizante-tratamiento/editar/${id_apfe}/${id_trafe}/${id_corte}/${id_suerte}`}
              state={{ id_apfe:id_apfe, id_trafe:id_trafe, id_corte:id_corte, id_suerte:id_suerte }}
              className="btneditth mb-2"
            >
              Editar
            </Link>
            <br />
            <button type='button' className="btnelitth" onClick={() => submitEliminarTrafe()} disabled={!activo}>Eliminar</button>
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

export default TratamientoFertilizante

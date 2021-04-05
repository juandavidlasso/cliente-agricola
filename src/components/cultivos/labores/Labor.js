import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'
// GraphQL
import {ELIMINAR_LABOR_MUTATION} from '../../../apollo/mutations'
import {OBTENER_LABORES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Labor = ({labor, props, corte, estadoCorte, fecha_inicio, setUserId4Actions, setShowEdit}) => {

  const id_corte = corte
  const id_suerte = props
  const {id_labor, fecha, actividad, equipo, estado, pases, aplico, costo, nota} = labor
  const rol = sessionStorage.getItem('rol')
  // mutation
  const [ eliminarLabor ] = useMutation(ELIMINAR_LABOR_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  // Enviar objeto al modal
  const editProduct = (id) => {
    setShowEdit(true)
    setUserId4Actions(labor)
  };

  // submit eliminar labor
  const submitEliminarLabor = async() => {
    Swal.fire({
      title: 'Atención',
      text: "Esta acción no se puede deshacer. Desea eliminar la labor?",
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
          await eliminarLabor({
            variables: {
              id_labor
            },
            refetchQueries: [{
              query: OBTENER_LABORES_POR_CORTE_QUERY, variables: {id_corte}
            }]
          })
          
          actualizarActivo(false)

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La labor se eliminó correctamente.',
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
    <tr key={id_labor}>
      <th scope="row">{moment(fecha).format('DD-MM-YYYY')}</th>
      <td>{actividad}</td>
      <td>{equipo}</td>
      <td>{estado}</td>
      <td>{pases}</td>
      <td>{aplico}</td>
      <td> {costo ? (<p>$ {costo}</p>) : null}</td>
      <td><div className="wrap">{nota}</div></td>
      {rol === '1' ? estadoCorte === true ?
        <Fragment>
          <td>
            <Link to={{
              pathname: `/labor/editar/${id_labor}/${id_corte}/${id_suerte}`,
              state: {fecha_inicio:fecha_inicio}
            }} className="mb-2 btnlabor">Editar</Link>
            <button type="button" className="btnlabor1" onClick={() => submitEliminarLabor()} disabled={!activo}>Eliminar</button>
          </td>
          <td>
            <Link to="#" className="red-text" onClick={() => editProduct(id_labor)}>Desea utilizar esta información en otra suerte?</Link>
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

export default Labor

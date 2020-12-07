import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import moment from 'moment'
// GraphQL
import {CERRAR_CICLO_CORTE_MUTATION} from '../../../apollo/mutations'
import {OBTENER_CORTES_POR_SUERTE_QUERY, OBTENER_CORTES_RENOVADOS_QUERY, VER_CORTE_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Corte = ({corte, props, nombreSuerte}) => {  

  // cerrar ciclo
  const [ terminarCorte ] = useMutation(CERRAR_CICLO_CORTE_MUTATION)
  
  const id_suerte = props
  const nombre = nombreSuerte
  const {id_corte, numero, fecha_siembra, fecha_inicio, fecha_corte, activo, estado, suerte_id} = corte
  
  const input = {
    id_corte,
    numero,
    fecha_siembra, 
    fecha_inicio,
    fecha_corte,
    activo,
    estado,
    suerte_id
  }
  const rol = sessionStorage.getItem('rol')

  const cerrarCiclo = () => {
    Swal.fire({
      title: 'Desea cerrar el ciclo?',
      text: "Si termina, no podrá registrar más datos en este corte.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d47a1',
      cancelButtonColor: '#b71c1c',
      cancelButtonText:'No, Cancelar',
      confirmButtonText: 'Si, Terminar'
    }).then( async(result) => {
      if (result.value) {
        try {
          await terminarCorte({
            variables: {
              id_corte,
              input: {
                id_corte,
                numero,
                fecha_siembra, 
                fecha_inicio,
                fecha_corte,
                activo,
                estado: false,
                suerte_id
              }
            },
            refetchQueries: [
              {query: OBTENER_CORTES_POR_SUERTE_QUERY, variables: {id_suerte} },
              {query: OBTENER_CORTES_RENOVADOS_QUERY, variables: {nombre} },
              {query:VER_CORTE_QUERY, variables: {id_corte} }
            ]
          })
          // console.log(data);
          Swal.fire({
            title: 'Éxito!',
            text: 'El corte se cerró correctamente!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d47a1'
          })
        } catch (error) {
          return null
        }
      }
    })
  }

  const actualizarCheck = () => {
    return null
  }

  return (
    <tr key={id_corte}>
      <th scope="row" className={id_suerte === suerte_id ? fecha_corte ? 'red lighten-4' : 'green lighten-4' : 'blue-grey lighten-4'}>
        <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} className="black-text"> <u className="chover">Corte {numero}</u></Link>
      </th>
      <td>{moment(fecha_siembra).format('DD-MM-YYYY')}</td>
      <td>{moment(fecha_inicio).format('DD-MM-YYYY')}</td>
      <td>{fecha_corte ? moment(fecha_corte).format('DD-MM-YYYY') : null}</td>
      {rol === '1' ? fecha_corte ?
        <Fragment>
          <td>{id_suerte === suerte_id ? 'Cosechado' : 'Renovado'}</td>
          <td>
            <p>
              <label>
                <input type="checkbox" onClick={() => cerrarCiclo()} checked={!estado} disabled={!estado} onChange={actualizarCheck} />
                <span>{ estado === true ? 'Terminar' : 'Terminado'}</span>
              </label>
            </p>
          </td>
          {/* <td> </td>
          <td> </td>
          <td></td> */}
        </Fragment>
      :
        <Fragment>
          <td> <Link  to={`/corte/detalle/${id_corte}/${id_suerte}`} className="red-text"> Registrar información </Link> </td>
          {/* <td> <Link to={`/corte/editar/datos/${id_corte}/${id_suerte}/${nombre}`} className="red-text"> Editar </Link> </td> */}
        </Fragment>
      :
        null
      }
    </tr>
  )
}



export default Corte

import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const TratamientoHerbicida = ({therbicidas, props, corte, aherbicidas, estado}) => {
  
  const id_aphe = aherbicidas
  const id_corte = corte
  const id_suerte = props
  const {id_trahe, producto, dosis, presentacion, valor, aplico, nota} = therbicidas
  const rol = sessionStorage.getItem('rol')

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
            <Link to={`/herbicida-tratamiento/editar/${id_aphe}/${id_trahe}/${id_corte}/${id_suerte}`} className="red-text">Editar</Link>
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

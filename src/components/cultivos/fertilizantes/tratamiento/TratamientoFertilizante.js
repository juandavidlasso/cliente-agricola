import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const TratamientoFertilizante = ({tfertilizantes, afertilizantes, props, corte, estado}) => {

  const id_apfe = afertilizantes
  const id_corte = corte
  const id_suerte = props
  const { id_trafe, producto, dosis, presentacion, valor, aplico, nota } = tfertilizantes
  const rol = sessionStorage.getItem('rol')

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
            <Link to={`/fertilizante-tratamiento/editar/${id_apfe}/${id_trafe}/${id_corte}/${id_suerte}`} className="red-text">Editar</Link>
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

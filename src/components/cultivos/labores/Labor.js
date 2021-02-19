import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Labor = ({labor, props, corte, estadoCorte, fecha_inicio, setUserId4Actions, setShowEdit}) => {

  const id_corte = corte
  const id_suerte = props
  const {id_labor, fecha, actividad, equipo, estado, pases, aplico, costo, nota} = labor
  const rol = sessionStorage.getItem('rol')

  // Enviar objeto al modal
  const editProduct = (id) => {
    setShowEdit(true)
    setUserId4Actions(labor)
  };
  

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
            }} className="red-text">Editar</Link>
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

import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Suerte = ({suerte}) => {

  const {id_suerte, nombre} = suerte

  return (
    <Fragment key={id_suerte}>
      <Link to={`/suerte/detalle/${id_suerte}`} state={{ id_suerte:id_suerte}} className="btnlink2"><i className="material-icons left">spa</i> {nombre} </Link>
    </Fragment>
  )
}


export default Suerte

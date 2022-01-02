import React, { Fragment } from 'react'
import Corte from './Corte'
import CorteRegister from './CorteRegister'
import Spinner from '../../Spinner'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroCorte } from '../../../utils/redux/actions/corteActions'
// GraphQL
import {OBTENER_CORTES_RENOVADOS_QUERY, OBTENER_CORTES_POR_SUERTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListCortes = ({suerte}) => {

  const {id_suerte, nombre} = suerte

  // query hook
  const { data, loading, error } = useQuery(OBTENER_CORTES_RENOVADOS_QUERY, { variables: {nombre} })
  
  const { data:dataCortes, loading:loadingCortes, error:errorCortes } = useQuery(OBTENER_CORTES_POR_SUERTE_QUERY, { variables: {id_suerte} })

  // mostrar form
  const registroCorte = useSelector( state => state.cortes.registroCorte)

  const dispatch = useDispatch()


  const onclick = () => {
    dispatch( mostrarRegistroCorte() )
  }

  if(loading) return <Spinner />
  if(error) return null
  const rol = sessionStorage.getItem('rol')

  if(loadingCortes) return null
  if(errorCortes) return null


  return (
    <Fragment>
    <br />
    {rol === '1' ? dataCortes.obtenerCortesPorSuerte === 0 ?
      <span><button type='button' onClick={() => onclick() } className="btn-floating pulse red darken-4"><i className="material-icons">add</i></button> <span className="black-text fw-bold"> Registrar corte </span></span>
    : 
      null
    :
      null
    }

    {data.obtenerCortesRenovados.length === 0 ? ' No hay cortes' : (
      <table className="table responsive-table centered table-bordered table-hover title">
        <thead className="text-white" style={{backgroundColor: "#37474f"}}>
          <tr>
            <th scope="col"> Nombre </th>
            <th scope="col"> Fecha de siembra </th>
            <th scope="col"> Fecha de inicio </th>
            <th scope="col"> Fecha de corte </th>
            {rol === '1' ?
              <Fragment>
                <th scope="col"> Registrar información </th>
                <th scope="col"> Terminar </th>
              </Fragment>
            :
              null
            }
          </tr>
        </thead>

        <tbody className="white">
          {data.obtenerCortesRenovados.map(corte => (
            <Corte key={corte.id_corte} corte={corte} props={id_suerte} nombreSuerte={nombre} />
          ))}
        </tbody>
      </table>
    )}
 
    <div className="row">
      <div className="col-12">
        { registroCorte ?
          <div className="card-panel white z-depth-1">
            <div className="row valign-wrapper">
              <div className="col s12">
                <CorteRegister suerte={suerte} />
              </div>
            </div>
          </div>
        : null }
      </div>
    </div>

    </Fragment>
  )
}

export default ListCortes

import React from 'react'
import Cosecha from './Cosecha'
import CosechaRegister from './CosechaRegister'
import Spinner from '../../Spinner'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroCosecha, ocultarCosechas } from '../../../utils/redux/actions/cosechaActions'
// GraphQL
import {OBTENER_COSECHAS_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListCosechas = ({corte, props, estado}) => {

  const {id_corte} = corte

  // query hook
  const { data, loading, error } = useQuery(OBTENER_COSECHAS_POR_CORTE_QUERY, { variables: {id_corte} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  // obtener el state
  const registroCosecha = useSelector( state => state.cosechas.registroCosecha)

  const dispatch = useDispatch()

  const registro = () => {
    dispatch( mostrarRegistroCosecha() )
  }

  const cerrar = () => {
    dispatch( ocultarCosechas() )
  }

  if(loading) return <Spinner />
  if(error) return null  
  const rol = sessionStorage.getItem('rol')

  return (
    <div className="card-panel z-depth-1 m-0 p-2 title">

      {/* <div className="col s12">
        <a href="#!" onClick={ () => cerrar() } className="right black-text"><i className="material-icons">close</i></a>
      </div> */}

      <div className="row valign-wrapper">
        <div className="col-12">
          <h1 className="center"> Cosechas </h1>
          <div className="row">
          { registroCosecha ?
              <div className="col s12">
                <div className="card-panel pb-0">
                  <CosechaRegister corte={corte} props={props} />
                </div>
              </div>
          : null }
          </div>

          {rol === '1' ? data.obtenerCosechaPorCorte.length === 0 ?
              <span><button type="button" onClick={ () => registro() } className="btn btn-danger"><i className="material-icons left">add_circle</i> Registrar cosecha </button></span>
          : 
            null
          :
            null
          }

          {data.obtenerCosechaPorCorte.length === 0 ? ' No hay cosecha registrada.' : (
          <table className="table responsive-table centered table-striped table-bordered">
            <thead className="text-white" style={{backgroundColor: "#283747"}}>
              <tr>
                <th scope="col"> Peso Neto - Tn </th>
                <th scope="col"> TCH </th>
                <th scope="col"> TCHM </th>
                <th scope="col"> % - Rdo </th>
                {rol === '1' ? estado === true ?
                  <th scope="col"> Editar </th>
                :
                  null
                :
                  null
                }
              </tr>
            </thead>

            <tbody className="white">
            {data.obtenerCosechaPorCorte.map(cosecha => (
              <Cosecha key={cosecha.id_cosecha} cosecha={cosecha} corte={corte} estado={estado} props={props} />
            ))}
            </tbody>
          </table>
          )}
        </div>
        <div className="col-12">
            <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
          </div>
      </div>
    </div>
  )
}

export default ListCosechas

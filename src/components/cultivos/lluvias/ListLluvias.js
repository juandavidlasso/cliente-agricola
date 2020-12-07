import React, { useEffect } from 'react'
import PluviometroRegister from './PluviometroRegister'
import Pluviometro from './Pluviometro'
import Spinner from '../../Spinner'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroLluvia, ocultarLluvias } from '../../../utils/redux/actions/lluviaActions'
// GraphQL
import {OBTENER_PLUVIOMETROS_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListLluvias = ({corte, props, estado}) => {

  // estado del componente
  const { data, loading, error } = useQuery(OBTENER_PLUVIOMETROS_QUERY)
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  useEffect(() => {
    const M = window.M
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, [])

  // obtener el state
  const registroLluvia = useSelector( state => state.lluvias.registroLluvia)

  const dispatch = useDispatch()

  const registro = () => {
    dispatch( mostrarRegistroLluvia() )
  }

  const cerrar = () => {
    dispatch( ocultarLluvias() )
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
        <div className="col-12 ">
          <h1 className="center"> Lluvias </h1>
          <div className="row">
          { registroLluvia ?
            <div className="col s12">
              <div className="card-panel">
                <PluviometroRegister />
              </div>
            </div>
          : null }
          </div>

          {rol === '1' ? estado === true ?
              <span><button type="button" onClick={ () => registro() } className="btn btn-danger"><i className="material-icons left">add_circle</i>Registrar pluviómetros</button></span>
          :
            null
          :
            null
          }

          {data.obtenerPluviometrosYLluvias.length === 0 ? ' No hay pluviómetros registrados.' : (
            <ul className="collapsible">
              {data.obtenerPluviometrosYLluvias.map(pluviometro => (
                <Pluviometro key={pluviometro.id_pluviometro} pluviometro={pluviometro} corte={corte} props={props} estado={estado} />
              ))}
            </ul>
          )}
         
        </div>
        <div className="col-12">
            <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
          </div>
      </div>
    </div>
  )
}

export default ListLluvias

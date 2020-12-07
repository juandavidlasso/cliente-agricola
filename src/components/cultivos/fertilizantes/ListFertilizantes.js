import React, { Fragment, useEffect } from 'react'
import AplicacionFertilizante from './aplicacion/AplicacionFertilizante'
import AplicacionFertilizanteRegister from './aplicacion/AplicacionFertilizanteRegister'
import Spinner from '../../Spinner'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroAF, ocultarFertilizantes } from '../../../utils/redux/actions/aplicacionFertilizanteActions'
// GraphQL
import {OBTENER_APFE_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListFertilizantes = ({corte, props, estado}) => {

  const {id_corte, fecha_inicio} = corte 

  // query hook
  const { data, loading, error } = useQuery(OBTENER_APFE_POR_CORTE_QUERY, { variables: {id_corte} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  useEffect(() => {
    const M = window.M
    var elem = document.querySelector('.collapsible.expandable');
    M.Collapsible.init(elem, {
      accordion: false
    })
  }, [])

  // obtener el state
  const registroAF = useSelector( state => state.aplicacionFertilizantes.registroAF)

  const dispatch = useDispatch()

  const registro = () => {
    dispatch( mostrarRegistroAF() )
  }

  const cerrar = () => {
    dispatch( ocultarFertilizantes() )
  }

  if(loading) return <Spinner />
  if(error) return null
  const rol = sessionStorage.getItem('rol')

  return (
    <Fragment>

      <div className="card-panel white z-depth-1 m-0 p-2 title">
        {/* <div className="col s12">
          <a href="#!" onClick={ () => cerrar() } className="right black-text"><i className="material-icons">close</i></a>
        </div> */}
        <div className="row valign-wrapper">
          <div className="col-12">
            <h1 className="center"> Fertilizantes </h1>
            {rol === '1' ? estado === true ?
              <span><a href="#!" onClick={ () => registro() }  className="btn-floating pulse red darken-4 modal-trigger"><i className="material-icons">add</i></a> <span className="black-text font-weight-bold"> Registrar fertilizante </span></span>
            :
              null
            :
              null
            }

            {data.obtenerAPFEPorCorte.length === 0 ? ' No hay fertilizantes registrados.' : (
              <ul className="collapsible expandable">
              {data.obtenerAPFEPorCorte.map(afertilizantes => (
                <AplicacionFertilizante key={afertilizantes.id_apfe} afertilizantes={afertilizantes} props={props} corte={id_corte} estado={estado} fecha_inicio={fecha_inicio} />
              ))}
            </ul>
            )}

          </div>
          <div className="col-12 mt-1">
            <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
          </div>
        </div>
      </div>


    <div className="row">
      <div className="col s12">
        { registroAF ?
        <div className="card-panel white z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s12">
              <AplicacionFertilizanteRegister corte={corte} fecha_inicio={fecha_inicio} />
            </div>
          </div>
        </div>
        : null }
      </div>
    </div>

  </Fragment>
  )
}

export default ListFertilizantes

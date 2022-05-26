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
    <div className='row card-panel p-0'>

      <div className='col-12 p-1'>
        <div className={data.obtenerCosechaPorCorte.length === 0 ? 'col s12 m12 l12 xl12 p-2' : 'col s12 m12 l10 xl10 p-2'}>
          <h1 className='center' style={{fontSize: '2rem'}}> Cosechas </h1>
        </div>
        {data.obtenerCosechaPorCorte.length === 0 ?
          null
        :
          <div className='col s12 m12 l2 xl2 p-2'>
            {/* <button type='button' className='pt-2 pb-2 ps-3 pe-3 btnEnviarInformeCorreo' onClick={ (e) => submitInforme(e)}>Enviar informe</button> */}
          </div>
        }
      </div>

      {rol === '1' ? data.obtenerCosechaPorCorte.length === 0 ?
        <div className='col-12 p-1'>
          <div className='col s12 m12 l12 xl12 p-2'>
            <span><button type="button" onClick={ () => registro() } className="btn btn-danger"><i className="material-icons left">add_circle</i> Registrar cosecha </button></span>
          </div>
        </div>
      :
        null
      :
        null
      }


      { registroCosecha ?
        <div className='col-12 p-1'>
          <div className='col s12 m12 l12 xl12 p-2'>
            <CosechaRegister corte={corte} props={props} />
          </div>
        </div>
      :
        null
      }


      <div className='col-12 p-1'>
        <div className='col s12 m12 l12 xl12 p-1'>
          {data.obtenerCosechaPorCorte.length === 0 ? ' No hay cosecha registrada.' : (
            <table className="table responsive-table centered table-striped table-bordered">
              <thead className="text-white" style={{backgroundColor: "#283747"}}>
                <tr>
                  <th scope="col"> Peso Neto - Tn </th>
                  <th scope="col"> TCH </th>
                  <th scope="col"> TCHM </th>
                  <th scope="col"> % - Rdo </th>
                  <th scope="col"> # Vagones </th>
                  <th scope="col"> # Mulas </th>
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
                <Cosecha
                  key={cosecha.id_cosecha}
                  cosecha={cosecha}
                  corte={corte}
                  estado={estado}
                  props={props}
                />
              ))}
              </tbody>
            </table>
          )}
        </div>
      </div>


      <div className='col-12 p-1'>
        <div className='col s12 m12 l12 xl12 p-2'>
          <button type="button" className="btn white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
        </div>
      </div>

    </div>
  )
}

export default ListCosechas

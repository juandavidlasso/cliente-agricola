import React, { Fragment, useState } from 'react'
import Labor from './Labor'
import LaborRegister from './LaborRegister'
import Spinner from '../../Spinner'
import ModalDatos from './modals/ModalDatos'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroLabor, ocultarLabores } from '../../../utils/redux/actions/laborActions'
// GraphQL
import {OBTENER_LABORES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListLabores = ({corte, props, estado}) => {

  const {id_corte, fecha_inicio, fecha_corte} = corte

  // query hook
  const { data, loading, error } = useQuery(OBTENER_LABORES_POR_CORTE_QUERY, { variables: {id_corte} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  // Modals
  const [showEdit, setShowEdit] = useState(false);
  const [userId4Actions, setUserId4Actions] = useState(0);
  const handleEditClose = () => setShowEdit(false);

  // mostrar form
  const registroLabor = useSelector( state => state.labores.registroLabor)

  const dispatch = useDispatch()

  const registro = () => {
    dispatch( mostrarRegistroLabor() )
  }

  const cerrar = () => {
    dispatch( ocultarLabores() )
  }

  if(loading) return <Spinner />
  if(error) return null
  const rol = sessionStorage.getItem('rol')

  return (
    <Fragment>
      <div className="card-panel white z-depth-1 m-0 p-2 title">
        <div className="row valign-wrapper">
          <div className="col-12">
            <h1 className="center"> Labores Agrícolas </h1>
            {rol === '1' ? estado === true ?
              <span><a href="#!" onClick={ () => registro() }  className="btn-floating pulse red darken-4"><i className="material-icons">add</i></a> <span className="black-text font-weight-bold"> Registrar labor </span></span>
            :
              null
            :
              null
            }

            {data.obtenerLaborPorCorte.length === 0 ? ' No hay labores' : (
              <table className="table responsive-table centered table-striped table-bordered tablalabores" style={{fontSize: "12px"}}>
                <thead className="text-white" style={{backgroundColor: "#283747"}}>
                  <tr>
                    <th scope="col"> Fecha </th>
                    <th scope="col"> Labor </th>
                    <th scope="col"> Equipo </th>
                    <th scope="col"> Estado </th>
                    <th scope="col"> No. de Pases </th>
                    <th scope="col"> Realizado Por </th>
                    <th scope="col"> Costo x Hta </th>
                    <th scope="col"> Nota </th>
                    {rol === '1' ? estado === true ?
                      <th scope="col"> Edición </th>
                    :
                      null
                    :
                      null
                    }
                  </tr>
                </thead>

                <tbody className="white">
                  {data.obtenerLaborPorCorte.map(labor => (
                    <Labor 
                      key={labor.id_labor} 
                      labor={labor} 
                      props={props} 
                      corte={id_corte} 
                      estadoCorte={estado} 
                      fecha_inicio={fecha_inicio}
                      setUserId4Actions={setUserId4Actions}
                      setShowEdit={setShowEdit}
                    />
                  ))}
                </tbody>
              </table>
            )}
          
          </div>
          <div className="col-12 mt-1">
            <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
          </div>
        </div>
      </div>

      <ModalDatos
        show={showEdit}
        labor={userId4Actions}
        onHide={handleEditClose}
      />

      <div className="row">
        <div className="col s12">
          { registroLabor ?
          <div className="card-panel white z-depth-1">
            <div className="row valign-wrapper">
              <div className="col s12">
                <LaborRegister corte={id_corte} fecha_inicio={fecha_inicio} fecha_corte={fecha_corte} />
              </div>
            </div>
          </div>
          : null }
        </div>
      </div>

    </Fragment>
  )
}

export default ListLabores

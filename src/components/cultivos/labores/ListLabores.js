import React, { useState } from 'react'
import Labor from './Labor'
import LaborRegister from './LaborRegister'
import Spinner from '../../Spinner'
import ModalDatos from './modals/ModalDatos'
import { PDFDownloadLink } from '@react-pdf/renderer'
import InformeLabores from './InformeLabores'
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
    <div className='row card-panel p-0'>

      <div className='col-12 p-1'>
        <div className={data.obtenerLaborPorCorte.length === 0 ? 'col s12 m12 l12 xl12 p-2' : 'col s12 m12 l9 xl9 p-2'}>
          <h1 className='center' style={{fontSize: '2rem', paddingLeft: '20%'}}> Labores Agrícolas </h1>
        </div>
        {data.obtenerLaborPorCorte.length === 0 ?
          null
        :
          <div className='col s12 m12 l3 xl3 p-2 center'>
            <PDFDownloadLink
              document={<InformeLabores key={data.obtenerLaborPorCorte.id_labor} data={data} />}
              fileName="Informe Labores"
            >
              {({ loading}) => (loading ?
                <button type='button' className='pt-2 pb-2 ps-3 pe-3 btnEnviarInformeCorreo'>Cargando...</button>
              : 
                <button type='button' className='pt-2 pb-2 ps-3 pe-3 btnEnviarInformeCorreo'>Generar informe</button>
              )}
            </PDFDownloadLink>
          </div>
        }
      </div>

      {rol === '1' ? estado === true ?
        <div className='col-12 p-1'>
          <div className='col s12 m12 l12 xl12 p-2'>
            <span><button type='button' onClick={ () => registro() }  className="btn-floating pulse red darken-4"><i className="material-icons">add</i></button> <span className="black-text fw-bold"> Registrar labor </span></span>
          </div>
        </div>
      :
        null
      :
        null
      }


      { registroLabor ?
        <div className='col-12 p-1'>
          <div className='col s12 m12 l12 xl12 p-2'>
            <LaborRegister corte={id_corte} fecha_inicio={fecha_inicio} fecha_corte={fecha_corte} />
          </div>
        </div>
      :
        null
      }


      <div className='col-12 p-1'>
        <div className='col s12 m12 l12 xl12 p-1'>
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
      </div>

      <div className='col-12 p-1'>
        <div className='col s12 m12 l12 xl12 p-2'>
          <button type="button" className="btn white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
        </div>
      </div>

      <ModalDatos
        show={showEdit}
        labor={userId4Actions}
        onHide={handleEditClose}
      />

    </div>
  )
}

export default ListLabores

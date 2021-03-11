import React, { useEffect, useState } from 'react'
import TratamientoPlagaRegister from './tratamiento/TratamientoPlagaRegister'
import Tablon from '../tablones/Tablon'
import Productos from './productos/Productos'
import Spinner from '../../Spinner'
import ModalDatosPL from './modals/ModalDatosPL'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { ocultarPlagas, mostrarRegistroPlaga, mostrarProductos } from '../../../utils/redux/actions/tratamientoPlagaActions'
// GraphQL
import {OBTENER_TABLONES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListPlagas = ({props, edadActual, corte, estado}) => {  

  const { id_corte } = corte

  useEffect(() => {
    const M = window.M
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
  }, [])
  
  // query hook
  const { data, loading, error } = useQuery(OBTENER_TABLONES_POR_CORTE_QUERY, { variables: {id_corte} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  // Modals
  const [showEdit, setShowEdit] = useState(false);
  const [userId4Actions, setUserId4Actions] = useState(0);
  const [userIdCorte, setUserIdCorte] = useState(0)
  const [fechaICorte, setFechaICorte] = useState('')
  const [fechaFCorte, setFechaFCorte] = useState('')
  const [ date, actualizarDate ] = useState(0)
  const handleEditClose = () => {
    actualizarDate(0)
    setShowEdit(false)
  }
  
  // obtener el state
  const registroPlaga = useSelector(state => state.tratamientoPlagas.registroPlaga)
  const verProductos = useSelector(state => state.tratamientoPlagas.verProductos)

  const dispatch = useDispatch()

  const registro = () => {
    dispatch( mostrarRegistroPlaga() )
  }

  const productos = () => {
    dispatch( mostrarProductos() )
  }

  const cerrar = () => {
    dispatch( ocultarPlagas() )
  }


  if(error) return null
  if(loading) return <Spinner />
  const rol = sessionStorage.getItem('rol')

  return (
    <div className="card-panel white z-depth-1 title" style={{margin: "0px", padding: "5px"}}>
      <div className="row valign-wrapper">
        <div className="col-12">
          <h1 className="center"> Control Plagas y Enfermedades </h1>
          
          <div className="row">
            { registroPlaga ?
                <div className="col s12">
                  <div className="card-panel">
                    <TratamientoPlagaRegister />
                  </div>
                </div>
            : null }
          </div>

          <div className="row">
            { verProductos ?
                <div className="col s12">
                  <div className="card-panel">
                    <Productos 
                      props={props} 
                      corte={corte}
                      setUserId4Actions={setUserId4Actions}
                      setShowEdit={setShowEdit}
                      setUserIdCorte={setUserIdCorte}
                      setFechaICorte={setFechaICorte}
                      setFechaFCorte={setFechaFCorte}
                    />
                  </div>
                </div>
            : null }
          </div>

          {rol === '1' ? estado === true ?
            <button type="button" onClick={ () => registro() } className="btn btn-primary btn-sm mr-2">+ Agregar Producto</button>
          :
            null
          :
              null
          }
          <button type="button" onClick={ () => productos() } className="btn btn-success btn-sm">Registrar Productos</button>
          

          {data.obtenerTablonesPorCorte.length === 0 ? ' No hay tablones' : (
            <ul className="collapsible">
              {data.obtenerTablonesPorCorte.map(tablon => (
                <Tablon 
                  key={tablon.id_tablon} 
                  tablon={tablon} 
                  edadActual={edadActual} 
                  props={props}
                  corte={corte}
                  estado={estado}
                />
              ))}
            </ul>
          )}
        </div>

        <ModalDatosPL
          show={showEdit}
          trapl={userId4Actions}
          useidcorte={userIdCorte}
          fechaicorte={fechaICorte}
          fechafcorte={fechaFCorte}
          onHide={handleEditClose}
          date={date}
          actualizardate={actualizarDate}
        />

        <div className="col-12 mt-1">
          <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default ListPlagas

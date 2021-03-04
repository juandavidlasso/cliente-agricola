import React, { Fragment, useState } from 'react'
import AplicacionHerbicidaRegister from './aplicacion/AplicacionHerbicidaRegister'
import AplicacionHerbicida from './aplicacion/AplicacionHerbicida'
import Spinner from '../../Spinner'
import ModalDatosH from './aplicacion/modalsAH/ModalDatosH'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroAH, ocultarHerbicidas } from '../../../utils/redux/actions/aplicacionHerbicidaActions'
// GraphQL
import {OBTENER_APHE_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListHerbicidas = ({corte, props, estado}) => {

  const {id_corte, fecha_inicio, fecha_corte} = corte 

  // query hook
  const { data, loading, error } = useQuery(OBTENER_APHE_POR_CORTE_QUERY, { variables: {id_corte} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  // Modals Aplicacion Herbicida
  const [showEdit, setShowEdit] = useState(false);
  const [userId4Actions, setUserId4Actions] = useState(0);
  const [arregloTratamientos, setArregloTratamientos] = useState(0);
  const handleEditClose = () => setShowEdit(false);

  // obtener el state
  const registroAH = useSelector( state => state.aplicacionHerbicidas.registroAH)

  const dispatch = useDispatch()

  const registro = () => {
    dispatch( mostrarRegistroAH() )
  }

  const cerrar = () => {
    dispatch( ocultarHerbicidas() )
  }

  if(loading) return <Spinner />
  if(error) return null
  const rol = sessionStorage.getItem('rol')

  return (
    <Fragment>

      <div className="card-panel white z-depth-1 m-0 p-0 title">
        <div className="row valign-wrapper p-3">
          <div className="col-12 p-2">
            <h1 className="center"> Herbicidas </h1>
            {rol === '1' ? estado === true ?
              <span><a href="#!" onClick={ () => registro() }  className="btn-floating pulse red darken-4 ml-3"><i className="material-icons">add</i></a> <span className="black-text font-weight-bold"> Registrar herbicida </span></span>
            :
              null
            :
              null
            }
         
            {data.obtenerHerbicidasPorCorte.length === 0 ? ' No hay herbicidas registrados.' : (
              <div className="col-12 p-0 mt-2 mb-2">
                {data.obtenerHerbicidasPorCorte.map(aherbicidas => (
                  <AplicacionHerbicida 
                    key={aherbicidas.id_aphe} 
                    aherbicidas={aherbicidas} 
                    props={props} 
                    corte={id_corte} 
                    estado={estado} 
                    fecha_inicio={fecha_inicio}
                    setUserId4Actions={setUserId4Actions}
                    setArregloTratamientos={setArregloTratamientos}
                    setShowEdit={setShowEdit}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="col-12 mt-1 p-1">
            <button type="button" className="btn btn-block white-text btncerrar mb-2" onClick={() => cerrar()}>Cerrar</button>
          </div>
        </div>
      </div>

      <ModalDatosH
        show={showEdit}
        aherbicidas={userId4Actions}
        data={arregloTratamientos}
        onHide={handleEditClose}
      />


      <div className="row">
        <div className="col s12">
          { registroAH ?
          <div className="card-panel white z-depth-1">
            <div className="row valign-wrapper">
              <div className="col s12">
                <AplicacionHerbicidaRegister 
                  corte={corte} 
                  fecha_inicio={fecha_inicio}
                  fecha_corte={fecha_corte}
                />
              </div>
            </div>
          </div>  
          : null }
        </div>
      </div>

    </Fragment>
  )
}

export default ListHerbicidas

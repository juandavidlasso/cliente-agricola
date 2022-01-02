import React, { Fragment, useState } from 'react'
import AplicacionFertilizante from './aplicacion/AplicacionFertilizante'
import AplicacionFertilizanteRegister from './aplicacion/AplicacionFertilizanteRegister'
import Spinner from '../../Spinner'
import ModalDatosAF from './aplicacion/modals/ModalDatosAF'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroAF, ocultarFertilizantes } from '../../../utils/redux/actions/aplicacionFertilizanteActions'
// GraphQL
import {OBTENER_APFE_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListFertilizantes = ({corte, props, estado}) => {

  const {id_corte, fecha_inicio, fecha_corte} = corte 

  // query hook
  const { data, loading, error } = useQuery(OBTENER_APFE_POR_CORTE_QUERY, { variables: {id_corte} })

  // Modals
  const [showEdit, setShowEdit] = useState(false);
  const [userId4Actions, setUserId4Actions] = useState(0);
  const handleEditClose = () => setShowEdit(false);
  const [arregloTratamientosF, setArregloTratamientosF] = useState(0);

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

      <div className="card-panel white z-depth-1 m-0 p-0 title">
        <div className="row valign-wrapper p-3">
          <div className="col-12 p-2">
            <h1 className="center"> Fertilizantes </h1>
            {rol === '1' ? estado === true ?
              <span><button type='button' onClick={ () => registro() }  className="btn-floating pulse red darken-4 modal-trigger ms-3"><i className="material-icons">add</i></button> <span className="black-text fw-bold"> Registrar fertilizante </span></span>
            :
              null
            :
              null
            }

            {data.obtenerAPFEPorCorte.length === 0 ? ' No hay fertilizantes registrados.' : (
              <div className="col-12 p-0 mt-2 mb-2">
              {data.obtenerAPFEPorCorte.map(afertilizantes => (
                <AplicacionFertilizante 
                  key={afertilizantes.id_apfe} 
                  afertilizantes={afertilizantes} 
                  props={props} 
                  corte={id_corte} 
                  estado={estado} 
                  fecha_inicio={fecha_inicio} 
                  setUserId4Actions={setUserId4Actions}
                  setArregloTratamientosF={setArregloTratamientosF}
                  setShowEdit={setShowEdit}
                />
              ))}
              </div>
            )}
          </div>
          <div className="col-12 mt-1 p-1">
            <div className="d-grid gap-2 p-2">
              <button type="button" className="btn white-text btncerrar mb-2" onClick={() => cerrar()}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <ModalDatosAF
        show={showEdit}
        afertilizantes={userId4Actions}
        data={arregloTratamientosF}
        onHide={handleEditClose}
      />


      <div className="row">
        <div className="col s12">
          { registroAF ?
          <div className="card-panel white z-depth-1">
            <div className="row valign-wrapper">
              <div className="col s12">
                <AplicacionFertilizanteRegister 
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

export default ListFertilizantes

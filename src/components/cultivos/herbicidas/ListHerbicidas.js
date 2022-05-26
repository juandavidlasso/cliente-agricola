import React, { useState } from 'react'
import AplicacionHerbicidaRegister from './aplicacion/AplicacionHerbicidaRegister'
import AplicacionHerbicida from './aplicacion/AplicacionHerbicida'
import Spinner from '../../Spinner'
import ModalDatosH from './aplicacion/modalsAH/ModalDatosH'
import ModalInformeHerbicidas from './ModalInformeHerbicidas'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroAH, ocultarHerbicidas } from '../../../utils/redux/actions/aplicacionHerbicidaActions'
// GraphQL
import {OBTENER_APHE_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListHerbicidas = ({corte, props, estado, nombre}) => {

  const {id_corte, fecha_inicio, fecha_corte, numero} = corte

  // query hook
  const { data, loading, error } = useQuery(OBTENER_APHE_POR_CORTE_QUERY, { variables: {id_corte} })

  // Modals Aplicacion Herbicida
  const [showEdit, setShowEdit] = useState(false);
  const [userId4Actions, setUserId4Actions] = useState(0);
  const [arregloTratamientos, setArregloTratamientos] = useState(0);
  const handleEditClose = () => setShowEdit(false);
  // Modal informe
  const [modalIsOpen, setIsOpen] = useState(false);

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
    <div className='row card-panel p-0'>

      <div className='col-12 p-1'>
        <div className={data.obtenerHerbicidasPorCorte.length === 0 ? 'col s12 m12 l12 xl12 p-2' : 'col s12 m12 l10 xl10 p-2'}>
          <h1 className='center' style={{fontSize: '2rem'}}> Herbicidas </h1>
        </div>
        {data.obtenerHerbicidasPorCorte.length === 0 ?
          null
        :
          <div className='col s12 m12 l2 xl2 p-2'>
            <button type='button' className='pt-2 pb-2 ps-3 pe-3 btnEnviarInformeCorreo' onClick={ () => setIsOpen(true)}>Enviar informe</button>
          </div>
        }
      </div>


      {rol === '1' ? estado === true ?
        <div className='col-12 p-1'>
          <div className='col s12 m12 l12 xl12 p-2'>
            <span><button type='button' onClick={ () => registro() }  className="btn-floating pulse red darken-4"><i className="material-icons">add</i></button> <span className="black-text fw-bold"> Registrar herbicida </span></span>
          </div>
        </div>
      :
        null
      :
        null
      }


      { registroAH ?
        <div className='col-12 p-1'>
          <div className='col s12 m12 l12 xl12 p-2'>
            <AplicacionHerbicidaRegister corte={corte} fecha_inicio={fecha_inicio} fecha_corte={fecha_corte} />
          </div>
        </div>
      :
        null
      }


      <div className='col-12 p-1'>
        <div className='col s12 m12 l12 xl12 p-1'>
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
      </div>


      <div className='col-12 p-1'>
        <div className='col s12 m12 l12 xl12 p-2'>
          <button type="button" className="btn white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
        </div>
      </div>

      <ModalDatosH
        show={showEdit}
        aherbicidas={userId4Actions}
        data={arregloTratamientos}
        onHide={handleEditClose}
      />

      <ModalInformeHerbicidas
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        id_corte={id_corte}
        nombre={nombre}
        numero={numero}
        props={props}
      />

    </div>
  )
}

export default ListHerbicidas

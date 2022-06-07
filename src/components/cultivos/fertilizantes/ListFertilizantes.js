import React, { useState } from 'react'
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
    <div className='row card-panel p-0'>

      <div className='col-12 p-1'>
        <div className={data.obtenerAPFEPorCorte.length === 0 ? 'col s12 m12 l12 xl12 p-2' : 'col s12 m12 l10 xl10 p-2'}>
          <h1 className='center' style={{fontSize: '2rem'}}> Fertilizantes </h1>
        </div>
        {/* {data.obtenerAPFEPorCorte.length === 0 ?
          null
        :
          <div className='col s12 m12 l2 xl2 p-2'>
            <button type='button' className='pt-2 pb-2 ps-3 pe-3 btnEnviarInformeCorreo'>Enviar informe</button>
          </div>
        } */}
      </div>

      {rol === '1' ? estado === true ?
        <div className='col-12 p-1'>
          <div className='col s12 m12 l12 xl12 p-2'>
            <span><button type='button' onClick={ () => registro() }  className="btn-floating pulse red darken-4"><i className="material-icons">add</i></button> <span className="black-text fw-bold"> Registrar fertilizante </span></span>
          </div>
        </div>
      :
        null
      :
        null
      }


      { registroAF ?
        <div className='col-12 p-1'>
          <div className='col s12 m12 l12 xl12 p-2'>
            <AplicacionFertilizanteRegister corte={corte} fecha_inicio={fecha_inicio} fecha_corte={fecha_corte} />
          </div>
        </div>
      :
        null
      }


      <div className='col-12 p-1'>
        <div className='col s12 m12 l12 xl12 p-1'>
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
      </div>


      <div className='col-12 p-1'>
        <div className='col s12 m12 l12 xl12 p-2'>
          <button type="button" className="btn white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
        </div>
      </div>

      <ModalDatosAF
        show={showEdit}
        afertilizantes={userId4Actions}
        data={arregloTratamientosF}
        onHide={handleEditClose}
      />

    </div>
  )
}

export default ListFertilizantes

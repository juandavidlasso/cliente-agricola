import React, { useState, useEffect } from 'react'
import Pluviometro from './Pluviometro'
import LluviaRegister from './LluviaRegister'
import PluviometroRegister from './PluviometroRegister'
import ResumenPluviometros from './ResumenPluviometros'
import ConsultarAno from './ConsultarAno'
import Spinner from '../../Spinner'
import Panel from './Panel'
import LluviaEditar from './LluviaEditar'
import ResumenMes from './ResumenMes'
import ConsultarMes from './ConsultarMes'
// GraphQL
import {OBTENER_PLUVIOMETROS_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

// Llenar combo con los años
var array = []
const obtenerAnos = () => {
    var myDate = new Date();
    const year = myDate.getFullYear();
    var j = 1
    for(var i = year; i > 1999; i--){
        var nuevoYear = {
            idAno: j,
            year: i
        }
        array.push(nuevoYear)
        j++
    }
}

const ListLluvias = () => {

  // Modal registrar lluvia
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  // Datos para registro de lluvias
  const [idPluviometro, setIdPluviometro] = useState(0)
  const [namePluviometro, setNamePluviometro] = useState(0)
  // Ventanas de consulta de lluvias
  const [registroPluvio, setRegistroPluvio] = useState(false)
  const [resumenAno, setResumenAno] = useState(false)
  // Panel lluvias
  const [visible, setVisible] = useState(false);
  const [idLluvia, setIdLluvia] = useState(0)
  const [fechaLluvia, setFechaLluvia] = useState(0)
  const [cantidadLluvia, setCantidadLluvia] = useState(0)
  // Modal editar lluvias
  const [editar, setEditar] = useState(false)
  const closeEditar = () => setEditar(false)
  // Modal resumen lluvias del mes actual
  const [lluviasActuales, setLluviasActuales] = useState(false)
  const closeLluviasActuales = () => setLluviasActuales(false)
    // Modal resumen lluvias por mes
    const [buscarMes, setBuscarMes] = useState(false)
    const [lluviasMes, setLluviasMes] = useState(false)
    const closeLluviasMes = () => setLluviasMes(false)
    // Mandar mes y año al modal
    const [mesLluvia, setMesLluvia] = useState({})
    const [anoLluvia, setAnoLluvia] = useState({})
  // collapsible
  useEffect(() => {
    const M = window.M
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
    obtenerAnos()
  }, [])
  // query hook
  const {data, loading, error} = useQuery(OBTENER_PLUVIOMETROS_QUERY)

  if(loading) return <Spinner />
  if(error) return null

  // Funcion para abrir registro de pluviometro
  const abrir = () => {
    setResumenAno(false)
    setBuscarMes(false)
    setRegistroPluvio(true)
  }
  // Ver resumen pluviometros
  const resumen = () => {
    setRegistroPluvio(false)
    setResumenAno(false)
    setLluviasActuales(true)
  }
  // ver resumen por año
  const verAno = () => {
    setRegistroPluvio(false)
    setBuscarMes(false)
    setResumenAno(true)
  }
  // ver resumen por mes
  const verMes = () => {
    setRegistroPluvio(false)
    setResumenAno(false)
    setBuscarMes(true)
  }

  const rol = sessionStorage.getItem('rol')

  return (
    <div className="container-fluid grey lighten-4">
      <div className="row">
        <div className="col s12">

          <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
            <div className="row">
              <div className='col-12 p-1'>
                <div className='col s12 m12 l10 xl10 p-2'>
                  <h1 className="center ms-5"> Listado de Lluvias </h1>
                </div>
                {rol === "1" ?
                  <div className='col s12 m12 l2 xl2 p-2'>
                    <button type='button' className="btnlink4" onClick={() => setVisible(true)}>
                      Gestionar Lluvias
                    </button>
                  </div>
                :
                  null
                }
              </div>
              <div className="col-12 p-1">

                <div className="card-panel white">
                  <div className="row valign-wrapper">
                    
                    <div className="col-12 p-2">
                      <div className='col s6 center'>
                        {rol === '1' ?
                          <button type="button" className="btnlinkLluvia" onClick={abrir}><i className="tiny material-icons me-1">add_circle</i> Registrar Pluviómetro</button>
                        :
                          null
                        }
                      </div>
                      <div className='col s6 center'>
                        <button type="button" className="btnlinkLluvia" onClick={resumen}><i className="tiny material-icons me-1">format_align_justify</i>Resumen Pluviómetros mes actual</button>
                      </div>
                      <div className='col s6 center'>
                        <button type="button" className="btnlinkLluvia" onClick={verMes}><i className="tiny material-icons me-1">format_align_justify</i>Resumen Pluviómetros por mes</button>
                      </div>
                      <div className='col s6 center'>
                        <button type="button" className="btnlinkLluvia" onClick={verAno}><i className="tiny material-icons me-1">format_align_justify</i>Resumen Pluviómetros por año</button>
                      </div>
                    </div>
                    
                    {resumenAno === true ?
                      <ConsultarAno setResumenAno={setResumenAno} />
                    :
                      null
                    }

                    {buscarMes ?
                      <ConsultarMes
                        setBuscarMes={setBuscarMes}
                        setLluviasMes={setLluviasMes}
                        setMesLluvia={setMesLluvia}
                        setAnoLluvia={setAnoLluvia}
                      />
                    :
                      null
                    }
                    
                    {registroPluvio === true ?
                      <div className="col-12">
                        <div className="col-md-6 offset-md-3">
                          <PluviometroRegister setRegistroPluvio={setRegistroPluvio} />
                        </div>
                      </div>
                    :
                      null
                    }
                    <div className="col-12 p-0">
                      {data.obtenerPluviometros.length === 0 ?
                        'No hay pulviómetros registrados'
                      :
                        <ul className="collapsible">
                          {data.obtenerPluviometros.map(pluviometros => (
                            <Pluviometro
                              key={pluviometros.id_pluviometro}
                              pluviometros={pluviometros}
                              setShowEdit={setShowEdit}
                              setIdPluviometro={setIdPluviometro}
                              setNamePluviometro={setNamePluviometro}
                              listaYear={array}
                            />
                          ))}
                        </ul>
                      }
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <LluviaRegister
              show={showEdit}
              onHide={handleEditClose}
              idpluviometro={idPluviometro}
              namepluviometro={namePluviometro}
            />

            <ResumenPluviometros
              show={lluviasActuales}
              onHide={closeLluviasActuales}
            />

            <ResumenMes
              show={lluviasMes}
              onHide={closeLluviasMes}
              datomes={mesLluvia}
              datoano={anoLluvia}
            />

            <LluviaEditar
              show={editar}
              onHide={closeEditar}
              lluviaid={idLluvia}
              lluviafecha={fechaLluvia}
              lluviacantidad={cantidadLluvia}
              lluviapluviometro={idPluviometro}
            />

            {visible ?
              <Panel
                setIdLluvia={setIdLluvia}
                setFechaLluvia={setFechaLluvia}
                setCantidadLluvia={setCantidadLluvia}
                setIdPluviometro={setIdPluviometro}
                setEditar={setEditar}
              />
            :
              null
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default ListLluvias

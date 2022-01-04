import React, { useState, useEffect } from 'react'
import Pluviometro from './Pluviometro'
import LluviaRegister from './LluviaRegister'
import PluviometroRegister from './PluviometroRegister'
import ResumenPluviometros from './ResumenPluviometros'
import ConsultarAno from './ConsultarAno'
import Spinner from '../../Spinner'
import Panel from './Panel'
import LluviaEditar from './LluviaEditar'
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

// Obtener mes actual y dias
var arrayDias = []
var listadoDias = []
const mesActual = () => {
  const mes = new Date(), year = new Date();
  const mesHoy = mes.getMonth()+1;
  const yearHoy = year.getFullYear()
  arrayDias.push(new Date(yearHoy, mesHoy, 0).getDate())
  var k = 1
  for(var i = 1; i<=arrayDias; i++){
    var nuevoDia = {
      idDia: k,
      dia: i
    }
    listadoDias.push(nuevoDia)
    k++
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
  const [resumenPluvi, setResumenPluvi] = useState(false)
  const [resumenAno, setResumenAno] = useState(false)
  // Panel lluvias
  const [visible, setVisible] = useState(false);
  const [idLluvia, setIdLluvia] = useState(0)
  const [fechaLluvia, setFechaLluvia] = useState(0)
  const [cantidadLluvia, setCantidadLluvia] = useState(0)
  // Modal editar lluvias
  const [editar, setEditar] = useState(false)
  const closeEditar = () => setEditar(false)
  // collapsible
  useEffect(() => {
    const M = window.M
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
    obtenerAnos()
    mesActual()
  }, [])
  // query hook
  const {data, loading, error} = useQuery(OBTENER_PLUVIOMETROS_QUERY)

  if(loading) return <Spinner />
  if(error) return null

  // Funcion para abrir registro de pluviometro
  const abrir = () => {
    setResumenPluvi(false)
    setResumenAno(false)
    setRegistroPluvio(true)
  }
  // Ver resumen pluviometros
  const resumen = () => {
    setRegistroPluvio(false)
    setResumenAno(false)
    setResumenPluvi(true)
  }
  // ver resumen por año
  const verAno = () => {
    setRegistroPluvio(false)
    setResumenPluvi(false)
    setResumenAno(true)
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
                      {rol === '1' ?
                        <button type="button" className="btnlink2" onClick={abrir}><i className="tiny material-icons me-1">add_circle</i> Registrar Pluviómetro</button>
                      :
                        null
                      }
                      <button type="button" className="btnlink2" onClick={resumen}><i className="tiny material-icons me-1">format_align_justify</i>Resumen Pluviómetros mes actual</button>
                      <button type="button" className="btnlink2" onClick={verAno}><i className="tiny material-icons me-1">format_align_justify</i>Resumen Pluviómetros por año</button>
                    </div>

                    {resumenPluvi === true ?
                      <ResumenPluviometros setResumenPluvi={setResumenPluvi} listaDias={listadoDias} />
                    :
                      null
                    }

                    {resumenAno === true ?
                      <ConsultarAno setResumenAno={setResumenAno} />
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

import React, { useState, useEffect } from 'react'
import Pluviometro from './Pluviometro'
import LluviaRegister from './LluviaRegister'
import PluviometroRegister from './PluviometroRegister'
import Spinner from '../../Spinner'
// GraphQL
import {OBTENER_PLUVIOMETROS_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListLluvias = () => {

  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const [idPluviometro, setIdPluviometro] = useState(0)
  const [namePluviometro, setNamePluviometro] = useState(0)
  const [registroPluvio, setRegistroPluvio] = useState(false)
  // collapsible
  useEffect(() => {
    const M = window.M
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
  }, [])
  // query hook
  const {data, loading, error} = useQuery(OBTENER_PLUVIOMETROS_QUERY)
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if(loading) return <Spinner />
  if(error) return null
  //const rol = sessionStorage.getItem('rol')
  const abrir = () => setRegistroPluvio(true)

  return (
    <div className="container-fluid grey lighten-4">
      <div className="row">
        <div className="col s12">

          <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
            <div className="row">
              <div className="col s12">
                <h1 className="center title"> Listado de Lluvias </h1>

                <div className="card-panel white">
                  <div className="row valign-wrapper">
                    
                    <div className="col-12" style={{height: '50px'}}>
                      <button className="btn btn-sm btn-primary" onClick={abrir}>+ Registrar Pluviómetro</button>
                    </div>
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
          </div>

        </div>
      </div>
    </div>
  )
}

export default ListLluvias

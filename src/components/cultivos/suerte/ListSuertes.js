import React from 'react'
import SuerteRegister from './SuerteRegister'
import Suerte from './Suerte'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroSuerte } from '../../../utils/redux/actions/suerteActions'
// GraphQL
import {OBTENER_SUERTES_RENOVADAS_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'


const ListSuertes = () => {

  useTitle({ title: 'Suertes' })

  // query hook
  const { data, loading, error } = useQuery(OBTENER_SUERTES_RENOVADAS_QUERY)
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  // mostrar form
  const registroSuerte = useSelector( state => state.suertes.registroSuerte)

  const dispatch = useDispatch()

  const onclick = () => {
    dispatch( mostrarRegistroSuerte() )
  }

  if(loading) return <Spinner />
  if(error) return null

  const rol = sessionStorage.getItem('rol')
  
  return (
    <div className="container-fluid grey lighten-4">
      <div className="row">
        <div className="col s12">

          <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
            <div className="row">
              <div className="col s12">
                <h1 className="center title"> Listado de Suertes </h1>

                <div className="card-panel white">
                  <div className="row valign-wrapper">
                    <div className="col s12">

                      {data.obtenerSuertesRenovadas.length === 0 ? 'No hay suertes' : (
                        data.obtenerSuertesRenovadas.map(suerte => (
                          <Suerte 
                            key={suerte.id_suerte} 
                            suerte={suerte} 
                          />
                        ))
                      )}
                
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col s12">
              {rol === "1" ?
                <a href="#!" className="btn-floating btn-large pulse right red darken-4" onClick={() => onclick() }><i className="material-icons">add_circle_outline</i></a>
              :
                null
              }
            </div>


            <div className="row">
              <div className="col s12">
                {registroSuerte ?
                  <div className="card-panel white z-depth-1">
                    <div className="row valign-wrapper">
                      <div className="col s12">
                        <SuerteRegister />
                      </div>
                    </div>
                  </div>
                : null }
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ListSuertes

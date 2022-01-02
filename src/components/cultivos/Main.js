import React from 'react'
import Spinner from '../Spinner'
import useTitle from '../../utils/context/hooks/useSEO'
// GraphQL
import {OBTENER_TOTAL_HTA_QUERY} from '../../apollo/querys'
import { useQuery } from '@apollo/client'

const Main = () => {

  useTitle({ title: 'Home' })
  
  // query hook
  const { data, loading, error } = useQuery(OBTENER_TOTAL_HTA_QUERY)

  if(loading) return <Spinner />
  if(error) return null
  const areaTotal = data.obtenerTotalHtaSuertes

  return (
    <div className="container-fluid grey lighten-4">

      <div className="row title">
        <div className="col s12">

          <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
            <div className="row">
              <div className="col s12 m6">
                <div className="card white center">
                  <div className="card-content black-text">
                    <span className="card-title fw-bold">Caña de azúcar</span>
                    {areaTotal === 0 ?
                      <p className="h1"> 0 </p>
                    :
                      <p className="h1"> {(areaTotal).toFixed(2)} </p>
                    }
                  </div>
                  <div className="card-action">
                    <span className="h3 blue-grey-text"> Hectáreas </span>
                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="card white center">
                  <div className="card-content black-text">
                    <span className="card-title fw-bold">Maíz</span>
                    <p className="h1"> 0 </p>
                  </div>
                  <div className="card-action">
                    <span className="h3 blue-grey-text"> Hectáreas </span>
                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="card white center">
                  <div className="card-content black-text">
                    <span className="card-title fw-bold">Pastos</span>
                    <p className="h1"> 0 </p>
                  </div>
                  <div className="card-action">
                    <span className="h3 blue-grey-text"> Hectáreas </span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default Main

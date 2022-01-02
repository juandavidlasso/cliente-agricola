import React from 'react'
import AplicacionHerbicidaActualizar from './AplicacionHerbicidaActualizar'
import Spinner from '../../../Spinner'
import useTitle from '../../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
// GraphQL
import {OBTENER_APHE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const AplicacionHerbicidaEditar = () => {

    useTitle({ title: 'Aplicacion Herbicida' })

    const location = useLocation()
    const id_aphe = location.state.id_aphe
    const id_suerte = location.state.id_suerte
    const id_corte = location.state.id_corte
    const ficorte = moment(location.state.fecha_inicio)

    // query hook
    const { data, loading, error } = useQuery(OBTENER_APHE_QUERY, { variables: {id_aphe} })

    if(loading) return <Spinner />
    if(error) return null
    
    
    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                    <div className="row">
                        <div className="col-md-7 offset-md-3"> 
    
                            <AplicacionHerbicidaActualizar data={data} id_corte={id_corte} id_suerte={id_suerte} ficorte={ficorte} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default AplicacionHerbicidaEditar
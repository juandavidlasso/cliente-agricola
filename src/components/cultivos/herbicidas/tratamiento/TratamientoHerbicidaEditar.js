import React from 'react'
import Spinner from '../../../Spinner'
import TratamientoHerbicidaActualizar from './TratamientoHerbicidaActualizar'
import useTitle from '../../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
// GraphQL
import {OBTENER_TRAHE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const TratamientoHerbicidaEditar = () => {

    useTitle({ title: 'Tratamiento Herbicida' })

    const location = useLocation()
    const id_trahe = location.state.id_trahe
    const id_corte = Number(location.state.id_corte)
    const id_suerte = Number(location.state.id_suerte)
    const id_aphe = Number(location.state.id_aphe)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_TRAHE_QUERY, { variables: {id_trahe} })

    if(loading) return <Spinner />
    if(error) return null
    
    
    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                    <div className="row">
                        <div className="col-md-7 offset-md-3"> 
    
                            <TratamientoHerbicidaActualizar data={data} id_corte={id_corte} id_suerte={id_suerte} id_aphe={id_aphe} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default TratamientoHerbicidaEditar
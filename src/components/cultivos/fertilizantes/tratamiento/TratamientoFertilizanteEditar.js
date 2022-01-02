import React from 'react'
import Spinner from '../../../Spinner'
import TratamientoFertilizanteActualizar from './TratamientoFertilizanteActualizar'
import useTitle from '../../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
// GraphQL
import {OBTENER_TRAFE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const TratamientoFertilizanteEditar = () => {

    useTitle({ title: 'Tratamiento Fertilizante' })

    const location = useLocation()
    const id_trafe = Number(location.state.id_trafe)
    const id_corte = Number(location.state.id_corte)
    const id_suerte = Number(location.state.id_suerte)
    const id_apfe = Number(location.state.id_apfe)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_TRAFE_QUERY, { variables: {id_trafe} })

    if(loading) return <Spinner />
    if(error) return null

    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                    <div className="row">
                        <div className="col-md-7 offset-md-3"> 
    
                            <TratamientoFertilizanteActualizar data={data} id_corte={id_corte} id_suerte={id_suerte} id_apfe={id_apfe} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>          
    )
}

export default TratamientoFertilizanteEditar
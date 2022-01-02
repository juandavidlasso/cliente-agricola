import React from 'react'
import TablonActualizar from './TablonActualizar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
// GraphQL
import {OBTENER_TABLON_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const TablonEditar = () => {

    useTitle({ title: 'Tablón' })

    const location = useLocation()
    const id_tablon = Number(location.state.id_tablon)
    const id_corte = Number(location.state.id_corte)
    const id_suerte = Number(location.state.id_suerte)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_TABLON_QUERY, { variables: {id_tablon} })

    if(loading) return <Spinner />
    if(error) return null

    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                    <div className="row">
                        <div className="col-md-7 offset-md-3"> 
    
                            <TablonActualizar data={data} id_corte={id_corte} id_suerte={id_suerte} />                    
                            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default TablonEditar
import React from 'react'
import LaborActualizar from './LaborActualizar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
// GraphQL
import {OBTENER_LABOR_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const LaborEditar = () => {

    useTitle({ title: 'Labor' })

    const location = useLocation()
    const id_labor = location.state.id_labor
    const id_suerte = location.state.id_suerte
    const id_corte = location.state.id_corte
    const ficorte = moment(location.state.fecha_inicio)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_LABOR_QUERY, { variables: {id_labor} })

    if(loading) return <Spinner />
    if(error) return null
    
    
    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                    <div className="row">
                        <div className="col-md-7 offset-md-3"> 
    
                            <LaborActualizar data={data} id_suerte={id_suerte} id_corte={id_corte} ficorte={ficorte} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default LaborEditar
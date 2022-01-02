import React from 'react'
import AplicacionPlagaActualizar from './AplicacionPlagaActualizar'
import Spinner from '../../../Spinner'
import useTitle from '../../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
// GraphQL
import {OBTENER_APPLA_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const AplicacionPlagaEditar = () => {

    useTitle({ title: 'Aplicación Plaga' })

    const location = useLocation()
    const id_apla = Number(location.state.id_apla)
    const id_corte = Number(location.state.id_corte)
    const id_suerte = Number(location.state.id_suerte)
    const id_tablon = Number(location.state.id_tablon)
    const id_trapl = Number(location.state.id_trapl)
    const ficorte = moment(location.state.fecha_inicio)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_APPLA_QUERY, { variables: {id_apla} })

    if(loading) return <Spinner />
    if(error) return null

    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                    <div className="row">
                        <div className="col-md-7 offset-md-3"> 
    
                            <AplicacionPlagaActualizar
                                data={data}
                                id_corte={id_corte}
                                id_suerte={id_suerte}
                                id_tablon={id_tablon}
                                id_trapl={id_trapl}
                                ficorte={ficorte}
                            />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default AplicacionPlagaEditar
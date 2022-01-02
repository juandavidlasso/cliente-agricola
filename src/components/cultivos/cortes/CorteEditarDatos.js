import React from 'react'
import CorteActualizarDatos from './CorteActualizarDatos'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
// GraphQL
import {VER_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const CorteEditarDatos = () => {

    useTitle({ title: 'Corte' })

    const location = useLocation()
    const id_suerte = location.state.id_suerte
    const id_corte = location.state.id_corte
    const nombre = location.state.nombre
 
    // query hook
    const { data, loading, error } = useQuery(VER_CORTE_QUERY, { variables: {id_corte} })
 
    if(loading) return <Spinner />
    if(error) return null

    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                <div className="row">
                    <div className="col-md-7 offset-md-3"> 

                        <CorteActualizarDatos corte={data.obtenerCorte} props={id_suerte} nombre={nombre} />
                        
                    </div>
                </div>
                </div>
            </div>
        </div>   
    )
}

export default CorteEditarDatos
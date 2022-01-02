import React from 'react'
import ProductoActualizar from './ProductoActualizar'
import Spinner from '../../../Spinner'
import useTitle from '../../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
// GraphQL
import {OBTENER_TRAPLA_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ProductoEditar = () => {

    useTitle({ title: 'Tratamiento Plaga' })

    const location = useLocation()
    const id_trapl = Number(location.state.id_trapl)
    const id_corte = Number(location.state.id_corte)
    const id_suerte = Number(location.state.id_suerte)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_TRAPLA_QUERY, { variables: {id_trapl} })

    if(loading) return <Spinner />
    if(error) return null

    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                    <div className="row">
                        <div className="col-md-7 offset-md-3"> 
    
                            <ProductoActualizar data={data} id_corte={id_corte} id_suerte={id_suerte} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default ProductoEditar
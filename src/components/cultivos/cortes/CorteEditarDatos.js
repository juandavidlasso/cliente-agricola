import React from 'react'
import CorteActualizarDatos from './CorteActualizarDatos'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
// GraphQL
import {VER_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const CorteEditarDatos = (props) => {

    useTitle({ title: 'Corte' })

    const id_suerte = Number(props.match.params.id_suerte)
    const id_corte = Number(props.match.params.id_corte)
    const nombre = props.match.params.nombre
 
    // query hook
    const { data, loading, error } = useQuery(VER_CORTE_QUERY, { variables: {id_corte} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);
 
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
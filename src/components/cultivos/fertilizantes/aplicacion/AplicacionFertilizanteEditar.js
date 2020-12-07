import React from 'react'
import AplicacionFertilizanteActualizar from './AplicacionFertilizanteActualizar'
import Spinner from '../../../Spinner'
import useTitle from '../../../../utils/context/hooks/useSEO'
// GraphQL
import {OBTENER_APFE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const AplicacionFertilizanteEditar = (props) => {

    useTitle({ title: 'Aplicación Fertilizante' })

    const id_apfe = Number(props.match.params.id_apfe)

    // query hook
    const { data, loading, error } = useQuery(OBTENER_APFE_QUERY, { variables: {id_apfe} })
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
    
                            <AplicacionFertilizanteActualizar data={data} props={props} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default AplicacionFertilizanteEditar
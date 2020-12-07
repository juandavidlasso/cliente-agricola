import React from 'react'
import Spinner from '../../../Spinner'
import TratamientoFertilizanteActualizar from './TratamientoFertilizanteActualizar'
import useTitle from '../../../../utils/context/hooks/useSEO'
// GraphQL
import {OBTENER_TRAFE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const TratamientoFertilizanteEditar = (props) => {

    useTitle({ title: 'Tratamiento Fertilizante' })

    const id_trafe = Number(props.match.params.id_trafe)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_TRAFE_QUERY, { variables: {id_trafe} })
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
    
                            <TratamientoFertilizanteActualizar data={data} props={props} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>          
    )
}

export default TratamientoFertilizanteEditar
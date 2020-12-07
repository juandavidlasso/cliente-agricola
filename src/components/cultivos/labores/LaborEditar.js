import React from 'react'
import LaborActualizar from './LaborActualizar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
// GraphQL
import {OBTENER_LABOR_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const LaborEditar = (props) => {

    useTitle({ title: 'Labor' })

    const id_labor = Number(props.match.params.id_labor)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_LABOR_QUERY, { variables: {id_labor} })
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
    
                            <LaborActualizar data={data} props={props} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default LaborEditar
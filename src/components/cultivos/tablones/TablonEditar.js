import React from 'react'
import TablonActualizar from './TablonActualizar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
// GraphQL
import {OBTENER_TABLON_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const TablonEditar = (props) => {

    useTitle({ title: 'Tablón' })

    const id_tablon = Number(props.match.params.id_tablon)
    // query hook
    const { data, loading, error } = useQuery(OBTENER_TABLON_QUERY, { variables: {id_tablon} })
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
    
                            <TablonActualizar data={data} props={props} />                    
                            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default TablonEditar
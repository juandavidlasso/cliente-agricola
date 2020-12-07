import React from 'react';
import SuerteActualizar from './SuerteActualizar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
// GraphQL
import {VER_SUERTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const SuerteEditar = (props) => {

    useTitle({ title: 'Suerte' })

    const id_suerte = Number(props.match.params.id_suerte)
    // query hook
    const { data, loading, error } = useQuery(VER_SUERTE_QUERY, { variables: {id_suerte} })
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
    
                            <SuerteActualizar data={data} props={props} />                 
                            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
     );
}
 
export default SuerteEditar;
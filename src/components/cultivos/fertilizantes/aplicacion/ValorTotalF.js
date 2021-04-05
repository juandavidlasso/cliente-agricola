import React from 'react';
import Spinner from '../../../Spinner'
// GraphQL
import {TOTAL_FERTI_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ValorTotalF = ({id_apfe}) => {

    // query hook
    const { data, loading, error } = useQuery(TOTAL_FERTI_QUERY, { variables: {id_apfe} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null

    return ( 
        <div className="col-12 p-0">
            <div className="col-5 d-inline-block p-0">
                <p className="black-text">
                    Valor Total:
                </p>
            </div>
            <div className="col-7 d-inline-block p-0">
                <p className="black-text font-weight-bold ml-4" style={{textAlign: 'left'}}>
                    $ {data.obtenerValorTotalFerti === 0 ? 0 : data.obtenerValorTotalFerti}
                </p>
            </div>
        </div>
    );
}
 
export default ValorTotalF;
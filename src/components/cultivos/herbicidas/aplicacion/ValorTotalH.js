import React from 'react';
import Spinner from '../../../Spinner'
// GraphQL
import {TOTAL_HERBI_QUERT} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ValorTotalH = ({id_aphe}) => {

    // query hook
    const { data, loading, error } = useQuery(TOTAL_HERBI_QUERT, { variables: {id_aphe} })

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
                <p className="black-text fw-bold ms-4" style={{textAlign: 'left'}}>
                    $ {data.obtenerValorTotalHerb === 0 ? 0 : data.obtenerValorTotalHerb}
                </p>
            </div>
        </div>
    );
}
 
export default ValorTotalH;
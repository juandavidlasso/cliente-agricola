import React, { Fragment } from 'react';
import Spinner from '../../Spinner'
import Riego from './Riego'
// GraphQL
import {OBTENER_RIEGOS_CORTE_QUERY, OBTENER_TABLONES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const Riegos = ({id_corte}) => {

    // query hook
    const {data, loading, error} = useQuery(OBTENER_RIEGOS_CORTE_QUERY, {variables: {id_corte}})
    // console.log(data);
    // console.log(loading);
    // console.log(error);
    const {data:dataT, loading:loadingT, error:errorT} = useQuery(OBTENER_TABLONES_POR_CORTE_QUERY, {variables: {id_corte}})
    // console.log(dataT);
    // console.log(loadingT);
    // console.log(errorT);

    if(loading) return <Spinner />
    if(error) return null
    if(loadingT) return <Spinner />
    if(errorT) return null

    const {obtenerTablonesPorCorte} = dataT

    return ( 
        <Fragment>
            {data.obtenerRiegosCorte.length === 0 ?
                'No hay riegos registrados'
            :   
                <table className="table responsive-table centered table-striped table-bordered table-hover tablariegos" style={{fontSize: "12px"}}>
                    <thead className="text-white" style={{backgroundColor: "#283747"}}>
                    <tr>
                        <th scope="col"> Fecha </th>
                        <th scope="col"> Tablones </th>
                        <th scope="col"> # Riego </th>
                    </tr>
                    </thead>

                    <tbody className="white">
                    {data.obtenerRiegosCorte.map(riegos => (
                        <Riego 
                            key={riegos.id_riego} 
                            riegos={riegos}
                            lisTablones={obtenerTablonesPorCorte}
                            id_corte={id_corte}
                        />
                    ))}
                    </tbody>
                </table>                
            }
        </Fragment>
    );
}
 
export default Riegos;
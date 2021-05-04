import React, { Fragment } from 'react';
import ResumenLluvia from './ResumenLluvia'
import Spinner from '../../Spinner'
// GraphQL
import {OBTENER_PLUVIOMETROS_QUERY, OBTENER_RESUMEN_ANO_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ResumenAno = ({fecdate}) => {

    const year = Number(fecdate)
    // query hook
    const {data, loading, error} = useQuery(OBTENER_PLUVIOMETROS_QUERY)
    // console.log(data);
    // console.log(loading);
    // console.log(error);
    // query hook
    const {data:dataL, loading:loadingL, error:errorL} = useQuery(OBTENER_RESUMEN_ANO_QUERY, { variables: {year} })
    // console.log(dataL);
    // console.log(loadingL);
    // console.log(errorL);

    if(loading) return <Spinner />
    if(error) return null
    if(loadingL) return <Spinner />
    if(errorL) return null
    const {obtenerResumenAno} = dataL
    
    return (
        <Fragment>
            {data.obtenerPluviometros.length === 0 ?
                'No hay pluviómetros registrados'
            :
                <table className="table responsive-table centered table-striped table-bordered tablalresumen">
                    <thead className="text-white" style={{backgroundColor: "#283747"}}>
                        <tr>
                            <th>Pluviómetro</th>
                            <th>Meses</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.obtenerPluviometros.map(pluviometros => (
                            <ResumenLluvia
                                key={pluviometros.id_pluviometro}
                                pluviometros={pluviometros}
                                fecdate={fecdate}
                                datos={obtenerResumenAno}
                            />
                        ))}
                    </tbody>
                </table>
            }     
        </Fragment>
    );
}
 
export default ResumenAno;
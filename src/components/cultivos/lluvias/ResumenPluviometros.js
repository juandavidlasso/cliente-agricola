import React, { Fragment } from 'react';
import ResumenPluviometro from './ResumenPluviometro'
import Spinner from '../../Spinner'
// GraphQL
import {OBTENER_RESUMEN_PLUVIOMETROS_QUERY, OBTENER_SUERTES_ASOCIADAS} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ResumenPluviometros = ({setResumenPluvi}) => {

    // query hook
    const {data, loading, error} = useQuery(OBTENER_RESUMEN_PLUVIOMETROS_QUERY)
    // console.log(data);
    // console.log(loading);
    // console.log(error);
    const {data:dataS, loading:loadingS, error:errorS} = useQuery(OBTENER_SUERTES_ASOCIADAS)
    // console.log(dataS);
    // console.log(loadingS);
    // console.log(errorS);

    if(loading) return <Spinner />
    if(error) return null
    if(loadingS) return <Spinner />
    if(errorS) return null

    const {obtenerSuertesAsociadas} = dataS
  
    return (
        <Fragment>
            {data.obtenerResumenPluviometro.length === 0 ?
                'No hay pluviómetros registrados'
            :
                <table className="table responsive-table centered table-striped table-bordered tablalresumen">
                    <thead className="text-white" style={{backgroundColor: "#283747"}}>
                        <tr>
                            <th>Pluviómetro</th>
                            <th>Cantidad</th>
                            <th>Total Mes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.obtenerResumenPluviometro.map(pluviometros => (
                            <ResumenPluviometro
                                key={pluviometros.id_pluviometro}
                                pluviometros={pluviometros}
                                dataSuertes={obtenerSuertesAsociadas}
                            />
                        ))}
                    </tbody>
                </table>
            }
            <button type="button" className="btn btn-block white-text btncerrar" onClick={() => setResumenPluvi(false)}>Cerrar</button>
        </Fragment>
    );
}
 
export default ResumenPluviometros;
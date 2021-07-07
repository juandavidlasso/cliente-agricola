import React, { Fragment } from 'react';
import ResumenLluvia from './ResumenLluvia'
import Spinner from '../../Spinner'
// GraphQL
import {OBTENER_PLUVIOMETROS_QUERY, OBTENER_RESUMEN_ANO_QUERY, OBTENER_PROMEDIO_LLUVIAS} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ResumenAno = ({fecdate, suertesAso, totalP}) => {

    const year = Number(fecdate)
    const time = Number(fecdate)
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
    // query hook
    const {data:dataR, loading:loadingR, error:errorR} = useQuery(OBTENER_PROMEDIO_LLUVIAS, {variables: {time} })
    // console.log(dataR);
    // console.log(loadingR);
    // console.log(errorR);

    if(loading) return <Spinner />
    if(error) return null
    if(loadingL) return <Spinner />
    if(errorL) return null
    if(loadingR) return <Spinner />
    if(errorR) return null
    const {obtenerResumenAno} = dataL
    const {obtenerPromedioLluvias} = dataR
    
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
                                suertesAso={suertesAso}
                                dataR={dataR}
                            />
                        ))}
                        <tr>
                            <td>TOTAL PROMEDIO</td>
                            <td>
                                {obtenerPromedioLluvias.length === 0 ?
                                    'No hay lluvias registradas'
                                :
                                    obtenerPromedioLluvias.map(promedio => {
                                        const {id_lluvia, cantidad} = promedio
                                        return (
                                            <div key={id_lluvia}
                                                className="white-text left ml-2 pt-1 pb-1 mt-1 mb-1 light-blue darken-4 center"
                                                style={{borderRadius: '7px', width: '4.9rem', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                            >
                                                <span>
                                                    {cantidad / totalP}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            }     
        </Fragment>
    );
}
 
export default ResumenAno;
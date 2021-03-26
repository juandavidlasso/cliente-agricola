import React, { Fragment } from 'react';
import Spinner from '../../Spinner'
import LluviaActual from './LluviaActual'
// GraphQL
import {OBTENER_LLUVIAS_ACTUALES_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const LluviasActuales = ({pluviometroId}) => {

    const id_pluviometro = pluviometroId
    // query hook
    const {data, loading, error} = useQuery(OBTENER_LLUVIAS_ACTUALES_QUERY, { variables: {id_pluviometro} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null   

    return (
        <Fragment>
            {data.obtenerLluviasActuales.length === 0 ?
                'No hay lluvias registradas este mes'
            :
                <Fragment>
                    <p className="font-weight-bold text-uppercase">Lluvias Actuales </p>
                    <table className="table responsive-table centered table-striped table-bordered tablalabores table-hover tablaLluvias">
                        <thead className="text-white" style={{backgroundColor: "#283747"}}>
                            <tr>
                                <th scope="col"> Fecha </th>
                                <th scope="col"> Cantidad (MM)</th>
                                {/* <th scope="col"> Mes </th> */}
                            </tr>
                        </thead>
                        <tbody className="white">
                            {data.obtenerLluviasActuales.map(lluviasActuales => (
                                <LluviaActual key={lluviasActuales.id_lluvia} lluviasActuales={lluviasActuales} />
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            }
        </Fragment>
    );
}
 
export default LluviasActuales;
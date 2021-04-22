import React, { Fragment } from 'react';
import Spinner from '../../Spinner'
import LluviaFinal from './LluviaFinal';
// GraphQL
import {OBTENER_LLUVIA_ANO_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const LluviasFinales = ({year, pluviometroId, setConsultaYear}) => {

    const anofecha = year
    const id_pluviometro = pluviometroId
    // query hook
    const {data, loading, error} = useQuery(OBTENER_LLUVIA_ANO_QUERY, { variables: {anofecha, id_pluviometro} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null

    return (
        <Fragment>
            {data.obtenerLluviasAno.length === 0 ?
                <Fragment>
                    <p>No hay lluvias registradas en el año.</p>
                    <button type="button" className="btn btn-success btn-sm m-2" onClick={() => setConsultaYear(false)}>Aceptar</button>
                </Fragment>
            :
                <Fragment>
                    <p className="font-weight-bold text-uppercase">Lluvias de {anofecha} </p>
                    <table className="table responsive-table centered table-striped table-bordered tablalabores table-hover tablaLluvias">
                        <thead className="text-white" style={{backgroundColor: "#283747"}}>
                            <tr>
                                <th scope="col"> Mes </th>
                                <th scope="col"> Cantidad (MM) </th>
                            </tr>
                        </thead>
                        <tbody className="white">
                            {data.obtenerLluviasAno.map(lluviasAno => (
                                <LluviaFinal
                                    key={lluviasAno.id_lluvia}
                                    lluviasAno={lluviasAno}
                                />
                            ))}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success btn-sm m-2" onClick={() => setConsultaYear(false)}>Aceptar</button>
                </Fragment>
            }
        </Fragment>
    );
}
 
export default LluviasFinales;
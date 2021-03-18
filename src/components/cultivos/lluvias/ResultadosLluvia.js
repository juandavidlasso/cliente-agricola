import React, { Fragment } from 'react';
import Spinner from '../../Spinner'
import ResultadoLluvia from './ResultadoLluvia';
import moment from 'moment'
import 'moment/locale/es';
// GraphQL
import {OBTENER_LLUVIA_MES_ANO_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ResultadosLluvia = ({fecha, pluviometroId, setConsulta}) => {

    const fechanueva = fecha
    const id_pluviometro = pluviometroId
    moment.locale('es')
    const nuevaFecha = moment(fecha).format('MMMM-yyyy')
    // query hook
    const {data, loading, error} = useQuery(OBTENER_LLUVIA_MES_ANO_QUERY, { variables: {fechanueva, id_pluviometro} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null

    return (
        <Fragment>
            {data.obtenerLluvias.length === 0 ?
                <Fragment>
                    <p>No hay lluvias registradas en este mes.</p>
                    <button className="btn btn-success btn-sm m-2" onClick={() => setConsulta(false)}>Aceptar</button>
                </Fragment>
            :
                <Fragment>
                    <p className="font-weight-bold text-uppercase">Lluvias de {nuevaFecha} </p>
                    <table className="table responsive-table centered table-striped table-bordered tablalabores table-hover tablaLluvias" style={{fontSize: "12px"}}>
                        <thead className="text-white" style={{backgroundColor: "#283747"}}>
                            <tr>
                                <th scope="col"> Fecha </th>
                                <th scope="col"> Cantidad (MM)</th>
                            </tr>
                        </thead>
                        <tbody className="white">
                            {data.obtenerLluvias.map(listadoLluvias => (
                            <ResultadoLluvia
                                key={listadoLluvias.id_lluvia} 
                                listadoLluvias={listadoLluvias}
                            />
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            }
        </Fragment>
    );
}
 
export default ResultadosLluvia;
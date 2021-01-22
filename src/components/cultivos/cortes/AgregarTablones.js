import React, { useContext } from 'react';
import Spinner from '../../Spinner'
import Tablon from './Tablon'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
// GraphQL
import {OBTENER_TABLONES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom';

const AregarTablones = (props) => {

    const idNuevoCorte = props.match.params.idNuevoCorte
    const id_corte = Number(props.match.params.id_corte)
    const id_suerte = Number(props.match.params.id_suerte)
    const nombreNuevoCorte = props.match.params.nombreNuevoCorte
    const alertaContext = useContext(AlertaContext)
    const { alerta } = alertaContext
    // query hook
    const { data, loading, error } = useQuery(OBTENER_TABLONES_POR_CORTE_QUERY, { variables: {id_corte} })
    // console.log(data);
    // console.log(loading);
    // console.log(error); 

    if(loading) return <Spinner />
    if(error) return null 

    return ( 
        <div className="row">
            <div className="col-md-7 offset-md-4">
                <div className="center">
                    <h2 className="mb-5 mt-4 black-text font-weight-bold">Seleccione los tablones que desea registrar en el corte {nombreNuevoCorte}</h2>
                    
                    { alerta ? <p className="error"> {alerta.msg} </p> : null }

                    <table className="table responsive-table centered table-bordered table-hover title">
                        <thead className="text-white" style={{backgroundColor: "#283747"}}>
                            <tr>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Area </th>
                                <th scope="col"> Registrar </th>
                            </tr>
                        </thead>

                        <tbody className="white">
                        {data.obtenerTablonesPorCorte.map(tablones => (
                            <Tablon key={tablones.id_tablon} tablones={tablones} idNuevoCorte={idNuevoCorte} id_suerte={id_suerte} />
                        ))}
                        </tbody>
                    </table>
                    <Link to={`/suerte/detalle/${id_suerte}`} className="btnlink">Terminar</Link>
                </div>
            </div>
        </div>
     );
}
 
export default AregarTablones;
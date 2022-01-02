import React, { useContext } from 'react';
import Spinner from '../../Spinner'
import Tablon from './Tablon'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { useLocation } from 'react-router-dom'
// GraphQL
import {OBTENER_TABLONES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom';

const AregarTablones = () => {

    const location = useLocation()
    const idNuevoCorte = location.state.data.agregarCorte.id_corte
    const id_corte = location.state.id_corte
    const id_suerte = location.state.id_suerte
    const nombreNuevoCorte = location.state.data.agregarCorte.numero
    const alertaContext = useContext(AlertaContext)
    const { alerta } = alertaContext
    // query hook
    const { data, loading, error } = useQuery(OBTENER_TABLONES_POR_CORTE_QUERY, { variables: {id_corte} })

    if(loading) return <Spinner />
    if(error) return null 

    return ( 
        <div className="row">
            <div className="col-md-7 offset-md-4">
                <div className="center">
                    <h2 className="mb-5 mt-4 black-text fw-bold">Seleccione los tablones que desea registrar en el corte {nombreNuevoCorte}</h2>
                    
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
                    <Link to={`/suerte/detalle/${id_suerte}`} state={{ id_suerte:id_suerte }} className="btnlink">Terminar</Link>
                </div>
            </div>
        </div>
     );
}
 
export default AregarTablones;
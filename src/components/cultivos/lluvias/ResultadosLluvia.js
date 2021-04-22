import React, { Fragment, useState } from 'react';
import Spinner from '../../Spinner'
import ResultadoLluvia from './ResultadoLluvia'
import ModalLluvia from './modals/ModalLluvia'
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
    // Modal lluvias
    const [showLluvia, setShowLluvia] = useState(false)
    const [datosLluvia, setDatosLluvia] = useState(0)
    const [pluviometrol, setPluviometrol] = useState(0)
    const [fecdate, setFecDate] = useState(0)
    const cerrarLluvia = () => setShowLluvia(false)   

    if(loading) return <Spinner />
    if(error) return null
    const rol = sessionStorage.getItem('rol')

    return (
        <Fragment>
            {data.obtenerLluvias.length === 0 ?
                <Fragment>
                    <p>No hay lluvias registradas en este mes.</p>
                    <button type="button" className="btn btn-success btn-sm m-2" onClick={() => setConsulta(false)}>Aceptar</button>
                </Fragment>
            :
                <Fragment>
                    <p className="font-weight-bold text-uppercase">Lluvias de {nuevaFecha} </p>
                    <table className="table responsive-table centered table-striped table-bordered tablalabores table-hover tablaLluvias">
                        <thead className="text-white" style={{backgroundColor: "#283747"}}>
                            <tr>
                                <th scope="col"> Fecha </th>
                                <th scope="col"> Cantidad (MM)</th>
                                {rol === '1' ?
                                    <th scope="col"> Edición </th>
                                :
                                    null
                                }
                            </tr>
                        </thead>
                        <tbody className="white">
                            {data.obtenerLluvias.map(listadoLluvias => (
                            <ResultadoLluvia
                                key={listadoLluvias.id_lluvia} 
                                listadoLluvias={listadoLluvias}
                                fechanueva={fechanueva}
                                id_pluviometro={id_pluviometro}
                                setDatosLluvia={setDatosLluvia}
                                setShowLluvia={setShowLluvia}
                                setPluviometrol={setPluviometrol}
                                setFecDate={setFecDate}
                            />
                            ))}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success btn-sm m-2" onClick={() => setConsulta(false)}>Aceptar</button>
                </Fragment>
            }

            <ModalLluvia
                show={showLluvia}
                datosl={datosLluvia}
                onHide={cerrarLluvia}
                idpluviome={pluviometrol}
                date={fecdate}
            />            
        </Fragment>
    );
}
 
export default ResultadosLluvia;
import React, { Fragment, useState } from 'react';
import Spinner from '../../Spinner'
import LluviaActual from './LluviaActual'
import ModalActuales from './modals/ModalActuales'
// GraphQL
import {OBTENER_LLUVIAS_ACTUALES_QUERY, OBTENER_TOTAL_LLUVIA_ACTUAL_PLUVIOMETRO} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const LluviasActuales = ({pluviometroId, fecha}) => {

    const id_pluviometro = pluviometroId
    const fechanueva = fecha
    // query hook
    const {data, loading, error} = useQuery(OBTENER_LLUVIAS_ACTUALES_QUERY, { variables: {id_pluviometro} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);
    const {data:dataL, loading:loadingL, error:errorL} = useQuery(OBTENER_TOTAL_LLUVIA_ACTUAL_PLUVIOMETRO, { variables: {id_pluviometro} })
    // console.log(dataL);
    // console.log(loadingL);
    // console.log(errorL);
    // Modal actuales
    const [showActuales, setShowActuales] = useState(false)
    const [datosActuales, setDatosActuales] = useState(0)
    const [pluviometroa, setPluviometroa] = useState(0)
    const cerrarActuales = () => setShowActuales(false)

    if(loading) return <Spinner />
    if(error) return null
    if(loadingL) return <Spinner />
    if(errorL) return null
    const rol = sessionStorage.getItem('rol')
    

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
                                {rol === '1' ?
                                    <th scope="col"> Edición </th>
                                :
                                    null
                                }
                            </tr>
                        </thead>
                        <tbody className="white">
                            {data.obtenerLluviasActuales.map(lluviasActuales => (
                                <LluviaActual
                                    key={lluviasActuales.id_lluvia}
                                    lluviasActuales={lluviasActuales}
                                    id_pluviometro={id_pluviometro}
                                    fechanueva={fechanueva}
                                    setDatosActuales={setDatosActuales}
                                    setShowActuales={setShowActuales}
                                    setPluviometroa={setPluviometroa}
                                />
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            }

            <div className="col-12 p-0">
                <div className="col s5 mb-4">
                    <span className="font-weight-bold">
                        Total Lluvias Mes:
                    </span>
                </div>
                <div className="col s7 mb-4" style={{textAlign: 'left'}}>
                    {dataL.obtenerTotalLluviaActualPluviometro === 0 ?
                        <span className="font-weight-bold black-text">
                            0
                        </span>
                    :
                        <span style={{textAlign: 'left'}} className="font-weight-bold black-text">
                            {dataL.obtenerTotalLluviaActualPluviometro}
                        </span>
                    }
                </div>
            </div>

            <ModalActuales
                show={showActuales}
                datosac={datosActuales}
                onHide={cerrarActuales}
                idpluvi={pluviometroa}
            />

        </Fragment>
    );
}
 
export default LluviasActuales;
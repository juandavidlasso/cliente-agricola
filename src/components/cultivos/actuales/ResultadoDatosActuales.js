import React from 'react';
import Spinner from '../../Spinner'
import DatoActual from './DatoActual'
import InformeActual from './InformeActual'
// PDF
import { BlobProvider } from '@react-pdf/renderer'
// GraphQL
import {OBTENER_DATOS_ACTUALES_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ResultadoDatosActuales = ({datoSuertes}) => {

    const nombres = datoSuertes

    // query hook
    const { data, loading, error } = useQuery(OBTENER_DATOS_ACTUALES_QUERY, { variables: {nombres} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null    

    return (
        <div className="col-12 p-2">
            {data.obtenerDatosActuales.length === 0 ? 'No hay datos registrados' : (
                <table className="table responsive-table centered table-bordered table table-hover table-striped title mt-5">
                    <thead className="text-white" style={{backgroundColor: "#37474f"}}>
                        <tr>
                            <th scope="col"> Suerte </th>
                            <th scope="col"> Área </th>
                            <th scope="col"> Variedad </th>
                            <th scope="col"> Zona Agroecológica </th>
                            <th scope="col"> Fecha Último Corte </th>
                            <th scope="col"> ÚLtimo TCH </th>
                            <th scope="col"> Edad Actual (meses) </th>
                            <th scope="col"> # Corte Actual </th>
                        </tr>
                    </thead>

                    <tbody className="white">
                        {data.obtenerDatosActuales.map(actuales => (
                                <DatoActual key={actuales.id_corte} actuales={actuales} />
                            ))
                        }
                        <tr>
                            <td colSpan="11" className="center">
                                <div>
                                    <BlobProvider 
                                        document={ <InformeActual key={data.obtenerDatosActuales.id_corte} data={data} /> }
                                    >
                                        {({ url }) => (
                                            <a href={url} className="btnlink2" target="_blank" rel="noopener noreferrer">Generar Informe</a>
                                        )}
                                    </BlobProvider>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
 
export default ResultadoDatosActuales;
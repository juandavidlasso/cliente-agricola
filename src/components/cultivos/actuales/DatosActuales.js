import React from 'react';
import useTitle from '../../../utils/context/hooks/useSEO'
import Spinner from '../../Spinner'
import DatoActual from './DatoActual'
// GraphQL
import {OBTENER_DATOS_ACTUALES_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const DatosActuales = () => {

    useTitle({ title: 'Datos Actuales' })

    // query hook
    const { data, loading, error } = useQuery(OBTENER_DATOS_ACTUALES_QUERY)
    // console.log(data);
    // console.log(loading);
    // console.log(error);


    if(loading) return <Spinner />
    if(error) return null


    return ( 
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 p-0 right">
            <div className="col-12 mx-auto">
                <h1 className="text-center"> Datos Actuales </h1>
            </div>

            
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
                    </tbody>
                </table>
                )}
            </div>
        </div>
    );
}
 
export default DatosActuales;
import React from 'react';
// GraphQL
import {OBTENER_SUERTES_ASOCIADAS} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ResumenPluviometro = ({pluviometros}) => {

    const {id_pluviometro, nombre, suertesAsociadas, listlluvias} = pluviometros
    // query hook
    const {data, loading, error} = useQuery(OBTENER_SUERTES_ASOCIADAS)
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return null
    if(error) return null

    return (
        <tr key={id_pluviometro}>
            <td>
                {nombre}
                <br />
                {data.obtenerSuertesAsociadas.length === 0 ?
                    'No hay suertes Asociadas'
                :
                    data.obtenerSuertesAsociadas.map(asociadas => (
                        asociadas.nombre === nombre ? asociadas.suertesAsociadas === "" ?
                                null
                            :
                                <span key={asociadas.id_pluviometro} className="font-weight-bold"><i>Suerte {asociadas.suertesAsociadas}</i></span>
                        :
                            null
                    ))
                }
            </td>
            {listlluvias.length === 0 ?
                <td></td>
            :
                <td>
                    {listlluvias.map(lluvias => (
                        <span
                            key={lluvias.id_lluvia}
                            className="white-text left p-1 mr-2 light-blue darken-4"
                            style={{borderRadius: '7px', width: '2rem'}}
                        >
                            {lluvias.cantidad}</span>
                    ))}
                </td>
            }
            <td>{suertesAsociadas}</td>
        </tr>
    );
}
 
export default ResumenPluviometro;
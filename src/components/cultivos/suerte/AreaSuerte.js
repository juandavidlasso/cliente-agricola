import React from 'react';
import Spinner from '../../Spinner'
// GraphQL
import {OBTENER_AREA_SUERTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const AreaSuerte = ({id_suerte}) => {

    // query
    const { data, loading, error } = useQuery(OBTENER_AREA_SUERTE_QUERY, { variables: {id_suerte} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null
    const area = data.obtenerAreaSuerte

    return ( 
        <p className="h5 m-2"> {area === 0 ? 0 : (area).toFixed(2)} </p>
     );
}
 
export default AreaSuerte;
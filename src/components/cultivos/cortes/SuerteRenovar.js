import React, { Fragment } from 'react';
import SuerteRenovarDatos from './SuerteRenovarDatos'
import Spinner from '../../Spinner'
// GraphQL
import {VER_NOMBRE_SUERTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const SuerteRenovar = ({props}) => {

    const id_suerte = props

    // query hook
    const { data, loading, error } = useQuery(VER_NOMBRE_SUERTE_QUERY, { variables: {id_suerte} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null

    const {nombre} = data.obtenerSuerte

    return ( 
        <Fragment>
            <SuerteRenovarDatos nombre={nombre} />
        </Fragment>
        
     );
}
 
export default SuerteRenovar;
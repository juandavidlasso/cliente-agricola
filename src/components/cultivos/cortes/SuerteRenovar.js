import React from 'react';
import SuerteRenovarDatos from './SuerteRenovarDatos'
import Spinner from '../../Spinner'
import { useLocation } from 'react-router-dom'
// GraphQL
import {VER_NOMBRE_SUERTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const SuerteRenovar = () => {

    const location = useLocation()
    const id_suerte = location.state.id_suerte

    // query hook
    const { data, loading, error } = useQuery(VER_NOMBRE_SUERTE_QUERY, { variables: {id_suerte} })

    if(loading) return <Spinner />
    if(error) return null

    const {nombre} = data.obtenerSuerte

    return ( 
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3 p-5">
                    <SuerteRenovarDatos nombre={nombre} />  
                </div>
            </div>
        </div>
    );
}
 
export default SuerteRenovar;
import React, { useContext, useEffect, useState } from 'react';
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Select from 'react-select'
import Spinner from '../../Spinner'
// Graphql
import {OBTENER_NOMBRE_SUERTES_RENOVADAS_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const SelectSuerte = () => {

    //query hook
    const {data, loading, error} = useQuery(OBTENER_NOMBRE_SUERTES_RENOVADAS_QUERY)

    // Estado
    const [suertes, setSuertes] = useState([])
    // Context
    const alertaContext = useContext(AlertaContext)
    const { agregarSuerte } = alertaContext

    useEffect(() => {
        agregarSuerte(suertes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suertes])

    const seleccionarSuertes = suerte => {
        setSuertes(suerte)
    }

    if(loading) return <Spinner />
    if(error) return null

    const {obtenerNombreSuertesRenovadas} = data

    return (
        <Select
            options={obtenerNombreSuertesRenovadas}
            isMulti={true}
            closeMenuOnSelect={false}
            onChange={ opcion => seleccionarSuertes(opcion)}
            placeholder="Seleccione la(s) suerte(s)"
            getOptionValue={ opciones => opciones.id_suerte}
            getOptionLabel={ opciones => opciones.nombre}
        />
    );
}
 
export default SelectSuerte;
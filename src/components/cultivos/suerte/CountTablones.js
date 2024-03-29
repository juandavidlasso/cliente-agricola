import React from 'react'
import Spinner from '../../Spinner'
// GraphQL
import {COUNT_TABLONES_SUERTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const CountTablones = ({props}) => {
    const id_suerte = props

    // query hook
    const { data, loading, error } = useQuery(COUNT_TABLONES_SUERTE_QUERY, { variables: {id_suerte} })

    if(loading) return <Spinner />
    if(error) return null
    const tablones = data.countTablonesPorSuerte

    return (
        <p className="h5 m-2"> {tablones === 0 ? 0 : tablones} </p>
    )
}

export default CountTablones
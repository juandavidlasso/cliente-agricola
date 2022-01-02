import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
// GraphQL
import {OBTENER_AREA_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'


const Cosecha = ({cosecha, props, corte, estado}) => {

    const id_suerte = props
    const { id_corte, fecha_inicio, fecha_corte } = corte

    // query hook
    const { data, loading, error } = useQuery(OBTENER_AREA_CORTE_QUERY, { variables: {id_corte} })

    if(loading) return null
    if(error) return null 

    const {id_cosecha, peso, rendimiento} = cosecha

    // calcular edad de corte
    const finicio = moment(fecha_inicio)
    const fcorte = moment(fecha_corte)
    const edadCorte = fcorte.diff(finicio, 'months', true).toFixed(1)

    // calcular TCH y TCHM
    const area = data.obtenerAreaCorte
    const tch = Number((peso/area).toFixed(1))
    const tchm = Number((tch/edadCorte).toFixed(1)) 
    const rol = sessionStorage.getItem('rol')

    return (
        <tr key={id_cosecha}>
            <th scope="row">{peso}</th>
            <td>{tch}</td>
            <td>{ fecha_corte ? tchm : null}</td>
            <td>{rendimiento ? rendimiento : null}</td>
            {rol === '1' ? estado === true ?
                <td>
                    <Link
                        to={`/cosecha/editar/${id_cosecha}/${id_corte}/${id_suerte}`}
                        state={{ id_cosecha:id_cosecha, id_corte:id_corte, id_suerte:id_suerte }}
                        className="btn btn-warning btn-sm"
                    >
                        Editar
                    </Link>
                </td>
            :
                null
            :
                null
            }
        </tr>
    )
}

export default Cosecha

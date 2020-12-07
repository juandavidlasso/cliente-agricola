import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const AplicacionPlaga = ({data, props, corte, tablon, trapl, estado, fecha_inicio}) => {

    const id_suerte = props
    const id_tablon = tablon
    const id_corte = corte
    const id_trapl = trapl
    //console.log(data.obtenerAplicacionPlagas);
    const {id_apla, fecha} = data.obtenerAplicacionPlagas
    //console.log(id_apla);
    const rol = sessionStorage.getItem('rol')

    return (
        <Fragment>
            <td key={id_apla}>{moment(fecha).format('DD-MM-YYYY')}</td>
            {rol === '1' ? estado === true ?
                <td>
                    <Link to={{
                        pathname: `/plaga-aplicacion/editar/${id_suerte}/${id_corte}/${id_tablon}/${id_trapl}/${id_apla}`,
                        state: {fecha_inicio:fecha_inicio}    
                    }} className="red-text">
                        Editar Fecha
                    </Link>
                </td>
            :
                null
            :
                null
            }
        </Fragment>
    )
}

export default AplicacionPlaga
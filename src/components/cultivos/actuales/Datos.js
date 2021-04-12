import React, { Fragment } from 'react';
import moment from 'moment'

const Datos = ({cosechas, area, renovada, createdAt}) => {
    
    const {id_cosecha, peso} = cosechas
    const TCH = ((peso/area).toFixed(2))
    // Edad actual
    const now = moment().format('YYYY-MM-DD')
    const factual = moment(now)
    const finicio = moment(createdAt)
    const edadActual = factual.diff(finicio, 'months', true).toFixed(1)

    return (
        <Fragment key={id_cosecha}>
            <td>{TCH ? TCH : null}</td>
            <td>{createdAt ? edadActual : null}</td>
            <td>{renovada ? renovada : null}</td>
        </Fragment>
    );
}
 
export default Datos;
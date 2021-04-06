import React, { Fragment } from 'react';
import moment from 'moment'

const Dato = ({cosechas, area, fecha_inicio, suerte_id}) => {
    // extraer datos
    const {id_cosechas, peso} = cosechas
    // datos del ultimo corte
    const ultimoTCH = (peso/(area).toFixed(2))

    // edad actual
    const now = moment().format('YYYY-MM-DD')
    const factual = moment(now)
    const finicio = moment(fecha_inicio)
    const edadActual = factual.diff(finicio, 'months', true).toFixed(1)
    
    // corte actual
    const corteActual = suerte_id

    return (
        <Fragment key={id_cosechas}>
            <td>{ultimoTCH ? (ultimoTCH).toFixed(2) : null}</td>
            <td>{edadActual ? edadActual : null}</td>
            <td>{corteActual}</td>
        </Fragment>
    );
}
 
export default Dato;
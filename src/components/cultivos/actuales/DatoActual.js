import React from 'react';
import moment from 'moment'

const DatoActual = ({actuales}) => {

    // datos del corte viejo
    const { id_corte, fecha_inicio, fecha_corte, listcosechas, suertePadre } = actuales
    
    
    // datos de la cosecha vieja
    const { peso } = listcosechas[0]

    // datos de la suerte actual
    // zona es la fecha de inicio del corte actual
    // renovada es el numero de corte actual
    // createdAt es el area de la suerte vieja
    const { nombre, area, variedad, zona, renovada, createdAt } = suertePadre


    // datos de la suerte actual
    const suerteActual = nombre
    const areaActual = area
    const variedadActual = variedad


    // datos del corte actual
    const numeroCorteActual = renovada
    const now = moment().format('YYYY-MM-DD')
    const factual = moment(now)
    const finicio = moment(zona)
    const edadActual = factual.diff(finicio, 'months', true).toFixed(1)


    // datos del corte viejo
    const fechaCorteAnterior = fecha_corte


    // datos de la ultima cosecha
    const areaVieja = Number(parseFloat(createdAt)).toFixed(2)
    const fcorte = moment(fecha_corte)
    const finicioviejo = moment(fecha_inicio)
    const edadUltimoCorte = fcorte.diff(finicioviejo, 'months', true).toFixed(1)
    const ultimoTCH = Number((peso/areaVieja).toFixed(1))
    const ultimoTCHM = Number((ultimoTCH/edadUltimoCorte).toFixed(1)) 

    return ( 
        <tr key={id_corte}>
            <td>{suerteActual}</td>
            <td className={areaActual ? null : 'red accent-1'}>{areaActual ? areaActual : null}</td>
            <td>{variedadActual}</td>
            <td className={numeroCorteActual ? null : 'red accent-1'}>{numeroCorteActual ? numeroCorteActual : null}</td>
            <td className={zona ? null : 'red accent-1'}>{zona ? edadActual : null}</td>
            <td>{edadUltimoCorte}</td>
            <td>{fechaCorteAnterior}</td>
            <td>{ultimoTCH}</td>
            <td>{ultimoTCHM}</td>
        </tr>
     );
}
 
export default DatoActual;
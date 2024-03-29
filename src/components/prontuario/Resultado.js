import React from 'react'
import moment from 'moment'

const Resultado = ({cosecha}) => {

    const finicio = moment(cosecha.cortePadre.fecha_inicio)
    const fcorte = moment(cosecha.cortePadre.fecha_corte)
    const edadCorte = fcorte.diff(finicio, 'months', true).toFixed(1)
    const tch = Number((cosecha.peso/cosecha.cortePadre.area).toFixed(1))
    const tchm = Number((tch/edadCorte).toFixed(1))
    
    return (
        <tr key={cosecha.id_cosecha} style={{fontSize: '13px'}}>
            <td>{cosecha.cortePadre.suertePadre.nombre}</td>
            <td>{cosecha.cortePadre.area ? (cosecha.cortePadre.area).toFixed(1) : 0}</td>
            <td>{cosecha.cortePadre.suertePadre.variedad}</td>
            <td>{cosecha.cortePadre.numero}</td>
            <td>{cosecha.cortePadre.fecha_siembra}</td>
            <td>{cosecha.cortePadre.fecha_corte}</td>
            <td>{edadCorte}</td>
            <td>{tch}</td>
            <td>{tchm}</td>
            <td>{cosecha.peso}</td>
            <td>{cosecha.rendimiento} </td>
            <td>{cosecha.numeroVagones ? cosecha.numeroVagones : null} </td>
            <td>{cosecha.numeroMulas ? cosecha.numeroMulas : null} </td>
        </tr>  
    )
}

export default Resultado
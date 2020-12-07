import React from 'react'
import moment from 'moment'

const Lluvia = ({lluvia}) => {

    const {id_lluvia, fecha, cantidad} = lluvia

    return (
        <tr key={id_lluvia}>
            <td className="celda1">{fecha ? (<p>{moment(fecha).format('DD-MM-YYYY')}</p>) : (<p>Sin registro</p>) }</td>
            <td>{cantidad ? (<p>{cantidad} mm</p>) : (<p>Sin registro</p>) }</td>
        </tr>
    )
}

export default Lluvia
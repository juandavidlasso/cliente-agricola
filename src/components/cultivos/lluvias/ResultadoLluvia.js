import React from 'react';

const ResultadoLluvia = ({listadoLluvias}) => {

    const {cantidad, fecha, id_lluvia} = listadoLluvias

    return ( 
        <tr key={id_lluvia}>
            <td>{fecha}</td>
            <td>{cantidad}</td>
        </tr>
    );
}
 
export default ResultadoLluvia;
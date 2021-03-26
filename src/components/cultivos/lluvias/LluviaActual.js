import React from 'react';

const LluviaActual = ({lluviasActuales}) => {

    const {id_lluvia, fecha, cantidad} = lluviasActuales
    // const mes = pluviometro_id

    return ( 
        <tr key={id_lluvia}>
            <td>{fecha}</td>
            <td>{cantidad}</td>
            {/* <td>{mes}</td> */}
        </tr>
    );
}
 
export default LluviaActual;
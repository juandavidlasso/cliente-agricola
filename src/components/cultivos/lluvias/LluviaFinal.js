import React from 'react';

const LluviaFinal = ({lluviasAno}) => {

    const {cantidad, fecha, id_lluvia} = lluviasAno

    return (
        <tr key={id_lluvia}>
            <td className="text-uppercase">{fecha}</td>
            <td>{cantidad}</td>
        </tr>
    );
}
 
export default LluviaFinal;
import React from 'react';

const Lluvia = ({lluvia}) => {

    const { id_lluvia, cantidad, fecha} = lluvia

    return (
        <tr key={id_lluvia}>
            <td>{fecha}</td>
            <td>{cantidad}</td>
        </tr>
    );
}
 
export default Lluvia;
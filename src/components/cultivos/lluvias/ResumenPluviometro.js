import React from 'react';

const ResumenPluviometro = ({pluviometros}) => {

    const {id_pluviometro, nombre, suertesAsociadas, listlluvias} = pluviometros

    return (
        <tr key={id_pluviometro}>
            <td>{nombre}</td>
            {listlluvias.length === 0 ?
                <td></td>
            :
                <td>
                    {listlluvias.map(lluvias => (
                        <span
                            key={lluvias.id_lluvia}
                            className="white-text left p-1 mr-2 light-blue darken-4"
                            style={{borderRadius: '7px', width: '2rem'}}
                        >
                            {lluvias.cantidad}</span>
                    ))}
                </td>
            }
            <td>{suertesAsociadas}</td>
        </tr>
    );
}
 
export default ResumenPluviometro;
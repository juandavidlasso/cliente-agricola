import React from 'react';

const ResumenLluvia = ({pluviometros, datos}) => {

    const {id_pluviometro, nombre} = pluviometros

    return (
        <tr key={id_pluviometro}>
            <td>{nombre}</td>
            {datos.length === 0 ?
                <td></td> 
            :
                datos.map(lluvias => (
                    lluvias.pluviometro_id === id_pluviometro ?
                        <div key={lluvias.id_lluvia}
                            className="white-text left ml-2 pt-1 pb-1 mt-1 mb-1 light-blue darken-4 center"
                            style={{borderRadius: '7px', width: '4.9rem'}}
                        >
                            <span>
                                {lluvias.fecha} <br /> {lluvias.cantidad}
                            </span>
                        </div>
                    :
                        null
                ))
            }
        </tr>
    );
}
 
export default ResumenLluvia;
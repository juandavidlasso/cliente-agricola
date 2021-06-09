import React from 'react';

const ResumenPluviometro = ({pluviometros, dataSuertes}) => {

    const {id_pluviometro, nombre, suertesAsociadas, listlluvias} = pluviometros

    return (
        <tr key={id_pluviometro}>
            <td>
                {nombre}
                <br />
                {dataSuertes.length === 0 ?
                    'No hay suertes Asociadas'
                :
                    dataSuertes.map(asociadas => (
                        asociadas.nombre === nombre ? asociadas.suertesAsociadas === "" ?
                                null
                            :
                                <span key={asociadas.id_pluviometro} className="font-weight-bold"><i>Suerte {asociadas.suertesAsociadas}</i></span>
                        :
                            null
                    ))
                }
            </td>
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
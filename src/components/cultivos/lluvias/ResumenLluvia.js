import React from 'react';

const ResumenLluvia = ({pluviometros, datos, suertesAso, total}) => {

    const {id_pluviometro, nombre} = pluviometros

    return (
        <tr key={id_pluviometro}>
            <td>
                {nombre}
                <br />
                {suertesAso.length === 0 ?
                    'No hay suertes Asociadas'
                :
                    suertesAso.map(asociadas => (
                        asociadas.nombre === nombre ? asociadas.suertesAsociadas === "" ?
                                null
                            :
                                <span key={asociadas.id_pluviometro} className="font-weight-bold"><i>Suerte {asociadas.suertesAsociadas}</i></span>
                        :
                            null
                    ))
                }
            </td>
            <td className="ml-0 pl-0">
                {datos.length === 0 ?
                    <td></td> 
                :
                    datos.map(lluvias => (
                        lluvias.pluviometro_id === id_pluviometro ?
                            <div key={lluvias.id_lluvia}
                                className="white-text left ml-1 pt-1 pb-1 mt-1 mb-1 light-blue darken-4 center"
                                style={{borderRadius: '7px', width: '2.9rem', fontSize: '.6rem'}}
                            >
                                <span>
                                    {lluvias.fecha} <br /> {lluvias.cantidad}
                                </span>
                            </div>
                        :
                            null
                    ))
                }
            </td>
            <td>
                {total.length === 0 ?
                    'No hay lluvia registrada'
                :
                    total.map(totales => (
                        totales.pluviometro_id === id_pluviometro ?
                            <div key={totales.id_lluvia}
                                className="white-text left ml-2 pt-1 pb-1 mt-1 mb-1 light-blue darken-4 d-flex justify-content-center align-items-center"
                                style={{borderRadius: '7px', width: '3.4rem', height: '3rem', fontSize: '1rem'}}
                            >
                                <span>
                                    {(totales.cantidad).toFixed(2)}
                                </span>
                            </div>
                        :
                            null
                    ))
                }
            </td>
        </tr>
    );
}
 
export default ResumenLluvia;
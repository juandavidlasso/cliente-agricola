import React from 'react';

const ResumenLluvia = ({pluviometros, datos, suertesAso, total, listaMeses}) => {

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
                                <span key={asociadas.id_pluviometro} className="fw-bold"><i>Suerte {asociadas.suertesAsociadas}</i></span>
                        :
                            null
                    ))
                }
            </td>
            {listaMeses.map(meses => (
                <td key={meses.idMes}>
                    {datos.length === 0 ?
                        null
                    :
                        datos.map(lluvias => {
                            const {id_lluvia, fecha, cantidad, pluviometro_id} = lluvias
                            const fechaLluvia = Number(fecha.split('-')[1])
                            return (
                                pluviometro_id === id_pluviometro ? fechaLluvia === meses.idMes ?
                                    <div key={id_lluvia}
                                        className="white-text light-blue darken-4 p-2"
                                        style={{borderRadius: '7px', width: '3rem', fontSize: '.9rem'}}
                                    >
                                        <span>
                                            {cantidad}
                                        </span>
                                    </div>
                                :
                                    null
                                :
                                    null
                            )
                        })
                    }
                </td>
            ))}
            <td>
                {total.length === 0 ?
                    0
                :
                    total.map(totales => (
                        totales.pluviometro_id === id_pluviometro ?
                            <div key={totales.id_lluvia}
                                className="white-text light-blue darken-4 p-2"
                                style={{borderRadius: '7px', width: '3.4rem', fontSize: '1rem'}}
                            >
                                <span>
                                    {(totales.cantidad).toFixed(1)}
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
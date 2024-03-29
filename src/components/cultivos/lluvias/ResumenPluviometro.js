import React from 'react';

const ResumenPluviometro = ({pluviometros, dataSuertes, listaDias}) => {

    const {id_pluviometro, nombre, suertesAsociadas, listlluvias} = pluviometros
    const total = Number(suertesAsociadas)

    return (
        <tr key={id_pluviometro}>
            <td>
                <span style={{fontSize: '.9rem'}}>{nombre}</span>
                <br />
                {dataSuertes.length === 0 ?
                    'No hay suertes Asociadas'
                :
                    dataSuertes.map(asociadas => (
                        asociadas.nombre === nombre ? asociadas.suertesAsociadas === "" ?
                                null
                            :
                                <span key={asociadas.id_pluviometro} className="fw-bold" style={{fontSize: '.8rem'}}><i>Suerte {asociadas.suertesAsociadas}</i></span>
                        :
                            null
                    ))
                }
            </td>
            {listaDias.map(dias => (
                <td key={dias.idDia}>
                    {listlluvias.length === 0 ?
                        null
                    :
                        listlluvias.map(lluvias => {
                            const {id_lluvia, cantidad, fecha} = lluvias
                            const nuevaFecha = Number(fecha.split('-')[2])
                            var fechaNueva
                            nuevaFecha[0] === 0 ? fechaNueva = nuevaFecha.slice(1) : fechaNueva = nuevaFecha
                            return (
                                fechaNueva === dias.dia ?
                                    <span
                                        key={id_lluvia}
                                        className="white-text light-blue darken-4 p-2"
                                        style={{borderRadius: '7px'}}
                                    >
                                        {cantidad}
                                    </span>
                                :
                                    null
                            )
                        })
                    }
                </td>
            ))}
            <td>{(total).toFixed(0)}</td>
        </tr>
    );
}
 
export default ResumenPluviometro;
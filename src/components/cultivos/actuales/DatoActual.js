import React, { Fragment } from 'react';
import Datos from './Datos'

const DatoActual = ({actuales}) => {

    // datos suerte actual
    const {id_corte, area, fecha_inicio, fecha_corte, listcosechas, suertePadre} = actuales
    const {nombre, variedad, zona, renovada, createdAt} = suertePadre
    const areaActual = Number(fecha_inicio)

    return (
        <tr key={id_corte}>
            <td>{nombre}</td>
            <td>{areaActual ? (areaActual).toFixed(2) : null}</td>
            <td>{variedad}</td>
            <td>{zona}</td>
            <td>{fecha_corte}</td>
            {listcosechas.length === 0 ?
                <Fragment>
                    <td></td>
                    <td></td>
                    <td></td>
                </Fragment>
            :
                listcosechas.map(cosechas => (
                    <Datos
                        key={cosechas.id_cosecha}
                        cosechas={cosechas}
                        area={area}
                        renovada={renovada}
                        createdAt={createdAt}
                    />
                ))
            }
        </tr>
     );
}
 
export default DatoActual;
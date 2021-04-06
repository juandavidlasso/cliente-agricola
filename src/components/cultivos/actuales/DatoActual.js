import React, { Fragment } from 'react';
import Datos from './Datos'

const DatoActual = ({actuales}) => {

    // datos suerte actual
    const {id_suerte, nombre, variedad, zona, listcortes} = actuales

    return (
        <tr key={id_suerte}>
            <td>{nombre}</td>
            {/* <td>10</td> */}
            <td>{variedad}</td>
            <td>{zona}</td>
            {listcortes.length === 0 ?
                <Fragment>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </Fragment>
            :
                listcortes.map(cortes => (
                    <Datos key={cortes.id_corte} cortes={cortes} />
                ))
            }
        </tr>
     );
}
 
export default DatoActual;
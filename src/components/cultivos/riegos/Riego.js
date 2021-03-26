import React, { Fragment } from 'react';
import Tabloncito from './Tabloncito';

const Riego = ({riegos, lisTablones, id_corte}) => {

    const {id_riego,fecha,num_riego} = riegos

    return (
        <tr key={id_riego}>
            <td>{fecha}</td>
            <td style={{textAlign: 'left'}}>
                {lisTablones.length === 0 ?
                    'No hay tablones registrados'
                :
                    <Fragment>
                        {lisTablones.map(listado => (
                            <Tabloncito
                                key={listado.id_tablon}
                                listado={listado}
                                id_riego={id_riego}
                                id_corte={id_corte}
                            />
                        ))}
                    </Fragment>
                }
            </td>
            <td>{num_riego}</td>
        </tr>
    );
}
 
export default Riego;
import React, { Fragment } from 'react';
import Dato from './Dato'
import moment from 'moment'

const Datos = ({cortes}) => {
    // extraer datos
    const {area, fecha_inicio, fecha_corte, id_corte, numero, suerte_id, listcosechas} = cortes
    // datos del corte viejo
    const fechaUltimoCorte = moment(fecha_corte).format('DD-MM-YYYY')

    return (
        <Fragment key={id_corte}>
            <td>{fechaUltimoCorte ? fechaUltimoCorte : null}</td>
            {listcosechas.length === 0 ?
                null
            :
                listcosechas.map(cosechas => (
                    <Dato
                        key={cosechas.id_cosecha}
                        cosechas={cosechas}
                        area={area}
                        fecha_inicio={fecha_inicio}
                        numero={numero}
                        suerte_id={suerte_id}
                    />
                ))
            }
        </Fragment>
    );
}
 
export default Datos;
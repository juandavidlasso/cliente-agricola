import React, { Fragment } from 'react';
import DatoTH from './DatoTH'

const DatosTH = ({data, apheid}) => {

    return ( 
        <Fragment>
            {data.obtenerTherbicidaPorAplicacion.map(tratamientos => (
                <DatoTH key={tratamientos.id_trahe} tratamientos={tratamientos} apheid={apheid} />
            ))}
        </Fragment>
    );
}
 
export default DatosTH;
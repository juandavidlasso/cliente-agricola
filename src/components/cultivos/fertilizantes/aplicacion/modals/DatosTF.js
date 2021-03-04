import React, { Fragment } from 'react';
import DatoTF from './DatoTF'

const DatosTF = ({data, apfeid}) => {

    return ( 
        <Fragment>
            {data.obtenerTRFEPorAplicacion.length === 0 ? 'No hay tratamientos registrados' :
                <Fragment>
                    {data.obtenerTRFEPorAplicacion.map(tratamientosF => (
                        <DatoTF 
                            key={tratamientosF.id_trafe} 
                            tratamientosF={tratamientosF} 
                            apfeid={apfeid}
                        />
                    ))}
                </Fragment>
            }
        </Fragment>
    );
}
 
export default DatosTF;
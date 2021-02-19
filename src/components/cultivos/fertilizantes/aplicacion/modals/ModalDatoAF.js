import React from 'react';
import DatoAF from './DatoAF'
import Dropdown from 'react-bootstrap/Dropdown'

const ModalDatoAF = ({listado, afertilizantes}) => {

    const { id_suerte, nombre, listcortes } = listado
    

    return ( 
        <Dropdown key={id_suerte} className="d-inline-block mr-2 mb-2">
            <Dropdown.Toggle id="dropdown-basic"  style={{backgroundColor: "#b71c1c", color: 'white'}}>
                Suerte {nombre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {listcortes.map(cortes => (
                    <DatoAF key={cortes.id_corte} cortes={cortes} afertilizantes={afertilizantes} />
                ))}
            </Dropdown.Menu>
        </Dropdown>
     );
}
 
export default ModalDatoAF;
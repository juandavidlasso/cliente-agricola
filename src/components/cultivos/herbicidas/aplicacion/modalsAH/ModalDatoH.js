import React from 'react';
import DatoH from './DatoH'
import Dropdown from 'react-bootstrap/Dropdown'

const ModalDatoH = ({listado, aherbicidas}) => {

    const { id_suerte, nombre, listcortes } = listado

    return ( 
        <Dropdown key={id_suerte} className="d-inline-block mr-2 mb-2">
            <Dropdown.Toggle id="dropdown-basic"  style={{backgroundColor: "#b71c1c", color: 'white'}}>
                Suerte {nombre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {listcortes.map(cortes => (
                    <DatoH key={cortes.id_corte} cortes={cortes} aherbicidas={aherbicidas} />
                ))}
            </Dropdown.Menu>
        </Dropdown>
     );
}
 
export default ModalDatoH;
import React from 'react';
import Dato from './Dato'
import Dropdown from 'react-bootstrap/Dropdown'

const ModalDato = ({listado, labor}) => {

    const { id_suerte, nombre, listcortes } = listado
    

    return ( 
        <Dropdown key={id_suerte} className="d-inline-block mr-2 mb-2">
            <Dropdown.Toggle id="dropdown-basic"  style={{backgroundColor: "#b71c1c", color: 'white'}}>
                Suerte {nombre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {listcortes.map(cortes => (
                    <Dato key={cortes.id_corte} cortes={cortes} labor={labor} />
                ))}
            </Dropdown.Menu>
        </Dropdown>
     );
}
 
export default ModalDato;
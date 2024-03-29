import React from 'react';
import DatoAF from './DatoAF'
import Dropdown from 'react-bootstrap/Dropdown'

const ModalDatoAF = ({listado, afertilizantes, setTF, setUserIdApfe}) => {

    const { id_suerte, nombre, listcortes } = listado
    

    return ( 
        <Dropdown key={id_suerte} className="d-inline-block me-2 mb-2">
            <Dropdown.Toggle id="dropdown-basic"  style={{backgroundColor: "#b71c1c", color: 'white', width: '115px'}}>
                Suerte {nombre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {listcortes.map(cortes => (
                    <DatoAF 
                        key={cortes.id_corte} 
                        cortes={cortes} 
                        afertilizantes={afertilizantes}
                        setTF={setTF}
                        setUserIdApfe={setUserIdApfe}
                    />
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
 
export default ModalDatoAF;
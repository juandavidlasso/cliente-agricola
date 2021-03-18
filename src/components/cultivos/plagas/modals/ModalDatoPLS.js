import React from 'react';
import DatosPLS from './DatosPLS'
import { Dropdown } from 'react-bootstrap'

const ModalDatoPLS = ({listadoNuevo, tratamientopl, aplicacionpl}) => {

    const {id_suerte, nombre, listcortes} = listadoNuevo

    return ( 
        <Dropdown key={id_suerte} className="d-inline-block m-1">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Suerte {nombre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {listcortes.length === 0 ?
                    'No hay cortes registrados'
                : 
                    listcortes.map(listadoCortes => (
                        <DatosPLS
                            key={listadoCortes.id_corte}
                            listadoCortes={listadoCortes}
                            tratamientopl={tratamientopl}
                            aplicacionpl={aplicacionpl}
                        />
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}
 
export default ModalDatoPLS;
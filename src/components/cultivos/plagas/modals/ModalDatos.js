import React from 'react';
import ModalDato from './ModalDato'
import { Dropdown } from 'react-bootstrap'

const ModalDatos = ({listadoNuevo, trapl, fecha}) => {

    const {id_suerte, nombre, listcortes} = listadoNuevo

    return (
        <Dropdown key={id_suerte} className="d-inline-block m-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Suerte {nombre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {listcortes.length === 0 ?
                    'No hay cortes registrados'
                :
                    listcortes.map(listadoCortes => (
                        <ModalDato 
                            key={listadoCortes.id_corte}
                            listadoCortes={listadoCortes}
                            trapl={trapl}
                            fecha={fecha}
                        />
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}
 
export default ModalDatos;
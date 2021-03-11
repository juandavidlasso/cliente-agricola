import React from 'react';
import Dato from './Dato'
import { DropdownButton, ButtonGroup } from 'react-bootstrap'

const ModalDato = ({listadoCortes, trapl, fecha}) => {

    const {id_corte, numero, fecha_inicio, fecha_corte, listTablones} = listadoCortes

    return (
        <DropdownButton
            as={ButtonGroup}
            key={id_corte}
            className="m-2 white-text"
            drop={`right`}
            title={`Corte ${numero}`}
            variant="danger"
        >
            {listTablones.length === 0 ?
                'No hay tablones registrados'
            :  
                listTablones.map(listadoTablones => (
                    <Dato 
                        key={listadoTablones.id_tablon}
                        listadoTablones={listadoTablones}
                        trapl={trapl}
                        fecha={fecha}
                        id_corte={id_corte}
                        fecha_inicio={fecha_inicio}
                        fecha_corte={fecha_corte}
                    />
                ))
            }
        </DropdownButton>    
    );
}
 
export default ModalDato;
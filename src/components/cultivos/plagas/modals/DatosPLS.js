import React from 'react';
import DatoPLS from './DatoPLS'
import { DropdownButton, ButtonGroup } from 'react-bootstrap'

const DatosPLS = ({listadoCortes, tratamientopl, aplicacionpl}) => {

    const {id_corte, numero, fecha_inicio, fecha_corte, listTablones} = listadoCortes

    return ( 
        <DropdownButton
            as={ButtonGroup}
            key={id_corte}
            drop={`right`}
            variant="danger"
            title={`Corte ${numero}`}
            className="m-1"
        >
            {listTablones.length === 0 ?
                'No hay tablones registrados'
            :   
                listTablones.map(listadoTablones => (
                    <DatoPLS
                        key={listadoTablones.id_tablon}
                        listadoTablones={listadoTablones}
                        tratamientopl={tratamientopl}
                        aplicacionpl={aplicacionpl}
                        fecha_inicio={fecha_inicio}
                        fecha_corte={fecha_corte}
                        id_corte={id_corte}
                    />
                ))
            }
        </DropdownButton>
    );
}
 
export default DatosPLS;
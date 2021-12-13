import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import DatosContext from '../context/datos/datosContext'

const SelectAno = ({listaYear}) => {

    // Estado
    const [yearLluvia, setYearLluvia] = useState('')
    // Context
    const datosContext = useContext(DatosContext)
    const { agregarAnoLluvia } = datosContext

    useEffect(() => {
        agregarAnoLluvia(yearLluvia)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearLluvia])

    const seleccionarAno = ano => {
        setYearLluvia(ano)
    }

    return (
        <Select
            options={listaYear}
            closeMenuOnSelect={true}
            className="selectAno"
            onChange={ opcion => seleccionarAno(opcion)}
            placeholder="Seleccione el año"
            getOptionValue={ opciones => opciones.idAno}
            getOptionLabel={ opciones => opciones.year}
        />
    );
}
 
export default SelectAno;
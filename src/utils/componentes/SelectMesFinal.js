import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import DatosContext from '../context/datos/datosContext'

const mesesF = [
    {idFinal: 0, mes: '--'},
    {idFinal: 1, mes: 'Enero'},{idFinal: 2, mes: 'Febrero'},{idFinal: 3, mes: 'Marzo'},
    {idFinal: 4, mes: 'Abril'},{idFinal: 5, mes: 'Mayo'},{idFinal: 6, mes: 'Junio'},
    {idFinal: 7, mes: 'Julio'},{idFinal: 8, mes: 'Agosto'},{idFinal: 9, mes: 'Septiembre'},
    {idFinal: 10, mes: 'Octubre'},{idFinal: 11, mes: 'Noviembre'},{idFinal: 12, mes: 'Diciembre'}
]

const SelectMesFinal = () => {

    // Estado
    const [mesFin, setMesFin] = useState('')
    // Context
    const datosContext = useContext(DatosContext)
    const { agregarMesFinal } = datosContext

    useEffect(() => {
        agregarMesFinal(mesFin)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mesFin])

    const seleccionarMesFinal = mes => {
        setMesFin(mes)
    }

    return (
        <Select
            options={mesesF}
            closeMenuOnSelect={true}
            onChange={ opcion => seleccionarMesFinal(opcion)}
            placeholder="Seleccione el mes final"
            getOptionValue={ opciones => opciones.idFinal}
            getOptionLabel={ opciones => opciones.mes}
        />
    );
}
 
export default SelectMesFinal;
import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import DatosContext from '../context/datos/datosContext'

const mesesI = [
    {idInicial: 0, mes: '--'},
    {idInicial: 1, mes: 'Enero'},{idInicial: 2, mes: 'Febrero'},{idInicial: 3, mes: 'Marzo'},
    {idInicial: 4, mes: 'Abril'},{idInicial: 5, mes: 'Mayo'},{idInicial: 6, mes: 'Junio'},
    {idInicial: 7, mes: 'Julio'},{idInicial: 8, mes: 'Agosto'},{idInicial: 9, mes: 'Septiembre'},
    {idInicial: 10, mes: 'Octubre'},{idInicial: 11, mes: 'Noviembre'},{idInicial: 12, mes: 'Diciembre'}
]

const SelectMesInicial = () => {

    // Estado
    const [mesIni, setMesIni] = useState('')
    // Context
    const datosContext = useContext(DatosContext)
    const { agregarMesInicial } = datosContext

    useEffect(() => {
        agregarMesInicial(mesIni)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mesIni])

    const seleccionarMesInicial = mes => {
        setMesIni(mes)
    }    

    return (
        <Select
            options={mesesI}
            closeMenuOnSelect={true}
            onChange={ opcion => seleccionarMesInicial(opcion)}
            placeholder="Seleccione el mes inicial"
            getOptionValue={ opciones => opciones.idInicial}
            getOptionLabel={ opciones => opciones.mes}
        />
    );
}
 
export default SelectMesInicial;
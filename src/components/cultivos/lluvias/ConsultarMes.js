import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import Select from 'react-select'

// Llenar combo con los años
var array = []
const obtenerAnos = () => {
    var myDate = new Date();
    const yearFull = myDate.getFullYear();
    var j = 1
    for(var i = yearFull; i > 1999; i--){
        var nuevoYear = {
            idAno: j,
            year: i
        }
        array.push(nuevoYear)
        j++
    }
}

// Llenar combo con los meses
const mesesF = [
    {idMes: 1, mes: 'Enero'},{idMes: 2, mes: 'Febrero'},{idMes: 3, mes: 'Marzo'},
    {idMes: 4, mes: 'Abril'},{idMes: 5, mes: 'Mayo'},{idMes: 6, mes: 'Junio'},
    {idMes: 7, mes: 'Julio'},{idMes: 8, mes: 'Agosto'},{idMes: 9, mes: 'Septiembre'},
    {idMes: 10, mes: 'Octubre'},{idMes: 11, mes: 'Noviembre'},{idMes: 12, mes: 'Diciembre'}
]

const ConsultarMes = ({setBuscarMes, setLluviasMes, setMesLluvia, setAnoLluvia}) => {

    // Estado
    const [mesFin, setMesFin] = useState('')
    const [yearLluvia, setYearLluvia] = useState('')

    useEffect(() => {
        obtenerAnos()
    },[])

    // Obtener ano
    const seleccionarAno = ano => {
        setYearLluvia(ano)
    }

    // Obtener mes
    const seleccionarMes = mes => {
        setMesFin(mes)
    }

    // Submit
    const submitLluviasMes = async (e) => {
        e.preventDefault()

        if(!yearLluvia || !mesFin) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar el año y el mes',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false
            })
            return
        }

        await setMesLluvia(mesFin)
        await setAnoLluvia(yearLluvia)
        await setLluviasMes(true)
    }

    return (
        <div className="col-12 p-2">
            <form onSubmit={submitLluviasMes}>
                <div className='col s6 d-flex justify-content-center align-items-center p-4'>
                    <div style={{width: '70%'}}>
                        <Select
                            options={array}
                            closeMenuOnSelect={true}
                            className="selectAno"
                            onChange={ opcion => seleccionarAno(opcion)}
                            placeholder="Seleccione el año"
                            getOptionValue={ opciones => opciones.idAno}
                            getOptionLabel={ opciones => opciones.year}
                        />
                    </div>
                </div>
                <div className='col s6 d-flex justify-content-center align-items-center p-4'>
                    <div style={{width: '70%'}}>
                        <Select
                            options={mesesF}
                            closeMenuOnSelect={true}
                            className="selectAno"
                            onChange={ opcion => seleccionarMes(opcion)}
                            placeholder="Seleccione el mes"
                            getOptionValue={ opciones => opciones.idMes}
                            getOptionLabel={ opciones => opciones.mes}
                        />
                    </div>
                </div>
                <div className="col s12 p-3 center">
                    <input type="submit" value="Consultar" className="btnlink2" />
                </div>
            </form>
            <div className="d-grid gap-2 p-2">
                <button type="button" className="btn white-text btncerrar mt-3" onClick={() => setBuscarMes(false)}>Cerrar</button>
            </div>
        </div>
    );
}
 
export default ConsultarMes;
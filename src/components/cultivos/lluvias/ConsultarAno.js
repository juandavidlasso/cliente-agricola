import React, { useState, Fragment, useEffect, useContext } from 'react';
import ResumenAno from './ResumenAno';
import Spinner from '../../Spinner'
import Swal from 'sweetalert2'
import Select from 'react-select'
import DatosContext from '../../../utils/context/datos/datosContext';
// GraphQL
import {OBTENER_SUERTES_ASOCIADAS, OBTENER_TOTAL_PLUVIOMETROS} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

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

const ConsultarAno = ({setResumenAno}) => {

    // query hook
    const {data, loading, error} = useQuery(OBTENER_SUERTES_ASOCIADAS)

    const {data:dataP, loading:loadingP, error:errorP} = useQuery(OBTENER_TOTAL_PLUVIOMETROS)

    // Estado
    const [verResultado, setVerResultado] = useState(false)
    const [yearLluvia, setYearLluvia] = useState('')
    const [fecdate, setFecDate] = useState(0)
    // Context
    const datosContext = useContext(DatosContext)
    const { agregarAnoLluvia } = datosContext
    const {anoLluvia} = datosContext

    useEffect(() => {
        obtenerAnos()
    },[])

    useEffect(() => {
        agregarAnoLluvia(yearLluvia)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearLluvia])

    const seleccionarAno = ano => {
        setYearLluvia(ano)
    }

    if(loading) return <Spinner />
    if(error) return null
    if(loadingP) return <Spinner />
    if(errorP) return null
    const {obtenerSuertesAsociadas} = data
    const {obtenerTotalPluviometros} = dataP

    // consultar solo año
    const consultarYear1 = async(e) => {
        e.preventDefault()

        const {year} = anoLluvia

        if(year===undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar el año',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
            return
        }
        setFecDate(year)
        setVerResultado(true)
    }

    return (
        <Fragment>
            <div className="col-4 offset-4 p-2">
                <form onSubmit={consultarYear1}>
                    <Select
                            options={array}
                            closeMenuOnSelect={true}
                            className="selectAno"
                            onChange={ opcion => seleccionarAno(opcion)}
                            placeholder="Seleccione el año"
                            getOptionValue={ opciones => opciones.idAno}
                            getOptionLabel={ opciones => opciones.year}
                    />
                    <div className="input-field center">
                        <input type="submit" value="Consultar" className="btnlink2" />
                    </div>
                </form>
            </div>

            {verResultado === true ?
                <ResumenAno fecdate={fecdate} suertesAso={obtenerSuertesAsociadas} totalP={obtenerTotalPluviometros} />
            :
                null
            }
            <div className="d-grid gap-2 p-2">
                <button type="button" className="btn white-text btncerrar mt-3" onClick={() => setResumenAno(false)}>Cerrar</button>
            </div>
        </Fragment>
    );
}
 
export default ConsultarAno;
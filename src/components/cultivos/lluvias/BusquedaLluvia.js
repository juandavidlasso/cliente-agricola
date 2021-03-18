import React, { useState } from 'react';
import ResultadosLluvia from './ResultadosLluvia'
import LluviasFinales from './LluviasFinales'
import Swal from 'sweetalert2'

const BusquedaLluvia = ({pluviometroId}) => {

    // Estado
    const [datoBusqueda, setDatoBusqueda] = useState({
        fecha: '',
        year: ''
    })
    const [consulta, setConsulta] = useState(false)
    const [consultaYear, setConsultaYear] = useState(false)

    //actualizar estado
    const actualizarState = e => {
        setDatoBusqueda({
            ...datoBusqueda,
            [e.target.name]: e.target.value
        })
    }

    const {fecha, year} = datoBusqueda

    // abrir consulta
    const consultar = () => {
        if(fecha.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar la fecha.',
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

        setConsulta(true)
    }

    // consultar solo año
    const consultarYear = () => {
        if(year <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar el año.',
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

        if(isNaN(year)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El año debe ser numérico.',
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
        setConsultaYear(true)
    }

    return ( 
        <div className="blue-grey lighten-5 p-2">
            <div className="row">
            <div className="col-12">
            {/* Columna inzquierda */}
            <div className="col-4 center divCont ">
                <div className="divAuto">
                    <p className="black-text pt-3 font-weight-bold">Listado de lluvias del último mes</p>
                </div>
            </div>
            <div className="col-4  center divCont ">
                <div className="divAuto">
                    <p className="black-text pt-3 font-weight-bold">Seleccione el año y mes para ver las lluvias</p>
                </div>
            </div>
            <div className="col-4  center divCont ">
                <div className="divAuto">
                    <p className="black-text pt-3 font-weight-bold">Seleccione el año para ver resumen</p>
                </div>
            </div>
            <div className="col-4  center divCont ">
                <div className="divAuto">
                    
                </div>
            </div>
            {/* Columna medio */}
            <div className="col-4  center divCont ">
                <div className="divAuto">
                    <input type="month" name="fecha" value={fecha} onChange={actualizarState} />
                </div>
            </div>
            <div className="col-4  center divCont ">
                <div className="divAuto">
                    <input type="text" name="year" value={year} onChange={actualizarState} placeholder="Ingrese el año" style={{width: '150px'}} className="right inputYear blue-grey lighten-5" />
                </div>
            </div>
            <div className="col-4  center divCont ">
                <div className="divAuto">
                    
                </div>
            </div>
            <div className="col-4  center divCont ">
                <div className="divAuto">
                    <button className="btn btn-success" onClick={consultar}>Consultar</button>
                </div>
            </div>
            {/* Columna derecha */}
            <div className="col-4 center divCont ">
                <div className="divAuto">
                    <button className="btn btn-dark right" onClick={consultarYear}>Resumen Año</button>
                </div>
            </div>
            <div className="col-4 center divCont1 ">
                <div className="divAuto1">
                    AQUI QUE LISTADO DE LLUVIA QUIERE?
                </div>
            </div>
            {consulta === true ?
                <div className="col-4 center divCont1 ">
                    <div className="divAuto1">
                        <ResultadosLluvia fecha={fecha} pluviometroId={pluviometroId} setConsulta={setConsulta} />
                    </div>
                </div>
            :
                null
            }
            {consultaYear === true ?
                <div className="col-4  center divCont1 ">
                    <div className="divAuto1">
                        <LluviasFinales year={year} pluviometroId={pluviometroId} setConsultaYear={setConsultaYear} />
                    </div>
                </div>
            :
                null
            }
            {/* <div className="row">
                <div className="col-12 center" style={{height: '50px'}}>
                    <p className="black-text pt-3">Seleccione el año y mes para ver las lluvias</p>
                </div>
                <div className="col-12 p-3 red">
                    <input type="month" name="fecha" value={fecha} onChange={actualizarState} />
                    <input type="number" name="year" value={year} onChange={actualizarState} placeholder="Ingrese el año" style={{width: '150px'}} className="right inputYear" />
                </div>
                <div className="col-12 p-3 green">
                    <button className="btn btn-success" onClick={consultar}>Consultar</button>
                    <button className="btn btn-dark right" onClick={consultar}>Resumen Año</button>
                </div>
                {consulta === true ?
                    <div className="col-12 center p-3 blue">
                        <ResultadosLluvia fecha={fecha} pluviometroId={pluviometroId} setConsulta={setConsulta} />
                    </div>
                :
                    null
                }
            </div> */}
            </div>
            </div>
        </div>         
    );
}
 
export default BusquedaLluvia;
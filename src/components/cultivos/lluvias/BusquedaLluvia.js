import React, { useState } from 'react';
import ResultadosLluvia from './ResultadosLluvia'
import LluviasFinales from './LluviasFinales'
import LluviasActuales from './LluviasActuales'
import {validarMesLluvia} from '../../../utils/js/validaciones'
import Swal from 'sweetalert2'

const BusquedaLluvia = ({pluviometroId}) => {

    // Estado
    const [datoBusqueda, setDatoBusqueda] = useState({
        fecha: '',
        year: ''
    })
    const [consulta, setConsulta] = useState(false)
    const [consultaYear, setConsultaYear] = useState(false)
    //abrir menus
    const [verActual, setVerActual] = useState(false)
    const [verMes, setVerMes] = useState(false)
    const [verAno, setVerAno] = useState(false)

    //actualizar estado
    const actualizarState = e => {
        setDatoBusqueda({
            ...datoBusqueda,
            [e.target.name]: e.target.value
        })
    }

    const {fecha, year} = datoBusqueda

    // consultar mes y ano
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

        if(validarMesLluvia(fecha) === false) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar año y mes en el siguiente formato. Ej: 2020-03',
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

    //ver mes
    const abrirMes = () => {
        setVerActual(false)
        setVerAno(false)
        setVerMes(true)
    }
    // ver ano
    const abrirAno = () => {
        setVerActual(false)
        setVerMes(false)
        setVerAno(true)
    }
    // ver actual
    const abrirActual = () => {
        setVerMes(false)
        setVerAno(false)
        setVerActual(true)
    }
    // cerrar todo
    const cerrarTodo = () => {
        setVerActual(false)
        setVerMes(false)
        setVerAno(false)
    }

    return ( 
        <div className="blue-grey lighten-5 p-2">
            <div className="col-12 p-1">
                <div className="col-4 center d-inline-block">
                    <button type="button" className="btn btn-sm btn-info" onClick={abrirActual}>Mes Actual</button>
                </div>
                <div className="col-4 center d-inline-block">
                    <button type="button" className="btn btn-sm btn-info" onClick={abrirMes}>Seleccione año y mes</button>
                </div>
                <div className="col-4 center d-inline-block">
                    <button type="button" className="btn btn-sm btn-info" onClick={abrirAno}>Resumen año</button>
                </div>
            </div>


            {/* abrir para ver las lluvias del mes actual */}
            {verActual === true ?
                <div className="col-12">
                    <div className="col-12 center p-1">
                        <LluviasActuales
                            pluviometroId={pluviometroId}
                            fecha={fecha}
                        />
                        <button type="button" className="btn btn-dark btn-block" onClick={cerrarTodo}>Cerrar</button>
                    </div>
                </div>
            :
                null
            }


            {/* abrir formulario para consultar mes y ano */}
            {verMes === true ?
                <div className="col-12">
                    <div className="col-12 center p-1">
                        <div className="input-field">
                            <input type="month" name="fecha" value={fecha} onChange={actualizarState} placeholder="AAAA-MM" />
                        </div>
                        <div className="input-field">
                            <button type="button" className="btn btn-success" onClick={consultar}>Consultar</button>
                        </div>
                        {consulta === true ?
                            null
                        :
                            <button type="button" className="btn btn-dark btn-block" onClick={cerrarTodo}>Cerrar</button>
                        }
                    </div>
                    {consulta === true ?
                        <div className="col-12 p-1 center">
                            <ResultadosLluvia
                                fecha={fecha}
                                pluviometroId={pluviometroId}
                                setConsulta={setConsulta}
                            />
                        </div>
                                
                    :
                        null
                    }
                </div>
            :
                null
            }


            {/* abrir formulario para consultar ano */}
            {verAno === true ?
                <div className="col-12">
                    <div className="col-12 center p-1">
                        <div className="input-field">
                            <input type="text" name="year" value={year} onChange={actualizarState} placeholder="Ingrese el año" style={{width: '150px'}} className="blue-grey lighten-5 inputfinal" />
                        </div>
                        <div className="input-field">
                            <button type="button" className="btn btn-success" onClick={consultarYear}>Resumen Año</button>
                        </div>
                        {consultaYear === true ?
                            null
                        :
                            <button type="button" className="btn btn-dark btn-block" onClick={cerrarTodo}>Cerrar</button>
                        }
                    </div>
                    {consultaYear === true ?
                        <div className="col-12 p-1 center">
                            <LluviasFinales year={year} pluviometroId={pluviometroId} setConsultaYear={setConsultaYear} />
                        </div>
                    :
                        null
                    }
                </div>
            :
                null
            }
        </div>    
    );
}
 
export default BusquedaLluvia;
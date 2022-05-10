import React from 'react';
import { useLocation } from 'react-router-dom'


const MaquinariaDetalle = () => {

    const location = useLocation()
    const {idMaquinaria, marca, serie, modelo, potencia, color} = location.state.data

    return ( 
        <div className='row'>
            <div className='Content_principal'>
                <div className='col s12 p-1'>
                    <div className='col s12 p-1'>
                        <div className='Content_titulo center p-2'>
                            <h1>Ford 7610</h1>
                        </div>
                    </div>
                </div>
                <div className='col s12 p-1 blue'>
                    <div className='col s12 center pt-2 yellow'>
                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Marca
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                ford
                            </span>
                        </div>

                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Serie
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                ford
                            </span>
                        </div>

                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Modelo
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                ford
                            </span>
                        </div>

                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Potencia HP
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                ford
                            </span>
                        </div>

                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Color
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                ford
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>         
    );
}
 
export default MaquinariaDetalle;
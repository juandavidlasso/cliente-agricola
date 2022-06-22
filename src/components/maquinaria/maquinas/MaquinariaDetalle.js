import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Spinner from '../../Spinner'
import AplicacionMantenimientoRegistro from '../mantenimientos/aplicacionMantenimientos/AplicacionMantenimientoRegistro';
import AplicacionMantenimiento from '../mantenimientos/aplicacionMantenimientos/AplicacionMantenimiento';
// GraphQL
import {OBTENER_MAQUINARIA, OBTENER_MANTENIMIENTO} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'


const MaquinariaDetalle = () => {

    const location = useLocation()
    const idMaquinaria = location.state.data
    // State
    const [ registroApMant, setRegistroApMant] = useState(false)
    // Query
    const {data, loading, error} = useQuery(OBTENER_MAQUINARIA, { variables: {idMaquinaria} })
    const {data:dataMant, loading: loadingMant, error:errorMant} = useQuery(OBTENER_MANTENIMIENTO, { variables: {idMaquinaria}})
    
    if (error) return null
    if(loading) return <Spinner />
    if (errorMant) return null
    if(loadingMant) return <Spinner />
    const rol = Number(sessionStorage.getItem('rol'))

    const {color, marca, modelo, potencia, serie} = data.obtenerMaquinaria
    const {obtenerMantenimiento} = dataMant

    return ( 
        <div className='row'>
            <div className='col-md-10 offset-md-2 p-2'>
                
                {/* Boton atras y nombre de la maquina */}
                <div className='col s12 p-1'>
                    <div className='col s12 m12 l2 xl2 p-2'>
                        <div className='Content_titulo center p-2'>
                            <Link to='/maquinaria/listado' className='Content_titulo_btn'><i className="fas fa-arrow-alt-circle-left me-3"></i>Atras</Link>
                        </div>
                    </div>
                    <div className='col s12 m12 l10 xl10 p-2'>
                        <div className='Content_titulo p-1'>
                            <h1 style={{paddingLeft: '20%'}}>{marca} {serie}</h1>
                        </div>
                    </div>
                </div>

                {/* Informacion de la maquina */}
                <div className='col s12 p-1'>
                    <div className='col s12 center pt-2'>
                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Marca
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                {marca}
                            </span>
                        </div>

                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Serie
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                {serie}
                            </span>
                        </div>

                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Modelo
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                {modelo}
                            </span>
                        </div>

                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Potencia HP
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                {potencia}
                            </span>
                        </div>

                        <div className='Content_maquinaria_detalle'>
                            <p className='Content_maquinaria_detalle_txt'>
                                Color
                            </p>
                            <span className='Content_maquinaria_detalle_span'>
                                {color}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Boton para registrar una aplicacion de mantenimiento */}
                {rol === 1 ?
                    <div className='col s12 p-1 mt-2'>
                        <div className='col s12 p-2' style={{textAlign: 'right'}}>
                            <button type='button' className='Content_principal_btn' onClick={() => setRegistroApMant(true)}><i className="fas fa-plus-circle me-2"></i>Registrar Aplicación Mantenimiento</button>
                        </div>
                    </div>
                :
                    null
                }

                {/* Listar las aplicaciones de mantenimiento */}
                <div className='col s12 p-1 mt-2'>
                    {obtenerMantenimiento.length === 0 ?
                        'No hay mantenimientos registrados'
                    :
                        obtenerMantenimiento.map( (mantenimiento) => (
                            <AplicacionMantenimiento
                                key={mantenimiento.idApMant}
                                mantenimiento={mantenimiento}
                                idMaquinaria={idMaquinaria}
                                marca={marca}
                            />
                        ))
                    }
                </div>

                {registroApMant ?
                <div className='col s12 p-2'>
                    <div className='Content_principal p-1'>
                        <div className='Content_principal_form_registro p-3'>
                            <div className='Content_principal_form_registro_1 p-3'>
                                <AplicacionMantenimientoRegistro setRegistroApMant={setRegistroApMant} idMaquinaria={idMaquinaria} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                    null
                }
            </div>
        </div>         
    );
}
 
export default MaquinariaDetalle;
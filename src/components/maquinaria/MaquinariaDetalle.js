import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import Spinner from '../Spinner'
import moment from 'moment'
// GraphQL
import {OBTENER_MAQUINARIA, OBTENER_MANTENIMIENTO} from '../../apollo/querys'
import { useQuery } from '@apollo/client'


const MaquinariaDetalle = () => {

    const location = useLocation()
    const idMaquinaria = location.state.data
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
                {rol === 1 ?
                    <div className='col s12 p-1 mt-2'>
                        <div className='col s12 p-2' style={{textAlign: 'right'}}>
                            <Link to='/maquinaria/registro-mantenimiento' state={{ data: {idMaquinaria, marca} }} className='Content_principal_btn'><i className="fas fa-plus-circle me-2"></i>Registrar Mantenimiento</Link>
                        </div>
                    </div>
                :
                    null
                }
                <div className='col s12 p-1 mt-2'>
                    <div className='col s12 p-2'>
                        {obtenerMantenimiento.length === 0 ?
                            'No hay mantenimientos registradis'
                        :
                            <table className='table table-bordered table-striped table-hover'>
                                <thead style={{background: '#212F3C', color: 'white'}}>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Insumo</th>
                                        <th>Cantidad</th>
                                        <th>Cambio</th>
                                        <th>Próximo cambio</th>
                                        <th>Detalle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {obtenerMantenimiento.map( (mantenimiento) => {
                                        const {idMantenimiento,fecha,detalle,horaCambio,tipoCambio,cantidad,insumoPadre,proximoCambio} = mantenimiento
                                        const {nombre} = insumoPadre
                                        let nextCambioFecha
                                        let newFecha
                                        let newHora
                                        if(tipoCambio === false) {
                                            newFecha = moment(horaCambio).format('YYYY-MM-DD')
                                            nextCambioFecha = moment(newFecha).add(2, 'months').format('YYYY-MM-DD')
                                        }
                                        if (tipoCambio === true) {
                                            newHora = Number(horaCambio)+Number(proximoCambio)
                                        }
                                        return (
                                            <tr key={idMantenimiento}>
                                                <td>{fecha}</td>
                                                <td>{nombre}</td>
                                                <td>{cantidad}</td>
                                                <td>{horaCambio}</td>
                                                <td>{tipoCambio === false ? nextCambioFecha : newHora}</td>
                                                <td>{detalle}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>         
    );
}
 
export default MaquinariaDetalle;
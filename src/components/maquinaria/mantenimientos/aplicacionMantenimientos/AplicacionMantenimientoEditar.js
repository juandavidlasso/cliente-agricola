import React from 'react';
import { useLocation } from 'react-router-dom'
import Loading from '../../../cultivos/vonsucro/Loading'
import AplicacionMantenimientoActualizar from './AplicacionMantenimientoActualizar';
// GraphQL
import {OBTENER_APLICACION_MANTENIMIENTO} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const AplicacionMantenimientoEditar = () => {
    
    const location = useLocation()
    const idApMant = location.state.data.idApMant
    const idMaquinaria = location.state.data.idMaquinaria
    // Query
    const {data, loading, error} = useQuery(OBTENER_APLICACION_MANTENIMIENTO, { variables: {idApMant}})
    
    if(error) return null
    if(loading) return <Loading />
    const {obtenerAplicacionMantenimiento} = data

    return (
        <div className='row'>
            <div className='col-md-10 offset-md-2 p-2'>
                <div className='col s12 p-2'>
                    <div className='Content_principal p-1'>
                        <div className='Content_titulo center p-2'>
                            <h1>Actualizar Aplicación Mantenimiento</h1>
                        </div>
                    </div>
                </div>
                <div className='col s12 p-2'>
                    <div className='Content_principal p-1'>
                        <div className='col-md-6 offset-md-3'>
                            <AplicacionMantenimientoActualizar datos={obtenerAplicacionMantenimiento} idMaquinaria={idMaquinaria} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AplicacionMantenimientoEditar;
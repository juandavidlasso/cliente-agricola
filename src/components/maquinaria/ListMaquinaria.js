import React from 'react';
import Maquinaria from './Maquinaria'
import Spinner from '../Spinner'
// GraphQL
import { OBTENER_MAQUINARIAS } from '../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListMaquinaria = () => {

    // Query
    const {data, loading, error} = useQuery(OBTENER_MAQUINARIAS)

    if (loading) return <Spinner />
    if (error) return null
    const {obtenerMaquinarias} = data

    return ( 
        <div className='row'>
            <div className='Content_principal'>
                <div className='col s12 p-1'>
                    <div className='col s12 p-1'>
                        <div className='Content_titulo center p-2'>
                            <h1>Listado maquinaria</h1>
                        </div>
                    </div>
                </div>
                <div className='col s12 p-1'>
                    <div className='col s12 p-2 Content_list_maquinas'>
                        {obtenerMaquinarias.length === 0 ?
                            'No hay maquinarias registradas'
                        :
                            obtenerMaquinarias.map( (maquina) => (
                                <Maquinaria key={maquina.idMaquinaria} maquina={maquina} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ListMaquinaria;
import React, { useState } from 'react';
import Maquinaria from './maquinas/Maquinaria'
import Spinner from '../Spinner'
import MaquinariaRegistro from './maquinas/MaquinariaRegistro'
// GraphQL
import { OBTENER_MAQUINARIAS } from '../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListMaquinaria = () => {

    // State
    const [formRegistro, setFormRegistro] = useState(false)

    // Query
    const {data, loading, error} = useQuery(OBTENER_MAQUINARIAS)

    if (loading) return <Spinner />
    if (error) return null
    const {obtenerMaquinarias} = data
    const rol = Number(sessionStorage.getItem('rol'))

    return ( 
        <div className='row'>
            <div className='col-md-10 offset-md-2 p-2'>
                <div className='col s12 p-2'>
                    <div className='Content_principal p-1'>
                        <div className='Content_titulo center p-2'>
                            <h1>Listado maquinaria</h1>
                        </div>
                    </div>
                </div>
                <div className='col s12 p-2'>
                    <div className='Content_principal p-1'>
                        <div className='Content_list_maquinas'>
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
                
                {rol === 1?
                <div className='col s12 p-2'>
                    <div className='Content_principal p-1'>
                        <div className='Content_principal_btn_registro p-3'>
                            <button type='button' className='Content_registro_button_registro_11' onClick={ () => setFormRegistro(true)}><i className="fas fa-plus-circle me-2"></i>Registrar Maquinaria</button>
                        </div>
                    </div>
                </div>
                :
                    null
                }

                {formRegistro ?
                <div className='col s12 p-2'>
                    <div className='Content_principal p-1'>
                        <div className='Content_principal_form_registro p-3'>
                            <div className='Content_principal_form_registro_1 p-3'>
                                <MaquinariaRegistro setFormRegistro={setFormRegistro} />
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
 
export default ListMaquinaria;
import React, { useState } from 'react';
import Loading from '../../cultivos/vonsucro/Loading'
import Insumo from './Insumo';
import InsumoRegistro from './InsumoRegistro';
// GraphQL
import { OBTENER_INSUMOS } from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListInsumos = () => {

    // State
    const [registriInsumo, setRegistroInsumo] = useState(false)
    // Query
    const {data, loading, error} = useQuery(OBTENER_INSUMOS)

    if(loading) return <Loading />
    if(error) return null
    const rol = Number(sessionStorage.getItem('rol'))
    const {obtenerInsumos} = data

    return (
        <div className='row'>
            <div className='col-md-10 offset-md-2 p-2'>

                {/* Titulo y boton registrar */}
                <div className='col s12 m9 l9 xl9  p-2'>
                    <div className='Content_titulo center p-2'>
                        <h1 className='ps-5'>Listado de Insumos</h1>
                    </div>
                </div>
                {rol === 1 ?
                    <div className='col s12 m3 l3 xl3 p-2'>
                        <div className='Content_titulo center p-2'>
                            <button
                                type='button'
                                className='Content_titulo_btn_form d-flex justify-content-center'
                                style={{alignItems: 'center'}}
                                onClick={() => setRegistroInsumo(true)}
                            >
                                <i className="fas fa-plus-circle me-2"></i>Registrar Insumo
                            </button>
                        </div>
                    </div>
                :
                    null
                }

                {/* Form registro insumo */}
                {registriInsumo === true ?
                    <div className='col s12 p-2'>
                        <div className='Content_principal p-1'>
                            <div className='Content_principal_form_registro p-3'>
                                <div className='Content_principal_form_registro_1 p-3'>
                                    <InsumoRegistro setRegistroInsumo={setRegistroInsumo} />
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    null
                }

                {/* Tabla listado insumos */}
                <div className='col s12 p-1'>
                    <div className='col s12 p-3'>
                        {obtenerInsumos.length === 0 ?
                            'No hay Insumos registrados'
                        :
                            <table className='table table-bordered table-striped table-hover'>
                                <thead className='center' style={{background: '#212F3C', color: 'white'}}>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Referencia</th>
                                        <th>Marca</th>
                                        <th>Cantidad</th>
                                        {rol === 1 ?
                                            <th>Acción</th>
                                        :
                                            null
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        obtenerInsumos.map( (insumo) => <Insumo key={insumo.idInsumo} insumo={insumo} />)
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ListInsumos;
import React, { Fragment } from 'react';
import Spinner from '../../Spinner'
import Tablones from './Tablones'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarCortes } from '../../../utils/redux/actions/corteActions'
// GraphQL
import {OBTENER_TABLONES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListTablones = ({id_corte, id_suerte, fecha_corte}) => {

    const dispatch = useDispatch()

    const { data, loading, error } = useQuery(OBTENER_TABLONES_POR_CORTE_QUERY, { variables: {id_corte} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);


    if(loading) return <Spinner />
    if(error) return null

    const cerrar = () => {
        dispatch( ocultarCortes() )
    }
    const rol = sessionStorage.getItem('rol')

    return ( 
        <div className="card-panel white p-2 center">
            <h3 className="black-text pb-3 pt-2">Listado de Tablones</h3>
            {data.obtenerTablonesPorCorte.length === 0 ? 
                'No hay tablones registrados' 
            :
                <table className="table responsive-table centered table-bordered title">
                    <thead className="text-white" style={{backgroundColor: "#37474f"}}>
                        <tr>
                            <th scope="col"> Tablón </th>
                            <th scope="col"> Área </th>
                            {rol === "1" ? fecha_corte ?
                                null
                            :
                                <Fragment>
                                    <th scope="col"> Editar </th>
                                    <th scope="col"> Eliminar </th>
                                </Fragment>
                            :
                                null
                          
                            }
                        </tr>
                    </thead>

                    <tbody className="white">
                    {data.obtenerTablonesPorCorte.map(tablon => (
                        <Tablones 
                            key={tablon.id_tablon} 
                            tablon={tablon} 
                            id_corte={id_corte} 
                            id_suerte={id_suerte} 
                            fecha_corte={fecha_corte}
                        />
                    ))}
                    </tbody>
                </table>
            }

            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
                </div>
            </div>
        </div>
     );
}
 
export default ListTablones;
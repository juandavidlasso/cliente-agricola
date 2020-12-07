import React, { useEffect } from 'react'
import Spinner from '../../Spinner'
import TratamientoPlaga from '../plagas/tratamiento/TratamientoPlaga'
// GraphQL
import {OBTENER_TRAPL_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'


const Tablon = ({tablon, edadActual, props, corte, estado}) => {

    const {numero, area} = tablon
    // query hook
    const { loading, data, error } =useQuery(OBTENER_TRAPL_QUERY)
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    useEffect(() => {
        const M = window.M
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
    }, [])

    if(loading) return <Spinner />
    if(error) return null
    const rol = sessionStorage.getItem('rol')

    return (
        <li>
            <div className="collapsible-header">
                <i className="fas fa-hiking"></i> 
                <span className="ahover">Tablón {numero} - Área: {area} </span>
            </div>
            <div className="collapsible-body">

                {data.obtenerTratamientoPlagas.length === 0 ? 'No hay productos registrados' : (
                    <table className="table table-sm responsive-table centered table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th> Edad Actual (meses) </th>
                            <th> Producto </th>
                            <th> Unidad </th>
                            <th> Cantidad </th>
                            <th> Tiempo </th>
                            <th> Cantidad Aplicar </th>
                            <th> Fecha </th>
                            {rol === '1' ? estado === true ?
                                <th> Editar </th>
                            :
                                null
                            :
                                null
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {data.obtenerTratamientoPlagas.map(trapl => (
                            <TratamientoPlaga 
                                key={trapl.id_trapl} 
                                trapl={trapl} 
                                edadActual={edadActual} 
                                corte={corte}
                                tablon={tablon}
                                props={props}
                                estado={estado}
                            />
                        ))}
                    </tbody>
                    </table>
                )}
            </div>
        </li>
   )
}

export default Tablon

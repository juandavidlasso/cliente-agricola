import React, { useEffect } from 'react'
import Spinner from '../../Spinner'
import TratamientoPlaga from '../plagas/tratamiento/TratamientoPlaga'
// GraphQL
import {OBTENER_TRAPL_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'


const Tablon = ({tablon, edadActual, props, corte, estado, setShowEditN, setApliPL, setTrataPL}) => {

    const {numero, area} = tablon
    // query hook
    const { loading, data, error } =useQuery(OBTENER_TRAPL_QUERY)

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
            <div className="collapsible-body p-2">

                {data.obtenerTratamientoPlagas.length === 0 ? 'No hay productos registrados' : (
                    <table className="table  responsive-table centered table-bordered white tableAncho" style={{fontSize: '14px'}}>
                        <thead className="text-white" style={{backgroundColor: "#283747"}}>
                            <tr>
                                <th> Edad Actual (meses) </th>
                                <th> Producto </th>
                                <th> Unidad </th>
                                <th> Cantidad </th>
                                <th> Tiempo </th>
                                <th> Cantidad Aplicar </th>
                                <th> Fecha </th>
                                {rol === '1' ? estado === true ?
                                    <th> Edición </th>
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
                                    setShowEditN={setShowEditN}
                                    setApliPL={setApliPL}
                                    setTrataPL={setTrataPL}
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

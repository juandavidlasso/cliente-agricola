import React, { Fragment } from 'react'
import Spinner from '../../../Spinner'
import Producto from './Producto'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarProductos } from '../../../../utils/redux/actions/tratamientoPlagaActions'
// GraphQL
import {OBTENER_TRAPL_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const Productos = ({props, corte, setUserId4Actions, setShowEdit, setUserIdCorte, setFechaICorte, setFechaFCorte}) => {

    const dispatch = useDispatch()
    // query hook
    const { loading, data, error } =useQuery(OBTENER_TRAPL_QUERY)
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null

    const cerrar = () => {
        dispatch( ocultarProductos() )
    }

    const rol = sessionStorage.getItem('rol')

    return (
        <Fragment>
        {data.obtenerTratamientoPlagas.length === 0 ? 
            <Fragment>
                <p>No hay productos registrados</p>
                <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
            </Fragment>
        :
            <table className="table responsive-table centered table-striped table-bordered tablalabores">
                <thead className="text-white" style={{backgroundColor: "#283747"}}>
                    <tr>
                        <th> Producto </th>
                        <th> Unidad </th>
                        <th> Cantidad </th>
                        <th> Tiempo </th>
                        {rol === "1" ?
                            <th colSpan="2"> Edición </th>
                        :
                            null
                        }
                    </tr>
                </thead>

                <tbody className="white">
                    {data.obtenerTratamientoPlagas.map(trapl => (
                        <Producto 
                            key={trapl.id_trapl} 
                            trapl={trapl} 
                            props={props}
                            corte={corte}
                            setUserId4Actions={setUserId4Actions}
                            setShowEdit={setShowEdit}
                            setUserIdCorte={setUserIdCorte}
                            setFechaICorte={setFechaICorte}
                            setFechaFCorte={setFechaFCorte}
                        />
                    ))}
                    <tr>
                        <td colSpan="5"> 
                            <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        }
        </Fragment>
    )
}

export default Productos
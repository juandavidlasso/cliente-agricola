import React, { Fragment } from 'react';
import Spinner from '../../Spinner'
import Riego from './Riego'
// GraphQL
import {OBTENER_RIEGOS_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const Riegos = ({
                id_corte,
                setRiegoId,
                setShowEdit,
                setDate,
                setCorteId,
                setVerEdit,
                setIdRiegoEd,
                setFechaEd,
                setNumRiegoEd,
                setIdCorteEd}) => {

    // query hook
    const {data, loading, error} = useQuery(OBTENER_RIEGOS_CORTE_QUERY, {variables: {id_corte}})

    if(loading) return <Spinner />
    if(error) return null
    const rol = sessionStorage.getItem('rol')

    return (
        <Fragment>
            {data.obtenerRiegosCorte.length === 0 ?
                'No hay riegos registrados'
            :   
                <table className="table responsive-table centered table-striped table-bordered table-hover tablariegos" style={{fontSize: "12px"}}>
                    <thead className="text-white" style={{backgroundColor: "#283747"}}>
                    <tr>
                        <th scope="col"> Fecha </th>
                        <th scope="col"> Tablones Regados </th>
                        <th scope="col"> # Riego </th>
                        {rol === '1' ?
                            <th scope="col"> Edición </th>
                        :
                            null
                        }
                    </tr>
                    </thead>

                    <tbody className="white">
                    {data.obtenerRiegosCorte.map(riegos => (
                        <Riego 
                            key={riegos.id_riego} 
                            riegos={riegos}
                            setRiegoId={setRiegoId}
                            setShowEdit={setShowEdit}
                            setDate={setDate}
                            setCorteId={setCorteId}
                            id_corte={id_corte}
                            setVerEdit={setVerEdit}
                            setIdRiegoEd={setIdRiegoEd}
                            setFechaEd={setFechaEd}
                            setNumRiegoEd={setNumRiegoEd}
                            setIdCorteEd={setIdCorteEd}
                        />
                    ))}
                    </tbody>
                </table>                
            }
        </Fragment>
    );
}
 
export default Riegos;
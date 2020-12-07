import React, { Fragment } from 'react'
import Spinner from '../../Spinner'
import CorteActualMostrar from './CorteActualMostrar'
// GraphQL
import {OBTENER_CORTE_ACTUAL_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const CorteActual = ({props}) => {

    const id_suerte = Number(props.match.params.id)

    // query hook
    const { data, loading, error } = useQuery(OBTENER_CORTE_ACTUAL_QUERY, { variables: {id_suerte} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);    

    if(loading) return <Spinner />
    if(error) return null

    return (
        <Fragment>
            {data.obtenerCorteActual === null ? 
                (
                    <Fragment>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content blue-grey lighten-4 center p-2 m-1">
                                <p className="card-title font-weight-bold m-1"> Corte Actual </p>
                                <p className="h5"> 0 </p>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content blue-grey lighten-4 center p-2 m-1">
                                <p className="card-title font-weight-bold m-1"> Edad Actual </p>
                                <p className="h5">0</p>
                            </div>
                        </div>
                    </div>
                    </Fragment>
                ) 
            : 
                (
                    <CorteActualMostrar data={data} />
                )
            }
        </Fragment>
    )
}

export default CorteActual
import React, { Fragment } from 'react'
import moment from 'moment'

const CorteActualMostrar = ({data}) => {
    
    const { numero, fecha_inicio } = data.obtenerCorteActual
    const now = moment().format('YYYY-MM-DD')
    const factual = moment(now)
    const finicio = moment(fecha_inicio)
    const edadActual = factual.diff(finicio, 'months', true).toFixed(1)
    
    return (
        <Fragment>
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-content blue-grey lighten-4 center p-2 m-1">
                        <p className="card-title font-weight-bold m-1"> Corte Actual </p>
                        <p className="h5"> {numero} </p>
                    </div>
                </div>
            </div>
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-content blue-grey lighten-4 center p-2 m-1">
                        <p className="card-title font-weight-bold m-1"> Edad Actual </p>
                        <p className="h5"> {edadActual} </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CorteActualMostrar
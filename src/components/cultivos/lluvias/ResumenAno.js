import React, { Fragment } from 'react';
import ResumenLluvia from './ResumenLluvia'
import Spinner from '../../Spinner'
// GraphQL
import {OBTENER_PLUVIOMETROS_QUERY, OBTENER_RESUMEN_ANO_QUERY, OBTENER_PROMEDIO_LLUVIAS, OBTENER_TOTAL_PLUVIOMETRO_ANO} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

// Obtener meses del año
const arrayMeses = [
    {idMes: 1, nombreMes: 'Enero'},{idMes: 2, nombreMes: 'Febrero'},{idMes: 3, nombreMes: 'Marzo'},
    {idMes: 4, nombreMes: 'Abril'},{idMes: 5, nombreMes: 'Mayo'},{idMes: 6, nombreMes: 'Junio'},
    {idMes: 7, nombreMes: 'Julio'},{idMes: 8, nombreMes: 'Agosto'},{idMes: 9, nombreMes: 'Septiembre'},
    {idMes: 10, nombreMes: 'Octubre'},{idMes: 11, nombreMes: 'Noviembre'},{idMes: 12, nombreMes: 'Diciembre'}
]

const ResumenAno = ({fecdate, suertesAso, totalP}) => {

    const year = fecdate
    const time = fecdate
    // query hook
    const {data, loading, error} = useQuery(OBTENER_PLUVIOMETROS_QUERY)

    // query hook
    const {data:dataL, loading:loadingL, error:errorL} = useQuery(OBTENER_RESUMEN_ANO_QUERY, { variables: {year} })

    // query hook
    const {data:dataR, loading:loadingR, error:errorR} = useQuery(OBTENER_PROMEDIO_LLUVIAS, {variables: {time} })

    const {data:dataT, loading:loadingT, error:errorT} = useQuery(OBTENER_TOTAL_PLUVIOMETRO_ANO, { variables: {year} })

    if(loading) return <Spinner />
    if(error) return null
    if(loadingL) return <Spinner />
    if(errorL) return null
    if(loadingR) return <Spinner />
    if(errorR) return null
    if(loadingT) return <Spinner />
    if(errorT) return null

    const {obtenerResumenAno} = dataL
    const {obtenerPromedioLluvias} = dataR
    const {obtenerResumenAnoPluviometro} = dataT
    
    return (
        <Fragment>
            {data.obtenerPluviometros.length === 0 ?
                'No hay pluviómetros registrados'
            :
                <div className='tablaScroll'>
                    <table className="table responsive-table centered table-striped table-bordered">
                        <thead className="text-white" style={{backgroundColor: "#283747"}}>
                            <tr>
                                <th rowSpan={2}>Pluviómetro</th>
                                <th colSpan={arrayMeses.length}>Mes - {fecdate}</th>
                                <th rowSpan={2}>Total</th>
                            </tr>
                            <tr>
                                {arrayMeses.map(meses => (
                                    <th key={meses.idMes}>{meses.idMes}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.obtenerPluviometros.map(pluviometros => (
                                <ResumenLluvia
                                    key={pluviometros.id_pluviometro}
                                    pluviometros={pluviometros}
                                    fecdate={fecdate}
                                    datos={obtenerResumenAno}
                                    suertesAso={suertesAso}
                                    total={obtenerResumenAnoPluviometro}
                                    listaMeses={arrayMeses}
                                />
                            ))}
                            <tr>
                                <td><span className="fw-bold">TOTAL PROMEDIO</span></td>
                                {arrayMeses.map(meses => (
                                    <td key={meses.idMes}>
                                        {obtenerPromedioLluvias.length === 0 ?
                                            0
                                        :
                                            obtenerPromedioLluvias.map(promedio => {
                                                const {id_lluvia, fecha, cantidad} = promedio
                                                const nuevaFecha = Number(fecha.split('-')[1])
                                                return (
                                                    nuevaFecha === meses.idMes ?
                                                        <div key={id_lluvia}
                                                            className="white-text deep-orange darken-4 p-2 mx-auto"
                                                            style={{borderRadius: '7px', width: '2.9rem', fontSize: '.9rem'}}
                                                        >
                                                            <span>
                                                                {(cantidad / totalP).toFixed(0)}
                                                            </span>
                                                        </div>
                                                    :
                                                        null
                                                )
                                            })
                                        }
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </Fragment>
    );
}
 
export default ResumenAno;
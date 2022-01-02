import React, { Fragment } from 'react';
import ResumenPluviometro from './ResumenPluviometro'
import Spinner from '../../Spinner'
import moment from 'moment'
// GraphQL
import {OBTENER_RESUMEN_PLUVIOMETROS_QUERY, OBTENER_SUERTES_ASOCIADAS} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'
import 'moment/locale/es';
moment.updateLocale('es',null)

// Obtener mes actual
const myDate = moment();
const fechaActal = myDate.format(' MMMM')


const ResumenPluviometros = ({setResumenPluvi, listaDias}) => {

    // query hook
    const {data, loading, error} = useQuery(OBTENER_RESUMEN_PLUVIOMETROS_QUERY)

    const {data:dataS, loading:loadingS, error:errorS} = useQuery(OBTENER_SUERTES_ASOCIADAS)

    if(loading) return <Spinner />
    if(error) return null
    if(loadingS) return <Spinner />
    if(errorS) return null

    const {obtenerSuertesAsociadas} = dataS
  
    return (
        <Fragment>
            {data.obtenerResumenPluviometro.length === 0 ?
                'No hay pluviómetros registrados'
            :
                <div className='tableResponsive'>
                    <table className="table responsive-table centered table-striped table-bordered tablaLluviaActual">
                        <thead className="text-white" style={{backgroundColor: "#283747"}}>
                            <tr>
                                <th rowSpan={2}>Pluviómetro</th>
                                <th colSpan={listaDias.length} className='text-capitalize'>{fechaActal}</th>
                                <th rowSpan={2}>Total Mes</th>
                            </tr>
                            <tr>
                                {listaDias.map(dias => (
                                    <th key={dias.idDia}>{dias.dia}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.obtenerResumenPluviometro.map(pluviometros => (
                                <ResumenPluviometro
                                    key={pluviometros.id_pluviometro}
                                    pluviometros={pluviometros}
                                    dataSuertes={obtenerSuertesAsociadas}
                                    listaDias={listaDias}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            <div className="d-grid gap-2 p-2">
                <button type="button" className="btn white-text mt-4 btncerrar" onClick={() => setResumenPluvi(false)}>Cerrar</button>
            </div>
        </Fragment>
    );
}
 
export default ResumenPluviometros;
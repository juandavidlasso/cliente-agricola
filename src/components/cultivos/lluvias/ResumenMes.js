import React, { Fragment } from 'react';
import Spinner from '../../Spinner'
import { Modal } from 'react-bootstrap'
import ResumenMesInforme from './ResumenMesInforme'
// PDF
import { PDFDownloadLink } from '@react-pdf/renderer'
// GraphQL
import {OBTENER_RESUMEN_PLUVIOMETROS_QUERY, OBTENER_SUERTES_ASOCIADAS} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ResumenMes = (props) => {

    const {datomes, datoano} = props
    const {idMes, mes} = datomes
    const {year} = datoano
    const numMes = idMes
    let listadoDias = [];

    const diasMes = (numMes, year) => {
        const cant = new Date(year, numMes, 0).getDate();
        for (let index = 1; index <= cant; index++) {
            let nuevoDia = {
                idDia: index,
                dia: index
            }
            listadoDias.push(nuevoDia);
        }
    }
    diasMes(numMes, year)

    // query hook
    const {data, loading, error} = useQuery(OBTENER_RESUMEN_PLUVIOMETROS_QUERY, { variables: {year, numMes} })

    const {data:dataS, loading:loadingS, error:errorS} = useQuery(OBTENER_SUERTES_ASOCIADAS)

    if(loading) return <Spinner />
    if(error) return null
    if(loadingS) return <Spinner />
    if(errorS) return null

    const {obtenerSuertesAsociadas} = dataS

    return (
        <Modal
            {...props}
            className="grey lighten-2"
            backdrop="static"
            keyboard={false}
            fullscreen={true}
            onHide={() => props.onHide()}
        >
            <Modal.Header className='pt-0' style={{backgroundColor: "white"}} closeButton>
                <Modal.Title bsPrefix="titleMLluviasActuales">Listado de lluvias</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Fragment>
                    {data.obtenerResumenPluviometro.length === 0 ?
                        'No hay pluviómetros registrados'
                    :
                        <div className='p-0'>
                            <table className="table responsive-table centered table-striped table-hover table-bordered">
                                <thead className="text-white" style={{backgroundColor: "#283747"}}>
                                    <tr>
                                        <th rowSpan={2} style={{borderRight: '.5px solid lightgrey'}}>Pluviómetro</th>
                                        <th colSpan={listadoDias.length} className='text-capitalize'>{mes} - {year}</th>
                                        <th rowSpan={2} style={{borderLeft: '.5px solid lightgrey'}}>Total Mes</th>
                                    </tr>
                                    <tr>
                                        {listadoDias.map(dias => (
                                            <th key={dias.idDia} style={{borderRight: '.5px solid lightgrey'}}>{dias.dia}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.obtenerResumenPluviometro.map(pluviometros => {
                                        const {id_pluviometro, nombre, suertesAsociadas, listlluvias} = pluviometros
                                        const total = Number(suertesAsociadas)
                                        return (
                                            <tr key={id_pluviometro}>
                                                <td>
                                                    <span style={{fontSize: '.9rem'}}>{nombre}</span>
                                                    <br />
                                                    {obtenerSuertesAsociadas.length === 0 ?
                                                        'No hay suertes Asociadas'
                                                    :
                                                        obtenerSuertesAsociadas.map(asociadas => (
                                                            asociadas.nombre === nombre ? asociadas.suertesAsociadas === "" ?
                                                                    null
                                                                :
                                                                    <span key={asociadas.id_pluviometro} className="fw-bold" style={{fontSize: '.8rem'}}><i>Suerte {asociadas.suertesAsociadas}</i></span>
                                                            :
                                                                null
                                                        ))
                                                    }
                                                </td>
                                                {listadoDias.map(dias => (
                                                    <td key={dias.idDia}>
                                                        {listlluvias.length === 0 ?
                                                            null
                                                        :
                                                            listlluvias.map(lluvias => {
                                                                const {id_lluvia, cantidad, fecha} = lluvias
                                                                const nuevaFecha = Number(fecha.split('-')[2])
                                                                return (
                                                                    nuevaFecha === dias.dia ?
                                                                        <span
                                                                            key={id_lluvia}
                                                                            className="white-text light-blue darken-4 p-2"
                                                                            style={{borderRadius: '7px'}}
                                                                        >
                                                                            {cantidad}
                                                                        </span>
                                                                    :
                                                                        null
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                ))}
                                                <td>{(total).toFixed(0)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className='center'>
                                <PDFDownloadLink
                                    document={<ResumenMesInforme
                                                key={data.obtenerResumenPluviometro.id_pluviometro}
                                                data={data}
                                                mes={mes}
                                                year={year}
                                                listaDias={listadoDias}
                                                dataSuertes={obtenerSuertesAsociadas}
                                            />}
                                    fileName="Listado lluvias"
                                >
                                    {({ loading}) => (loading ?
                                        <button type='button' className="btnlink2">Cargando ...</button>
                                    : 
                                        <button type='button' className="btnlink2">Generar Informe</button>
                                    )}
                                </PDFDownloadLink>
                            </div>
                        </div>
                    }
                </Fragment>
            </Modal.Body>
        </Modal>
    );
}
 
export default ResumenMes;
import React, { Fragment, useState } from 'react';
import Loading from './Loading'
import Swal from 'sweetalert2'
// GraphQL
import {INFORME_VONSUCRO} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'
import DatosVonsucro from './DatosVonsucro';

const InformeVonsucro = ({inicial, final}) => {

    const fechaInicio = inicial
    const fechaFin = final

    // Query
    const {data, loading, error} = useQuery(INFORME_VONSUCRO, { variables: {fechaInicio, fechaFin}})
    // State
    const [verData, setVerData] = useState(false)
    const [dataInforme, setDataInforme] = useState([])

    // Add Data
    const agregarData = (nombre, area, numero, producto, dosis, presentacion, idTrahe, idTrafe, ident) => {
        if (dataInforme.length === 0) {
            setDataInforme([
                ...dataInforme,
                {
                    suerte: nombre,
                    area: area,
                    corte: numero,
                    producto: producto,
                    dosis: dosis,
                    presentacion: presentacion,
                    id_trahe: idTrahe === 0 ? '' : idTrahe,
                    id_trafe: idTrafe === 0 ? '' : idTrafe,
                    identificador: ident
                }
            ])
        } else {
            const existeTratHer = dataInforme.find( traHer => traHer.id_trahe === idTrahe)
            const existeTratFer = dataInforme.find( traFer => traFer.id_trafe === idTrafe)
            if (existeTratHer === undefined && existeTratFer === undefined) {
                setDataInforme([
                    ...dataInforme,
                    {
                        suerte: nombre,
                        area: area,
                        corte: numero,
                        producto: producto,
                        dosis: dosis,
                        presentacion: presentacion,
                        id_trahe: idTrahe === 0 ? '' : idTrahe,
                        id_trafe: idTrafe === 0 ? '' : idTrafe,
                        identificador: ident
                    }
                ])
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Atención',
                    text: 'El tratamiento ya esta agregado a la lista',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d47a1',
                    allowEnterKey: false,
                    allowOutsideClick: false
                })
            }
        }
    }

    if(loading) return <Loading />
    if(error) return null
    const {obtenerInformeVonsucro} = data

    return (
        <div className="col s12 p-1">

            <div className={verData === true ? 'col s9 p-1' : 'col s12 p-1'}>
                <div className="col s12 p-2">
                    <div className='col s10'>
                        <h1 className="center title" style={{paddingLeft: '15%'}}> Seleccione la información </h1>
                    </div>
                    <div className='col s2 p-2 center'>
                        <button type='button' className='btnVerDatos' onClick={() => setVerData(true)}><i className="fas fa-search me-2"></i>Ver Datos</button>
                    </div>
                </div>

                <div className="col s12 p-1">
                    {obtenerInformeVonsucro.length === 0 ?
                        'No hay información registrada para las fechas solicitadas'
                    :
                        <table className='table table-bordered table-striped table-hover tableVonsucro'>
                            <thead style={{background: '#212F3C', color: 'white'}}>
                                <tr>
                                    <th>Suerte</th>
                                    <th>Área</th>
                                    <th>Corte</th>
                                    <th>Aplicación Herbicidas</th>
                                    <th>Aplicación Fertilizantes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {obtenerInformeVonsucro.map( (vonsucro) => {
                                    const {id_suerte, nombre, area, listcortes} = vonsucro
                                    return (
                                        <tr key={id_suerte}>
                                            <td style={{background: '#e57373'}}>{nombre}</td>
                                            <td style={{background: '#ef9a9a'}}>{area ? area : null}</td>
                                            {listcortes.length === 0 ?
                                                'No hay cortes registrados'
                                            :
                                                listcortes.map( (corte) => {
                                                    const {id_corte, numero, listAplicacionFertilizante, listAplicacionHerbicida} = corte
                                                    return (
                                                        <Fragment key={id_corte}>
                                                            <td key={id_corte} style={{background: '#ffcdd2'}}>{numero}</td>
                                                            <td className='p-1'>
                                                                {listAplicacionHerbicida.length === 0 ?
                                                                    'No hay aplicaciones herbicidas registradas'
                                                                :
                                                                    listAplicacionHerbicida.map( (apHer) => {
                                                                        const {id_aphe, tipo, fecha, listTratamientoHerbicida} = apHer
                                                                        return (
                                                                            <div key={id_aphe} className='col s12 p-1 mb-2' style={{width: '100%', background: '#ffebee', border: '1px solid #bdbdbd'}}>
                                                                                <div className='col s5 p-2'>{tipo} <br /> {fecha}</div>
                                                                                <div className='col s7 p-1'>
                                                                                    {listTratamientoHerbicida.length === 0 ?
                                                                                        'No hay tratamientos registrados'
                                                                                    :
                                                                                        listTratamientoHerbicida.map( (traHer) => {
                                                                                            const {id_trahe, producto, dosis, presentacion} = traHer
                                                                                            return (
                                                                                                <div key={id_trahe} className='p-2 mb-3 inputVonsucro'>
                                                                                                    <button type='button' className='btnAgregarVonsucro' onClick={() => agregarData(nombre, area, numero, producto, dosis, presentacion, id_trahe, 0, 1)}>Agregar</button>
                                                                                                    <span className='ms-2'>{producto} - {dosis} - {presentacion}</span>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </td>
                                                            
                                                                
                                                            <td className='p-1'>
                                                                {listAplicacionFertilizante.length === 0 ?
                                                                    'No hay aplicaciones fertilizantes registradas'
                                                                :
                                                                    listAplicacionFertilizante.map( (apHer) => {
                                                                        const {id_apfe, tipo, fecha, listTratamientoFertilizante} = apHer
                                                                        return (
                                                                            <div key={id_apfe} className='col s12 p-1 mb-2' style={{width: '100%', background: '#ffebee', border: '1px solid #bdbdbd'}}>
                                                                                <div className='col s5 p-2'>{tipo} <br /> {fecha}</div>
                                                                                <div className='col s7 p-1'>
                                                                                    {listTratamientoFertilizante.length === 0 ?
                                                                                        'No hay tratamientos registrados'
                                                                                    :
                                                                                        listTratamientoFertilizante.map( (traFer) => {
                                                                                            const {id_trafe, producto, dosis, presentacion} = traFer
                                                                                            return (
                                                                                                <div key={id_trafe} className='p-2 mb-3 inputVonsucro'>
                                                                                                    <button type='button' className='btnAgregarVonsucro' onClick={() => agregarData(nombre, area, numero, producto, dosis, presentacion, 0, id_trafe, 2)}>Agregar</button>
                                                                                                    <span className='ms-2'>{producto} - {dosis} - {presentacion}</span>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </td>
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>

            </div>

            {verData ?
                <DatosVonsucro
                    verData={verData}
                    setVerData={setVerData}
                    dataInforme={dataInforme}
                    setDataInforme={setDataInforme}
                />
            :
                null
            }
        </div>
    );
}
 
export default InformeVonsucro;
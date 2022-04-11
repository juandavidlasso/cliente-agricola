import React, { useEffect, Fragment } from 'react';
import ResumenPluviometro from './ResumenPluviometro'
import Spinner from '../../Spinner'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
// PDF
import { PDFDownloadLink } from '@react-pdf/renderer'
import InformeLluviasActuales from './InformeLluviasActuales'
// GraphQL
import {OBTENER_RESUMEN_PLUVIOMETROS_QUERY, OBTENER_SUERTES_ASOCIADAS} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'
import 'moment/locale/es';
moment.updateLocale('es',null)

// Obtener mes actual
const myDate = moment();
const myDateY = new Date();
const year = myDateY.getFullYear();
const fechaActal = myDate.format(' MMMM')

// Obtener mes actual y dias
var arrayDias = []
var listadoDias = []
const mesActual = () => {
  const mes = new Date(), year = new Date();
  const mesHoy = mes.getMonth()+1;
  const yearHoy = year.getFullYear()
  arrayDias.push(new Date(yearHoy, mesHoy, 0).getDate())
  var k = 1
  for(var i = 1; i<=arrayDias; i++){
    var nuevoDia = {
      idDia: k,
      dia: i
    }
    listadoDias.push(nuevoDia)
    k++
  }
}


const ResumenPluviometros = (props) => {

    useEffect(() => {
        mesActual()
    }, [])

    // query hook
    const {data, loading, error} = useQuery(OBTENER_RESUMEN_PLUVIOMETROS_QUERY)

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
                        <div className='p-0'>  {/*tableResponsive*/}
                            <table className="table responsive-table centered table-striped table-hover table-bordered">
                                <thead className="text-white" style={{backgroundColor: "#283747"}}>
                                    <tr>
                                        <th rowSpan={2} style={{borderRight: '.5px solid lightgrey'}}>Pluviómetro</th>
                                        <th colSpan={listadoDias.length} className='text-capitalize'>{fechaActal} - {year}</th>
                                        <th rowSpan={2} style={{borderLeft: '.5px solid lightgrey'}}>Total Mes</th>
                                    </tr>
                                    <tr>
                                        {listadoDias.map(dias => (
                                            <th key={dias.idDia} style={{borderRight: '.5px solid lightgrey'}}>{dias.dia}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.obtenerResumenPluviometro.map(pluviometros => (
                                        <ResumenPluviometro
                                            key={pluviometros.id_pluviometro}
                                            pluviometros={pluviometros}
                                            dataSuertes={obtenerSuertesAsociadas}
                                            listaDias={listadoDias}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <div className='center'>
                                <PDFDownloadLink
                                    document={<InformeLluviasActuales
                                                key={data.obtenerResumenPluviometro.id_pluviometro}
                                                data={data}
                                                fechaActal={fechaActal}
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
                                {/* <InformeLluviasActuales
                                    key={data.obtenerResumenPluviometro.id_pluviometro}
                                    data={data}
                                    fechaActal={fechaActal}
                                    year={year}
                                    listaDias={listadoDias}
                                    dataSuertes={obtenerSuertesAsociadas}
                                /> */}
                                {/* <BlobProvider 
                                    document={
                                        <InformeLluviasActuales
                                            key={data.obtenerResumenPluviometro.id_pluviometro}
                                            data={data}
                                            fechaActal={fechaActal}
                                            year={year}
                                            listaDias={listadoDias}
                                            dataSuertes={obtenerSuertesAsociadas}
                                        />
                                    }
                                >
                                    {({ url }) => (
                                        <a href={url} className="btnlink2" target="_blank" rel="noopener noreferrer">Generar Informe</a>
                                    )}
                                </BlobProvider> */}
                            </div>
                        </div>
                    }
                </Fragment>
            </Modal.Body>
        </Modal>
    );
}
 
export default ResumenPluviometros;
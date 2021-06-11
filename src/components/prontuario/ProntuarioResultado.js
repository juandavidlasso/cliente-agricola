import React from 'react'
import Resultado from './Resultado'
// import{ Link } from 'react-router-dom'
import Informe from './Informe'
import Spinner from '../Spinner'
import { BlobProvider } from '@react-pdf/renderer'
// GraphQL
import {CONSULTA_PRONTUARIO} from '../../apollo/querys'
import { useQuery } from '@apollo/client'


const ProntuarioResultado = ({busqueda, setValido, datoSuerte}) => {

    const nombre = datoSuerte

    const {inicial, final} = busqueda
    // console.log(inicial);
    // console.log(final);
    // console.log(nombre);

    // query hook
    const { data, loading, error } = useQuery(CONSULTA_PRONTUARIO, { variables: {nombre, inicial, final} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null

    const cerrar = () => {
        setValido(false)
    }

    return (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
                {data.consultaProntuario === null ? 
                    <p className="error">No hay datos para la consulta</p>
                : data.consultaProntuario.length === 0 ? 
                    <p className="error">No hay datos para la consulta</p>
                : (
                    <table className="table responsive-table centered table-bordered">
                        <thead className="text-white" style={{backgroundColor: "#37474f"}}>
                            <tr>
                                <th>Suerte</th>
                                <th>Área</th>
                                <th>Variedad</th>
                                <th>Corte No.</th>
                                <th>Fecha Siembra</th>
                                <th>Fecha Último Corte</th>
                                <th>Edad Corte</th>
                                <th>TCH</th>
                                <th>TCHM</th>
                                <th>Peso</th>
                                <th>Rendimiento %</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.consultaProntuario.map(cosecha => (
                                <Resultado key={cosecha.id_cosecha} cosecha={cosecha} />
                            ))}
                            <tr>
                                <td colSpan="11" className="center">
                                    <div>
                                    <BlobProvider 
                                        document={ <Informe key={data.consultaProntuario.id_cosecha} data={data} /> }
                                    >
                                        {({ url }) => (
                                            <a href={url} className="btnlink2" target="_blank" rel="noopener noreferrer">Generar Informe</a>
                                        )}

                                    </BlobProvider>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <div className="col-12">
                <button type="button" className="btn btn-block white-text btncerrar" onClick={() => cerrar()}>Cerrar</button>
          </div>
        </div>
    )
}

export default ProntuarioResultado
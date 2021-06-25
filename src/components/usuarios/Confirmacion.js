import React from 'react'
import Spinner from '../Spinner'
import { useHistory } from 'react-router-dom'
import UpdateConfirmacion from './UpdateConfirmacion'
// GraphQL
import {OBTENER_USUARIO_QUERY} from '../../apollo/querys'
import { useQuery } from '@apollo/client'


const Confirmacion = (props) => {

    // estado
    const history = useHistory()
    const codigo = props.match.params.codigo
    // query hook
    const {data, loading, error} = useQuery(OBTENER_USUARIO_QUERY, { variables: {codigo}})
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null
    
    return ( 
        <div className="container-fluid">
            <div className="row mb-0">
                <div className="col s12" style={{backgroundColor: "#212F3C", height: "70px"}}></div>
            </div>

            <div className="row justify-content-md-center">
                <div className="col-12	col-sm-12 col-md-12	col-lg-5 col-xl-5 col-xxl-5">
                    {data.obtenerUsuarioCodigo === null ?
                        <div className="dialog p-3" style={{width: '100%'}}>
                            <p className="txt-dialog" style={{textAlign: 'center'}}>
                                El código ingresado es incorrecto.
                            </p>
                            <button type="button" className="btnlink" onClick={() => history.push('/user/update-code')}>Aceptar</button>
                        </div>
                    :
                        <UpdateConfirmacion data={data} />
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Confirmacion;
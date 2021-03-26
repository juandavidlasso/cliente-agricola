import React, { Fragment } from 'react'
import Spinner from '../Spinner'
import Confirmacion from '../usuarios/Confirmacion'
// GraphQL
import {OBTENER_EMAIL_QUERY} from '../../apollo/querys'
import { useQuery } from '@apollo/client'

const ChangePassword = ({emailUsuario, setValido, actualizarEmail}) => {

    const {email} = emailUsuario

    // query hook
    const { data, loading, error } = useQuery(OBTENER_EMAIL_QUERY, { variables: {email} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return <Spinner />
    if(error) return null

    const cerrar = () => {
        actualizarEmail({
            email: ''
        })
        setValido(false)
    }
    
    return (
        <Fragment>
            {data.obtenerEmail === null ? 
                <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 center">
                            <p className="error">No hay un usuario registrado con este email</p> 
                            <button type="button" className="white-text btn-reset" onClick={() => cerrar()}>Aceptar</button>
                        </div>
                </div>
            :
                <Confirmacion data={data} />
            }
        </Fragment>
    )
}

export default ChangePassword
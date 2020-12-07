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
                <div className="col s4 offset-s4">
                    <p className="error">No hay un usuario registrado con este email</p> 
                    <button type="button" className="white-text btn-reset" onClick={() => cerrar()}>Regresar</button>
                </div>
            :
                <Confirmacion data={data} />
            }
        </Fragment>
    )
}

export default ChangePassword
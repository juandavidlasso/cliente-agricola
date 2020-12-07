import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import { validarEmail } from '../../utils/js/validaciones'
import ChangePassword from './ChangePassword'

const ForgotPassword = () => {

    const alertaContext = useContext(AlertaContext)
    const { warning, mostrarWarning} = alertaContext

    // state del componente
    const [ emailUsuario, actualizarEmail] = useState({
        email: ''
    })

    const [ valido , setValido ] = useState(false)

    // actualizar
    const actualizarState = e => {
        actualizarEmail({
            ...emailUsuario,
            [e.target.name]: e.target.value
        })
    }

    const { email } = emailUsuario


    const submitEmail = async (e) => {
        e.preventDefault()

        if(email.trim() === '') {
            mostrarWarning('Debe ingresar el correo.')
            return
        }

        if(validarEmail(email) === false) {
            mostrarWarning('El correo no tiene el formato correcto.')
            return
        }

        setValido(true)
    }
    return (
        <div className="container-fluid">
            <div className="row mb-0">
                <div className="col s12" style={{backgroundColor: "#212F3C", height: "70px"}}></div>
            </div>
            {valido ? 
                <div className="row">
                    <div className="col s12">
                        <div className="col s12 offset-s0 mt-5">
                            {valido ? <ChangePassword emailUsuario={emailUsuario} setValido={setValido} actualizarEmail={actualizarEmail} />  : null }
                        </div>
                    </div>
                </div>
            :
                <div className="row">
                    <div className="col s12">
                        <div className="col s4 offset-s4 mt-5">
                            <h4 className="center mt-3 mb-5">Ingrese su Email</h4>

                            { warning ? <p className="warning"> {warning.msg} </p> : null }

                            <div className="input-field">
                                <label htmlFor="correo">Email</label>
                                <input id="correo" placeholder="Email" type="email" className="validate" name="email" value={email} onChange={actualizarState} />
                            </div>

                            <div className="input-field center">
                                <button type="button" className="btnlink3" onClick={ e => submitEmail(e) }>Buscar</button>
                                <Link to="/user/login" className="btnlink3">Cancelar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ForgotPassword
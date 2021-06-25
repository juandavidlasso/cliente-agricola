import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const ChangePassword = () => {

    // state del componente
    const [mensaje, setMensaje] = useState(true)
    const history = useHistory()
    const [ codigoUsuario, actualizarcodigoUsuario] = useState({
        codigo: ''
    })

    // actualizar
    const actualizarState = e => {
        actualizarcodigoUsuario({
            ...codigoUsuario,
            [e.target.name]: e.target.value
        })
    }

    const { codigo } = codigoUsuario
    const M = window.M

    const consultaUsuario = async(e) => {
        // validar
        if (codigo.trim() === '') {
            M.toast({
                html: 'Debe ingresar el codigo.',
                displayLength: 2000,
                classes: 'red accent-4 white-text font-weight-bold p-3'
            })
            return
        }
        
        history.push(`/user/update-user/${codigo}`)
    }
    
    return (
        <div className="container-fluid">
            <div className="row mb-0">
                <div className="col s12" style={{backgroundColor: "#212F3C", height: "70px"}}></div>
            </div>


        {mensaje === true ?
            <div className="row justify-content-md-center">
                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 center">
                    <div className="dialog p-3" style={{width: '100%'}}>
                        <p className="txt-dialog">
                            Se le ha enviado un código a su correo electrónico, por favor, 
                            ingréselo a continuación para poder reestablecer su contraseña.
                        </p>
                        <button type="button" className="btnlink" onClick={() => (setMensaje(false))}>Aceptar</button>
                    </div>    
                </div>
            </div>
        :
            <div className="row justify-content-md-center">
                <div className="col-12	col-sm-12 col-md-12	col-lg-5 col-xl-5 col-xxl-5">
                    <div>
                        <h4 className="center mt-3 mb-5">Ingrese Código</h4>

                        <div className="input-field">
                            <label htmlFor="code">Código</label>
                            <input id="code" placeholder="Ingrese el código" type="text" className="validate" name="codigo" value={codigo} onChange={actualizarState} />
                        </div>

                        <div className="input-field center">
                            <button type="button" className="btnlink3" onClick={(e) => consultaUsuario(e)}>Aceptar</button>
                            <Link to="/user/login" className="btnlink3">Cancelar</Link>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}

export default ChangePassword
import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { validarPass } from '../../utils/js/validaciones'
// GraphQL
import {ACTUALIZAR_USER_MUTATION} from '../../apollo/mutations'
import { useMutation } from '@apollo/client'

const UpdateConfirmacion = (props) => {

    const codigo = props.location.state.codigo
    const nombre = props.location.state.data.obtenerEmail.nombre
    const apellido = props.location.state.data.obtenerEmail.apellido
    const email = props.location.state.data.obtenerEmail.email
    const rol = props.location.state.data.obtenerEmail.rol
    const id_usuario = Number(props.location.state.data.obtenerEmail.id_usuario)

    // estados del componente
    const history = useHistory()
    // Para mostrar las alertas
    const alertaContext = useContext(AlertaContext)
    const { warning, mostrarWarning} = alertaContext
    const { alerta, mostrarAlerta} = alertaContext
    // mutation
    const [ actualizarUsuario ] = useMutation(ACTUALIZAR_USER_MUTATION)
    // Para deshabilitar el doble clic del boton
    const [ activo, actualizarActivo ] = useState(true)
    // Para mostrar el form cuando se valida el codigo
    const [ validado, actualizarValidado ] = useState(true)
    // Para obtener el codigo ingresado en el form
    const [ verificacion, actualizarVerificacion ] = useState({
        nuevoCodigo: ''
    })
    // Para capturar los datos del usuario
    const [ nuevoUsuario, actualizarNuevoUsuario ] = useState({
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: '',
        rol: rol
    })

    // actualizar datos del usuario
    const actualizarStateUsuario = e => {
        actualizarNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        })
    }

    // Actualizar codigo verificacion
    const actualizarState = e => {
        actualizarVerificacion({
            ...verificacion,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores
    const { nuevoCodigo } = verificacion
    const { password } = nuevoUsuario
    const input = {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        password,
        rol: Number(nuevoUsuario.rol)
    }

    // Verificar el codigo
    const submitVerificarCodigo = async (e)  => {
        e.preventDefault()
    
        // validar
        if(nuevoCodigo.trim() === '') {
            mostrarWarning('Debe ingresar el código.')
            return
        }
        
        if(isNaN(nuevoCodigo)) {
            mostrarWarning('El código debe ser numérico.')
            return
        }

        if(codigo !== nuevoCodigo) {
            mostrarAlerta('El código ingresado es incorrecto.')
            return
        }

        actualizarActivo(false)
        actualizarValidado(false)
    }

    // Actualizar Usuario
    const submitActualizarUsuario = async (e) => {
        e.preventDefault()

        if(password.trim() === '') {
            mostrarWarning('Debe ingresar la nueva contraseña.')
            return
        }

        // validar password
        if(validarPass(password) === false) {
            mostrarWarning('El formato de la contraseña es inválida.')
            return
        }

        // guardar en la db
        try {
            await actualizarUsuario({
                variables: {
                    id_usuario,
                    input
                }
            })

            // console.log(data);

            // actualizar form
            actualizarNuevoUsuario({
                nombre: '',
                apellido: '',
                email: '',
                password: ''
            })

            Swal.fire({
                title: 'Éxito!',
                text: 'Datos actualizados correctamente! Ahora puede iniciar sesión.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1'
            }).then(function () {
                history.push('/user/login')
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', '')) 
        }
    }

    const cancelar = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Si cancela el proceso no podrá reestablecer su contraseña. Desea cancelar?',
            showCancelButton: true,
            confirmButtonText: 'Si, Cancelar',
            confirmButtonColor: '#b71c1c',
            cancelButtonText: 'No, Continuar',
            cancelButtonColor: '#1b5e20',
          }).then((result) => {
            if (result.value) {
              history.push('/reset/password')
            }
        })
    }

    

    return ( 
        <div className="container-fluid">
            <div className="row mb-0">
                <div className="col s12" style={{backgroundColor: "#212F3C", height: "70px"}}></div>
            </div>
            {validado ?
                <div className="row justify-content-md-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 center">
                        <div className="dialog p-3" style={{width: '100%', height: '350px'}}>
                            <form onSubmit={submitVerificarCodigo}>
                                <h5>Por favor, ingrese el código que le fue enviado a su correo electrónico para verificar su cuenta.</h5>

                                { warning ? <p className="warning1"> {warning.msg} </p> : null }
                                { alerta ? <p className="error1"> {alerta.msg} </p> : null }

                                <div className="input-field p-0">
                                    <input type="text" placeholder="Codigo de verificacion" name="nuevoCodigo" value={nuevoCodigo} onChange={actualizarState} />
                                </div>
                                <div className="center p-0">
                                    <input type="submit" className="btnlink" value="Verificar" disabled={!activo} />
                                    <Link to="/reset/password" className="btnlink">Cancelar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            :
                <div className="row">
                    <div className="col s12">
                        <div className="col s5 offset-s4 mt-4">
                            <form onSubmit={submitActualizarUsuario}>
                                <h4 className="center mb-5">Actualice su Contraseña</h4>

                                { warning ? <p className="warning"> {warning.msg} </p> : null }
                                { alerta ? <p className="error"> {alerta.msg} </p> : null }

                                <div className="input-field">
                                    <label htmlFor="nombre"> Nombre </label>
                                    <input disabled id="nombre" type="text" name="nombre" className="text-capitalize" defaultValue={nombre} onChange={actualizarStateUsuario} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="apellido"> Apellido </label>
                                    <input disabled id="apellido" type="text" name="apellido" className="text-capitalize" defaultValue={apellido} onChange={actualizarStateUsuario} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="email"> Email </label>
                                    <input disabled id="email" type="text" name="email" defaultValue={email} onChange={actualizarStateUsuario} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password"> Password </label>
                                    <input id="password" type="password" name="password" value={password} onChange={actualizarStateUsuario} />
                                    <small className="form-text text-muted center">
                                        La contraseña debe tener mínimo 8 caracteres, 
                                        una letra mayúscula, una letra minúscula, 
                                        un número y un caracter especial (@$!%*?&)
                                    </small>
                                </div>
                                <div className="input-field center">
                                    <input type="submit" className="btnlink3" value="Actualizar" />
                                    <button type="button" className="btnlink3" onClick={() => cancelar()}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
     );
}
 
export default UpdateConfirmacion;
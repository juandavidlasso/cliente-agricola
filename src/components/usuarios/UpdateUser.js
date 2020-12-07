import React, { useState, useContext } from 'react';
import { validarEmail, validarPass, validarTexto } from '../../utils/js/validaciones'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
// GraphQL
import {ACTUALIZAR_USER_MUTATION} from '../../apollo/mutations'
import { useMutation } from '@apollo/client'

const UpdateUser = ({data, actualizarEditar}) => {

    const {id_usuario, nombre, apellido, email, rol} = data.obtenerUsuario
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { warning, mostrarWarning} = alertaContext
    const { alerta, mostrarAlerta} = alertaContext
    // mutation hook
    const [ actualizarUsuario ] = useMutation(ACTUALIZAR_USER_MUTATION)

    // state del component
    const [ nuevoUsuario, actualizarNuevoUsuario ] = useState({
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: '',
        rol: rol
    })

    // actualizar
    const actualizarState = e => {
        actualizarNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        })
    }

    const { password } = nuevoUsuario
    const input = {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        password,
        rol: nuevoUsuario.rol
    }

    // submit
    const submitNuevoUsuario = async (e) => {
        e.preventDefault()

        // validar nombre solo letras
        if(validarTexto(nuevoUsuario.nombre) === false || validarTexto(nuevoUsuario.apellido) === false) {
            mostrarWarning('El nombre solo puede tener letras.')
            return
        }

        // validar formato email
        if(validarEmail(nuevoUsuario.email) === false) {
            mostrarWarning('El correo no tiene el formato correcto.')
            return
        }

        // validar password obligatoria
        if(password.trim() === '') {
            mostrarWarning('Dene ingresar la nueva contraseña.')
            return
        }

        // validar formato password
        if(validarPass(password) === false) {
            mostrarWarning('La contraseña es inválida.')
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
                text: 'Datos actualizados correctamente! Vuelva a iniciar sesión.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1'
            }).then(function () {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('rol')
                sessionStorage.clear()
                window.location.reload()
                history.push('/user/login')

            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', '')) 
        }
    }
    
    const cancelar = () => {
        actualizarEditar(true)
    }
    
    return ( 
        <form onSubmit={submitNuevoUsuario}>
            <h4 className="center">Actualice sus Datos</h4>

            { warning ? <p className="warning"> {warning.msg} </p> : null }
            { alerta ? <p className="error"> {alerta.msg} </p> : null }

            <div className="input-field">
                <label htmlFor="nombre"> Nombre </label>
                <input id="nombre" type="text" name="nombre" className="text-capitalize" defaultValue={nombre} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="apellido"> Apellido </label>
                <input id="apellido" type="text" name="apellido" className="text-capitalize" defaultValue={apellido} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="email"> Email </label>
                <input id="email" type="text" name="email" defaultValue={email} onChange={actualizarState} />
            </div>
            <div className="input-field">
                 <label htmlFor="password"> Password </label>
                <input id="password" type="password" name="password" value={password} onChange={actualizarState} />
                <small className="form-text text-muted center">
                    La contraseña debe tener mínimo 8 caracteres, 
                    una letra mayúscula, una letra minúscula, 
                    un número y un caracter especial ( @ $ ! % * ? & )
                </small>
            </div>
            <div className="input-field center">
                <input type="submit" className="btnlink" value="Actualizar" />
                <button type="button" onClick={() => cancelar()} className="btnlink">Cancelar</button>
            </div>
        </form>
     );
}
 
export default UpdateUser;
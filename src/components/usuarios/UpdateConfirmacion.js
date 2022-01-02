import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { validarPass } from '../../utils/js/validaciones'
// GraphQL
import {ACTUALIZAR_USER_MUTATION} from '../../apollo/mutations'
import { useMutation } from '@apollo/client'

const UpdateConfirmacion = ({data}) => {

    const {id_usuario, nombre, apellido, email, rol} = data.obtenerUsuarioCodigo

    // estados del componente
    const navigate = useNavigate()
    // Para mostrar las alertas
    const alertaContext = useContext(AlertaContext)
    const { warning, mostrarWarning} = alertaContext
    const { alerta, mostrarAlerta} = alertaContext
    // mutation hook
    const [ actualizarUsuario ] = useMutation(ACTUALIZAR_USER_MUTATION)

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

    // Extraer los valores
    const { password } = nuevoUsuario
    const input = {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        password,
        rol: Number(nuevoUsuario.rol)
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
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }).then(function () {
                navigate('/user/login')
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
              navigate('/reset/password')
            }
        })
    }

    

    return ( 
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
    );
}
 
export default UpdateConfirmacion;
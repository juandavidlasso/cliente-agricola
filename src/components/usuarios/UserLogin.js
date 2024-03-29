import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../imagenes/logo.png'
import { validarEmail } from '../../utils/js/validaciones'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import useTitle from '../../utils/context/hooks/useSEO'
import Swal from 'sweetalert2'
// GraphQL
import {AUTENTICAR_USUARIO_MUTATION} from '../../apollo/mutations'
import { useMutation } from '@apollo/client'


const UserLogin = () => {

  useTitle({ title: 'Login' })

  // estado del componente
  const navigate = useNavigate()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  const { success, mostrarSuccess } = alertaContext
  // mutation hook
  const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO_MUTATION)

  // state del componente
  const [ usuario, actualizarUsuario ] = useState({
    email: '',
    password: ''
  })


  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  // Extraer los valores
  const { email, password } = usuario
  const input = {
    email,
    password
  }


  // Cuando el usuario presiones agregar usuario
  const submitAutenticarUsuario = async (e) => {
    e.preventDefault()

    // validar
    if(email.trim() ==='' || password.trim() === '') {
      mostrarWarning('Todos los campos son obligatorios')
      return
    }

    // validar email
    if(validarEmail(email) === false) {
      mostrarWarning('El correo no tiene el formato correcto')
      return
    }

    // guardar en la db
    try {
      const { data } = await autenticarUsuario({
        variables: {
          input
        }
      }) 
      mostrarSuccess('Autenticando') 

      // Almacenar token
      const { token } = data.autenticarUsuario
      sessionStorage.setItem('token', token)

      setTimeout(() => {
        // limpiar state
        actualizarUsuario({
          email: '',
          password: ''
        })
        // Redireccionar
        navigate('/user/profile')
      },2100)
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))
      if(error.message === 'Failed to fetch') {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'No se pudo establecer conexión con el servidor. Intente de nuevo en unos minutos.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d47a1',
          customClass: {
            popup: 'borde-popup-war',
            content: 'contenido-popup-war',
            title: 'title-popup-war'
          }
        })
      }
    }
  }

  const spinnerRegistrando = () => {
    return (
      <p className="sucess">
        {success.msg}&nbsp;
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      </p>
    )
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <img src={logo} id="icon" alt="User Icon"/>
        </div>

        <form onSubmit={ e => submitAutenticarUsuario(e,)}>

          { alerta ? <p className="error"> {alerta.msg} </p> : null }
          { warning ? <p className="warning"> {warning.msg} </p> : null }
          { success && spinnerRegistrando() }

          <div className="input-field">
            <input type="email" className="fadeIn second" name="email" placeholder="Email" value={email} onChange={actualizarState} />
          </div>
          <div className="input-field">
            <input type="password" className="fadeIn third" name="password" placeholder="Contrase&ntilde;a" value={password} onChange={actualizarState} />
          </div>
          <div>
            <input type="submit" className="btnlink" value="Iniciar Sesion"/>
          </div>
        </form>
           
        <div id="formFooter">
          <Link to="/reset/password" className="underlineHover">Olvidó su password</Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin

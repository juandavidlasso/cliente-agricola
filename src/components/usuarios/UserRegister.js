import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { validarTexto, validarEmail, validarPass } from '../../utils/js/validaciones'
import useTitle from '../../utils/context/hooks/useSEO'
// Email
import emailjs from 'emailjs-com'
// GraphQL
import {NUEVO_USUARIO_MUTATION} from '../../apollo/mutations'
import { useMutation } from '@apollo/client'


const UserRegister = () => {

  useTitle({ title: 'Registrar Usuario' })

  // estados del componente
  const history = useHistory()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext
  const { warning, mostrarWarning} = alertaContext
  // mutation hook
  const [ agregarUsuario ] = useMutation(NUEVO_USUARIO_MUTATION)
  const [ btnactivo, actualizarActivo ] = useState(true)

  // state del componente
  const [ usuario, actualizarUsuario ] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: ''
  })


  // Funcion que ejecuta cada que el usuario escribe
  const actualizarState = e => {
    actualizarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  // Extraer los valores
  const { nombre, apellido, email, password, rol } = usuario
  const input = {
    nombre,
    apellido,
    email,
    password,
    rol: Number(rol)
  }

  // Cuando el usuario presiones agregar usuario
  const submitNuevoUsuario = async (e)  => {
    e.preventDefault()

    // validar campos vacios
    if(nombre.trim() === '' ||
       apellido.trim() === '' ||
       email.trim() ==='' ||
       password.trim() === '' ||
       rol.trim() === '') {
        mostrarWarning('Los campos marcados con * son obligatorios.')
         return
    }

    // validar nombre solo letras
    if(validarTexto(nombre) === false || validarTexto(apellido) === false) {
      mostrarWarning('El nombre solo puede tener letras.')
      return
    }

    // validar email
    if(validarEmail(email) === false) {
      mostrarWarning('El correo no tiene el formato correcto.')
      return
    }

    // validar password
    if(validarPass(password) === false) {
      mostrarWarning('El formato de la contraseña es inválida.')
      return
    }

    // guardar en la db
    try {
      await agregarUsuario({
        variables: {
          input
        }
      })
      actualizarActivo(false)

      var templateParams = {
        email,
        nombre
      }

      // mensaje de verificacion
      let timerInterval
      Swal.fire({
        title: 'Registrando...',
        timer: 5000,
        timerProgressBar: true,
        allowOutsideClick: false,
        customClass: {
          popup: 'borde-popup',
          content: 'contenido-popup',
          title: 'title-popup'
        },
        onBeforeOpen: async () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
          // enviar email
          await emailjs.send('gmail', 'template_QsHGmrTG', templateParams, 'user_TGZTjLWHDk1FqKJ6TvpPD')
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
              console.log('FAILED...', error);
          })
        },
        onClose: async () => {
          clearInterval(timerInterval)
          Swal.fire({
            icon: 'success',
            title: 'Felicitaciones',
            text: 'El usuario ha sido registrado exitosamente, ahora puede iniciar sesión.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d47a1',
            customClass: {
              popup: 'borde-popup',
              content: 'contenido-popup',
              title: 'title-popup'
            }
          }).then(function () {
            history.push('/user/register')
            // limpiar form
            actualizarUsuario({
              nombre: '',
              apellido: '',
              email: '',
              password: '',
              rol: ''
            })
            actualizarActivo(true)
          })
        }
      })    
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))
    }
  }

  return (
    <div className="col-md-5 offset-md-5">
      <div className="col-sm-8 mx-auto">
        <h1 className="text-center"> Ingrese los Datos </h1>
      </div>
      <form onSubmit={submitNuevoUsuario} className="contact-form">

        { alerta ? <p className="error"> {alerta.msg} </p> : null }
        { warning ? <p className="warning"> {warning.msg} </p> : null }

        <div className="input-field">
          <span className="red-text font-weight-bold">*</span>
          <input type="text" className="validate text-capitalize" placeholder="Primer Nombre" name="nombre" onChange={actualizarState} value={nombre} />
        </div>
        <div className="input-field">
          <span className="red-text font-weight-bold">*</span>
          <input type="text" className="validate text-capitalize" placeholder="Apellido" name="apellido" onChange={actualizarState} value={apellido} />
        </div>
        <div className="input-field">
          <span className="red-text font-weight-bold">*</span>
          <input type="email" className="validate second" placeholder="correo@correo.com" name="email" onChange={actualizarState} value={email} />
        </div>
        <div className="input-field">
          <span className="red-text font-weight-bold">*</span>
          <input type="password" className="validate" placeholder="Contraseña" name="password" onChange={actualizarState} value={password} />
          <small className="form-text text-muted center">
            La contraseña debe tener mínimo 8 caracteres, 
            una letra mayúscula, una letra minúscula, 
            un número y un caracter especial (@$!%*?&)
          </small>
        </div>
        <div className="input-field" style={{marginBottom: "2rem"}}>
          <span className="red-text font-weight-bold">*</span>
          <select style={{display: "block",border: "2px solid #e1e1e1"}} name="rol" value={rol} onChange={actualizarState}>
            <option value="">-- Seleccione Rol --</option>
            <option value="1" disabled>ADMINISTRADOR</option>
            <option value="2">SUPERVISOR</option>
          </select>
          {rol === "1" ? 
            <p className="red-text"><b className="black-text">*</b><i>Recuerde que el administrador puede registrar y editar la información.</i><b className="black-text">*</b></p>
          : rol === "2" ?
            <p className="red-text"><b className="black-text">*</b><i>Recuerde que el supervisor solo puede visualizar la información.</i><b className="black-text">*</b></p>
          : 
            null 
          }
        </div>
        <div className="center">
          <input type="submit" className="btnlink" value="Registrar" disabled={!btnactivo} />
          <Link to={"/main"} className="btnlink"> Cancelar </Link>
        </div>        
      </form>
    </div>
  )
}

export default UserRegister

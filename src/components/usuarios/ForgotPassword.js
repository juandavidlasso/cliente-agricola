import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import { validarEmail } from '../../utils/js/validaciones'
import Swal from 'sweetalert2'
// GraphQL
import {UPDATE_PASSWORD} from '../../apollo/mutations'
import { useMutation } from '@apollo/client'

const ForgotPassword = () => {

    const alertaContext = useContext(AlertaContext)
    const { warning, mostrarWarning} = alertaContext
    const history = useHistory()
    // mutation hook
    const [ resetPassword ] = useMutation(UPDATE_PASSWORD)

    // state del componente
    const [ emailUsuario, actualizarEmail] = useState({
        email: ''
    })

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

        // insertar codigo y enviar email
        try {
            await resetPassword({
                variables: {
                    email
                }
            })

            let timerInterval
            Swal.fire({
            title: 'Esto tomará unos minutos.',
            html: 'Estamos verificando su correo electrónico.',
            timer: 2000,
            timerProgressBar: true,
            allowOutsideClick: false,
            showConfirmButton: false,
            customClass: {
                popup: 'borde-popup',
                content: 'contenido-popup',
                title: 'title-popup'
            },
            onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
                Swal.fire({
                    title: 'Éxito!',
                    text: 'Verificado.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d47a1',
                    allowOutsideClick: false,
                    customClass: {
                      popup: 'borde-popup',
                      content: 'contenido-popup',
                      title: 'title-popup'
                    }
                }).then(() => {
                    history.push('/user/update-code')
                })
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                return null
            }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: (error.message.replace('GraphQL error: ', '')),
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                popup: 'borde-popup',
                content: 'contenido-popup',
                title: 'title-popup'
                }
            })
        }
    }
    return (
        <div className="container-fluid">
            <div className="row mb-0">
                <div className="col s12" style={{backgroundColor: "#212F3C", height: "70px"}}></div>
            </div>

            <div className="row justify-content-md-center">
                <div className="col-12	col-sm-12 col-md-12	col-lg-5 col-xl-5 col-xxl-5">
                    <div>
                        <h4 className="center mt-3 mb-5">Ingrese su Email</h4>

                        { warning ? <p className="warning"> {warning.msg} </p> : null }

                        <div className="input-field">
                            <label htmlFor="correo">Email</label>
                            <input id="correo" placeholder="Email" type="email" className="validate" name="email" value={email} onChange={actualizarState} />
                        </div>

                        <div className="input-field center">
                            <button type="button" className="btnlink3" onClick={ e => submitEmail(e) }>Aceptar</button>
                            <Link to="/user/login" className="btnlink3">Cancelar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
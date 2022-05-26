import React, { useContext, useState } from 'react';
import Modal from 'react-modal'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Spinner from '../../Spinner'
import { toast } from 'react-toastify'
// GraphQL
import {INFORME_EMAIL} from '../../../apollo/mutations'
import {OBTENER_AREA_SUERTE_QUERY} from '../../../apollo/querys'
import { useMutation, useQuery } from '@apollo/client'

// Modal
Modal.setAppElement('#root');

const ModalInformeFertilizantes = ({modalIsOpen, setIsOpen, id_corte, nombre, numero, props}) => {

    const [email, setEmail] = useState('')
    const [asunto, setAsunto] = useState('')
    const [load, setLoad] = useState(false)
    const alertaContext = useContext(AlertaContext)
    const { warning, mostrarWarning} = alertaContext
    const { alerta, mostrarAlerta} = alertaContext
    const id_suerte = props
    // Query
    const { data, loading, error } = useQuery(OBTENER_AREA_SUERTE_QUERY, { variables: {id_suerte} })
    // Mutation
    const [ enviarInformeCorreo ] = useMutation(INFORME_EMAIL)

    const closeModal = () => {
        setEmail('')
        setAsunto('')
        setLoad(false)
        setIsOpen(false)
    }

    if(loading) return <Spinner />
    if(error) return null
    const hta = data.obtenerAreaSuerte
    let newArea
    hta === null ? newArea = 1 : newArea = (hta).toFixed(2)
    const area = Number(newArea)
    const nombreSuerte = Number(nombre)

    // Submit email
    const submitEmail = async(e) => {
        e.preventDefault()

        const codigo = 2

        if (email.trim() === '') {
            mostrarWarning('Debe ingresar el correo.')
            return
        }

        if (asunto.trim() === '') {
            mostrarWarning('Debe ingresar el asunto.')
            return
        }

        try {
            setLoad(true)

            await enviarInformeCorreo({
                variables: {
                    id_corte,
                    numero,
                    nombreSuerte,
                    area,
                    email,
                    asunto,
                    codigo
                }
            }).then( (res) => {
                if (res.data.enviarInformeCorreo.success === true) {
                    setLoad(false)

                    setEmail('')
                    setAsunto('')

                    setIsOpen(false)

                    toast.success( (res.data.enviarInformeCorreo.message), {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })
                } else {
                    setLoad(false)

                    setEmail('')
                    setAsunto('')
                    
                    setIsOpen(false)

                    toast.error( (res.data.enviarInformeCorreo.message), {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })
                }
            })

        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
        }
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            className="Modal p-3"
            overlayClassName="Overlay"
            contentLabel="Example Modal"
        >
            <div className='Overlay_container'>

                { warning ? <p className="warning"> {warning.msg} </p> : null }
                { alerta ? <p className="error"> {alerta.msg} </p> : null }

                <button type='button' className='right Overlay_btn_close' onClick={closeModal}>X</button>
                <h1>Ingrese el correo</h1>
                <form onSubmit={submitEmail}>
                    <div className='mb-3'>
                        <input type='text' placeholder='Email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='Asunto' name='asunto' value={asunto} onChange={e => setAsunto(e.target.value)} />
                    </div>
                    <div>
                        { load ?    <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status"></div>
                            </div> : <input type='submit' value='Enviar' className='Overlay_btn_enviar' /> }
                    </div>
                </form>
            </div>
        </Modal>
    );
}
 
export default ModalInformeFertilizantes;
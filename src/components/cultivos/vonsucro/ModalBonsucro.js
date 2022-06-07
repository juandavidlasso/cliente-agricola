import React, { useState, useContext } from 'react';
import Modal from 'react-modal'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { toast } from 'react-toastify'
// GraphQL
import {INFORME_EMAIL} from '../../../apollo/mutations'
import { useMutation } from '@apollo/client'

// Modal
Modal.setAppElement('#root');

const ModalBonsucro = ({modalIsOpen, setModalIsOpen, dataInforme, setDataInforme}) => {

    // State
    const [email, setEmail] = useState('')
    const [asunto, setAsunto] = useState('')
    const [load, setLoad] = useState(false)
    // Context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta, warning, mostrarWarning} = alertaContext
    // Mutation
    const [ enviarInformeCorreo ] = useMutation(INFORME_EMAIL)

    // Cerra modal
    const closeModal = () => setModalIsOpen(false)

    // Submit
    const submitCorreo = async (e) => {
        e.preventDefault()

        if(email.trim() === '' || asunto.trim() === '') {
            mostrarWarning('Debe ingresar el correo y el asunto.')
            return
        }

        setLoad(true)

        const input = dataInforme
        
        for (let index = 0; index < input.length; index++) {
            if(input[index].id_trafe === '') {
                input[index].id_trafe = 0
            } else if(input[index].id_trahe === '') {
                input[index].id_trahe = 0
            }
        }

        try {
            await enviarInformeCorreo({
                variables: {
                    input,
                    email,
                    asunto
                }
            })

            // Cierro modal
            setLoad(false)
            setEmail('')
            setAsunto('')
            setModalIsOpen(false)
            // Mensaje exito
            toast.success('El informe se envió exitosamente', {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            // Vaciar el array
            setDataInforme([])
            
        } catch (error) {
            setLoad(false)
            mostrarAlerta( (error.message.replace('GraphQL error: ', '')) )
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
                <form onSubmit={submitCorreo}>
                    <div className='mb-3'>
                        <input type='text' placeholder='Email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='Asunto' name='asunto' value={asunto} onChange={e => setAsunto(e.target.value)} />
                    </div>
                    <div>
                        { load ?
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status"></div>
                            </div>
                        :
                            <>
                                <input type='submit' value='Enviar' className='Overlay_btn_enviar me-3' />
                                <button type='button' className='Overlay_btn_enviar' onClick={closeModal}>Cerrar</button>
                            </>
                        }
                    </div>
                </form>
            </div>
        </Modal>
    );
}
 
export default ModalBonsucro;
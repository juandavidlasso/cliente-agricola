import React, { useState } from 'react';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
// GraphQL
import { NUEVO_INSUMO } from '../../../apollo/mutations'
import { OBTENER_INSUMOS } from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const InsumoRegistro = ({setRegistroInsumo}) => {

    // Mutation
    const [ agregarInsumo ] = useMutation(NUEVO_INSUMO)
    // State
    const [ activo, actualizarActivo ] = useState(true)
    const [insumo, setInsumo] = useState({
        nombre: '',
        referencia: '',
        marca: '',
        cantidad: ''
    })

    // OnChange
    const actualizarState = (e) => {
        setInsumo({
            ...insumo,
            [e.target.name]: e.target.value
        })
    }

    // Extract
    const { nombre, referencia, marca, cantidad  } = insumo
    const input = {
        nombre,
        referencia,
        marca,
        cantidad
    }

    // Submit
    const submitInsumo = async (e) => {
        e.preventDefault()

        // Valida
        if (nombre.trim() === '' || referencia.trim() === '' || marca.trim() === '' || cantidad.trim() === '') {
            toast.error('Debe ingresar todos los datos del insumo', {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }

        actualizarActivo(false)

        // Save
        try {
            await agregarInsumo({
                variables: {
                  input
                },
                refetchQueries: [
                  {query: OBTENER_INSUMOS}
                ]
            })
        
            // Reiniciar el form
            setInsumo({
                nombre: '',
                referencia: '',
                marca: '',
                cantidad: ''
            })

            Swal.fire({
                title: 'Exito',
                text: "El insumo se registró exitosamente, desea registrar más insumos?",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#1b5e20',
                confirmButtonText: 'Si, Registrar',
                cancelButtonColor: '#b71c1c',
                cancelButtonText: 'No, Terminar',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    actualizarActivo(true)
                } else {
                    setRegistroInsumo(false)
                }
            })
        } catch (error) {
            actualizarActivo(true)
            toast.error( error.message.replace('GraphQL error: ', ''), {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })   
        }
    }
    
    return (
        <div className='Content_show_form p-3'>
            <h1 className='mb-5 center'>Registrar Insumo</h1>
            <form onSubmit={submitInsumo}>
                <div className="mb-3">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className="validate" id="name" placeholder='Nombre' name='nombre' value={nombre} onChange={actualizarState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ref">Referencia</label>
                    <input type="text" className="validate" id="ref" placeholder='Referencia' name='referencia' value={referencia} onChange={actualizarState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="marca">Marca</label>
                    <input type="text" className="validate" id="marca" placeholder='Marca' name='marca' value={marca} onChange={actualizarState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="canti">Cantidad</label>
                    <input type="text" className="validate" id="canti" placeholder='Cantidad' name='cantidad' value={cantidad} onChange={actualizarState} />
                </div>
                <div className='center'>
                    <input type="submit" className="Content_registro_button_registro_1 me-5" disabled={!activo} value='Registrar' />
                    <button type='button' className='Content_registro_button_registro_2' onClick={() => setRegistroInsumo(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
 
export default InsumoRegistro;
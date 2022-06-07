import React, { useState } from 'react';
import { toast } from 'react-toastify'
// GraphQL
import { NUEVO_INSUMO } from '../../apollo/mutations'
import { OBTENER_INSUMOS } from '../../apollo/querys'
import { useMutation } from '@apollo/client'

const InsumoRegistro = () => {

    // State
    const [ agregarInsumo ] = useMutation(NUEVO_INSUMO)
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
            toast.error('Debe ingresar todos los datos', {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }

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

            toast.success('El insumo se ha registrado con éxito', {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
        } catch (error) {
            toast.error( error.message.replace('GraphQL error: ', ''), {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })   
        }
    }
    
    return (
        <div className='row'>
            <div className='col-md-10 offset-md-2 p-2'>
                <div className='col s12 p-2'>
                    <div className='Content_titulo center p-2'>
                        <h1>Registrar Insumo</h1>
                    </div>
                </div>
                <div className='col s12 p-1'>
                    <div className='col s12 p-3'>
                        <div className='col s6 offset-s3 p-3 Content_show_form'>
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
                                    <button type="submit" className="Content_registro_button_registro">Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default InsumoRegistro;
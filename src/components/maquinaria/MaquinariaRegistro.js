import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { validarCostoLabor } from '../../utils/js/validaciones'
// GraphQL
import { NUEVA_MAQUINARIA } from '../../apollo/mutations'
import { OBTENER_MAQUINARIAS } from '../../apollo/querys'
import { useMutation } from '@apollo/client'

const MaquinariaRegistro = () => {

    // State
    const [ agregarMaquinaria ] = useMutation(NUEVA_MAQUINARIA)
    const [maquina, setMaquina] = useState({
        marca: '',
        serie: '',
        modelo: '',
        potencia: '',
        color: ''
    })

    // OnChange
    const actualizarState = (e) => {
        setMaquina({
            ...maquina,
            [e.target.name]: e.target.value
        })
    }

    // Extract
    const { marca, serie, modelo, potencia, color } = maquina
    const input = {
        marca,
        serie,
        modelo: Number(modelo),
        potencia: Number(potencia),
        color
    }

    // Submit
    const submitMaquinaria = async (e) => {
        e.preventDefault()

        // Valida
        if (marca.trim() === '' || serie.trim() === '' || modelo.trim() === '' || 
            potencia.trim() === '' || color.trim() === '') {
            toast.error('Debe ingresar todos los datos', {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }

        if (validarCostoLabor(modelo) === false || validarCostoLabor(potencia) === false) {
            toast.error('El modelo y la potencia deben ser numéricos', {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }

        // Save
        try {
            await agregarMaquinaria({
                variables: {
                  input
                },
                refetchQueries: [
                  {query: OBTENER_MAQUINARIAS}
                ]
            })
        
            // Reiniciar el form
            setMaquina({
                marca: '',
                serie: '',
                modelo: '',
                potencia: '',
                color: ''
            })

            toast.success('La maquinaria se ha registrado con éxito', {
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
            <div className='Content_principal'>
                <div className='col s12 p-1'>
                    <div className='col s12 p-1'>
                        <div className='Content_titulo center p-2'>
                            <h1>Registrar Maquinaria</h1>
                        </div>
                    </div>
                </div>
                <div className='col s12 p-1'>
                    <div className='col s12 p-3'>
                        <div className='col s6 offset-s3 p-3 Content_show_form'>
                            <form onSubmit={submitMaquinaria}>
                                <div className="mb-3">
                                    <label htmlFor="name">Marca</label>
                                    <input type="text" className="validate" id="name" placeholder='Marca' name='marca' value={marca} onChange={actualizarState} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="serie" className="form-label">Serie</label>
                                    <input type="text" className="validate" id="serie" placeholder='Serie' name='serie' value={serie} onChange={actualizarState} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="model" className="form-label">Modelo</label>
                                    <input type="text" className="validate" id="model" placeholder='Modelo' name='modelo' value={modelo} onChange={actualizarState} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hp" className="form-label">Potencia - HP</label>
                                    <input type="text" className="validate" id="hp" placeholder='Potencia' name='potencia' value={potencia} onChange={actualizarState} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="color" className="form-label">Color</label>
                                    <input type="text" className="validate" id="color" placeholder='Color' name='color' value={color} onChange={actualizarState} />
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
 
export default MaquinariaRegistro;
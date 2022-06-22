import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { validarCostoLabor } from '../../../utils/js/validaciones'
import Swal from 'sweetalert2'
// GraphQL
import { NUEVA_MAQUINARIA } from '../../../apollo/mutations'
import { OBTENER_MAQUINARIAS } from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const MaquinariaRegistro = ({setFormRegistro}) => {

    // State
    const [ agregarMaquinaria ] = useMutation(NUEVA_MAQUINARIA)
    const [ activo, actualizarActivo ] = useState(true)
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

        actualizarActivo(false)

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

            Swal.fire({
                title: 'Exito',
                text: "La maquinaria se registro exitosamente, desea registrar más maquinaria?",
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
                    setFormRegistro(false)
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
        <div className='p-3 Content_show_form'>
            <h1 className='mb-5 center'>Registrar Maquinaria</h1>
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
                    <button type="submit" className="Content_registro_button_registro_1 me-5" disabled={!activo}>Registrar</button>
                    <button type='button' className='Content_registro_button_registro_2' onClick={() => setFormRegistro(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
 
export default MaquinariaRegistro;
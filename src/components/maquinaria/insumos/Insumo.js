import React, { useState } from 'react';
import Swal from 'sweetalert2'
// GraphQL
import { ELIMINAR_INSUMO } from '../../../apollo/mutations'
import { OBTENER_INSUMOS } from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Insumo = ({insumo}) => {

    const{idInsumo, nombre, referencia, marca, cantidad} = insumo
    // Mutation
    const [ eliminarInsumo ] = useMutation(ELIMINAR_INSUMO)
    // State
    const [activo, actualizarActivo] = useState(true)
    const rol = Number(sessionStorage.getItem('rol'))

    // Submit eliminar insumo
    const submitEliminarInsumo = async (e, idInsumo) => {
        e.preventDefault()

        actualizarActivo(false)

        // Pregunto si de verdad desea eliminar
        Swal.fire({
            title: 'Atención',
            text: "Esta acción no se puede deshacer, desea eliminar el insumo?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#1b5e20',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonColor: '#b71c1c',
            cancelButtonText: 'No, Cancelar',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then( async (result) => {
            if (result.isConfirmed) {
                // Elimino insumo
                try {
                    await eliminarInsumo({
                        variables: {
                            idInsumo
                        },
                        refetchQueries: [
                            {query: OBTENER_INSUMOS}
                        ]
                    })

                    Swal.fire({
                        title: 'Éxito!',
                        text: 'El insumo se eliminó correctamente!',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        customClass: {
                            popup: 'borde-popup',
                            content: 'contenido-popup',
                            title: 'title-popup'
                        }
                    })
                } catch (error) {
                    actualizarActivo(true)
                    Swal.fire({
                        title: 'Error',
                        text: error.message.replace('GraphQL error: ', ''),
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        customClass: {
                            popup: 'borde-popup',
                            content: 'contenido-popup',
                            title: 'title-popup'
                        }
                    })
                }
            } else {
                actualizarActivo(true)
            }
        })
    }

    return (
        <tr key={idInsumo}>
            <td>{nombre}</td>
            <td>{referencia}</td>
            <td>{marca}</td>
            <td>{cantidad}</td>
            {rol === 1 ?
                <td className='center'>
                    <button
                        type='button'
                        className='btneliaphe'
                        onClick={(e) => submitEliminarInsumo(e, idInsumo)}
                        disabled={!activo}
                    >
                        <i className="fas fa-trash me-2"></i>
                        Eliminar
                    </button>
                </td>
            :
                null
            }
        </tr>
    );
}
 
export default Insumo;
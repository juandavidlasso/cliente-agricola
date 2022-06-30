import React, { useState } from 'react';
import moment from 'moment'
import Swal from 'sweetalert2'
// GraphQL
import { ELIMINAR_LISTA_MANTENIMIENTO } from '../../../../apollo/mutations'
import { OBTENER_MANTENIMIENTO } from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const ListaMantenimientos = ({mantenimiento, idMaquinaria}) => {

    // State
    const [activo, actualizarActivo] = useState(true)
    const [ eliminarListaMantenimiento ] = useMutation(ELIMINAR_LISTA_MANTENIMIENTO)
    // Data
    const {idMantenimiento,fecha,detalle,horaCambio,tipoCambio,cantidad,insumoPadre,proximoCambio} = mantenimiento
    const {nombre} = insumoPadre
    // Variables para mostrar el proximo cambio en fecha y en horas
    let nextCambioFecha
    let newHora

    let newFecha
    if(tipoCambio === false && proximoCambio) {
        newFecha = moment(horaCambio).format('YYYY-MM-DD')
        nextCambioFecha = moment(newFecha).add(proximoCambio, 'months').format('YYYY-MM-DD')
    } else {
        nextCambioFecha = null
    }

    if (tipoCambio === true && proximoCambio) {
        newHora = Number(horaCambio)+Number(proximoCambio)
    } else {
        newHora = null
    }

    const rol = Number(sessionStorage.getItem('rol'))

    // Submit eliminar lista mantenimiento
    const submitEliminarMante = async (e, idMantenimiento) => {
        e.preventDefault()

        actualizarActivo(false)

        Swal.fire({
            title: 'Atención',
            text: "Desea eliminar el mantenimiento? Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            confirmButtonColor: '#1b5e20',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#b71c1c',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then( async (result) => {
            if (result.isConfirmed) {

                try {
                    await eliminarListaMantenimiento({
                        variables: {
                            idMantenimiento
                        },
                        refetchQueries: [
                            {query: OBTENER_MANTENIMIENTO, variables: {idMaquinaria}}
                        ]
                    })

                    Swal.fire({
                        title: 'Éxito!',
                        text: 'El mantenimiento se eliminó exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1',
                        allowOutsideClick: false,
                        customClass: {
                            popup: 'borde-popup',
                            content: 'contenido-popup',
                            title: 'title-popup'
                        }
                    })
                } catch (error) {
                    actualizarActivo(true)

                    Swal.fire({
                        title: 'Éxito!',
                        text: 'Los datos se actualizaron correctamente!',
                        icon: 'success',
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
            } else {
                actualizarActivo(true)
            }
        })
    }

    return (
        <tr key={idMantenimiento}>
            <td>{fecha}</td>
            <td>{nombre}</td>
            <td>{cantidad}</td>
            <td>{horaCambio}</td>
            <td>{tipoCambio === false ? nextCambioFecha : newHora}</td>
            <td>{detalle}</td>
            {rol === 1 ?
                <td className='center'>
                    <button type='button' className='btneliaphe' onClick={(e) => submitEliminarMante(e, idMantenimiento)} disabled={!activo}><i className="fas fa-trash me-2"></i>Eliminar</button>
                </td>
            :
                null
            }
        </tr>
    )
}
 
export default ListaMantenimientos;
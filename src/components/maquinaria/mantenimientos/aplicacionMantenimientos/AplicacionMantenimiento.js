import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import ListaMantenimientos from '../listadoMantenimientos/ListaMantenimientos';
// GraphQL
import { ELIMINAR_APLICACION_MANTENIMIENTO } from '../../../../apollo/mutations'
import { OBTENER_MANTENIMIENTO } from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const AplicacionMantenimiento = ({mantenimiento, idMaquinaria, marca}) => {

    const {fecha, idApMant, listMantenimientos, nombre} = mantenimiento

    // State
    const [verListado, setVerListado] = useState(false)
    const [activo, actualizarActivo] = useState(true)
    // Mutation
    const [ eliminarAplicacionMantenimiento ] = useMutation(ELIMINAR_APLICACION_MANTENIMIENTO)

    const rol = Number(sessionStorage.getItem('rol'))

    // Submit eliminar aplicacion
    const submitEliminarAplMant = async (e, idApMant) => {
        e.preventDefault()

        actualizarActivo(false)

        Swal.fire({
            title: 'Atención',
            text: "Desea eliminar la aplicación mantenimiento? Esta acción no se puede deshacer",
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
                    await eliminarAplicacionMantenimiento({
                        variables: {
                            idApMant
                        },
                        refetchQueries: [
                            {query: OBTENER_MANTENIMIENTO, variables: {idMaquinaria}}
                        ]
                    })

                    Swal.fire({
                        title: 'Éxito!',
                        text: 'La aplicación mantenimiento se eliminó exitosamente',
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
        <div className='col s12 p-1 mb-3 contenedorAplMant' key={idApMant}>

            {/* Label fecha de mantenimiento y nombre */}
            <div className='col s6 p-2'>
                <div className='p-1'>
                    <i className="fas fa-hiking"></i>
                    <span className="ahover ms-2" style={{cursor: 'pointer'}} onClick={() => setVerListado(true)}>Fecha mantenimiento: {fecha} - {nombre}  </span>
                </div>
            </div>

            {/* Boton agregar mantenimientos */}
            {rol === 1 ?
                <Fragment>
                    <div className='col s3 p-2 center'>
                        <Link to='/maquinaria/registro-mantenimiento' state={{ data: {idApMant, idMaquinaria, marca} }} className="btnmenu">+ Agregar Mantenimientos</Link>
                    </div>

                    {/* Botones editar y eliminar */}
                    <div className='col s3 p-2 center'>
                        <Link to='/maquinaria/editar-aplicacion-mantenimiento' state={{ data: {idApMant, idMaquinaria} }} className="btnmenu1">
                            Editar
                        </Link>
                        <button type='button' className="btneliaphe ms-2" onClick={(e) => submitEliminarAplMant(e, idApMant)} disabled={!activo}>Eliminar</button>
                    </div>
                </Fragment>
            :
                null
            }

            {/* Listado de mantenimientos aplicados */}
            {verListado === true ?
                <div className='col s12 p-2'>
                    <div className='p-2'>
                        {listMantenimientos.length === 0 ?
                            'No hay mantenimientos registrados'
                        :
                            <table className='table table-bordered table-striped table-hover'>
                                <thead style={{background: '#212F3C', color: 'white'}}>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Insumo</th>
                                        <th>Cantidad</th>
                                        <th>Cambio</th>
                                        <th>Próximo cambio</th>
                                        <th>Detalle</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listMantenimientos.map( (mantenimiento) => <ListaMantenimientos key={mantenimiento.idMantenimiento} mantenimiento={mantenimiento} idMaquinaria={idMaquinaria} />)
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            :
                null
            }

            {/* Icono expand more and less */}
            <div className='col s12 p-1 center'>
                {verListado === true ?
                    <div className="p-1 contenedorFlechas" onClick={() => setVerListado(false)}>
                        <i className="material-icons" >expand_less</i>
                    </div>
                :
                    <div className='p-1 contenedorFlechas' onClick={() => setVerListado(true)}>
                        <i className="material-icons">expand_more</i>
                    </div>
                }
            </div>
        </div>
    );
}
 
export default AplicacionMantenimiento;
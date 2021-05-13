import React, { Fragment, useState } from 'react';
import Tabloncito from './Tabloncito'
import Swal from 'sweetalert2'
// GraphQL
import {OBTENER_RIEGOS_CORTE_QUERY, OBTENER_APRIEGOS_RIEGO} from '../../../apollo/querys'
import {ELIMINAR_RIEGO_MUTATION} from '../../../apollo/mutations'
import { useMutation, useQuery } from '@apollo/client'

const Riego = ({
                riegos,
                setRiegoId,
                setShowEdit,
                setDate,
                setCorteId,
                id_corte,
                setVerEdit,
                setIdRiegoEd,
                setFechaEd,
                setNumRiegoEd,
                setIdCorteEd}) => {

    const {id_riego,fecha,num_riego} = riegos
    // mutation hook
    const [ eliminarRiego ] = useMutation(ELIMINAR_RIEGO_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)
    const { data, loading, error } = useQuery(OBTENER_APRIEGOS_RIEGO, { variables: {id_riego} })
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    // Enviar objeto al modal aplicar riego
    const editProduct = () => {
        setShowEdit(true)
        setRiegoId(id_riego)
        setDate(fecha)
        setCorteId(id_corte)
    }

    // enviar datos al modal editar riego
    const editRiego = () => {
        setVerEdit(true)
        setIdRiegoEd(id_riego)
        setFechaEd(fecha)
        setNumRiegoEd(num_riego)
        setIdCorteEd(id_corte)
    }

    if(loading) return null
    if(error) return null
    const rol = sessionStorage.getItem('rol')

    // submit
    const submitEliminarRiego = async (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Atención',
            text: "Esta acción no se puede deshacer. Desea eliminar el riego?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar',
            confirmButtonColor: '#1b5e20',
            cancelButtonText: 'No, Cancelar',
            cancelButtonColor: '#b71c1c',
            allowOutsideClick: false,
            customClass: {
                popup: 'borde-popup-war',
                content: 'contenido-popup-war',
                title: 'title-popup-war'
            }
        }).then( async (result) => {
            if (result.value) {
                actualizarActivo(false)
                // guardar en la db
                try {
                    await eliminarRiego({
                        variables: {
                            id_riego
                        },
                        refetchQueries: [{
                            query: OBTENER_RIEGOS_CORTE_QUERY, variables: {id_corte}
                        }]
                    })

                    // Mensaje
                    Swal.fire({
                    title: 'Éxito!',
                    text: 'El riego se aplicó correctamente!',
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
                    actualizarActivo(true)
                }
            } else {
                actualizarActivo(true)
            }
        })
    }

    return (
        <tr key={id_riego}>
            <td>
                {fecha}
                {rol === '1' ?
                    <Fragment>
                        <br />
                        <button
                            type="button"
                            className="mt-2 btnApriego2"
                            onClick={() => editProduct()}
                        >
                            Aplicar Riego
                        </button>
                    </Fragment>
                :
                    null
                }
            </td>
            <td style={{textAlign: 'left'}}>
                {data.obtenerAplicacionRiegos.length === 0 ?
                    'No hay tablones con riego'
                :
                    <Fragment>
                        {data.obtenerAplicacionRiegos.map(listado => (
                            <Tabloncito
                                key={listado.id_tablon}
                                listado={listado}
                            />
                        ))}
                    </Fragment>
                }
            </td>
            <td>{num_riego}</td>
            {rol === '1' ?
                <td>
                    <button
                        type="button"
                        className="mt-2 btnApriego"
                        onClick={() => editRiego()}
                    >
                        Editar Riego
                    </button>
                    <button
                        type="button"
                        className="mt-2 btnApriego1"
                        onClick={(e) => submitEliminarRiego(e)}
                        disabled={!activo}
                    >
                        Eliminar Riego
                    </button>
                </td>
            :
                null
            }
        </tr>
    );
}
 
export default Riego;
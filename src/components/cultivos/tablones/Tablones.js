import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
// GraphQL
import {ELIMINAR_TABLON_MUTATION} from '../../../apollo/mutations'
import {OBTENER_TABLONES_POR_CORTE_QUERY, 
        OBTENER_AREA_SUERTE_QUERY, 
        COUNT_TABLONES_SUERTE_QUERY, 
        OBTENER_TOTAL_HTA_QUERY,
        OBTENER_AREA_CORTE_QUERY } from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Tablones = ({tablon, id_corte, id_suerte, fecha_corte}) => {

    const { id_tablon, numero, area } = tablon
    const rol = sessionStorage.getItem('rol')
    // mutation
    const [ eliminarTablon ] = useMutation(ELIMINAR_TABLON_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // submit eliminar tablon
    const submitEliminarTablon = async (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Atención',
            text: "Esta acción no se puede deshacer. Desea eliminar el tablón?",
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
                try {
                    await eliminarTablon({
                        variables: {
                            id_tablon
                        },
                        refetchQueries: [
                            {query: OBTENER_TABLONES_POR_CORTE_QUERY, variables: {id_corte}},
                            {query: OBTENER_AREA_SUERTE_QUERY, variables: {id_suerte}},
                            {query: COUNT_TABLONES_SUERTE_QUERY, variables: {id_suerte}},
                            {query: OBTENER_TOTAL_HTA_QUERY},
                            {query: OBTENER_AREA_CORTE_QUERY, variables: {id_corte}}
                        ]
                    })

                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'El tablón se eliminó correctamente.',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1',
                        allowOutsideClick: false,
                        customClass: {
                            popup: 'borde-popup',
                            content: 'contenido-popup',
                            title: 'title-popup'
                        }
                    }).then(function () {
                        window.location.reload()
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
        <tr key={id_tablon}>
            <td>{numero}</td>
            <td>{area}</td>
            {rol === "1" ? fecha_corte ?
                null
            :
                <Fragment>
                    <td>
                        <Link
                            to={`/tablon/editar/${id_tablon}/${id_corte}/${id_suerte}`}
                            state={{ id_tablon:id_tablon, id_corte:id_corte, id_suerte:id_suerte }}
                            className="btn btn-sm btn-warning"
                        >
                            Editar
                        </Link>
                    </td>
                    <td><button type="button" className="btn btn-sm btn-danger" onClick={(e) => submitEliminarTablon(e)} disabled={!activo}>Eliminar</button></td>
                </Fragment>
            :
                null
            }
        </tr>
     );
}
 
export default Tablones;
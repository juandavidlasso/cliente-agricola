import React, { useState } from 'react';
import Swal from 'sweetalert2'
// GraphQL
import {OBTENER_LLUVIAS_ACTUALES_QUERY, OBTENER_LLUVIA_MES_ANO_QUERY, OBTENER_RESUMEN_PLUVIOMETROS_QUERY} from '../../../apollo/querys'
import {ELIMINAR_LLUVIA_MUTATION} from '../../../apollo/mutations'
import { useMutation } from '@apollo/client'

const ResultadoLluvia = ({listadoLluvias, fechanueva, id_pluviometro, setDatosLluvia, setShowLluvia, setPluviometrol, setFecDate}) => {

    const {cantidad, fecha, id_lluvia} = listadoLluvias
    // mutation hook
    const [ eliminarLluvia ] = useMutation(ELIMINAR_LLUVIA_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)
    
    const rol = sessionStorage.getItem('rol')

    // Enviar objeto al modal
    const editLluvia = (id) => {
        setShowLluvia(true)
        setDatosLluvia(listadoLluvias)
        setPluviometrol(id_pluviometro)
        setFecDate(fechanueva)
    };    

    // submit
    const submitEliminarLluviaMesAno = async(e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Atención',
            text: "Esta acción no se puede deshacer. Desea eliminar la lluvia?",
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
                    await eliminarLluvia({
                        variables: {
                            id_lluvia
                        },
                        refetchQueries: [
                            {query: OBTENER_LLUVIAS_ACTUALES_QUERY, variables: {id_pluviometro}},
                            {query: OBTENER_LLUVIA_MES_ANO_QUERY, variables: {fechanueva, id_pluviometro}},
                            {query: OBTENER_RESUMEN_PLUVIOMETROS_QUERY}
                        ]
                    })
        
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'La lluvia se eliminó correctamente.',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1',
                        allowOutsideClick: false,
                        customClass: {
                          popup: 'borde-popup',
                          content: 'contenido-popup',
                          title: 'title-popup'
                        }
                    }).then(() => {
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
                }
            } else {
              actualizarActivo(true)
            }
        })        
    }    

    return (
        <tr key={id_lluvia}>
            <td>{fecha}</td>
            <td>{cantidad}</td>
            {rol === '1' ?
                <td className="p-2">
                    <button type="button" className="btnlluvia mr-2" onClick={e => submitEliminarLluviaMesAno(e)} disabled={!activo}>Eliminar</button>
                    <button type="button" className="btnlluvia1" onClick={() => editLluvia(id_lluvia)}>Editar</button>
                </td>
            :
                null
            }
        </tr>
    );
}
 
export default ResultadoLluvia;
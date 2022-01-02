import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'
// GraphQL
import {ELIMINAR_APLA_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const AplicacionPlaga = ({data, props, corte, tablon, trapl, estado, fecha_inicio, setShowEditN, setTrataPL, setApliPL}) => {

    const id_suerte = props
    const id_tablon = tablon
    const id_corte = corte
    const {id_trapl} = trapl
    const {id_apla, fecha} = data.obtenerAplicacionPlagas
    const rol = sessionStorage.getItem('rol')
    // mutation
    const [ eliminarApla ] = useMutation(ELIMINAR_APLA_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // Enviar objeto al modal
    const editProduct = () => {
        setShowEditN(true)
        setTrataPL(trapl)
        setApliPL(data.obtenerAplicacionPlagas)
    };

    // submit eliminar tratamiento herbicida
    const submitEliminarApla = async() => {
        Swal.fire({
            title: 'Atención',
            text: "Esta acción no se puede deshacer. Desea eliminar la aplicación?",
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
                try {
                    await eliminarApla({
                        variables: {
                            id_apla
                        },
                        refetchQueries: [{
                            query: OBTENER_APLA_QUERY, variables: {id_corte, id_tablon, id_trapl}
                        }]
                    })
            
                    actualizarActivo(false)

                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'La aplicación se eliminó correctamente.',
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
                }
            } else {
                actualizarActivo(true)
            }
        })
    }    

    return (
        <Fragment>
            <td key={id_apla}>{moment(fecha).format('DD-MM-YYYY')}</td>
            {rol === '1' ? estado === true ?
                <td>
                    <Link 
                        to={`/plaga-aplicacion/editar/${id_suerte}/${id_corte}/${id_tablon}/${id_trapl}/${id_apla}`}
                        state={{
                            id_suerte:id_suerte,
                            id_corte:id_corte,
                            id_tablon:id_tablon,
                            id_trapl:id_trapl,
                            id_apla:id_apla,
                            fecha_inicio:fecha_inicio
                        }}
                        className="btneditth1"
                    >
                        Editar
                    </Link>
                    <br />
                    <button type='button' className="btnelitth1 mt-2 mb-1" onClick={() => submitEliminarApla()} disabled={!activo}>Eliminar</button>
                    <button type='button' className="red-text btnLinkTrans" onClick={() => editProduct()} style={{fontSize: '10px'}}>Desea utilizar esta información en otra suerte?</button>
                </td>
            :
                null
            :
                null
            }
        </Fragment>
    )
}

export default AplicacionPlaga
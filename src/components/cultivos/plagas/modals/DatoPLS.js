import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap'
import Swal from 'sweetalert2'
import moment from 'moment'
// GraphQL
import {NUEVO_TRAPL_MUTATION, NUEVA_APLA_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRAPL_QUERY, OBTENER_APLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoPLS = ({listadoTablones, tratamientopl, aplicacionpl, id_corte, fecha_inicio, fecha_corte}) => {

    const {id_tablon, numero, area} = listadoTablones
    const {cantidad, id_trapl, producto, tiempo, unidad} = tratamientopl
    const {fecha} = aplicacionpl
    // mutation hook
    const [ agregarAplicacionPlaga ] = useMutation(NUEVA_APLA_MUTATION)
    const [ agregarTratamientoPlaga ] = useMutation(NUEVO_TRAPL_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // extraer valores tratamiento plaga
    const input = {
        producto,
        unidad,
        cantidad: Number(cantidad),
        tiempo
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const fapla = moment(fecha)

    // submit
    const submitNuevoTrataApliPlaga = async (e) => {
        e.preventDefault()

        // validar
        if(fapla < ficorte) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de la aplicación no puede ser inferior a la fecha de inicio del corte.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
            return
        }

        if(ffcorte !== null && fapla > ffcorte) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de la aplicación no puede ser mayor a la fecha de fin del corte.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
            return
        }      


        // guardar en la db
        try {
            await agregarTratamientoPlaga({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_TRAPL_QUERY
                }]
            })
            await agregarAplicacionPlaga({
                variables: {
                    input: {
                        fecha,
                        corte_id: Number(id_corte),
                        tablon_id: Number(id_tablon),
                        trapl_id: Number(id_trapl)
                    }
                },
                refetchQueries: [{
                    query: OBTENER_APLA_QUERY, variables: {id_corte, id_tablon, id_trapl}
                }]
            })
            actualizarActivo(false)

            Swal.fire({
                title: 'Éxito!',
                text: 'El tratamiento y la la aplicación se registraron correctamente!',
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
        }
    }

    return (
        <Dropdown.Item
            eventKey={id_tablon}
            className="hdato"
            disabled={!activo}
            onClick={e => submitNuevoTrataApliPlaga(e)}
        >
            Tablón {numero} - Área {area}
        </Dropdown.Item>
    );
}
 
export default DatoPLS;
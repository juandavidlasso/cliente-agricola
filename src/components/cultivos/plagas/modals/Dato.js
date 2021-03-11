import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap'
import Swal from 'sweetalert2'
import moment from 'moment'
// GraphQL
import {NUEVA_APLA_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Dato = ({listadoTablones, trapl, fecha, id_corte, fecha_inicio, fecha_corte}) => {

    const {area, id_tablon, numero} = listadoTablones
    const {id_trapl} = trapl
    // mutation hook
    const [ agregarAplicacionPlaga ] = useMutation(NUEVA_APLA_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // extraer valores
    const input = {
        fecha,
        corte_id: Number(id_corte),
        tablon_id: Number(id_tablon),
        trapl_id: Number(id_trapl)
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const fapla = moment(fecha)

    // submit
    const submitNuevaAplicaionPlaga = async (e) => {
        e.preventDefault()

        // validar
        if(fapla < ficorte) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de aplicación no puede ser inferior a la fecha de inicio del corte.',
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
                text: 'La fecha de aplicación no puede ser mayor a la fecha de fin del corte.',
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
            await agregarAplicacionPlaga({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APLA_QUERY, variables: {id_corte, id_tablon, id_trapl}
                }]
            })
            actualizarActivo(false)

            // Redirigir
            Swal.fire({
                title: 'Éxito!',
                text: 'La aplicación se registró correctamente!',
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
            key={id_tablon}
            eventKey={id_tablon}
            onClick={e => submitNuevaAplicaionPlaga(e)}
            disabled={!activo}
            className="hdato"
        >
            Tablón {numero} - área {area}
        </Dropdown.Item>
    );
}
 
export default Dato;
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Swal from 'sweetalert2'
import moment from 'moment'
// Graphql
import {NUEVA_APHE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_APHE_POR_CORTE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoH = ({cortes, aherbicidas, setTH, setUserIdAphe}) => {

    const {id_aphe, fecha, tipo} = aherbicidas
    const {id_corte, numero, fecha_inicio, fecha_corte} = cortes

    // mutation hook
    const [ agregarAplicacionHerbicida ] = useMutation(NUEVA_APHE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaAHerbicida ] = useState({
        id_aphe: id_aphe,
        fecha: fecha,
        tipo: tipo,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaAHerbicida.fecha,
        tipo: nuevaAHerbicida.tipo,
        corte_id: id_corte
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const faphe = moment(nuevaAHerbicida.fecha)    

    // submit
    const submitNuevaAHerbicida = async (e) => {
        e.preventDefault()

        // validar
        if(faphe < ficorte) {
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

        if(ffcorte !== null && faphe > ffcorte) {
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
        
        actualizarActivo(false)

        // guardar en la db
        try {
            const {data} = await agregarAplicacionHerbicida({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APHE_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })

            // Mensaje
            Swal.fire({
                title: 'Éxito!',
                text: 'La aplicación se registró correctamente! Ahora seleccione los tratamientos que desea registrar.',
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
            setTH(false)
            setUserIdAphe(data.agregarAplicacionHerbicida.id_aphe)
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
    }

    return ( 
        <Dropdown.Item 
            href="#" 
            key={id_corte}
            disabled={!activo}
            onClick={e => submitNuevaAHerbicida(e)}
            className="hdato"
        >
            Corte {numero}
        </Dropdown.Item>
    );
}
 
export default DatoH;
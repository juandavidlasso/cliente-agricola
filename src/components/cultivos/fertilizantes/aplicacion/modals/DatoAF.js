import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Swal from 'sweetalert2'
import moment from 'moment'
// Graphql
import {NUEVA_APFE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_APFE_POR_CORTE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoAF = ({cortes, afertilizantes, setTF, setUserIdApfe}) => {

    const {id_apfe, fecha, tipo} = afertilizantes
    const {id_corte, numero, fecha_inicio, fecha_corte} = cortes

    // mutation hook
    const [ agregarAplicacionFertilizante ] = useMutation(NUEVA_APFE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaAF ] = useState({
        id_apfe: id_apfe,
        fecha: fecha,
        tipo: tipo,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaAF.fecha,
        tipo: nuevaAF.tipo,
        corte_id: id_corte
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const fapfe = moment(nuevaAF.fecha)     

    // submit
    const submitNuevaAF = async (e) => {
        e.preventDefault()

        // validar
        if(fapfe < ficorte) {
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

        if(ffcorte !== null && fapfe > ffcorte) {
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
            const { data } = await agregarAplicacionFertilizante({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APFE_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })
            
            actualizarActivo(false)

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
            setTF(false)
            setUserIdApfe(data.agregarAplicacionFertilizante.id_apfe)
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
            href="#" 
            key={id_corte}
            disabled={!activo}
            onClick={e => submitNuevaAF(e)}
            className="hdato"
        >
            Corte {numero}
        </Dropdown.Item>
    );
}
 
export default DatoAF;
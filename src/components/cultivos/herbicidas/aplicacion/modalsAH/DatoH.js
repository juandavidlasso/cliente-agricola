import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Swal from 'sweetalert2'
// Graphql
import {NUEVA_APHE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_APHE_POR_CORTE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoH = ({cortes, aherbicidas, setTH, setUserIdAphe}) => {

    const {id_aphe, fecha, tipo} = aherbicidas
    const {id_corte, numero} = cortes

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

      // submit
  const submitNuevaAHerbicida = async (e) => {
    e.preventDefault()

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
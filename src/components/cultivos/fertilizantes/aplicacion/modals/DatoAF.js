import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Swal from 'sweetalert2'
// Graphql
import {NUEVA_APFE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_APFE_POR_CORTE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoAF = ({cortes, afertilizantes}) => {

    const {id_apfe, fecha, tipo} = afertilizantes
    const {id_corte, numero} = cortes

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

      // submit
  const submitNuevaAF = async (e) => {
    e.preventDefault()

    // guardar en la db
    try {
        await agregarAplicacionFertilizante({
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
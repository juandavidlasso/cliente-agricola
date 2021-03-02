import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Swal from 'sweetalert2'
// Graphql
import {NUEVA_LABOR_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_LABORES_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Dato = ({cortes, labor}) => {

    const {id_labor, fecha, actividad, equipo, estado, pases, aplico, costo, nota} = labor
    const {id_corte, numero} = cortes

    // mutation hook
    const [ agregarLabor ] = useMutation(NUEVA_LABOR_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaLabor ] = useState({
        id_labor: id_labor,
        fecha: fecha,
        actividad: actividad,
        equipo: equipo,
        estado: estado,
        pases: pases,
        aplico: aplico,
        costo: costo,
        nota: nota,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaLabor.fecha,
        actividad: nuevaLabor.actividad,
        equipo: nuevaLabor.equipo,
        estado: nuevaLabor.estado,
        pases: Number(nuevaLabor.pases),
        aplico: nuevaLabor.aplico,
        costo: Number(nuevaLabor.costo),
        nota: nuevaLabor.nota,
        corte_id: id_corte
    }

      // submit
  const submitNuevaLabor = async (e) => {
    e.preventDefault()

    // guardar en la db
    try {
        await agregarLabor({
            variables: {
                input
            },
            refetchQueries: [{
                query: OBTENER_LABORES_POR_CORTE_QUERY, variables: {id_corte}
            }]
        })
        
        actualizarActivo(false)

        // Mensaje
        Swal.fire({
            title: 'Éxito!',
            text: 'La labor se registró correctamente!',
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
            onClick={e => submitNuevaLabor(e)}
            className="hdato"
        >
            Corte {numero}
        </Dropdown.Item>
    );
}
 
export default Dato;
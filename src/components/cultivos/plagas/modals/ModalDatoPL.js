import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
// GraphQL
import {NUEVA_APLA_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'


const ModalDatoPL = ({listado, trapl, fecha, id_corte}) => {

    const { id_tablon, numero } = listado
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

    
    // submit
    const submitNuevaAplicaionPlaga = async (e) => {
        e.preventDefault()


        // guardar en la db
        try {
            await agregarAplicacionPlaga({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APLA_QUERY,
                    variables: {id_corte, id_tablon, id_trapl}
                }]
            })
            actualizarActivo(false)
            // console.log(data);


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
        <Button 
            key={id_tablon} 
            className="d-inline-block mr-2 mb-2" 
            style={{backgroundColor: "#b71c1c", color: 'white'}}
            onClick={e => submitNuevaAplicaionPlaga(e)}
            disabled={!activo}
        >
            Tablón {numero}
        </Button>
     );
}
 
export default ModalDatoPL;
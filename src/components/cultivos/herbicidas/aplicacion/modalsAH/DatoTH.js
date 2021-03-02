import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
// Graphql
import {NUEVO_TRHE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_TRHE_POR_APHE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoTH = ({tratamientos, apheid}) => {

    const {id_trahe, producto, dosis, presentacion, aplico, valor, nota} = tratamientos
    const id_aphe = apheid
    // mutation hook
    const [ agregarTratamientoHerbicida ] = useMutation(NUEVO_TRHE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ tratamientoHerbicida ] = useState({
        id_trahe: '',
        producto: producto,
        dosis: dosis,
        presentacion: presentacion,
        valor: valor,
        aplico: aplico,
        nota: nota,
        aphe_id: id_aphe
    })

    const input = {
        producto: tratamientoHerbicida.producto,
        dosis: Number(tratamientoHerbicida.dosis),
        presentacion: tratamientoHerbicida.presentacion,
        valor: Number(tratamientoHerbicida.valor),
        aplico: tratamientoHerbicida.aplico,
        nota: tratamientoHerbicida.nota,
        aphe_id: id_aphe
    }

    // submit
    const submitNuevoTratamientoHerbicida = async (e) => {
        e.preventDefault()

        // guardar en la db
        try {
            await agregarTratamientoHerbicida({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_TRHE_POR_APHE_QUERY, variables: {id_aphe}
                }]
            })
            actualizarActivo(false)
            

            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'El tratamiento se registró correctamente!',
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
            key={id_trahe} 
            className="d-inline-block mr-2 mb-2" 
            style={{backgroundColor: "#b71c1c", color: 'white'}}
            disabled={!activo}
            onClick={e => submitNuevoTratamientoHerbicida(e)}
        >
            {producto}
        </Button>
    );
}
 
export default DatoTH;
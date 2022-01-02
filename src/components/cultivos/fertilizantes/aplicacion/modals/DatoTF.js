import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
// Graphql
import {NUEVO_TRFE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_TRFE_POR_APFE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoTF = ({tratamientosF, apfeid}) => {

    const {id_trafe, producto, dosis, presentacion, aplico, valor, nota} = tratamientosF
    const id_apfe = apfeid
    // mutation hook
    const [ agregarTratamientoFertilizante ] = useMutation(NUEVO_TRFE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ tratamientoFertilizante ] = useState({
        id_trafe: '',
        producto: producto,
        dosis: dosis,
        presentacion: presentacion,
        valor: valor,
        aplico: aplico,
        nota: nota,
        apfe_id: id_apfe
    })

    const input = {
        producto: tratamientoFertilizante.producto,
        dosis: Number(tratamientoFertilizante.dosis),
        presentacion: tratamientoFertilizante.presentacion,
        valor: Number(tratamientoFertilizante.valor),
        aplico: tratamientoFertilizante.aplico,
        nota: tratamientoFertilizante.nota,
        apfe_id: id_apfe
    }

    // submit
    const submitNuevoTratamientoFertilizante = async (e) => {
        e.preventDefault()

        actualizarActivo(false)

        // guardar en la db
        try {
            await agregarTratamientoFertilizante({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_TRFE_POR_APFE_QUERY, variables: {id_apfe}
                }]
            })
            
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
            actualizarActivo(true)
        }
    }    

    return ( 
        <Button 
            key={id_trafe} 
            className="d-inline-block me-2 mb-2" 
            style={{backgroundColor: "#b71c1c", color: 'white'}}
            disabled={!activo}
            onClick={e => submitNuevoTratamientoFertilizante(e)}
        >
            {producto}
        </Button>
    );
}
 
export default DatoTF;
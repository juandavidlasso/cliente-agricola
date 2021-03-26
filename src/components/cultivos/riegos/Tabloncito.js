import React from 'react';
import Swal from 'sweetalert2'
// GraphQL
import {AGREGAR_APLICACION_RIEGO_MUTATION, ACTUALIZAR_TABLON_MUTATION} from '../../../apollo/mutations'
import {OBTENER_TABLON_QUERY, OBTENER_TABLONES_POR_CORTE_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Tabloncito = ({listado, id_riego, id_corte}) => {

    const {id_tablon, numero, area, estado} = listado
    // mutation hook
    const [ agregarAplicacionRiego ] = useMutation(AGREGAR_APLICACION_RIEGO_MUTATION)
    // actualizar tablon
    const [ actualizarTablon ] = useMutation(ACTUALIZAR_TABLON_MUTATION)

    // extraer valores
    const input = {
        riego_id: id_riego,
        tablon_id: id_tablon
    }

    // submit
    const submitAplicarRiego = async(e) => {
        e.preventDefault()
        
        // insertar en la db
        try {
            await agregarAplicacionRiego({
                variables: {
                    input
                }
            })

            await actualizarTablon({
                variables: {
                    id_tablon,
                    input: {
                        numero: Number(numero),
                        area: Number(area),
                        estado: false,
                        corte_id: id_corte
                    }
                },
                refetchQueries: [
                    {query: OBTENER_TABLON_QUERY, variables: {id_tablon}},
                    {query: OBTENER_TABLONES_POR_CORTE_QUERY, variables: {id_corte}}
                ]
            })

            Swal.fire({
                title: 'Éxito!',
                text: 'El riego se aplicó correctamente!',
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
        <button
        type="button"
            key={id_tablon}
            className={ estado === true ? "spanRiego" : "spanRiegoD"}
            onClick={e => submitAplicarRiego(e)}
            disabled={!estado}
        >
            {numero}
        </button>
    );
}
 
export default Tabloncito;
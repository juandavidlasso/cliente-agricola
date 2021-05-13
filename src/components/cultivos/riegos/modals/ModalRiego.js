import React from 'react';
import Swal from 'sweetalert2'
// GraphQL
import {AGREGAR_APLICACION_RIEGO_MUTATION, ACTUALIZAR_TABLON_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TABLONES_POR_CORTE_QUERY, OBTENER_APRIEGOS_RIEGO} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const ModalRiego = ({listadoT, idriego, id_corte}) => {

    const {id_tablon, numero, area} = listadoT
    const id_riego = idriego
    // mutation hook
    const [ agregarAplicacionRiego ] = useMutation(AGREGAR_APLICACION_RIEGO_MUTATION)
    const [ actualizarTablon ] = useMutation(ACTUALIZAR_TABLON_MUTATION)

    // extaer valores
    const input = {
        riego_id: id_riego,
        tablon_id: id_tablon,
        num_tablon: numero
    }

    // submit
    const nuevaAplicacionRiego = async(e) => {
        e.preventDefault()

        // guardar en la db
        try {
            await agregarAplicacionRiego({
                variables: {
                    id_riego,
                    id_tablon,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_APRIEGOS_RIEGO, variables: {id_riego}}
                ]
            })

            await actualizarTablon({
                variables: {
                    id_tablon,
                    input: {
                        id_tablon: id_tablon,
                        numero: Number(numero),
                        area: area,
                        estado: false,
                        corte_id: id_corte
                    }
                },
                refetchQueries: [{
                    query: OBTENER_TABLONES_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })

            // Mensaje
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
            key={id_tablon}
            type="button"
            className="spanRiego1"
            onClick={e => nuevaAplicacionRiego(e)}
        >
            {numero}
        </button>
    );
}
 
export default ModalRiego;
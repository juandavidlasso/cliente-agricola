import React, { useState ,useContext } from 'react';
import Swal from 'sweetalert2'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
// GraphQL
import { NUEVO_TABLON_MUTATION } from '../../../apollo/mutations'
import {OBTENER_TABLONES_POR_CORTE_QUERY, 
    OBTENER_AREA_SUERTE_QUERY, 
    COUNT_TABLONES_SUERTE_QUERY, 
    OBTENER_TOTAL_HTA_QUERY,
    OBTENER_AREA_CORTE_QUERY } from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Tablon = ({tablones, idNuevoCorte, id_suerte}) => {

    const {id_tablon, numero, area, estado} = tablones
    const id_corte = Number(idNuevoCorte)
    const alertaContext = useContext(AlertaContext)
    const { mostrarAlerta} = alertaContext
    // mutation hook
    const [ agregarTablon ] = useMutation(NUEVO_TABLON_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // extraer valores
    const input = {
        numero: Number(numero),
        area: Number(area),
        estado: estado,
        corte_id: id_corte
    }

    // submit
    const submitNuevoTablon = async(e) => {
        e.preventDefault()

        // guardar en la db
        try {
            await agregarTablon({
                variables: {
                    input,
                    id_corte
                },
                refetchQueries: [
                    {query: OBTENER_TABLONES_POR_CORTE_QUERY, variables: {id_corte}},
                    {query: OBTENER_AREA_SUERTE_QUERY, variables: {id_suerte}},
                    {query: COUNT_TABLONES_SUERTE_QUERY, variables: {id_suerte}},
                    {query: OBTENER_TOTAL_HTA_QUERY},
                    {query: OBTENER_AREA_CORTE_QUERY, variables: {id_corte}}
                ]
            })
            actualizarActivo(false)

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'El tablón se registró correctamente!',
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
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
        }

    }

    return ( 
        <tr key={id_tablon}>
            <td>{numero}</td>
            <td>{area}</td>
            <td><button onClick={(e) => submitNuevoTablon(e)} type="button" className="btn btn-success" disabled={!activo}>Registrar</button></td>
        </tr>
     );
}
 
export default Tablon;
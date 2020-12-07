import React, { useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
// GraphQL
import {ELIMINAR_TABLON_MUTATION} from '../../../apollo/mutations'
import {OBTENER_TABLONES_POR_CORTE_QUERY, 
        OBTENER_AREA_SUERTE_QUERY, 
        COUNT_TABLONES_SUERTE_QUERY, 
        OBTENER_TOTAL_HTA_QUERY,
        OBTENER_AREA_CORTE_QUERY } from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const Tablones = ({tablon, id_corte, id_suerte, fecha_corte}) => {

    const { id_tablon, numero, area } = tablon
    const rol = sessionStorage.getItem('rol')
    const history = useHistory()
    // mutation
    const [ eliminarTablon ] = useMutation(ELIMINAR_TABLON_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    const submitEliminarTablon = async() => {
        Swal.fire({
            title: 'Atención',
            text: "Esta acción no se puede deshacer. Desea eliminar el tablón?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar',
            confirmButtonColor: '#1b5e20',
            cancelButtonText: 'No, Cancelar',
            cancelButtonColor: '#b71c1c',
          }).then( async (result) => {
            if (result.value) {
                try {
                    await eliminarTablon({
                        variables: {
                            id_tablon
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
                        text: 'El tablón se eliminó correctamente.',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1'
                    }).then(function () {
                        history.push(`/corte/detalle/${id_corte}/${id_suerte}`)
                    })
                } catch (error) {
                    
                }
            } else {
                actualizarActivo(true)
            }
          })
    }

    return ( 
        <tr key={id_tablon}>
            <td>{numero}</td>
            <td>{area}</td>
            {rol === "1" ? fecha_corte ?
                null
            :
                <Fragment>
                    <td><Link to={`/tablon/editar/${id_tablon}/${id_corte}/${id_suerte}`} className="btn btn-sm btn-warning">Editar</Link></td>
                    <td><button type="button" className="btn btn-sm btn-danger" onClick={() => submitEliminarTablon()} disabled={!activo}>Eliminar</button></td>
                </Fragment>
            :
                null
            }
        </tr>
     );
}
 
export default Tablones;
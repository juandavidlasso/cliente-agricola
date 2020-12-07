import React from 'react'
import { Link } from 'react-router-dom'

const Producto = ({trapl, props, corte}) => {

    const id_suerte = props
    const {id_corte} = corte
    const {id_trapl, producto, unidad, cantidad, tiempo} = trapl
    const rol = sessionStorage.getItem('rol')

    return (
        <tr key={id_trapl}>
            <td>{producto}</td>
            <td>{unidad}</td>
            <td>{cantidad}</td>
            <td>{tiempo}</td>
            {rol === '1' ?
                <td>
                    <Link to={`/plaga-tratamiento/editar/${id_trapl}/${id_corte}/${id_suerte}`} className="red-text">Editar</Link>
                </td> 
            :
                null
            }
        </tr>
    )
}

export default Producto
import React from 'react'
import { Link } from 'react-router-dom'

const Producto = ({trapl, props, corte, setUserId4Actions, setShowEdit, setUserIdCorte, setFechaICorte, setFechaFCorte}) => {

    const id_suerte = props
    const {id_corte, fecha_inicio, fecha_corte} = corte
    const {id_trapl, producto, unidad, cantidad, tiempo} = trapl
    const rol = sessionStorage.getItem('rol')

    // Enviar objeto al modal
    const editProduct = (id) => {
        setShowEdit(true)
        setUserId4Actions(trapl)
        setUserIdCorte(id_corte)
        setFechaICorte(fecha_inicio)
        setFechaFCorte(fecha_corte)
    };

    return (
        <tr key={id_trapl}>
            <td>{producto}</td>
            <td>{unidad}</td>
            <td>{cantidad}</td>
            <td>{tiempo}</td>
            {rol === '1' ?
                <td>
                    <Link
                        to={`/plaga-tratamiento/editar/${id_trapl}/${id_corte}/${id_suerte}`}
                        state={{ id_trapl:id_trapl, id_corte:id_corte, id_suerte:id_suerte }}
                        className="btnmenupl"
                    >
                        Editar
                    </Link>
                    <button type='button' className="btnmenu1pl" onClick={() => editProduct(id_trapl)}>Aplicar</button>
                </td> 
            :
                null
            }
        </tr>
    )
}

export default Producto
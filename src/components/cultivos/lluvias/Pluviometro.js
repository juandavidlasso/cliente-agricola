import React, { useEffect } from 'react'
import BusquedaLluvia from './BusquedaLluvia'

const Pluviometro = ({pluviometros, setIdPluviometro, setNamePluviometro, setShowEdit}) => {
 
    const {id_pluviometro, nombre, suertesAsociadas} = pluviometros
    // collapsible
    useEffect(() => {
        const M = window.M
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
    }, [])
    // enviar datsos del pluviometro al registro de lluvia
    const enviar = () => {
        setShowEdit(true)
        setIdPluviometro(id_pluviometro)
        setNamePluviometro(nombre)
    }
    const rol = sessionStorage.getItem('rol')

    return (
        <li key={id_pluviometro}>
            <div className="collapsible-header">
                <i className="fas fa-hiking"></i> 
                <span className="mr-5 ahover">Pluviómetro {nombre} - Suertes {suertesAsociadas}</span>
                {rol === '1' ?
                    <button type="button" className="btn btn-danger ml-5 right" onClick={enviar}>+ Registrar Lluvia</button>
                :
                    null
                }
            </div>
            <div className="collapsible-body p-2">
                <BusquedaLluvia pluviometroId={id_pluviometro} />
            </div>
        </li>        
    )
}

export default Pluviometro
import React from 'react';
import { Link } from 'react-router-dom'

const Maquinaria = () => {
    return (
        <div>
            <div className="card">
                <div className="card-content p-1">
                    <span className="card-title center">John Dere 5000</span>
                    <div className="contenedorMenuMaquina">
                        <ul className="contenedorEtiquetas">
                            <div className="etiquetasCont">
                                <Link to="#" className="etiquetas">Mantenimiento</Link>
                            </div>
                            <div className="etiquetasCont">
                                <Link to="#" className="etiquetas">Respuestos</Link>
                            </div>
                            <div className="etiquetasCont">
                                <Link to="#" className="etiquetas">Otros</Link>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="card-action">
                    <Link to="#" className="btnLink">Entrar</Link>
                    <Link to="#" className="btnLink">Editar</Link>
                    <Link to="#" className="btnLink">Eliminar</Link>
                </div>
            </div>
        </div>
    );
}
 
export default Maquinaria;
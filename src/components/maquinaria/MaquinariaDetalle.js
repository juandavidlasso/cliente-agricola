import React from 'react';
import tractor from '../../imagenes/tractor.webp'
import { Link } from 'react-router-dom'

const MaquinariaDetalle = () => {
    return ( 
        <div className="row">
            <div className="col s12">

                <div className="col s12 mb-3 p-0">
                    <div className="col s12 m12 l2 xl2">
                        <div className="contenedoricons1 red darken-4">
                            <Link to="/maquinaria/listado" className="white-text">
                                <i class="material-icons small">keyboard_backspace</i>
                            </Link>
                        </div>
                    </div>
                    <div className="col s12 m12 l10 xl10">
                        <h1 className="deep-orange-text darken-4 center">John Deere</h1>
                    </div>
                </div>
                <div className="col s12 mt-5">
                    <div className="col-md-8 offset-md-2 contenedormaquinaria p-0">

                        <div className="col s12 m12 l7 xl7 div1">
                            <div className="subcontenedorm">
                                <img src={tractor} alt="tractor" className="responsive-img imgt1" />
                            </div>
                        </div>
                        <div className="col s12 m12 l5 xl5 div1">
                            <div className="subcontenedorm">
                                <ul className="subetiquetas">
                                    <li className="etiquetas">Mantenimiento</li>
                                    <li className="etiquetas">Respuestos</li>
                                    <li className="etiquetas">Otros</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col s12 p-0">
                            <div className="col s12 m12 l8 xl8 div2">
                                <div className="subcontenedoricons">
                                    <h1 className="titulo1">Tractor John Deere 5000</h1>
                                </div>
                            </div>
                            <div className="col s12 m12 l4 xl4 div2">
                                <div className="subcontenedoricons">
                                    <div className="contenedoricons mr-4 red darken-4" style={{float: 'right'}}><i class="material-icons medium">delete_forever</i></div>
                                    <div className="contenedoricons yellow darken-2"><i class="material-icons medium">edit</i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>          
     );
}
 
export default MaquinariaDetalle;
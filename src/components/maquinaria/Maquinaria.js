import React from 'react';
import img from '../../imagenes/exam.jpg'
import { Link } from 'react-router-dom'

const Maquinaria = () => {
    return ( 
        <div className="row mb-0">
            <div className="col s12 m6 cardmaquinaria1">
                <div className="card cardmaquinaria">
                    <div className="card-image">
                        <img src={img} className="responsive-img" alt="maquina" />
                        <Link to="/maquinaria/detalle" className="btn-floating halfway-fab linkdetalle">
                            <i className="large material-icons">arrow_forward</i>
                        </Link>
                    </div>
                
                    <div className="card-content">
                        <p className="titulolistadomaquinaria">
                            John Deere 5000
                        </p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Maquinaria;
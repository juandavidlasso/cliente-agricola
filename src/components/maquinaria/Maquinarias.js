import React from 'react';
import Maquinaria from './Maquinaria'

const Maquinarias = () => {
    return ( 
        <div className="row">
            <div className="col-12 mb-5">
                <div className="col s12 m12 l8 xl8 center">
                    <h1 className="tituMaquinaria">Listado de Maquinaria</h1>
                </div>
                <div className="col s12 m12 l4 x4 center p-1">
                    <button type="button" className="btnMaquina">Registrar Maquinaria</button>
                </div>
            </div>

            <div className="col-12">
                <div className="col s12 m12 l3 xl3"><Maquinaria /></div>
                <div className="col s12 m12 l3 xl3"><Maquinaria /></div>
                <div className="col s12 m12 l3 xl3"><Maquinaria /></div>
                <div className="col s12 m12 l3 xl3"><Maquinaria /></div>
            </div>
        </div>
     );
}
 
export default Maquinarias;
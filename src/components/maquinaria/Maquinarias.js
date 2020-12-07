import React from 'react';
import Maquinaria from './Maquinaria'

const Maquinarias = () => {
    return ( 
        <div className="row">
            <div className="col-12 mb-5">
                <div className="col s12 center">
                    <h1 className="deep-orange-text darken-4">Listado de Maquinaria</h1>
                </div>
            </div>

            <div className="col-12 green">
                <div className="col s12 m12 l3 xl3 yellow"><Maquinaria /></div>
                <div className="col s12 m12 l3 xl3 red">2</div>
                <div className="col s12 m12 l3 xl3 orange"><Maquinaria /></div>
                <div className="col s12 m12 l3 xl3 brown">4</div>
            </div>
        </div>
     );
}
 
export default Maquinarias;
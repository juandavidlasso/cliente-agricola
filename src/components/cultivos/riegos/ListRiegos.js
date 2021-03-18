import React from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroLluvia, ocultarLluvias } from '../../../utils/redux/actions/lluviaActions'

const ListRiegos = () => {

    // obtener el state
    const registroLluvia = useSelector( state => state.lluvias.registroLluvia)

    const dispatch = useDispatch()

    const registro = () => {
        dispatch( mostrarRegistroLluvia() )
    }

    const cerrar = () => {
        dispatch( ocultarLluvias() )
    }

    return ( 
        <div className="card-panel z-depth-1 m-0 p-2 title">
            <div className="row valign-wrapper">
                <div className="col-12 ">
                    <h1 className="center"> Lluvias </h1>
                    <div className="row">
                        mapeo
                    </div>
                </div>
        
                <div className="col-12">
                    <button type="button" className="btn btn-block white-text btncerrar">Cerrar</button>
                </div>
            </div>
        </div>
    );
}
 
export default ListRiegos;
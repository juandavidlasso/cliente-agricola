import React from 'react';
import { Modal } from 'react-bootstrap'
import LluviaActualizar from './LluviaActualizar'

const LluviaEditar = (props) => {

    const id_lluvia = props.lluviaid
    const fecha = props.lluviafecha
    const cantidad = props.lluviacantidad
    const id_pluviometro = props.lluviapluviometro

    return (
        <Modal
            {...props}
            className="w-50 mt-5 grey lighten-2"
            backdrop="static"
            keyboard={false}
            size="md"
        >
            <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
                <Modal.Title bsPrefix="titleModal" className="center">Edite la lluvia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LluviaActualizar id={id_lluvia} fec={fecha} cant={cantidad} pluvio={id_pluviometro} close={props} />
            </Modal.Body>
        </Modal>
    );
}
 
export default LluviaEditar;
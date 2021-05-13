import React from 'react';
import {Modal}  from 'react-bootstrap'
import ModalEditarRiego from './ModalEditarRiego'

const ModalEditarRiegos = (props) => {

  return ( 
    <Modal
      {...props}
      className="w-50 mt-5 grey lighten-2"
      backdrop="static"
      keyboard={false}
      size="md"
    >
      <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
        <Modal.Title bsPrefix="titleModal" className="center">Actualice la información</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <ModalEditarRiego props={props} />
      </Modal.Body>
    </Modal>
  );
}
 
export default ModalEditarRiegos;
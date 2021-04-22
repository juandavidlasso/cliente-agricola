import React from 'react';
import Lluvia from './Lluvia'
import {Modal}  from 'react-bootstrap'

const ModalLluvia = (props) => {

    return (
        <Modal
            {...props}
            className="w-50 h-75 mt-5 grey lighten-2"
            backdrop="static"
            keyboard={false}
            size="md"
        >
        <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
          <Modal.Title bsPrefix="titleModal" className="center">Ingrese los datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Lluvia props={props} />
        </Modal.Body>
      </Modal>        
    );
}
 
export default ModalLluvia;
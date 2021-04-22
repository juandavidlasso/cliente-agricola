import React from 'react';
import {Modal}  from 'react-bootstrap'
import Actual from './Actual'

const ModalActuales = (props) => { 

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
            <Actual
                props={props}
            />
        </Modal.Body>
      </Modal>        
    );
}
 
export default ModalActuales;
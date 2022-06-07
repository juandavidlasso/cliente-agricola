import React from 'react';
import Modal from 'react-modal'

// Modal
Modal.setAppElement('#root');

const Loading = () => {
    return (
        <Modal
            isOpen={true}
            className="ModalCargando p-3"
            overlayClassName="Overlay"
            contentLabel="Example Modal"
        >
            <p className='center'>Cargando</p>
            <div className='Overlay_container'>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                </div>
            </div>
        </Modal>
    );
}
 
export default Loading;
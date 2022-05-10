import React from 'react';

const MantenimientoRegistro = ({setVerForm}) => {
    return (
        <form className='text-start'>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="email" className="form-control" id="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="ref" className="form-label">Referencia</label>
                <input type="password" className="form-control" id="ref" />
            </div>
            <div className="mb-3">
                <label htmlFor="canti" className="form-label">Cantidad</label>
                <input type="password" className="form-control" id="canti" />
            </div>
            <div className='center'>
                <button type='button' className='Content_registro_button_cancelar me-3' onClick={() => setVerForm(false)}>Cancelar</button>
                <button type="submit" className="Content_registro_button_registro">Registrar</button>
            </div>
        </form>
    );
}
 
export default MantenimientoRegistro;
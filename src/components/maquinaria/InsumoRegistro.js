import React from 'react';

const InsumoRegistro = () => {
    
    return (
        <div className='row'>
            <div className='Content_principal'>
                <div className='col s12 p-1'>
                    <div className='col s12 p-1'>
                        <div className='Content_titulo center p-2'>
                            <h1>Registrar Insumo</h1>
                        </div>
                    </div>
                </div>
                <div className='col s12 p-1'>
                    <div className='col s12 p-3'>
                        <div className='col s6 offset-s3 p-3 Content_show_form'>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input type="email" className="form-control" id="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ref" className="form-label">Referencia</label>
                                    <input type="text" className="form-control" id="ref" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="marca" className="form-label">Marca</label>
                                    <input type="text" className="form-control" id="marca" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="canti" className="form-label">Cantidad</label>
                                    <input type="text" className="form-control" id="canti" />
                                </div>
                                <div className='center'>
                                    <button type="submit" className="Content_registro_button_registro">Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default InsumoRegistro;
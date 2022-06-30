import React, { useState } from 'react';
import ModalBonsucro from './ModalBonsucro';
import Swal from 'sweetalert2'

const DatosVonsucro = ({verData, setVerData, dataInforme, setDataInforme}) => {
    // State
    const [modalIsOpen, setModalIsOpen] = useState(false)

    // Abrir modal
    const submitModal = async (e) => {
        // Si no hay datos no abro modal
        if(dataInforme.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Debe seleccionar la información',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
            return
        }

        setModalIsOpen(true)
    }

    return (
        <>
            <div className={verData ? 'col s3 p-2' : null} style={{background: '#ffebee'}}>
                <div style={{width: '100%'}}>
                    {dataInforme.length === 0 ?
                        <p>No hay datos registrados</p>
                    :
                        dataInforme.map( (datos, index) => {
                            const {area,corte,dosis,presentacion,producto,suerte, identificador} = datos
                            return (
                                <p key={index} className='p-1' style={{border: '1px solid grey', borderRadius: '10px'}}>
                                    <span>
                                        Orden: {index},
                                        <span className='fw-bold'> Suerte</span> {suerte} -
                                        <span className='fw-bold'> Corte</span> {corte} -
                                        <span className='fw-bold'> Area</span> {area ? (area).toFixed(1) : null}
                                    </span>
                                    <br />
                                    <span>
                                        <span className='fw-bold'>{identificador === 1 ? 'Herbicida' : 'Fertilizante'}: </span>
                                        {producto} - {dosis} - {presentacion}
                                    </span>
                                </p>
                            )
                        })
                    }
                </div>
                <div className='center p-2' style={{width: '100%'}}>
                    <button type='button' className='btnVerDatos1 me-1' onClick={ (e) => submitModal(e)}>Enviar Informe</button>
                    <button type='button' className='btnVerDatos' onClick={() => setVerData(false)}>Cerrar</button>
                </div>
            </div>
            <ModalBonsucro
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                dataInforme={dataInforme}
                setDataInforme={setDataInforme}
            />
        </>
    );
}
 
export default DatosVonsucro;
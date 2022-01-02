import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import ModalDatoPLS from './ModalDatoPLS'
import Spinner from '../../../Spinner'
// GraphQL
import {OBTENER_SUERTE_CORTE_TABLON_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'


const ModalDatosPLS = (props) => {

    const {show, tratamientopl, aplicacionpl} = props
    const {producto} = tratamientopl
    // query hook
    const {data, loading, error} = useQuery(OBTENER_SUERTE_CORTE_TABLON_QUERY)

    if(loading) return <Spinner />
    if(error) return null

    return ( 
        <Modal
            {...props}
            show={show}
            className="w-75 mt-5 grey lighten-2"
            backdrop="static"
            keyboard={false}
            size="lg"
        >
        <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
          <Modal.Title bsPrefix="titleModal">Seleccione los tablones para aplicar {producto}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bodyModal">
            {data.obtenerSuerteCorteTablon.length === 0 ?
                'No hay tablones registradis'
            :   
                data.obtenerSuerteCorteTablon.map(listadoNuevo => (
                    <ModalDatoPLS
                        key={listadoNuevo.id_suerte}
                        listadoNuevo={listadoNuevo}
                        tratamientopl={tratamientopl}
                        aplicacionpl={aplicacionpl}
                    />
                ))
                }
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-dark mx-auto" onClick={props.onHide}>
                Terminar
            </Button>
        </Modal.Footer>
      </Modal>        
    );
}
 
export default ModalDatosPLS;
import React from 'react';
import {Modal, Button}  from 'react-bootstrap'
import Spinner from '../../../Spinner'
import ModalRiego from './ModalRiego'
// GraphQL
import {OBTENER_TABLONES_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ModalRiegos = (props) => {

  const {fecha, idriego, idcorte} = props
  const id_corte = Number(idcorte)

  // query hook
  const { data, loading, error } = useQuery(OBTENER_TABLONES_POR_CORTE_QUERY, { variables: {id_corte} })
//   console.log(data);
//   console.log(loading);
//   console.log(error);

  if(loading) return <Spinner />
  if(error) return null


  return ( 
    <Modal
      {...props}
      className="w-50 mt-5 grey lighten-2"
      backdrop="static"
      keyboard={false}
      size="md"
    >
      <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
        <Modal.Title bsPrefix="titleModal" className="center">Seleccione los cortes que desea aplicar riego</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <h1 style={{fontSize: '15px', textAlign: 'center'}}>Fecha: {fecha}</h1>
            {data.obtenerTablonesPorCorte.length === 0 ?
                'No hay tablones registrados'
            :
                data.obtenerTablonesPorCorte.map(listadoT => (
                    <ModalRiego
                        key={listadoT.id_tablon}
                        listadoT={listadoT}
                        idriego={idriego}
                        id_corte={id_corte}
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
 
export default ModalRiegos;
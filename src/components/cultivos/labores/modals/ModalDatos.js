import React from 'react';
import Modal  from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from '../../../Spinner'
import ModalDato from './ModalDato'
// GraphQL
import {OBTENER_SUERTE_CORTE_MODAL} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ModalDatos = (props) => {

  const { labor } = props

  // query hook
  const { data, loading, error } = useQuery(OBTENER_SUERTE_CORTE_MODAL)
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if(loading) return <Spinner />
  if(error) return null


  return ( 
    <Modal
      {...props}
      className="w-50 mt-5 grey lighten-2"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
        <Modal.Title bsPrefix="titleModal" className="center">Seleccione la suerte y corte donde desea registrar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.obtenerSuertesRenovadasYCortes.map(listado => (
          <ModalDato key={listado.id_suerte} listado={listado} labor={labor} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-dark mx-auto" onClick={props.onHide}>
          Terminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default ModalDatos;
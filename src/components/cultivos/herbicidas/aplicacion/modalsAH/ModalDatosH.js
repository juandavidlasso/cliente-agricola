import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from '../../../../Spinner'
import ModalDatoH from './ModalDatoH'
import DatosTH from './DatosTH'
// GraphQL
import {OBTENER_SUERTE_CORTE_MODAL} from '../../../../../apollo/querys'
import { useQuery } from '@apollo/client'
import { Fragment } from 'react';

const ModalDatosH = (props) => {

  const { aherbicidas, data } = props
  const [ verTH, setTH ] = useState(true)
  const [ userIdAphe, setUserIdAphe] = useState(0)

  // query hook
  const { data:dataS, loading, error } = useQuery(OBTENER_SUERTE_CORTE_MODAL)
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if(loading) return <Spinner />
  if(error) return null

  const verTrahe = () => {
    setTH(true)
  }


  return ( 
    <Modal
      {...props}
      className="w-50 mt-5 grey lighten-2"
      backdrop="static"
      keyboard={false}
    >
      {verTH === true ?
        <Fragment>
          <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
            <Modal.Title className="center" style={{fontSize: '17px'}}>Seleccione la suerte y corte donde desea registrar la aplicación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {dataS.obtenerSuertesRenovadasYCortes.map(listado => (
              <ModalDatoH 
                key={listado.id_suerte} 
                listado={listado}
                aherbicidas={aherbicidas}
                setTH={setTH}
                setUserIdAphe={setUserIdAphe}
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-dark mx-auto" onClick={props.onHide}>
              Terminar
            </Button>
          </Modal.Footer>
        </Fragment>
      :
        <Fragment>
          <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
            <Modal.Title className="center" style={{fontSize: '17px'}}>Seleccione los tratamientos que desea registrar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DatosTH data={data} apheid={userIdAphe} />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-dark mx-auto" onClick={verTrahe}>
              Regresar
            </Button>
          </Modal.Footer>
        </Fragment>
      }           
    </Modal>
  );
}
 
export default ModalDatosH;
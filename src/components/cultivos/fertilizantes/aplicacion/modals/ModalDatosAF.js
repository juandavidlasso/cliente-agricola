import React, { useState, Fragment } from 'react';
import Modal  from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from '../../../../Spinner'
import ModalDatoAF from './ModalDatoAF'
import DatosTF from './DatosTF'
// GraphQL
import {OBTENER_SUERTE_CORTE_MODAL} from '../../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ModalDatosAF = (props) => {

  const { afertilizantes, data } = props
  const [ verTF, setTF ] = useState(true)
  const [ userIdApfe, setUserIdApfe] = useState(0)

  // query hook
  const { data:dataC, loading, error } = useQuery(OBTENER_SUERTE_CORTE_MODAL)
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if(loading) return <Spinner />
  if(error) return null

  const verTrafe = () => {
    setTF(true)
  }  

  return ( 
    <Modal
      {...props}
      className="w-75 mt-5 grey lighten-2"
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      {verTF === true ?
        <Fragment>
          <Modal.Header style={{backgroundColor: "#283747", color: 'white'}}>
            <Modal.Title className="center" style={{fontSize: '17px'}}>Seleccione la suerte y corte donde desea registrar la aplicación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {dataC.obtenerSuertesRenovadasYCortes.map(listado => (
              <ModalDatoAF 
                key={listado.id_suerte} 
                listado={listado} 
                afertilizantes={afertilizantes}
                setTF={setTF}
                setUserIdApfe={setUserIdApfe}
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
            <DatosTF data={data} apfeid={userIdApfe} />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-dark mx-auto" onClick={verTrafe}>
              Regresar
            </Button>
          </Modal.Footer>
        </Fragment>
      }
    </Modal>
  );
}
 
export default ModalDatosAF;
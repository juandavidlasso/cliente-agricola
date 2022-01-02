import React, { useState } from 'react';
import RiegoRegister from './RiegoRegister'
import Spinner from '../../Spinner'
import Riegos from './Riegos'
import ModalRiegos from './modals/ModalRiegos'
import ModalEditarRiegos from './modals/ModalEditarRiegos'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroLluvia, ocultarLluvias } from '../../../utils/redux/actions/lluviaActions'
// GraphQL
import {OBTENER_RIEGO_MAX_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListRiegos = ({corte, estado}) => {

    const {id_corte} = corte
    // Modal registrar aplicacion riego
    const [showEdit, setShowEdit] = useState(false);
    const [riegoid, setRiegoId] = useState(0);
    const [date, setDate] = useState(0)
    const [corteid, setCorteId] = useState(0)
    const handleEditClose = () => setShowEdit(false);
    // Modal editar riego
    const [verEdit, setVerEdit] = useState(false)
    const [idriegoed, setIdRiegoEd] = useState(0)
    const [fechaed, setFechaEd] = useState(0)
    const [numriegoed, setNumRiegoEd] = useState(0)
    const [idcorteed, setIdCorteEd] = useState(0)
    const cerrarModalEditar = () => setVerEdit(false)
    // query hook
    const {data, loading, error} = useQuery(OBTENER_RIEGO_MAX_QUERY, {variables: {id_corte}})

    // obtener el state
    const registroLluvia = useSelector( state => state.lluvias.registroLluvia)

    const dispatch = useDispatch()

    const registro = () => {
        dispatch( mostrarRegistroLluvia() )
    }

    const cerrar = () => {
        dispatch( ocultarLluvias() )
    }

    if(loading) return <Spinner />
    if(error) return null

    const rol = sessionStorage.getItem('rol')
    const {obtenerMaxRiego} = data

    return ( 
        <div className="card-panel white z-depth-1 title" style={{margin: "0px", padding: "5px"}}>
            <div className="valign-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="center"> Riegos </h1>
                                {rol === '1' ? estado === true ?
                                    <span><button type='button' onClick={ () => registro() }  className="btn-floating pulse red darken-4"><i className="material-icons">add</i></button> <span className="black-text fw-bold"> Registrar Riego </span></span>
                                :
                                    null
                                :
                                    null
                                }
                        </div>
                        {registroLluvia ?
                            <div className="col-12">
                                <div className="card-panel">
                                    <RiegoRegister id_corte={id_corte} maximo={obtenerMaxRiego} />
                                </div>
                            </div>
                        :
                            null
                        }

                        <ModalRiegos
                            show={showEdit}
                            idriego={riegoid}
                            fecha={date}
                            idcorte={corteid}
                            onHide={handleEditClose}
                        />

                        <ModalEditarRiegos
                            show={verEdit}
                            idriegeditar={idriegoed}
                            feceditar={fechaed}
                            numriegeditar={numriegoed}
                            idcoreditar={idcorteed}
                            onHide={cerrarModalEditar}
                        />

                        <div className="col-12 p-0 mt-1">
                            <Riegos
                                id_corte={id_corte}
                                setRiegoId={setRiegoId}
                                setShowEdit={setShowEdit}
                                setDate={setDate}
                                setCorteId={setCorteId}
                                setVerEdit={setVerEdit}
                                setIdRiegoEd={setIdRiegoEd}
                                setFechaEd={setFechaEd}
                                setNumRiegoEd={setNumRiegoEd}
                                setIdCorteEd={setIdCorteEd}
                            />
                        </div> 
                        <div className="col-12 p-2">
                            <div className="d-grid gap-2 p-2">
                                <button type="button" className="btn white-text btncerrar" onClick={cerrar}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ListRiegos;
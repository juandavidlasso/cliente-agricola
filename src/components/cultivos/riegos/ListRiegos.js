import React from 'react';
import RiegoRegister from './RiegoRegister'
import Spinner from '../../Spinner'
import Riegos from './Riegos'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarRegistroLluvia, ocultarLluvias } from '../../../utils/redux/actions/lluviaActions'
// GraphQL
import {OBTENER_RIEGO_MAX_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const ListRiegos = ({corte, estado}) => {

    const {id_corte} = corte
    // query hook
    const {data, loading, error} = useQuery(OBTENER_RIEGO_MAX_QUERY, {variables: {id_corte}})
    // console.log(data);
    // console.log(loading);
    // console.log(error);

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
                            <span><a href="#!" onClick={ () => registro() }  className="btn-floating pulse red darken-4"><i className="material-icons">add</i></a> <span className="black-text font-weight-bold"> Registrar Riego </span></span>
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
                <div className="col-12 p-0 mt-1">
                    <Riegos id_corte={id_corte} />
                </div> 
                <div className="col-12 p-2">
                    <button type="button" className="btn btn-block white-text btncerrar" onClick={cerrar}>Cerrar</button>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
}
 
export default ListRiegos;
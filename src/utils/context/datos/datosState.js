import React, { useReducer } from 'react'
import DatosReducer from './datosReducer'
import DatosContext from './datosContext'

import { SELECCIONAR_LABORES, SELECCIONAR_MES_INICIAL, SELECCIONAR_MES_FINAL, SELECCIONAR_ANO } from '../../redux/types'

const DatoState = props => {
    const initialState = {
      labores: [],
      mesInicial: '',
      mesFinal: '',
      anoLluvia: ''
    }

    const [ state, dispatch ] = useReducer(DatosReducer, initialState)

  
    // Agregar labores al state
    const agregarLabores = laborSeleccionada => {
        //console.log(laborSeleccionada);
  
        let nuevoStateL;
        
        if(state.labores.length > 0 ) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoStateL = laborSeleccionada.map( labor => {
                const nuevoObjetoL = state.labores.find( laborStateL => laborStateL.corte_id === labor.corte_id  );
                return {...labor, ...nuevoObjetoL }
            })
        } else {
            nuevoStateL = laborSeleccionada;
        }

        dispatch({
            type: SELECCIONAR_LABORES,
            payload: nuevoStateL
        })
    }


    // Agregar mes inicial al state
    const agregarMesInicial = mesInicialSeleccionado => {
        dispatch({
            type: SELECCIONAR_MES_INICIAL,
            payload: mesInicialSeleccionado
        })
    }

    // Agregar mes final al state
    const agregarMesFinal = mesFinalSeleccionado => {
        dispatch({
            type: SELECCIONAR_MES_FINAL,
            payload: mesFinalSeleccionado
        })
    }

    // // Agregar año lluvia al state
    const agregarAnoLluvia = anoLluviaSeleccionado => {
        dispatch({
            type: SELECCIONAR_ANO,
            payload: anoLluviaSeleccionado
        })
    }
  
    return (
        <DatosContext.Provider
            value={{
                //labores: state.labores,
                mesInicial: state.mesInicial,
                mesFinal: state.mesFinal,
                anoLluvia: state.anoLluvia,
                agregarLabores,
                agregarMesInicial,
                agregarMesFinal,
                agregarAnoLluvia
            }}
        >
            {props.children}
        </DatosContext.Provider>
    )  
}
  
export default DatoState
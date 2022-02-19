import React, { useReducer } from 'react'
import DatosReducer from './datosReducer'
import DatosContext from './datosContext'

import {/*SELECCIONAR_LABORES,*/
        SELECCIONAR_MES_INICIAL,
        SELECCIONAR_MES_FINAL,
        SELECCIONAR_ANO,
        AGREGAR_TABLONES_STATE } from '../../redux/types'

const DatoState = props => {
    const initialState = {
      labores: [],
      mesInicial: '',
      mesFinal: '',
      anoLluvia: '',
      arrayTablones: []
    }

    const [ state, dispatch ] = useReducer(DatosReducer, initialState)

  
    // Agregar labores al state
    // const agregarLabores = laborSeleccionada => {
  
    //     let nuevoStateL;
        
    //     if(state.labores.length > 0 ) {
    //         // Tomar del segundo arreglo, una copia para asignarlo al primero
    //         nuevoStateL = laborSeleccionada.map( labor => {
    //             const nuevoObjetoL = state.labores.find( laborStateL => laborStateL.corte_id === labor.corte_id  );
    //             return {...labor, ...nuevoObjetoL }
    //         })
    //     } else {
    //         nuevoStateL = laborSeleccionada;
    //     }

    //     dispatch({
    //         type: SELECCIONAR_LABORES,
    //         payload: nuevoStateL
    //     })
    // }


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


    // Agregar tablones de plagas al state
    const agregarTablones = async(tablonSeleccionado) => {
        const tablonesAsociados = await tablonSeleccionado.map(( {numero, ...datoTablon} ) => datoTablon)
        let nuevoStateL;
        
        if(state.arrayTablones.length > 0 ) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoStateL = tablonesAsociados.map( tablon => {
                const nuevoObject = state.arrayTablones.find( tablonState => tablonState.tablon_id === tablon.tablon_id  );
                return {...tablon, ...nuevoObject }
            })
        } else {
            nuevoStateL = tablonesAsociados;
        }

        dispatch({
            type: AGREGAR_TABLONES_STATE,
            payload: nuevoStateL
        })
    }
  
    return (
        <DatosContext.Provider
            value={{
                //labores: state.labores,
                mesInicial: state.mesInicial,
                mesFinal: state.mesFinal,
                anoLluvia: state.anoLluvia,
                arrayTablones: state.arrayTablones,
                // agregarLabores,
                agregarMesInicial,
                agregarMesFinal,
                agregarAnoLluvia,
                agregarTablones
            }}
        >
            {props.children}
        </DatosContext.Provider>
    )  
}
  
export default DatoState
import React, { useReducer } from 'react'
import DatosReducer from './datosReducer'
import DatosContext from './datosContext'

import { SELECCIONAR_LABORES } from '../../redux/types'

const DatoState = props => {

    const initialState = {
      labores: []
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
  
    return (
        <DatosContext.Provider
            value={{
                //labores: state.labores,
                agregarLabores
            }}
        >
            {props.children}
        </DatosContext.Provider>
    )  
}
  
export default DatoState
import { combineReducers } from 'redux'
import suerteReducer from './suerteReducer'
import corteReducer from './corteReducer'
import laborReducer from './laborReducer'
import aplicacionHerbicidaReducer from './aplicacionHerbicidaReducer'
import tratamientoHerbicidaReducer from './tratamientoHerbicidaReducer'
import aplicacionFertilizanteReducer from './aplicacionFertilizanteReducer'
import tratamientoFertilizanteReducer from './tratamientoFertilizanteReducer'
import tratamientoPlagaReducer from './tratamientoPlagaReducer'
import lluviaReducer from './lluviaReducer'
import cosechaReducer from './cosechaReducer'
import tablonReducer from './tablonReducer'

export default combineReducers({
  suertes: suerteReducer,
  cortes: corteReducer,
  labores: laborReducer,
  aplicacionHerbicidas: aplicacionHerbicidaReducer,
  tratamientoHerbicidas: tratamientoHerbicidaReducer,
  tratamientoFertilizantes: tratamientoFertilizanteReducer,
  aplicacionFertilizantes: aplicacionFertilizanteReducer,
  tratamientoPlagas: tratamientoPlagaReducer,
  lluvias: lluviaReducer,
  cosechas: cosechaReducer,
  tablones: tablonReducer
})

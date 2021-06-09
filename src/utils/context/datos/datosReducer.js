import { SELECCIONAR_LABORES } from '../../redux/types'

export default (state, action) => {
    switch (action.type) {
      case SELECCIONAR_LABORES:
        return {
          ...state,
          labores: action.payload
        }
      default:
        return state
    }
  }


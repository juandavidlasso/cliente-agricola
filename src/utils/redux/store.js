import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'


const loadState = () => {
  try{
    const serializedData = sessionStorage.getItem('state')
    if(serializedData === null){
      return undefined
    }
    return (JSON.parse(serializedData))
  } catch (error){
    return undefined
  }
}

const saveState = (state) => {
  try{
    const serializedData = JSON.stringify(state)
    sessionStorage.setItem('state', serializedData)
  } catch (error){

  }
}


const initialState = loadState() || {}


const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)



store.subscribe( function () {
  saveState(store.getState())
})

export default store

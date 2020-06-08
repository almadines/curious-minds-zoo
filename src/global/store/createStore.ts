import { createStore as reduxCreateStore } from "redux"
import { combinedReducer } from '../state/state'

const createStore = () => reduxCreateStore(combinedReducer)
export default createStore

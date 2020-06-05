import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    console.log('value: ', action.value)
    return Object.assign({}, state, {
      count: state.count + 1,
    })
  }
  return state
}

const initialState: AppState = { count: 0 }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore

export interface AppState {
  count: number
}
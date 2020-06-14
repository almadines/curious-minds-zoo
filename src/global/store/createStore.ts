import { StoreInitialiser } from "./store-init";
import { createStore as reduxCreateStore } from "redux";
import { combinedReducer } from "../state/state";

const createStore = () =>
  reduxCreateStore(combinedReducer, new StoreInitialiser().getInitialState());
export default createStore;

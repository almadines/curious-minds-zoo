import React from "react";
import { Provider, connect } from "react-redux";

import createStore from "./src/global/store/createStore";
import { SaveElement } from "./src/global/store/store-init";
import { AppState } from "./src/global/state/state";

const store = createStore();

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Provider store={store}>
    {/* <ConnectedSaveElementWrapper /> */}
    {element}
  </Provider>
);

// const saveElement = new SaveElement();

// if (typeof window !== "undefined") {
//   store.subscribe(() => {
//     console.log("store.subscribe listener function called!");
//     saveElement.stateChanged(store.getState());
//   });
// } else {
//   console.log(
//     "local storage is unavailable, not attaching save listener to store"
//   );
// }

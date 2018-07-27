import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware, combineReducers } from "redux";
const store = createStore(
  combineReducers({
    posts: postReducer,
    user: userReducer
  }),
  applyMiddleware(thunk, logger)
);

// const store = createStore(postReducer, applyMiddleware(thunk, logger));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { watchToDo } from "./redux/sagas";
import reducer from "./redux/reducers";

var firebaseConfig = {
  apiKey: "AIzaSyC_B_-OwIxgFwUsXf7tWOmNfSwKFLpiz90",
  authDomain: "todoapp-cc356.firebaseapp.com",
  projectId: "todoapp-cc356",
  storageBucket: "todoapp-cc356.appspot.com",
  messagingSenderId: "485344395717",
  appId: "1:485344395717:web:b024ea6f392b624f684bac"
};

firebase.initializeApp(firebaseConfig);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchToDo);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

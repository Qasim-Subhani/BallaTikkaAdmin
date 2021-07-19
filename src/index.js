import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDemHT0TNb8d0UHCw9tjC0a2OsM67thGsQ",
  authDomain: "ballatikka-55a10.firebaseapp.com",
  databaseURL: "https://ballatikka-55a10-default-rtdb.firebaseio.com",
  projectId: "ballatikka-55a10",
  storageBucket: "ballatikka-55a10.appspot.com",
  messagingSenderId: "916012287346",
  appId: "1:916012287346:web:7c7551e7084e3cc24209eb",
  measurementId: "G-W8C8MF6360",
};
firebase.default.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

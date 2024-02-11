import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading ={null} persistor={persistor}>
    <App/>
    <div><Toaster/></div>
    </PersistGate>
  </Provider>
);
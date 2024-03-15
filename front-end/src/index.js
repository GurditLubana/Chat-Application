import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {io} from "socket.io-client";

const socket = io("http://localhost:3001");


const root = ReactDOM.createRoot(document.getElementById('root'));
socket.on('connect', () => {
  console.log(`i am connected | session id: ${socket.id}`)
});
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();

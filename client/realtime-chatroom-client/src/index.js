import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:3001/';
const socket = io( ENDPOINT );

ReactDOM.render(
  <React.StrictMode>
    <App socket={ socket } />
  </React.StrictMode>,
  document.getElementById('root')
);
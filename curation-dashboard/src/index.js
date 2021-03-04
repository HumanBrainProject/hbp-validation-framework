import React from 'react';
import ReactDOM from 'react-dom';
import initAuth from './auth';
import App from './App';


function renderApp(auth) {
  ReactDOM.render(
    <React.StrictMode>
        <App auth={auth} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

window.addEventListener('DOMContentLoaded', () => initAuth(renderApp));

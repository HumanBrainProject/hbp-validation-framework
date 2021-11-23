import React from 'react';
import ReactDOM from 'react-dom';
import initAuth from './auth';
import { datastore } from "./datastore";
import { ContextMainProvider } from "./ContextMain";
import { SnackbarProvider } from "notistack";
import ValidationFramework from "./ValidationFramework";

function renderApp(auth) {
    datastore.auth = auth;
    ReactDOM.render(
        <ContextMainProvider>
            <SnackbarProvider maxSnack={3}>
                <ValidationFramework auth={auth} />
            </SnackbarProvider>
        </ContextMainProvider>,
        document.getElementById('root')
    );
};

window.addEventListener('DOMContentLoaded', () => initAuth(renderApp));
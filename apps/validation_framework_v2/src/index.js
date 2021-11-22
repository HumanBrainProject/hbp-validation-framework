import React from 'react';
import ReactDOM from 'react-dom';
import initAuth from './auth';
import ValidationFramework from "./ValidationFramework";
import { SnackbarProvider } from "notistack";
import { ContextMainProvider } from "./ContextMain";

function renderApp(auth) {
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
import Keycloak from 'keycloak-js';
import React from 'react';
import ReactDOM from 'react-dom';

import ValidationFramework from './ValidationFramework';


// We start by configuring the Keycloak javascript client
// It needs to know your app id in order to authenticate users for it
const keycloak = Keycloak({
	url: 'https://iam.humanbrainproject.eu/auth',
	realm: 'hbp',
	clientId: 'model-catalog' // TODO: change clientID to validation-framework, once client is registered
});
const YOUR_APP_SCOPES = 'team email profile';   // full list at https://iam.ebrains.eu/auth/realms/hbp/.well-known/openid-configuration

// When ready, we initialise the keycloak client
// Once done, it will call our `checkAuth` function
window.addEventListener('DOMContentLoaded', initKeycloak);

function initKeycloak() {
	console.log('DOM content is loaded, initialising Keycloak client...');
	keycloak
		.init({ flow: 'implicit' })
		.success(checkAuth)
		.error(console.log);
}

function checkAuth() {
	console.log('Keycloak client is initialised, verifying authentication...');

	// Is the user anonymous or authenticated?
	const isAuthenticated = keycloak.authenticated;
	const isAnonymous = !keycloak.authenticated;
	// Is this app a standalone app, a framed app or a delegate?
	const isParent = (window.opener == null);
	const isIframe = (window !== window.parent);
	const isMainFrame = (window === window.parent);
	const isStandaloneApp = isMainFrame && isParent;
	const isFramedApp = isIframe && isParent;
	const isDelegate = (window.opener != null);
	// Posting and listening to messages
	const postMessageToParentTab = (message, parentTabOrigin) => window.opener.postMessage(message, parentTabOrigin);
	const listenToMessage = (callback) => window.addEventListener('message', callback);
	const AUTH_MESSAGE = 'clb.authenticated';
	const myAppOrigin = window.location.origin;
	// Manipulating URLs and tabs
	const openTab = (url) => window.open(url);
	const getCurrentURL = () => new URL(window.location);
	const closeCurrentTab = () => window.close();

	const login = (scopes) => keycloak.login({ scope: scopes });

	// A standalone app should simply login if the user is not authenticated
	// and do its business logic otherwise
	if (isStandaloneApp) {
		console.log('This is a standalone app...');
		if (isAnonymous) {
			console.log('...which is not authenticated, starting login...');
			return login(YOUR_APP_SCOPES);
		}
		if (isAuthenticated) {
			console.log('...which is authenticated, starting business logic...');
			return doBusinessLogic(keycloak);
		}
	}

	// A framed app should open a delegate to do the authentication for it and listen to its messages and verify them
	// If the user is authenticated, it should do its business logic
	if (isFramedApp) {
		console.log('This is a framed app...');
		if (isAnonymous) {
			console.log('...which is not authenticated, delegating to new tab...');
			listenToMessage(verifyMessage);
			return openTab(getCurrentURL());
		}
		if (isAuthenticated) {
			console.log('...which is authenticated, starting business logic...');
			return doBusinessLogic(keycloak);
		}
	}

	// A delegate should login if the user is not authenticated
	// Otherwise, it should inform its opener that the user is authenticated and close itself
	if (isDelegate) {
		console.log('This is a delegate tab...');
		if (isAnonymous) {
			console.log('...which is not authenticated, starting login...');
			return login(YOUR_APP_SCOPES);
		}
		if (isAuthenticated) {
			console.log('...which is authenticated, warn parent and close...');
			postMessageToParentTab(AUTH_MESSAGE, myAppOrigin);
			return closeCurrentTab();
		}
	}
}

function verifyMessage(event) {
	console.log('Message receveived, verifying it...');

	const AUTH_MESSAGE = 'clb.authenticated';
	const receivedMessage = event.data;
	const messageOrigin = event.origin;
	const myAppOrigin = window.location.origin;
	// const reload = () => window.location.reload(); // TODO: remove?
	const login = (scopes) => keycloak.login({ scope: scopes });


	// Stop if the message is not the auth message
	if (receivedMessage !== AUTH_MESSAGE) return;

	// Stop if the message is not coming from our app origin
	if (messageOrigin !== myAppOrigin) return;

	// Login otherwise
	return login(YOUR_APP_SCOPES);
}

function doBusinessLogic(auth) {
	ReactDOM.render(
		<ValidationFramework auth={auth} />,
		document.getElementById('root')
	);
}

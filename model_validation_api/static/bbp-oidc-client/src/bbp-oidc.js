/* global jso_configure, jso_ensureTokens, jso_getToken, jso_wipe */
(function(exp){
    'use strict';

    /* http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/ */
    function deepExtend(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor &&
                source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                deepExtend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function JsoWrapper(options) {
        var provider, jsoConfig, jsoOptions, scopes;

        provider = options.clientId + '@' + options.authServer;
        jsoConfig = {
            client_id: options.clientId,
            redirect_uri: options.redirectUri,
            authorization: options.authServer+'/authorize'+(
                options.alwaysPromptLogin ? '?prompt=login' : ''
            ),
            auth_server: options.authServer+'/',
            jsonWebKeys: options.jsonWebKeys
        };
        jsoOptions = {
            debug: options.debug,
            // should contains {access_token, scopes[], expires_in, token_type}
            token: (options.token ?
                { provider: provider, value: options.token } :
                null)
        };
        scopes = options.scopes;

        this.configure = function() {
            var providerConfig = {};
            providerConfig[provider] = jsoConfig;
            return jso_configure(providerConfig, jsoOptions);
        };

        this.ensureTokens = function() {
            var scopesToEnsure = {};
            scopesToEnsure[provider] = scopes;
            return jso_ensureTokens(scopesToEnsure);
        };

        this.getToken = function() {
            return jso_getToken(provider, scopes);
        };

        this.wipe = function() {
            return jso_wipe();
        };
    }

    /*
     * the options are:
     *  - clientId: string - Oauth client id (required)
     *  - authServer: string - authentication server url (default: https://services.humanbrainproject.eu/oidc/)
     *  - redirectUri: string - URL where to redirect after authentication.
     *    The URL must be configured in the Oauth client configuration. (default: document.URL)
     *  - scopes: array<string> - list of scopes to request (default: null)
     *  - ensureToken: boolean - if `true` it will try to get a token (default: true)
     *  - alwaysPromptLogin: boolean - if `true` if will always prompt for credentials. (default: false)
     *    For collaboratory apps MUST be `false`. (default: false)
     *  - token: string - the token, if available (default: null)
     *  - debug: boolean - flag to enable debug logs (default: false)
     */
    function BbpOidcClient(options) {
        var jso;

        // default values
        var defaultOpts = {
            authServer: 'https://services.humanbrainproject.eu/oidc',
            debug: false,
            redirectUri: document.URL,
            scopes: null,
            ensureToken: true,
            alwaysPromptLogin: false,
            jsonWebKeys: {
                keys: [{
                    alg: 'RS256',
                    e: 'AQAB',
                    kty: 'RSA',
                    kid: 'bbp-oidc',
                    n: 'zlJpDPnGMUV5FlwQs5eIs77pdZTST29TELUT3_E1sKrN-lE4rEgbQQ5qU1KvF5669VmVeAt' +
                        '-BQ2qMjGjUyl44gq-aUkeQV7MXfYJfKHIULZMTGR0lJ4ebPRQgM5OWDNjYVbASAOz0NyO6' +
                        '46G5H5BlHZrA9ADyrZYZ4CEhfI1KBk'
                }]
            },
            token: null
        };

        var opts = deepExtend(defaultOpts, options);

        function init() {
            jso = new JsoWrapper(opts);
            jso.configure();

            // This check has to occurs every time.
            if (opts.ensureToken) {
                if(!jso.getToken()) {
                    // if there's no token, check if the session with oidc is still active
                    getTokenOrLogout();
                }
            }
        }

        function login() {
            return jso.ensureTokens();
        }

        function logout() {
            // Ensure we have a token.
            var token = getToken();
            var localRemoval = function() {
                // We need to keep the token to generate
                // Bearer for this request. Hence the reset only after.
                jso.wipe();

                if (opts.ensureToken) {
                    login();
                }
            };

            var oReq = new XMLHttpRequest();
            oReq.onload = localRemoval;
            oReq.open('post', opts.authServer + '/slo', true);
            oReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            oReq.withCredentials = true;
            oReq.send(JSON.stringify({ token: token }));
        }

        function getToken() {
            return jso.getToken();
        }

        /**
         * checks if the session with oidc is still active; if so, tries to get
         * a new token, otherwise notifies the parent window.
         */
        function getTokenOrLogout() {
            var clientId = opts.clientId;
            isSessionActive(function(active) {
                if(!active) {
                    // notify the parent window that a new login is needed
                    postLogoutMsg(clientId);
                }
                // ensure token in any case
                // if active == true, it will get a new token, otherwise redirect to login
                jso.ensureTokens();
            });
        }

        function postLogoutMsg(clientId) {
            if(window.parent && window !== window.top) {
                window.parent.postMessage({
                    eventName: 'oidc.logout',
                    data: {
                        clientId: clientId
                    }
                }, '*');
            }
        }

        var sessionReqInProgress = false;
        var pendingCallbacks = [];
        function isSessionActive(callback) {
            if(callback) {
                pendingCallbacks.push(callback);
            }
            if(!sessionReqInProgress) {
                sessionReqInProgress = true;
                var oReq = new XMLHttpRequest();
                oReq.onload = function() {
                    sessionReqInProgress = false;
                    var active = this.status === 200;
                    for(var i = 0; i < pendingCallbacks.length; i++) {
                        try {
                            pendingCallbacks[i](active);
                        } catch(err) {
                            console.error('Error invoking isSessionActive callback:', err); // jshint ignore:line
                        }
                    }
                    pendingCallbacks = [];
                };

                oReq.open('get', opts.authServer + '/session', true);
                oReq.withCredentials = true;
                oReq.send();
            }
        }

        init();

        return {
            setAlwaysPromptLogin: function(value) {
                var newVal = !!value;
                if(opts.alwaysPromptLogin !== newVal) {
                    opts.alwaysPromptLogin = newVal;
                    init();
                }
            },
            setEnsureToken: function(value) {
                var newVal = !!value;
                if(opts.ensureToken !== newVal) {
                    opts.ensureToken = newVal;
                    init();
                }
            },
            isEnsureToken: function() {
                return opts.ensureToken;
            },
            getTokenOrLogout: getTokenOrLogout,
            getToken: getToken,
            wipeToken: jso.wipe,
            logout: logout,
            login: login
        };
    }

    exp.BbpOidcClient = BbpOidcClient;

})(window);

/* global BbpOidcClient, jso_configure, jso_ensureTokens, jso_getToken, jso_wipe */
(function(){
    'use strict';

    var client;

    angular.module('bbpOidcClient', ['bbpConfig'])
        .config(['bbpConfig', function(bbpConfig) {
            var oidcOptions = {
                clientId: bbpConfig.get('auth.clientId'),
                authServer: bbpConfig.get('auth.url', null),
                debug: bbpConfig.get('oidc.debug', false),
                scopes: bbpConfig.get('auth.scopes', null),
                token: bbpConfig.get('auth.token', null),
                ensureToken: bbpConfig.get('auth.ensureToken', true),
                alwaysPromptLogin: bbpConfig.get('auth.alwaysPromptLogin', false),
            };
            client = new BbpOidcClient(oidcOptions);
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpOidcRequestInterceptor');
        }])
        .provider('bbpOidcSession', function() {
            /**
             * Ensure that we will always prompt the login.
             *
             * @param {Boolean} value truthy if a login prompt should be
             *        forced when a token needs to be retrieved.
             */
            this.alwaysPromptLogin = function(value) {
                client.setAlwaysPromptLogin(!!value);
            };

            this.ensureToken = function(value) {
                client.setEnsureToken(!!value);
            };

            this.logout = function($q) {
                return function() {
                    return $q.when(client.logout());
                };
            };

            this.$get = ['$http', '$q', function($http, $q) {
                return {
                    login: client.login,
                    logout: this.logout($q),
                    token: client.getToken,
                    alwaysPromptLogin: this.alwaysPromptLogin,
                    ensureToken: this.ensureToken
                };
            }];
        })
        // authentication and request token injection
        .factory('httpOidcRequestInterceptor', ['bbpConfig', '$log', '$q',
            function (bbpConfig, $log, $q) {
            return {
                request: function (requestConfig) {
                    var token = client.getToken();
                    if (token) {
                        if (!requestConfig.headers.Authorization) {
                            requestConfig.headers.Authorization = 'Bearer ' + token;
                        }
                    } else if(client.isEnsureToken()) {
                        client.getTokenOrLogout();
                    }

                    return requestConfig;
                },
                responseError: function(rejection) {
                    // if we have a Authorization token and got a 401, we should logout, and try the request again
                    var headers = rejection.config.headers;
                    if (headers && headers.Authorization && rejection.status === 401) {
                        $log.debug('current token is not valid anymore:', rejection.data);
                        // remove token from localStorage
                        client.wipeToken();
                        if (client.isEnsureToken()) {
                            client.getTokenOrLogout();
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
}());

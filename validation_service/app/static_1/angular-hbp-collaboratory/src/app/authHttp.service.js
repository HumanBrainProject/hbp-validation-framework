angular.module('clb-app')
    .factory('clbAuthHttp', clbAuthHttp);

/**
 * Proxy $http to add the HBP bearer token.
 * Also handle 401 Authentication Required errors.
 * See $http service
 *
 * @param  {object} $http   DI
 * @param  {object} clbAuth DI
 * @return {function}       the service
 */
function clbAuthHttp($http, clbAuth) {
    var proxyHttp = function(config) {
        var auth = clbAuth.getAuthInfo();
        console.log("AUTH INFO");
        console.log(auth);


        if (!auth) {
            console.log('the thing : ');
            console.log($http(config));
            return $http(config);
        }
        var authToken = auth.tokenType + ' ' + auth.accessToken;
        console.log("authToken");
        console.log(authToken);

        if (!config.headers) {
            config.headers = {
                Authorization: authToken
            };
        }
        config.headers.Authorization = authToken;
        return $http(config);
    };
    proxyHttp.get = _wrapper('GET');
    proxyHttp.head = _wrapper('HEAD');
    proxyHttp.delete = _wrapper('DELETE');
    proxyHttp.post = _wrapperData('POST');
    proxyHttp.put = _wrapperData('PUT');
    proxyHttp.patch = _wrapperData('PATCH');
    return proxyHttp;

    /**
     * Handle $http helper call for GET, DELETE, HEAD requests.
     *
     * @param  {string} verb the HTTP verb
     * @return {function}    The function to attach
     */
    function _wrapper(verb) {
        return function(url, config) {
            config = config || {};
            config.method = verb.toUpperCase();
            config.url = url;
            console.log("new config :")
            console.log(config)
            return proxyHttp(config);
        };
    }

    /**
     * Handle $http helper call for PUT, PATCH, POST requests.
     *
     * @param  {string} verb the HTTP verb
     * @return {function}    The function to attach
     */
    function _wrapperData(verb) {
        return function(url, data, config) {
            config = config || {};
            config.method = verb.toUpperCase();
            config.url = url;
            config.data = data;

            return proxyHttp(config);
        };
    }
}
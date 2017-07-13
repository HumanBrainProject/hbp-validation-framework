var validationAppServices = angular.module('validationAppServices', ['ngResource', 'ngCookies']);

// validationAppServices.config(
//     function($cookiesProvider, $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {
//         $resourceProvider.defaults.stripTrailingSlashes = false;

//         $httpProvider.defaults.xsrfCookieName = 'csrftoken';
//         // alert($httpProvider.defaults.xsrfCookieName);
//         // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

//         // $httpProvider.defaults.xsrfHeaderName = $cookiesProvider.$cookies['csrftoken'];

//         // console.log($cookiesProvider);
//         // console.log($cookiesProvider);
//         // console.log($cookiesProvider);


//         $httpProvider.defaults.withCredentials = true;

//         // headers = {
//         //     'Content-Type': 'application/json',
//         //     // 'X-CSRFToken': $cookies['csrftoken'],
//         //     // // "x-csrftoken": $cookies.csrftoken,
//         //     // "x-csrftoken": $cookies.get('csrftoken')

//         // };



//     });



// #### Factory ### //
//##################//

validationAppServices.factory('ScientificModelRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/scientificmodel/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

validationAppServices.factory('ScientificModelInstanceRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/scientificmodelinstance/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

validationAppServices.factory('ValidationTestDefinitionRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/validationtestdef/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

validationAppServices.factory('ValidationTestCodeRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/validationtestscode/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

validationAppServices.factory('TestCommentRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/testcomment/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);


validationAppServices.factory('CollabParameterRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/collabparameterrest/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', id: '@eUuid' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', id: '@eUuid' }, isArray: false, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', id: '@eUuid' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);



// validationAppServices.factory('AuthaurizedCollabParameterRest', ['$http', '$cookies',
//     function($http, $cookies) {
//         // var $cookies;
//         // $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
//         // alert($cookies.get('csrftoken'));
//         // alert($cookies.csrftoken);
//         // console.log($cookies);
//         // console.log($cookies);
//         // console.log($cookies);
//         // console.log($cookies);
//         // console.log($cookies);

//         return {

//             post: function() {

//                 return $http.get('authorizedcollabparameterrest/', {
//                         'X-CSRFToken': $cookies['csrftoken'],
//                         // "x-csrftoken": $cookies.csrftoken,
//                         "x-csrftoken": $cookies.get('csrftoken'),

//                         type: 'GET',
//                         ID: 'TP001',
//                         dataType: 'json',
//                         data: JSON.stringify({ test: "blabla" }),
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'X-CSRFToken': $cookies['csrftoken'],
//                             // "x-csrftoken": $cookies.csrftoken,
//                             "x-csrftoken": $cookies.get('csrftoken')

//                         }

//                     }

//                     // {
//                     //     // headers: { "x-csrftoken": $cookies.csrftoken } 
//                     //     headers: {
//                     //         'Content-Type': 'application/json',
//                     //         'X-CSRFToken': $cookies['csrftoken'],
//                     //         // "x-csrftoken": $cookies.csrftoken,
//                     //         "x-csrftoken": $cookies.get('csrftoken')

//                     //     },
//                     // }
//                 );
//             }
//         };
//     }
// ]);


validationAppServices.factory('AuthaurizedCollabParameterRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/authorizedcollabparameterrest/', {}, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            // post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);



// #### Service ### //
//##################//
validationAppServices.service('CollabParameters', ['$rootScope', 'CollabParameterRest',
    function($rootScope, CollabParameterRest) {
        var parameters;
        var ctx;

        var addParameter = function(type, newObj) {
            parameters.param[0][type].push(newObj);
        };

        var supprParameter = function(type, Obj) {
            index = parameters.param[0][type].indexOf(Obj);
            parameters.param[0][type].splice(index, 1);
        };

        var getParameters = function(type) {
            return parameters.param[0][type];
        };

        var getAllParameters = function() {
            return parameters.param[0];
        };

        var _StringTabToArray = function(tab) {
            tab.forEach(function(value, i) {
                if (value == "") {
                    tab[i] = [];

                } else {
                    tab[i] = value.split(",");
                }

            });

            return tab;
        };

        var _getParamTabValues = function() {
            var param_tab = [
                parameters.param[0]['data_modalities'],
                parameters.param[0]['species'],
                parameters.param[0]['brain_region'],
                parameters.param[0]['cell_type'],
                parameters.param[0]['model_type'],
                parameters.param[0]['test_type'],
            ];

            return param_tab;
        };

        var _setParametersNewValues = function(string_tab) {
            parameters.param[0]['data_modalities'] = string_tab[0];
            parameters.param[0]['species'] = string_tab[1];
            parameters.param[0]['brain_region'] = string_tab[2];
            parameters.param[0]['cell_type'] = string_tab[3];
            parameters.param[0]['model_type'] = string_tab[4];
            parameters.param[0]['test_type'] = string_tab[5];
        };

        var _getCtx = function() {
            if (typeof(ctx) == "undefined") {
                var url = (window.location != window.parent.location) ?
                    document.referrer :
                    document.location.href;

                ctx = url.split("?")[1]
                ctx = ctx.substring(4);

                return (ctx);
            }
        };

        var setService = function() {
            _getCtx();
            // alert(ctx);
            if (typeof(parameters) == "undefined") {
                parameters = CollabParameterRest.get({ id: ctx }); //need to get collab number
                parameters.$promise.then(function() {

                    if (parameters.param.length == 0) {
                        post = _postInitCollab();
                        post.$promise.then(function() {
                            parameters = CollabParameterRest.get({ id: ctx });

                        });
                    } else {
                        param_tab = _getParamTabValues();
                        string_tab = _StringTabToArray(param_tab);
                        _setParametersNewValues(string_tab);

                    }
                });
            }
            return parameters;
        };

        var _postInitCollab = function() {
            parameters = {
                'param': [{
                    'data_modalities': [],
                    'test_type': [],
                    'species': [],
                    'brain_region': [],
                    'cell_type': [],
                    'model_type': [],
                }, ],
                '$promise': true,
            };

            post = post_parameters();
            return post;

        };

        var post_parameters = function() {

            var data_to_send = JSON.stringify({
                'id': ctx,
                'data_modalities': String(parameters.param[0]['data_modalities']),
                'test_type': String(parameters.param[0]['test_type']),
                'species': String(parameters.param[0]['species']),
                'brain_region': String(parameters.param[0]['brain_region']),
                'cell_type': String(parameters.param[0]['cell_type']),
                'model_type': String(parameters.param[0]['model_type']),
            });
            post = CollabParameterRest.save(data_to_send, function(value) {});
            return post;
        };

        var put_parameters = function() {

            var data_to_send = JSON.stringify({
                'id': ctx,
                'data_modalities': String(parameters.param[0]['data_modalities']),
                'test_type': String(parameters.param[0]['test_type']),
                'species': String(parameters.param[0]['species']),
                'brain_region': String(parameters.param[0]['brain_region']),
                'cell_type': String(parameters.param[0]['cell_type']),
                'model_type': String(parameters.param[0]['model_type']),
            });

            put = CollabParameterRest.put({ id: ctx }, data_to_send, function(value) {});
            return put;
        };


        return {
            addParameter: addParameter,
            getParameters: getParameters,
            getAllParameters: getAllParameters,
            setService: setService,
            supprParameter: supprParameter,
            post_parameters: post_parameters,
            put_parameters: put_parameters,
        };

    }
]);



// for Model catalog app
var ModelCatalogServices = angular.module('ModelCatalogServices', ['ngResource']);

ModelCatalogServices.factory('ScientificModelRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/scientificmodel/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ModelCatalogServices.factory('ScientificModelInstanceRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/scientificmodelinstance/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);
var validationAppServices = angular.module('validationAppServices', ['ngResource', 'ngCookies']);



// #### Factory ### //
//##################//

validationAppServices.factory('ScientificModelRest', ['$resource',
    function($resource) {
        return $resource('scientificmodel/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

validationAppServices.factory('ScientificModelInstanceRest', ['$resource',
    function($resource) {
        return $resource('scientificmodelinstance/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

validationAppServices.factory('ValidationTestDefinitionRest', ['$resource',
    function($resource) {
        return $resource('validationtestdef/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

validationAppServices.factory('ValidationTestCodeRest', ['$resource',
    function($resource) {
        return $resource('validationtestscode/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

validationAppServices.factory('TestCommentRest', ['$resource',
    function($resource) {
        return $resource('testcomment/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);







validationAppServices.factory('CollabParameterRest', ['$resource',
    function($resource) {
        return $resource( /*/base_url + 'app//*/ 'collabparameterrest/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, isArray: false, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);



// validationAppServices.factory('CollabParameterRest', ['$http', '$cookies',
//     function($http, $cookies) {
//         return {
//             post: function() {
//                 return $http.post(base_url + 'app/collabparameterrest/', { id: '@eUuid' }, {
//                     method: 'POST',
//                     params: { format: 'json', id: '@eUuid' },
//                     dataType: 'json',
//                 });
//             },

//             get: function(id) {
//                 return $http.get(base_url + 'app/collabparameterrest/', {
//                     method: 'GET',
//                     params: { format: 'json', id: id },
//                     dataType: 'json',
//                 });
//             },
//         };
//     }
// ]);


// validationAppServices.factory('AuthaurizedCollabParameterRest', ['$http', '$cookies',
//     function($http, $cookies) {
//         return $http(base_url + 'app/authorizedcollabparameterrest/', {}, {
//             get: { method: 'GET', params: { format: 'json' }, isArray: false },
//         });
//     }

// ]);


// validationAppServices.factory('AuthaurizedCollabParameterRest', ['$http', '$cookies',
//     function($http, $cookies) {
//         return {
//             get: function() {
//                 return $http.get( /*/base_url + 'app//*/ 'authorizedcollabparameterrest/', {
//                     method: 'GET',
//                     // params: { format: 'json' },
//                     // dataType: 'json',
//                     type: 'getSource',
//                     ID: 'TP001'
//                 });
//             }
//         };
//     }
// ]);


validationAppServices.factory('AuthaurizedCollabParameterRest', ['$resource',
    function($resource) {
        return $resource('authorizedcollabparameterrest/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            // post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);






// for Model catalog app
var ModelCatalogServices = angular.module('ModelCatalogServices', ['ngResource', 'btorfs.multiselect']);

ModelCatalogServices.factory('ScientificModelRest', ['$resource',
    function($resource) {
        return $resource('scientificmodel/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ModelCatalogServices.factory('ScientificModelInstanceRest', ['$resource',
    function($resource) {
        return $resource('scientificmodelinstance/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ModelCatalogServices.factory('ScientificModelImageRest', ['$resource',
    function($resource) {
        return $resource('scientificmodelimage/:uuid', { id: '@eUuid' }, {
            // get: { method: 'GET', params: { format: 'json' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } },
            delete: { method: 'DELETE', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }

]);

ModelCatalogServices.factory('CollabParameterRest', ['$resource',
    function($resource) {
        return $resource('collabparameterrest/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, isArray: false, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ModelCatalogServices.factory('AuthaurizedCollabParameterRest', ['$resource',
    function($resource) {
        return $resource('authorizedcollabparameterrest/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            // post: { method: 'POST', params: { format: 'json', ctx: 'ctx'  }, headers: { 'Content-Type': 'application/json' } }
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
                parameters = CollabParameterRest.get({ ctx: ctx, id: ctx });


                console.log(parameters);
                console.log("okok");


                parameters.$promise.then(function() {

                    if (parameters.param.length == 0) {
                        post = _postInitCollab();
                        post.$promise.then(function() {
                            parameters = CollabParameterRest.get({ ctx: ctx, id: ctx });

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

        var getRequestParameters = function() {
            parameters = CollabParameterRest.get({ ctx: ctx, id: ctx });
            return parameters
        };

        var _postInitCollab = function() {
            initConfiguration();

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

            // data_to_send2 = {ctx:ctx, data:data_to_send}
            post = CollabParameterRest.save({ ctx: ctx }, data_to_send, function(value) {});

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


            put = CollabParameterRest.put({ ctx: ctx, id: ctx }, data_to_send, function(value) {});

            return put;
        };

        var getCtx = function() {
            return ctx;
        };

        var initConfiguration = function() {
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

        };


        return {
            addParameter: addParameter,
            getParameters: getParameters,
            getAllParameters: getAllParameters,
            setService: setService,
            supprParameter: supprParameter,
            post_parameters: post_parameters,
            put_parameters: put_parameters,
            getCtx: getCtx,
            initConfiguration: initConfiguration,
            getRequestParameters: getRequestParameters,
        };

    }
]);



ModelCatalogServices.service('CollabParameters', ['$rootScope', 'CollabParameterRest',
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

        var getRequestParameters = function() {
            parameters = CollabParameterRest.get({ ctx: ctx, id: ctx });
            return parameters
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
            if (typeof(parameters) == "undefined") {
                parameters = CollabParameterRest.get({ ctx: ctx, id: ctx }); //need to get collab number
                parameters.$promise.then(function() {

                    if (parameters.param.length == 0) {
                        post = _postInitCollab();
                        post.$promise.then(function() {
                            parameters = CollabParameterRest.get({ ctx: ctx, id: ctx });

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
            initConfiguration();

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
            post = CollabParameterRest.save({ ctx: ctx }, data_to_send, function(value) {});
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

            put = CollabParameterRest.put({ ctx: ctx, id: ctx }, data_to_send, function(value) {});
            return put;
        };

        var getCtx = function() {

            return ctx;
        }

        var initConfiguration = function() {
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

        };

        return {
            addParameter: addParameter,
            getParameters: getParameters,
            getAllParameters: getAllParameters,
            setService: setService,
            supprParameter: supprParameter,
            post_parameters: post_parameters,
            put_parameters: put_parameters,
            getCtx: getCtx,
            initConfiguration: initConfiguration,
        };

    }
]);
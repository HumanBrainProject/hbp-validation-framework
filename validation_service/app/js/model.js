var validationAppServices = angular.module('validationAppServices', ['ngResource']);



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
        return $resource(base_url + 'app/validationtest/:uuid', { id: '@eUuid' }, {
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






validationAppServices.factory('CollabParameterRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/collabparameterrest/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);



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
            console.log(string_tab);
            parameters.param[0]['data_modalities'] = string_tab[0];
            parameters.param[0]['species'] = string_tab[1];
            parameters.param[0]['brain_region'] = string_tab[2];
            parameters.param[0]['cell_type'] = string_tab[3];
            parameters.param[0]['model_type'] = string_tab[4];
            parameters.param[0]['test_type'] = string_tab[5];
        };


        var setService = function() {
            if (typeof(parameters) == "undefined") {
                parameters = CollabParameterRest.get({ id: "1" }); //need to get collab number
                parameters.$promise.then(function() {

                    console.log(parameters.param.length)
                    if (parameters.param.length == 0) {

                        post = _postInitCollab();
                        post.$promise.then(function() {
                            parameters = CollabParameterRest.get({ id: "1" });

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
                'id': "2", //need collab id here
                'data_modalities': String(parameters.param[0]['data_modalities']),
                'test_type': String(parameters.param[0]['test_type']),
                'species': String(parameters.param[0]['species']),
                'brain_region': String(parameters.param[0]['brain_region']),
                'cell_type': String(parameters.param[0]['cell_type']),
                'model_type': String(parameters.param[0]['model_type']),
            });
            console.log(data_to_send);
            post = CollabParameterRest.save(data_to_send, function(value) {});
            return post;
        };

        var put_parameters = function() {

            var data_to_send = JSON.stringify({
                'id': "2", //need collab id here
                'data_modalities': String(parameters.param[0]['data_modalities']),
                'test_type': String(parameters.param[0]['test_type']),
                'species': String(parameters.param[0]['species']),
                'brain_region': String(parameters.param[0]['brain_region']),
                'cell_type': String(parameters.param[0]['cell_type']),
                'model_type': String(parameters.param[0]['model_type']),
            });
            console.log("oaoaoaoaoaaoaoaoaoaaoao");
            console.log(data_to_send);
            console.log("oaoaoaoaoaaoaoaoaoaaoao");

            post = CollabParameterRest.put(data_to_send, function(value) { id: "2" });
            return post;
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
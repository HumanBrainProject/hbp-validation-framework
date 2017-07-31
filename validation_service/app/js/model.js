var ApiCommunicationServices = angular.module('ApiCommunicationServices', ['ngResource', 'ngCookies', 'btorfs.multiselect']);

ApiCommunicationServices.factory('ScientificModelRest', ['$resource',
    function($resource) {
        return $resource('scientificmodel/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('ScientificModelInstanceRest', ['$resource',
    function($resource) {
        return $resource('scientificmodelinstance/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);


ApiCommunicationServices.factory('ScientificModelImageRest', ['$resource',
    function($resource) {
        return $resource('scientificmodelimage/:uuid', { id: '@eUuid' }, {
            // get: { method: 'GET', params: { format: 'json' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } },
            delete: { method: 'DELETE', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }

]);

ApiCommunicationServices.factory('ValidationTestDefinitionRest', ['$resource',
    function($resource) {
        return $resource('validationtestdef/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('ValidationTestCodeRest', ['$resource',
    function($resource) {
        return $resource('validationtestscode/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('TestCommentRest', ['$resource',
    function($resource) {
        return $resource('testcomment/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);


/////////////////////////
ApiCommunicationServices.factory('CollabParameterRest', ['$resource',
    function($resource) {
        return $resource('parametersconfigurationrest/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, isArray: false, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', id: '@eUuid', ctx: 'ctx' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);


ApiCommunicationServices.factory('AuthaurizedCollabParameterRest', ['$resource',
    function($resource) {
        return $resource('authorizedcollabparameterrest/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', ctx: 'ctx' }, headers:{ 'Content-Type':'application/json' }},
            // post: { method: 'POST', params: { format: 'json', ctx: 'ctx'  }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('IsCollabMemberRest', ['$resource',
    function($resource) {
        return $resource('iscollabmemberrest/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('CollabIDRest', ['$resource',
    function($resource) {
        return $resource('collabidrest/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('ValudationResultRest', ['$resource',
    function($resource) {
        return $resource('validationresultrest/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
        });
    }
]);

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
var ParametersConfigurationServices = angular.module('ParametersConfigurationServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices']);




ParametersConfigurationServices.service('CollabParameters', ['$rootScope', 'CollabParameterRest',
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

        var getParameters_authorized_value_formated = function(type) {
            data = getParameters(type);
            formated_data = [];

            size = data.length;
            for (var i = 0; i < size; i++) {
                formated_data.push({ authorized_value: data[i] });
            }
            return formated_data;
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

                // var url = (window.location != window.parent.location) ?
                //     document.referrer :
                //     document.location.href;

                ctx = document.location.href;
                ctx = ctx.split("?")[1]
                ctx = ctx.split("#")[0]
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
                'app_type': String(parameters.param[0]['app_type']),
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
                'app_type': String(parameters.param[0]['app_type']),
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
                    'app_type': [],
                }, ],
                '$promise': true,
            };

        };

        return {
            addParameter: addParameter,
            getParameters: getParameters,
            getParameters_authorized_value_formated: getParameters_authorized_value_formated,
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
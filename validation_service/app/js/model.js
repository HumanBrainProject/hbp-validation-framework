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






validationAppServices.factory('CollabParameterRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/collabparameterrest/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
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

        var addParameter = function(type, newObj) { //// not finished yet
            parameters.param[0][type].push(newObj);

            //also need to put the data to the base....
        };

        var supprParameter = function(type, Obj) { //// not finished yet
            index = parameters.param[0][type].indexOf(Obj)
            parameters.param[0][type].splice(index, 1);

            //also need to put the data to the base....
        };

        var getParameters = function(type) {
            return parameters.param[0][type];
        };

        var getAllParameters = function() {
            return parameters.param[0];
        };

        var setService = function() {
            if (typeof(parameters) == "undefined") {
                console.log("inside IF !");
                parameters = CollabParameterRest.get({ id: "1" }); //need to get collab number
                console.log(parameters)
            }

            return parameters;
        };


        return {
            addParameter: addParameter,
            getParameters: getParameters,
            getAllParameters: getAllParameters,
            setService: setService,
            supprParameter: supprParameter,
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
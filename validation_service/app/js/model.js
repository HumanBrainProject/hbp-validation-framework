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




/*
validationAppServices.factory('configviewRest', ['$resource',
  function($resource){
    return $resource( base_url + 'app/getconfigview/:uuid', {id:'@eUuid'}, {
      get: {method:'GET', params:{format:'json'}, isArray:false},
    //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
    //   post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);
*/

validationAppServices.factory('CollabParameterRest', ['$resource',
    function($resource) {
        return $resource(base_url + 'app/collabparameterrest/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

// #### Service ### //
//##################//
validationAppServices.service('CollabParameters', ['CollabParameterRest',
    function(CollabParameterRest) {
        var parameters = {};


        var addParameter = function(type, newObj) {
            parameters[type].push(newObj);

            //also put the data to base....
        };

        var supprParameter = function(type, Obj) {
            index = parameters[type].indexOf(Obj)
            parameters[type].splice(index, 1);

            //also put the data to base....
        };

        var getParameters = function(type) {
            return parameters[type];
        };

        var getAllParameters = function(type) {
            return parameters;
        };

        var setService = function() {

            if (parameters = {}) {
                CollabParameterRest.get({}, function(data) {}); //need to get collab number
            }
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


var validationAppServices = angular.module('validationAppServices', ['ngResource']);

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

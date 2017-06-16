var validationAppServices = angular.module('validationAppServices', ['ngResource']);

validationAppServices.factory('ScientificModelRest', ['$resource',
  function($resource){
    return $resource( base_url + 'app/getscientificmodels/', {}, {
      get: {method:'GET', params:{format:'json'}, isArray:false},
    //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
    //   post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);

validationAppServices.factory('ValidationTestDefinitionRest', ['$resource',
  function($resource){
    return $resource( base_url + 'app/getvalidationtests/:uuid', {id:'@eUuid'}, {
      get: {method:'GET', params:{format:'json'}, isArray:false},
    //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
    //   post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);



  // for Model catalog app
var ModelCatalogServices = angular.module('ModelCatalogServices', ['ngResource']);

ModelCatalogServices.factory('ModelList', ['$resource',
  function($resource){
    return $resource( base_url + 'app/getModels/', {}, {
      get: {method:'GET', params:{format:'json'}, isArray:false},
    //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
    //   post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);

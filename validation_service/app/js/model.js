var validationAppServices = angular.module('validationAppServices', ['ngResource']);

validationAppServices.factory('Models', ['$resource',
  function($resource){
    return $resource( base_url + 'app/api-models/', {}, {
      get: {method:'GET', params:{format:'json'}, isArray:false},
    //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
    //   post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);

validationAppServices.factory('Tests', ['$resource',
  function($resource){
    return $resource( base_url + 'app/api-tests/', {}, {
      get: {method:'GET', params:{format:'json'}, isArray:false},
    //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
    //   post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);
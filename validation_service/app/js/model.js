var validationAppServices = angular.module('validationAppServices', ['ngResource']);

validationAppServices.factory('AllModelAndTest', ['$resource',
  function($resource){
    return $resource( base_url + 'app/getdata/', {}, {
      get: {method:'GET', params:{format:'json'}, isArray:false},
    //   put: {method:'PUT', params:{format:'json'}, headers:{ 'Content-Type':'application/json' }},
    //   post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);
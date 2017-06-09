(function() {

  window.base_url = '';
  window.ver_api = '/api/v2/';

  angular.module( 'nmpi', [ 
    'hbpCommon',
    'ui.router',
    'ng',
    'ngResource',
    'hbpCollaboratory',
    'clb-error',
    'clb-ui-error',
    'clb-env',
    'clb-app',
  ])

  .config(
    function ( $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider ) 
    {
      $resourceProvider.defaults.stripTrailingSlashes = false;
      // Routing
      $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home_1.tpl.html',   
        controller: 'HomeCtrl'
      })
      .state('validation_test', {
        url: '/home/validation_test',
        templateUrl: 'validation_test.tpl.html',
        controller: 'ValTestCtrl'
      })
      .state('test_result', {
        url: '/home/test_result',
        templateUrl: 'test_result.tpl.html', 
        controller: 'TestResultCtrl'
      })
    }
  )


    // Bootstrap function
    // angular.bootstrap().invoke(function($http, $log) {
    //     $http.get('/config.json').then(function(res) {
    //         window.bbpConfig = res.data;
    //         angular.element(document).ready(function() {
    //             angular.bootstrap(document, ['request-app']);
    //         });
    //     }, function() {
    //         $log.error('Cannot boot request-app application');
    //         window.location.href = '/login/hbp/?next=' + encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
    //     });
    // });

}());
// (function() {

  window.base_url = 'https://127.0.0.1:8000/';
  window.ver_api = '/api/v2/';

  var testApp = angular.module( 'testApp', [ 
    // 'hbpCommon',
    // 'bbpOidcClient',
    'ui.router',
    'ng',
    'ngResource',
    'ngRoute',
    // 'hbpCollaboratory',
    // 'clb-error',
    // 'clb-ui-error',
    // 'clb-env',
    // 'clb-app',
  ]);

  testApp.config(
    function ( $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider ) 
    {
      $resourceProvider.defaults.stripTrailingSlashes = false;
      // Routing
      // $stateProvider
      //   .state('home', {
      //     url: '/home',
      //     template: '<h1>home</h1>'
      //   })
      //   .state('validation_test', {
      //     url: '/home/validation_test',
      //     template: '<h1>validation_test</h1>'
      //   })
      //   .state('test_result', {
      //     url: '/home/test_result',
      //     template: '<h1>test_result</h1>'
      //   });

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/static/js/home_1.tpl.html',   
          controller: 'HomeCtrl'
        })
        .state('validation_test', {
          url: '/home/validation_test',
          templateUrl: '/static/js/validation_test.tpl.html',
          controller: 'ValTestCtrl'
        })
        .state('test_result', {
          url: '/home/test_result',
          templateUrl: '/static/js/test_result.tpl.html', 
          controller: 'TestResultCtrl'
        });
      $urlRouterProvider.otherwise('/');
    }
  );

// }());
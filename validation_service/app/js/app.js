// (function() {

window.base_url = 'https://127.0.0.1:8000/';
window.ver_api = '/api/v2/';

var testApp = angular.module( 'testApp', [
    'ui.router',
    'ng',
    'ngResource',
    'validationAppServices',
]);

testApp.config(
    function ( $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider )
    {
        $resourceProvider.defaults.stripTrailingSlashes = false;

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
            .state('validation_test_detail', {
                url: '/home/validation_test/:uuid',
                templateUrl: '/static/js/validation_test_detail.tpl.html',
                controller: 'ValTestDetailCtrl'
            })
            .state('test_result', {
                url: '/home/test_result',
                templateUrl: '/static/js/test_result.tpl.html',
                controller: 'TestResultCtrl'
            });
        $urlRouterProvider.otherwise('/home');
    }
);

// }());
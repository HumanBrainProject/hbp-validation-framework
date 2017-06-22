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
            .state('create_validation_test', {
                url: '/home/validation_test/create',
                templateUrl: '/static/js/validation_test_create.tpl.html',
                controller: 'ValTestCreateCtrl'
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
            })
           
            .state('config_view', {
                url: '/home/config_view',
                templateUrl: '/static/js/config_view.tpl.html',
                controller: 'configviewCtrl'
            })

/*
             .state('config_view_detail', {
                url: '/home/config_view_detail/:uuid',
                templateUrl: '/static/js/config_view_detail.tpl.html',
                controller: 'configviewDetailCtrl'
            })
*/
            ;
        $urlRouterProvider.otherwise('/home');
    }
);


//Model Catalog App
var ModelCatalogApp = angular.module( 'ModelCatalogApp', [
    'ui.router',
    'ng',
    'ngResource',
    'ModelCatalogServices',
]);

ModelCatalogApp.config(
    function ( $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider)
    {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $stateProvider
            .state('ModelCatalog', {
                url: '/model-catalog',
                templateUrl: '/static/templates/model-catalog.tpl.html',
                controller: 'ModelCatalogCtrl'
            })
            .state('ModelCatalogCreate', {
                url: '/model-catalog/create',
                templateUrl: '/static/templates/model-catalog-create.tpl.html',
                controller: 'ModelCatalogCreateCtrl'
            })
            .state('ModelCatalogDetail', {
                url: '/model-catalog/detail/:uuid',
                templateUrl: '/static/templates/model-catalog-detail.tpl.html',
                controller: 'ModelCatalogDetailCtrl'
            });
        $urlRouterProvider.otherwise('/model-catalog');

    });
// }());
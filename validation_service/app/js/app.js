// (function() {

window.base_url = 'https://127.0.0.1:8000/';
window.ver_api = '/api/v2/';

var testApp = angular.module('testApp', [
    'ui.router',
    'ng',
    'ngResource',
    'ParametersConfigurationServices',
    'ApiCommunicationServices',
    'ngCookies',
]);

testApp.config(
    function($cookiesProvider, $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {
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
            .state('config', {
                url: '/home/config',
                templateUrl: '/static/js/config.tpl.html',
                controller: 'ConfigCtrl'
            });

        $urlRouterProvider.otherwise('/home');

    });


//Model Catalog App
var ModelCatalogApp = angular.module('ModelCatalogApp', [

    'ui.router',
    'ng',
    'ngResource',
    'ApiCommunicationServices',
    'ParametersConfigurationServices',
]);

ModelCatalogApp.config(
    function($httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {

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
            .state('ModelCatalogVersion', {
                url: '/model-catalog/version',
                templateUrl: '/static/templates/model-catalog-version.tpl.html',
                controller: 'ModelCatalogVersionCtrl'
            })
            .state('ModelCatalogVersionUuid', {
                url: '/model-catalog/version/:uuid',
                templateUrl: '/static/templates/model-catalog-version.tpl.html',
                controller: 'ModelCatalogVersionCtrl'
            })
            .state('ModelCatalogDetail', {
                url: '/model-catalog/detail/:uuid',
                templateUrl: '/static/templates/model-catalog-detail.tpl.html',
                controller: 'ModelCatalogDetailCtrl'
            })
            .state('ModelCatalogEdit', {
                url: '/model-catalog/edit/:uuid',
                templateUrl: '/static/templates/model-catalog-edit.tpl.html',
                controller: 'ModelCatalogEditCtrl'
            });
        $urlRouterProvider.otherwise('/model-catalog');

    });




//Config App
var ParametersConfigurationApp = angular.module('ParametersConfigurationApp', [
    'ui.router',
    'ng',
    'ngResource',
    'ParametersConfigurationServices',
    'ApiCommunicationServices',
]);

ParametersConfigurationApp.config(
    function($httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {

        $resourceProvider.defaults.stripTrailingSlashes = false;
        $stateProvider
            .state('ParametersConfiguration', {
                url: '/parametersconfiguration',
                templateUrl: '/static/js/parameters-configuration.tpl.html',
                controller: 'ParametersConfigurationCtrl'
            })
            .state('ValidationParametersConfiguration', {
                url: '/validationparametersconfiguration',
                templateUrl: '/static/js/validation-parameters-configuration.tpl.html',
                controller: 'ParametersConfigurationCtrl'
            })
            .state('ModelParametersConfiguration', {
                url: '/modelparametersconfiguration',
                templateUrl: '/static/js/model-parameters-configuration.tpl.html',
                controller: 'ParametersConfigurationCtrl'
            })

        $urlRouterProvider.otherwise('/parametersconfiguration');

    });
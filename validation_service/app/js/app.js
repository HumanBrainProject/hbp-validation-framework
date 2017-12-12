// Bootstrap function 

(function() {

    window.base_url = 'https://127.0.0.1:8000/';
    // window.base_url = '';
    //window.base_url = 'https://validation-dev.brainsimulation.eu:443/';
    // window.base_url = 'https://138.197.190.105:443/';

    window.ver_api = '/api/v2/';

    angular.bootstrap().invoke(function($http, $log) {
        $http.get('/config.json').then(function(res) {
            window.bbpConfig = res.data;

            // angular.element(document).ready(function() {

            //     console.log("okok");

            //     console.log(angular.bootstrap(document, ['testApp']));

            //     angular.bootstrap(document, ['testApp']);
            //     $log.info('Booted nmpi application');
            // });

        }, function() {
            $log.error('Cannot boot nmpi application');
            window.location.href = '/login/hbp/?next=' + encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
        });
    });



    // (function() {

    //     window.base_url = '';
    //     window.ver_api = '/api/v2/';

    //     angular.module('testApp', [
    //         'ui.router',
    //         'ng',
    //         'ngResource',
    //         'ParametersConfigurationServices',
    //         'ApiCommunicationServices',
    //         'GraphicsServices',
    //         'ngCookies',
    //         'nvd3',
    //         'ngTextTruncate',
    //         'HelpServices',

    //         'hbpCollaboratory',
    //     ]).config(
    //         function($cookiesProvider, $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {
    //             $resourceProvider.defaults.stripTrailingSlashes = false;
    //             $stateProvider
    //                 .state('home', {
    //                     url: '/home',
    //                     templateUrl: '/static/templates/validation_framework/home_1.tpl.html',
    //                     controller: 'HomeCtrl'
    //                 })
    //                 .state('validation_test', {
    //                     url: '/home/validation_test',
    //                     templateUrl: '/static/templates/validation_framework/validation_test.tpl.html',
    //                     controller: 'ValTestCtrl'
    //                 })
    //                 .state('create_validation_test', {
    //                     url: '/home/validation_test/create',
    //                     templateUrl: '/static/templates/validation_framework/validation_test_create.tpl.html',
    //                     controller: 'ValTestCreateCtrl'
    //                 })
    //                 .state('validation_test_detail', {
    //                     url: '/home/validation_test/:uuid',
    //                     templateUrl: '/static/templates/validation_framework/validation_test_detail.tpl.html',
    //                     controller: 'ValTestDetailCtrl'
    //                 })

    //             .state('validation_test_result_detail', {
    //                 url: '/home/validation_test_result/:uuid',
    //                 templateUrl: '/static/templates/validation_framework/validation_test_result_detail.tpl.html',
    //                 controller: 'ValTestResultDetailCtrl'
    //             })

    //             .state('validation_model_detail', {
    //                     url: '/home/validation_model_detail/:uuid',
    //                     templateUrl: '/static/templates/validation_framework/validation_model_detail.tpl.html',
    //                     controller: 'ValModelDetailCtrl'
    //                 })
    //                 .state('test_result', {
    //                     url: '/home/test_result',
    //                     templateUrl: '/static/templates/validation_framework/test_result.tpl.html',
    //                     controller: 'TestResultCtrl'
    //                 });

    //             $urlRouterProvider.otherwise('/home');

    //         })

    //     // Bootstrap function
    //     angular.bootstrap().invoke(function($http, $log) {
    //         $http.get('/config.json').then(function(res) {
    //             window.bbpConfig = res.data;
    //             angular.element(document).ready(function() {
    //                 angular.bootstrap(document, ['testApp']);
    //                 $log.info('Booted testApp application');
    //             });
    //         }, function() {
    //             $log.error('Cannot boot testApp application');
    //             window.location.href = '/login/hbp/?next=' + encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
    //         });
    //     });

    // }());







    // // (function() {



    var testApp = angular.module('testApp', [
        'ui.router',
        'ng',
        'ngResource',
        'ParametersConfigurationServices',
        'ApiCommunicationServices',
        'DataHandlerServices',
        'GraphicsServices',
        'ngCookies',
        'nvd3',
        'ngTextTruncate',
        'HelpServices',

        'hbpCollaboratory',
        // 'clb-env',
        // 'clb-error',
        // 'clb-ui-error',
        // 'clb-app',

        // 'hbpCollaboratoryCore',
        // 'angular-hbp-collaboratory',
        // 'clb-env',
        // 'clb-app',

        // 'clb-storage',

        //'hbpCollaboratory',
        // 'clb-error',
        // 'clb-ui-error',


    ]);

    testApp.config(
        function($cookiesProvider, $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/static/templates/validation_framework/home_1.tpl.html',
                    controller: 'HomeCtrl'
                })
                .state('validation_test', {
                    url: '/home/validation_test',
                    templateUrl: '/static/templates/validation_framework/validation_test.tpl.html',
                    controller: 'ValTestCtrl'
                })
                .state('create_validation_test', {
                    url: '/home/validation_test/create',
                    templateUrl: '/static/templates/validation_framework/validation_test_create.tpl.html',
                    controller: 'ValTestCreateCtrl'
                })
                .state('validation_test_detail', {
                    url: '/home/validation_test/:uuid',
                    templateUrl: '/static/templates/validation_framework/validation_test_detail.tpl.html',
                    controller: 'ValTestDetailCtrl'
                })

            .state('validation_test_result_detail', {
                url: '/home/validation_test_result/:uuid',
                templateUrl: '/static/templates/validation_framework/validation_test_result_detail.tpl.html',
                controller: 'ValTestResultDetailCtrl'
            })

            .state('validation_model_detail', {
                    url: '/home/validation_model_detail/:uuid',
                    templateUrl: '/static/templates/validation_framework/validation_model_detail.tpl.html',
                    controller: 'ValModelDetailCtrl'
                })
                .state('test_result', {
                    url: '/home/test_result',
                    templateUrl: '/static/templates/validation_framework/test_result.tpl.html',
                    controller: 'TestResultCtrl'
                });

            $urlRouterProvider.otherwise('/home');

        });

    // testApp.bootstrap().invoke(function($http, $log) {
    //     $http.get('/config.json').then(function(res) {
    //         window.bbpConfig = res.data;

    //         // angular.element(document).ready(function() {

    //         //     console.log("okok");

    //         //     console.log(angular.bootstrap(document, ['testApp']));

    //         //     angular.bootstrap(document, ['testApp']);
    //         //     $log.info('Booted nmpi application');
    //         // });

    //     }, function() {
    //         $log.error('Cannot boot nmpi application');
    //         window.location.href = '/login/hbp/?next=' + encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
    //     });
    // });




    //Model Catalog App
    var ModelCatalogApp = angular.module('ModelCatalogApp', [

        'ui.router',
        'ng',
        'ngResource',
        'ApiCommunicationServices',
        'DataHandlerServices',
        'ParametersConfigurationServices',
        'ContextServices',
        'HelpServices',
        'ngTextTruncate',
    ]);

    ModelCatalogApp.config(
        function($httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {

            $resourceProvider.defaults.stripTrailingSlashes = false;
            $stateProvider
                .state('ModelCatalog', {
                    url: '/model-catalog',
                    templateUrl: '/static/templates/model_catalog/model-catalog.tpl.html',
                    controller: 'ModelCatalogCtrl'
                })
                .state('ModelCatalogCreate', {
                    url: '/model-catalog/create',
                    templateUrl: '/static/templates/model_catalog/model-catalog-create.tpl.html',
                    controller: 'ModelCatalogCreateCtrl'
                })
                .state('ModelCatalogVersion', {
                    url: '/model-catalog/version',
                    templateUrl: '/static/templates/model_catalog/model-catalog-version.tpl.html',
                    controller: 'ModelCatalogVersionCtrl'
                })
                .state('ModelCatalogVersionUuid', {
                    url: '/model-catalog/version/:uuid',
                    templateUrl: '/static/templates/model_catalog/model-catalog-version.tpl.html',
                    controller: 'ModelCatalogVersionCtrl'
                })
                .state('ModelCatalogDetail', {
                    url: '/model-catalog/detail/:uuid',
                    templateUrl: '/static/templates/model_catalog/model-catalog-detail.tpl.html',
                    controller: 'ModelCatalogDetailCtrl'
                })
                .state('ModelCatalogEdit', {
                    url: '/model-catalog/edit/:uuid',
                    templateUrl: '/static/templates/model_catalog/model-catalog-edit.tpl.html',
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
        'ContextServices',
    ]);

    ParametersConfigurationApp.config(
        function($httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {

            $resourceProvider.defaults.stripTrailingSlashes = false;
            $stateProvider
                .state('ParametersConfiguration', {
                    url: '/parametersconfiguration',
                    templateUrl: '/static/templates/configuration/parameters-configuration.tpl.html',
                    controller: 'ParametersConfigurationCtrl'
                })
                .state('ValidationParametersConfiguration', {
                    url: '/validationparametersconfiguration',
                    templateUrl: '/static/templates/configuration/validation-parameters-configuration.tpl.html',
                    controller: 'ParametersConfigurationCtrl'
                })
                .state('ModelParametersConfiguration', {
                    url: '/modelparametersconfiguration',
                    templateUrl: '/static/templates/configuration/model-parameters-configuration.tpl.html',
                    controller: 'ParametersConfigurationCtrl'
                })

            $urlRouterProvider.otherwise('/parametersconfiguration');

        });

}());
'use strict';

/* Controllers */
var testApp = angular.module('testApp');

testApp.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', "ScientificModelRest", "ValidationTestDefinitionRest",
    function($scope, $rootScope, $http, $location, ScientificModelRest,ValidationTestDefinitionRest) {
        // $scope.init = function(tests, models) {
        //     $scope.tests = tests;
        //     $scope.models = models;
        // };

        $scope.models = ScientificModelRest.get({}, function(data){ });
        $scope.tests = ValidationTestDefinitionRest.get({}, function(data){ });      

    }
]);

testApp.controller('ValTestCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest) {
        $scope.test_list = ValidationTestDefinitionRest.get({}, function(data){});
    }
]);

testApp.controller('ValTestDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ValidationTestDefinitionRest',
    function($scope, $rootScope, $http, $location, $stateParams, ValidationTestDefinitionRest) {
        $scope.detail_test = ValidationTestDefinitionRest.get({id: $stateParams.uuid}, function(data){});
    }
]);

testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {}
]);




//Model catalog
var ModelCatalogApp = angular.module('ModelCatalogApp');

// ModelCatalogApp.controller('ModelCatalogApp', ['$scope', '$rootScope', '$http', '$location',
//     function($scope, $rootScope, $http, $location, AllModelAndTest) {
//         // $scope.init = function(tests, models) {
//         //     $scope.tests = tests;
//         //     $scope.models = models;
//         // };

//         $scope.double_list = AllModelAndTest.get({}, function(data){
//         });

//     }
// ]);
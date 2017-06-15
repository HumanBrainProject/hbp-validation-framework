'use strict';

/* Controllers */
var testApp = angular.module('testApp');

testApp.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', "AllModelAndTest",
    function($scope, $rootScope, $http, $location, AllModelAndTest) {
        // $scope.init = function(tests, models) {
        //     $scope.tests = tests;
        //     $scope.models = models;
        // };

        $scope.double_list = AllModelAndTest.get({}, function(data){
        });

    }
]);

testApp.controller('ValTestCtrl', ['$scope', '$rootScope', '$http', '$location', 'AllModelAndTest',
    function($scope, $rootScope, $http, $location, AllModelAndTest) {
        $scope.double_list = AllModelAndTest.get({}, function(data){});
    }
]);

testApp.controller('ValTestDetailCtrl', ['$scope', '$rootScope', '$http', '$location', 'AllModelAndTest',
    function($scope, $rootScope, $http, $location, AllModelAndTest) {
        // $scope.double_list = AllModelAndTest.get({}, function(data){});
    }
]);

testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {}
]);
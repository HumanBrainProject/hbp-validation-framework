'use strict';

/* Controllers */
var testApp = angular.module('testApp');

testApp.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', "Models", "Tests",
    function($scope, $rootScope, $http, $location, Models,Tests) {
        // $scope.init = function(tests, models) {
        //     $scope.tests = tests;
        //     $scope.models = models;
        // };

        $scope.models = Models.get({}, function(data){ });
        $scope.tests = Tests.get({}, function(data){ });      

    }
]);

testApp.controller('ValTestCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {}
]);

testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {}
]);
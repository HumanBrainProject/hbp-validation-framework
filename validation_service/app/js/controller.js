'use strict';

/* Controllers */
var testApp = angular.module('testApp');

testApp.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', "ScientificModelRest", "ValidationTestDefinitionRest", 'CollabParameters',
    function($scope, $rootScope, $http, $location, ScientificModelRest, ValidationTestDefinitionRest, CollabParameters) {

        CollabParameters.setService();
        $scope.models = ScientificModelRest.get({}, function(data) {});
        $scope.tests = ValidationTestDefinitionRest.get({}, function(data) {});

    }
]);

testApp.controller('ValTestCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'CollabParameters',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, CollabParameters) {
        $scope.test_list = ValidationTestDefinitionRest.get({}, function(data) {});

    }
]);

testApp.controller('ValTestDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest',
    function($scope, $rootScope, $http, $location, $stateParams, ValidationTestDefinitionRest, ValidationTestCodeRest) {
        $scope.detail_test = ValidationTestDefinitionRest.get({ id: $stateParams.uuid });

        $scope.detail_version_test = ValidationTestCodeRest.get({ test_definition_id: $stateParams.uuid });

        $scope.selected_tab = "";

        $scope.toogleTabs = function(id_tab) {
            $scope.selected_tab = id_tab;
            if (id_tab == "tab_description") {
                document.getElementById("tab_description").style.display = "block";
                document.getElementById("tab_version").style.display = "none";
                document.getElementById("tab_results").style.display = "none";
                document.getElementById("tab_comments").style.display = "none";
            }
            if (id_tab == "tab_version") {
                document.getElementById("tab_description").style.display = "none";
                document.getElementById("tab_version").style.display = "block";
                document.getElementById("tab_results").style.display = "none";
                document.getElementById("tab_comments").style.display = "none";
            }
            if (id_tab == "tab_results") {
                document.getElementById("tab_description").style.display = "none";
                document.getElementById("tab_version").style.display = "none";
                document.getElementById("tab_results").style.display = "block";
                document.getElementById("tab_comments").style.display = "none";
            }
            if (id_tab == "tab_comments") {
                document.getElementById("tab_description").style.display = "none";
                document.getElementById("tab_version").style.display = "none";
                document.getElementById("tab_results").style.display = "none";
                document.getElementById("tab_comments").style.display = "block";
            }
            var a = document.getElementById("li_tab_description");
            var b = document.getElementById("li_tab_version");
            var c = document.getElementById("li_tab_results");
            var d = document.getElementById("li_tab_comments");
            a.className = b.className = c.className = d.className = "nav-link";
            var e = document.getElementById("li_" + id_tab);
            e.className += " active";
        }
    }
]);

testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location', 'CollabParameters',
    function($scope, $rootScope, $http, $location, CollabParameters) {}
]);

testApp.controller('ValTestCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest', 'CollabParameters',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest, CollabParameters) {

        $scope.make_post = function() {
            var data_to_send = JSON.stringify({ test_data: $scope.test, code_data: $scope.code });
            ValidationTestDefinitionRest.save(data_to_send, function(value) {});
        };
    }
]);
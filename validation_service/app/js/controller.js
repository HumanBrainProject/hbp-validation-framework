'use strict';

/* Controllers */
var testApp = angular.module('testApp');

testApp.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', "ScientificModelRest", "ValidationTestDefinitionRest",
    function($scope, $rootScope, $http, $location, ScientificModelRest, ValidationTestDefinitionRest) {
        // $scope.init = function(tests, models) {
        //     $scope.tests = tests;
        //     $scope.models = models;
        // };

        $scope.models = ScientificModelRest.get({}, function(data) {});
        $scope.tests = ValidationTestDefinitionRest.get({}, function(data) {});

    }
]);

testApp.controller('ValTestCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest) {
        $scope.test_list = ValidationTestDefinitionRest.get({}, function(data) {});
    }
]);

testApp.controller('ValTestDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ValidationTestDefinitionRest',
    function($scope, $rootScope, $http, $location, $stateParams, ValidationTestDefinitionRest) {
        // var getvalidationtestsUrl = window.base_url + "app/getvalidationtests/" + $stateParams.uuid+"?format=json";
        $scope.detail_test = ValidationTestDefinitionRest.get({id : $stateParams.uuid});
        // $scope.detail_test = ValidationTestDefinitionRest.get(getvalidationtestsUrl, function(data) {
        //     console.log(data);
        // });

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

testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {}
]);


testApp.controller('ValTestCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest) {

        $scope.make_post = function() {
            var data_to_send = JSON.stringify({ test_data: $scope.test, code_data: $scope.code });
            ValidationTestDefinitionRest.save(data_to_send, function(value) {});
        };
    }
]);

//Model catalog
var ModelCatalogApp = angular.module('ModelCatalogApp');

ModelCatalogApp.controller('ModelCatalogCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
    
    
    }
]);

ModelCatalogApp.controller('ModelCatalogCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ScientificModelRest',
    function($scope, $rootScope, $http, $location, ScientificModelRest) { 
    $scope.species = [
      {id: 'mouse', name: 'Mouse (Mus musculus)'},
      {id: 'rat', name: 'Rat (Rattus rattus)'},
      {id: 'marmoset', name: 'Marmoset (callithrix jacchus)'},
      {id: 'human', name: 'Human (Homo sapiens)'},
      {id: 'rhesus_monkey', name: 'Paxinos Rhesus Monkey (Macaca mulatta)'},
      {id: 'opossum', name: 'Opossum (Monodelphis domestica)'},
      {id: 'other', name: 'Other'},
    ];

     $scope.brain_region = [
      {id: 'basal ganglia', name: 'Basal Ganglia'},
      {id: 'cerebellum', name: 'Cerebellum'},
      {id: 'cortex', name: 'Cortex'},
      {id: 'hippocampus', name: 'Hippocampus'},
      {id: 'other', name: 'Other'},
    ];

    $scope.cell_type = [
      {id: 'granule cell', name: 'Granule Cell'},
      {id: 'interneuron', name: 'Interneuron'},
      {id: 'pyramidal cell', name: 'Pyramidal Cell'},
      {id: 'other', name: 'Other'},
    ];

    $scope.model_type = [
      {id: 'single_cell', name: 'Single Cell'},
      {id: 'network', name: 'Network'},
      {id: 'mean_field', name: 'Mean Field'},
      {id: 'other', name: 'Other'},
    ];

    $scope.saveModel = function() {
        var parameters = JSON.stringify({model:$scope.model, model_instance:$scope.model_instance, model_image:$scope.model_image});
        ScientificModelRest.save(parameters, function(value) {});

    };
}
    
]);

ModelCatalogApp.controller('ModelCatalogVersionCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
    

    }
]);
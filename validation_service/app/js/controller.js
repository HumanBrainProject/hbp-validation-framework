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




testApp.controller('configviewCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest) {
        //$scope.species_list = 'species controller';
        //var species_list = 'var species';
        $scope.species_list ='Species';
        $scope.brain_region_list = 'Brain region controller';
        $scope.cell_type_list = 'Cell type controller';
        $scope.model_type_list = 'Model type controller';
    }
]);


/*
testApp.controller('configviewDetailCtrl', ['$scope', '$rootScope', '$http', '$location', 
//'$stateParams', 'configviewRest',
    function($scope, $rootScope, $http, $location, 
//    $stateParams, configviewRest
    ) {

    }
]);
*/



//Model catalog
var ModelCatalogApp = angular.module('ModelCatalogApp');

ModelCatalogApp.controller('ModelCatalogCtrl', ['$scope', '$rootScope', '$http', '$location', 'ScientificModelRest',
    function($scope, $rootScope, $http, $location, ScientificModelRest) {
         $scope.models = ScientificModelRest.get({}, function(data) {});

    }
]);

ModelCatalogApp.controller('ModelCatalogCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ScientificModelRest',
    function($scope, $rootScope, $http, $location, ScientificModelRest) { 
    // var markdown = require( "markdown" ).markdown;
    $("#ImagePopup").hide();
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
    $scope.model_image = [];
    $scope.displayAddImage = function() {
         $("#ImagePopup").show();
    };
    $scope.saveImage = function() {
        alert(JSON.stringify($scope.image));
         $scope.model_image.push($scope.image);
         $("#ImagePopup").hide();
          $scope.image = {};
    };
    $scope.closeImagePanel = function() {
        $scope.image = {};
         $("#ImagePopup").hide();
    };
    $scope.saveModel = function() {
        var parameters = JSON.stringify({model:$scope.model, model_instance:$scope.model_instance, model_image:$scope.model_image});
        ScientificModelRest.save(parameters, function(value) {});
    };
}  
]);

ModelCatalogApp.controller('ModelCatalogDetailCtrl', ['$scope', '$rootScope', '$http', '$location','$stateParams', 'ScientificModelRest',
    function($scope, $rootScope, $http, $location, $stateParams,  ScientificModelRest) { 
        $scope.model = ScientificModelRest.get({id : $stateParams.uuid});
    }
]);
ModelCatalogApp.controller('ModelCatalogVersionCtrl', ['$scope', '$rootScope', '$http', '$location','$stateParams', 'ScientificModelRest','ScientificModelInstanceRest',
    function($scope, $rootScope, $http, $location, $stateParams,  ScientificModelRest, ScientificModelInstanceRest) {
            $scope.model = ScientificModelRest.get({id : $stateParams.uuid}); //really needed??? just to put model name
        $scope.saveVersion = function() {
            alert(JSON.stringify($scope.model_instance));
            // $scope.model_instance.model_id = $stateParams.uuid;
            // alert(JSON.stringify($scope.model_instance));            
            var parameters = JSON.stringify({model_instance:$scope.model_instance});
            ScientificModelInstanceRest.save(parameters, function(value) {id : $stateParams.uuid});
        };


    }
     

]);


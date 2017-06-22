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

testApp.controller('ValTestDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest',
    function($scope, $rootScope, $http, $location, $stateParams, ValidationTestDefinitionRest, ValidationTestCodeRest) {
        $scope.detail_test = ValidationTestDefinitionRest.get({id : $stateParams.uuid});

        $scope.detail_version_test = ValidationTestCodeRest.get({test_definition_id : $stateParams.uuid});

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



testApp.controller('configviewCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest) {
        //$scope.species_list = 'species controller';
        //var species_list = 'var species';
        
        /*
        $scope.species_list = [
           {species_list: 'rat'},
            {species_list: 'human'},
        ];
        */

        

        //$scope.species_list ='rat';
        $scope.species_list ='Species';

/*
        $scope.species_list = [
           // "Species":[
          {
            "species": "rat",
            "id":1
          },
          {
            "species": "human",
            "id":2
          }
          ];
  */    



        
        
        //$scope.species_list = [
        //    {id:0,text:'rat',inUnit:true},
        //    {id:1,text:'human',inUnit:true},
        //    ];
        //];

        $scope.brain_region_list = 'Brain region controller';
        $scope.cell_type_list = 'Cell type controller';
        $scope.model_type_list = 'Model type controller';
    }
]);





// testApp.controller('configviewCtrl', ['$scope', '$rootScope', '$http', '$location',
//     function($scope, $rootScope, $http, $location) {
// //        $scope.configview =
// //        $scope.species_list =
//         $scope.species_list = 'fdrdfd';
//         var species_list = 'fdrdfd';
        
// //         [{species : 'rat'},
// //   //       {form.species},
// //   //       {form.brain_region},
// //   //       {form.cell_type},
// //     //     {form.model_type}];
// //         ];
//     }]);
 //   .filter('currencyFR', ['numberFilter', function(numberFilter){
 //       return function(input, symbol){
 //       };   
 //    }]);




/*
testApp.controller('configviewDetailCtrl', ['$scope', '$rootScope', '$http', '$location', 
//'$stateParams', 'configviewRest',
    function($scope, $rootScope, $http, $location, 
//    $stateParams, configviewRest
    ) {

    }
]);
*/

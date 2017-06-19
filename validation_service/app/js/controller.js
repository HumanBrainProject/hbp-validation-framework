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
        $scope.detail_test = ValidationTestDefinitionRest.get({id: $stateParams.uuid}, function(data){
            console.log(data);
        });

        $scope.selected_tab = "";

        $scope.toogleTabs = function(id_tab){
            $scope.selected_tab = id_tab;
            if(id_tab == "tab_description"){
                document.getElementById("tab_description").style.display="block";
                document.getElementById("tab_version").style.display="none";
                document.getElementById("tab_results").style.display="none";
                document.getElementById("tab_comments").style.display="none";
            }
            if(id_tab == "tab_version"){
                document.getElementById("tab_description").style.display="none";
                document.getElementById("tab_version").style.display="block";
                document.getElementById("tab_results").style.display="none";
                document.getElementById("tab_comments").style.display="none";
            }
            if(id_tab == "tab_results"){
                document.getElementById("tab_description").style.display="none";
                document.getElementById("tab_version").style.display="none";
                document.getElementById("tab_results").style.display="block";
                document.getElementById("tab_comments").style.display="none";
            }
            if(id_tab == "tab_comments"){
                document.getElementById("tab_description").style.display="none";
                document.getElementById("tab_version").style.display="none";
                document.getElementById("tab_results").style.display="none";
                document.getElementById("tab_comments").style.display="block";
            }
            var a = document.getElementById("li_tab_description");
            var b = document.getElementById("li_tab_version");
            var c = document.getElementById("li_tab_results");
            var d = document.getElementById("li_tab_comments");
            a.className = b.className = c.className = d.className = "nav-link";
            var e = document.getElementById("li_"+id_tab);
            e.className += " active";
        }
    }
]);

testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {}
]);

testApp.controller('ValTestCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest) {

        $scope.make_fake_post = function() {
            var json = {id:'a8628b93a351440c8d25b353b0c4dcer',
                    name:'my name',
                    species: 'rat',
                    brain_region: 'cerebellum',
                    cell_type: 'interneuron',
                    age:'123456',
                    data_location:'dtc',
                    data_type:'bad',
                    data_modality:'ephys',
                    test_type:'subcellular',
                    protocol:'nothing',
                    author: 'moi',
                    publication:'656565',
                    
                    };

            ValidationTestDefinitionRest.save( json, function(value){   });

            var json2 = {id: '40bef6fba96f4e7696896b9d58be9245', 
                            repository: 'fdfdfd', 
                            version: 'fdsdf', 
                            path: 'dsfdfd', 
                            timestamp:'2017-06-08 12:29:49.260120', 
                            test_definition_id: 'e3871a8e71d94172bc8f46d3789a634b',
                            };


            ValidationTestCodeRest.save(json2, function(value){   });
                
            
        };
    }
]);

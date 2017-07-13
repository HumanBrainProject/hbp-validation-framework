'use strict';

/* Controllers */
var testApp = angular.module('testApp');

testApp.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', "ScientificModelRest", "ValidationTestDefinitionRest", 'CollabParameters',
    function($scope, $rootScope, $http, $location, ScientificModelRest, ValidationTestDefinitionRest, CollabParameters) {

        CollabParameters.setService().$promise.then(function() {
            console.log(CollabParameters.getParameters("species"));


            $scope.models = ScientificModelRest.get({}, function(data) {});
            $scope.tests = ValidationTestDefinitionRest.get({}, function(data) {});

        });
    }
]);

testApp.controller('ValTestCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'CollabParameters',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, CollabParameters) {
        CollabParameters.setService();


        $scope.test_list = ValidationTestDefinitionRest.get({}, function(data) {});

    }
]);

testApp.controller('ValTestDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest', 'CollabParameters', 'TestCommentRest',
    function($scope, $rootScope, $http, $location, $stateParams, ValidationTestDefinitionRest, ValidationTestCodeRest, CollabParameters, TestCommentRest) {
        CollabParameters.setService();
        $scope.detail_test = ValidationTestDefinitionRest.get({ id: $stateParams.uuid });

        $scope.detail_version_test = ValidationTestCodeRest.get({ test_definition_id: $stateParams.uuid });

        $scope.test_comments = TestCommentRest.get({ test_id: $stateParams.uuid });

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
        };

        $scope.submit_comment = function() {
            var data_comment = JSON.stringify({ author: $stateParams.uuid, text: this.text, approved_comment: false, test_id: $stateParams.uuid });
            TestCommentRest.post(data_comment, function(value) {});
        }
    }
]);

testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location', 'CollabParameters',
    function($scope, $rootScope, $http, $location, CollabParameters) {
        CollabParameters.setService();
    }
]);


testApp.controller('ValTestCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest', 'CollabParameters',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest, CollabParameters) {
        CollabParameters.setService();
        $scope.species = CollabParameters.getParameters("species");


        $scope.make_post = function() {
            var data_to_send = JSON.stringify({ test_data: $scope.test, code_data: $scope.code });
            ValidationTestDefinitionRest.save(data_to_send, function(value) {});
        };
    }
]);




testApp.controller('ConfigCtrl', ['$scope', '$rootScope', '$http', '$location', 'CollabParameters', 'AuthaurizedCollabParameterRest',
    function($scope, $rootScope, $http, $location, CollabParameters, AuthaurizedCollabParameterRest) {

        CollabParameters.setService().$promise.then(function() {

            $scope.list_param = AuthaurizedCollabParameterRest.get({});
            // $scope.list_param = AuthaurizedCollabParameterRest.getSessions();
            // AuthaurizedCollabParameterRest.post();




            $scope.make_post = function() {
                $scope.selected_data_modalities.forEach(function(value, i) {
                    CollabParameters.addParameter("data_modalities", value.authorized_value);
                });

                $scope.selected_test_type.forEach(function(value, i) {
                    CollabParameters.addParameter("test_type", value.authorized_value);
                });

                $scope.selected_model_type.forEach(function(value, i) {
                    CollabParameters.addParameter("model_type", value.authorized_value);
                });

                $scope.selected_species.forEach(function(value, i) {
                    CollabParameters.addParameter("species", value.authorized_value);
                });

                $scope.selected_brain_region.forEach(function(value, i) {
                    CollabParameters.addParameter("brain_region", value.authorized_value);
                });

                $scope.selected_cell_type.forEach(function(value, i) {
                    CollabParameters.addParameter("cell_type", value.authorized_value);
                });


                CollabParameters.put_parameters();

                $location.path('/home');

            };


            //not working : might require to clean up the the selectors.
            $scope.reloadPage = function() {
                $location.path('/home/config');

            }; // { window.location.reload(); }
        });
    }
]);






testApp.controller('MyCtrl', ['$scope', function($scope) {
    $scope.test = "Yes";

    $scope.empList = [
        //Test table
        { "species": "Mouse (Mus musculus)", "brain_region": "Cerebellum", "cell_type": "Granule Cell", "model_type": "Single Cell" },
        { "species": "Mouse (Mus musculus)", "brain_region": "Cerebellum", "cell_type": "Pyramidal Cell", "model_type": "Network" },
        { "species": "Rat (Rattus rattus)", "brain_region": "Other", "cell_type": "Pyramidal Cell", "model_type": "Network" },
        { "species": "Marmoset (callithrix jacchus)", "brain_region": "Hippocampus", "cell_type": "Interneuron", "model_type": "Mean Field" },
        { "species": "Human (Homo sapiens)", "brain_region": "Cortex", "cell_type": "Pyramidal Cell", "model_type": "Mean Field" },
        { "species": "Human (Homo sapiens)", "brain_region": "Hippocampus", "cell_type": "Pyramidal Cell", "model_type": "Mean Field" },
        { "species": "Paxinos Rhesus Monkey (Macaca mulatta)", "brain_region": "Other", "cell_type": "Pyramidal Cell", "model_type": "Mean Field" },
        { "species": "Opossum (Monodelphis domestica)", "brain_region": "Other", "cell_type": "Pyramidal Cell", "model_type": "Mean Field" },
        { "species": "Mouse (Mus musculus)", "brain_region": "Basal Ganglia", "cell_type": "Granule Cell", "model_type": "Single Cell" },
        { "species": "Rat (Rattus rattus)", "brain_region": "Cerebellum", "cell_type": "Pyramidal Cell", "model_type": "Network" },
        { "species": "Marmoset (callithrix jacchus)", "brain_region": "Cortex", "cell_type": "Interneuron", "model_type": "Mean Field" },
        { "species": "Other", "brain_region": "Cortex", "cell_type": "Other", "model_type": "Mean Field" }

    ];

    $scope.reloadPage = function() { window.location.reload(); }

}]);


//Filter multiple
testApp.filter('filterMultiple', ['$filter', function($filter) {
    return function(items, keyObj) {
        var filterObj = {
            data: items,
            filteredData: [],
            applyFilter: function(obj, key) {
                var fData = [];
                if (this.filteredData.length == 0)
                    this.filteredData = this.data;
                if (obj) {
                    var fObj = {};
                    if (!angular.isArray(obj)) {
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData, fObj));
                    } else if (angular.isArray(obj)) {
                        if (obj.length > 0) {
                            for (var i = 0; i < obj.length; i++) {
                                if (angular.isDefined(obj[i])) {
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData, fObj));
                                }
                            }

                        }
                    }
                    if (fData.length > 0) {
                        this.filteredData = fData;
                    }
                }
            }
        };

        if (keyObj) {
            angular.forEach(keyObj, function(obj, key) {
                filterObj.applyFilter(obj, key);
            });
        }

        return filterObj.filteredData;
    }
}]);

testApp.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];

        for (var i = 0; i < input.length; i++) {
            if (typeof unique[input[i][key]] == "undefined") {
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});




//Model catalog
var ModelCatalogApp = angular.module('ModelCatalogApp');

ModelCatalogApp.directive('markdown', function() {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            function renderMarkdown() {
                var htmlText = converter.makeHtml(scope.$eval(attrs.markdown) || '');
                element.html(htmlText);
            }
            scope.$watch(attrs.markdown, renderMarkdown);
            renderMarkdown();
        }
    };
});

ModelCatalogApp.controller('ModelCatalogCtrl', ['$scope', '$rootScope', '$http', '$location', 'ScientificModelRest',
    function($scope, $rootScope, $http, $location, ScientificModelRest) {

        $scope.models = ScientificModelRest.get({}, function(data) {});


    }
]);

ModelCatalogApp.controller('ModelCatalogCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ScientificModelRest',

    function($scope, $rootScope, $http, $location, ScientificModelRest) {

        $("#ImagePopup").hide();
        $scope.species = [
            { id: 'mouse', name: 'Mouse (Mus musculus)' },
            { id: 'rat', name: 'Rat (Rattus rattus)' },
            { id: 'marmoset', name: 'Marmoset (callithrix jacchus)' },
            { id: 'human', name: 'Human (Homo sapiens)' },
            { id: 'rhesus_monkey', name: 'Paxinos Rhesus Monkey (Macaca mulatta)' },
            { id: 'opossum', name: 'Opossum (Monodelphis domestica)' },
            { id: 'other', name: 'Other' },
        ];

        $scope.brain_region = [
            { id: 'basal ganglia', name: 'Basal Ganglia' },
            { id: 'cerebellum', name: 'Cerebellum' },
            { id: 'cortex', name: 'Cortex' },
            { id: 'hippocampus', name: 'Hippocampus' },
            { id: 'other', name: 'Other' },
        ];

        $scope.cell_type = [
            { id: 'granule cell', name: 'Granule Cell' },
            { id: 'interneuron', name: 'Interneuron' },
            { id: 'pyramidal cell', name: 'Pyramidal Cell' },
            { id: 'other', name: 'Other' },
        ];

        $scope.model_type = [
            { id: 'single_cell', name: 'Single Cell' },
            { id: 'network', name: 'Network' },
            { id: 'mean_field', name: 'Mean Field' },
            { id: 'other', name: 'Other' },
        ];
        $scope.model_image = [];
        $scope.displayAddImage = function() {
            $("#ImagePopup").show();
        };
        $scope.saveImage = function() {
            if (JSON.stringify($scope.image) != undefined) {
                alert($scope.image)
                $scope.model_image.push($scope.image);
                $("#ImagePopup").hide();
                $scope.image = undefined;
            } else { alert("you need to add an url!") }
        };
        $scope.closeImagePanel = function() {
            $scope.image = {};
            $("#ImagePopup").hide();
        };
        $scope.saveModel = function() {
            var parameters = JSON.stringify({ model: $scope.model, model_instance: $scope.model_instance, model_image: $scope.model_image });
            var a = ScientificModelRest.save(parameters).$promise.then(function(data) {
                $location.path('/model-catalog/detail/' + data.uuid);
            });
        };

        $scope.deleteImage = function(index) {
            $scope.model_image.splice(index, 1);
        };
    }
]);

ModelCatalogApp.controller('ModelCatalogDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ScientificModelRest',
    function($scope, $rootScope, $http, $location, $stateParams, ScientificModelRest) {
        $("#ImagePopupDetail").hide();
        $scope.model = ScientificModelRest.get({ id: $stateParams.uuid });

        $scope.toggleSize = function(index, img) {
            alert('in it')
            $scope.bigImage = img;
            $("#ImagePopupDetail").show();
        }

        $scope.closeImagePanel = function() {
            $scope.image = {};
            $("#ImagePopupDetail").hide();
        };
    }
]);
ModelCatalogApp.controller('ModelCatalogVersionCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest',
    function($scope, $rootScope, $http, $location, $stateParams, ScientificModelRest, ScientificModelInstanceRest) {
        $scope.model = ScientificModelRest.get({ id: $stateParams.uuid }); //really needed??? just to put model name
        $scope.saveVersion = function() {
            $scope.model_instance.model_id = $stateParams.uuid
            var parameters = JSON.stringify($scope.model_instance);
            alert(parameters);
            ScientificModelInstanceRest.save(parameters, function(value) {});
        };


    }


]);
// Define the miniki application, currently doing nothing.
var app = angular.module('model_validation_api', ['ngResource', 'ui.bootstrap', 'hbpCommon', 'angularModalService']);
var images = [];
//controller for create View
app.controller('ScientificModelForm', function($scope, ModalService) {

    $("#Imagepopup").hide();


    $scope.displayAddImage = function() {
        $("#Imagepopup").show();
    };

    $scope.showPopup = function() {
        alert('ok ok ok');
        ModalService.showModal({
            templateUrl: "create/addImage",
            controller: "modalController",
        }).then(function(modal) {
            // modal.element.show();
            modal.element.modal();
            modal.close.then(function(result) {

            });

        });
    }
    $scope._delete = function() {
        alert('super ça marche trop top top cool!')
    };
});

app.controller('modalController', function($scope) {
    $scope._delete = function() {
        alert('super ça marche trop top top cool!')
    };
    $scope.saveModel = function() {
        var image = $('#Imagepopup').serializeArray();
        images.push(image);
        alert(JSON.stringify(image));
        $("#Imagepopup").hide();
        $("#images").html("").html(_addimagename(images));

        function _addimagename(objects) {
            index = 0;
            for (let name of objects) {
                index++;
                var btn = '</br><button type="button" class="glyphicon glyphicon-remove" ng-click="_delete()"></button>'
                $("#images").append(btn);
                var span = " <span id=span> url: " + JSON.stringify(Object.values(name)[0][1]); + "</span>";
                $("#images").append(span);
            }
        }
    };

    $scope.close = function() {
        $("#Imagepopup").hide();
    };
});


// Bootstrap function
angular.bootstrap().invoke(function($http, $log) {
    $http.get('/config.json').then(function(res) {
        window.bbpConfig = res.data;
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['model_validation_api']);
        });
    }, function() {
        $log.error('Cannot boot validation app application');
    });
});
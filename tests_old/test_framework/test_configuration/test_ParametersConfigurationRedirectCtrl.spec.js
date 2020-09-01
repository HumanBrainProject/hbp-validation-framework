describe('Testing controller: ParametersConfigurationRedirectCtrl', function() {
    'use strict';

    //create variables
    var controller;

    var DataHandler, Context, CollabParameters;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;

    //load modules
    beforeEach(angular.mock.module('ParametersConfigurationApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;


        controller = $controller('ParametersConfigurationRedirectCtrl', { $scope: $scope });

    })));

    it('should be defined', function() {
        expect(controller).toBeDefined();
    })

    it('should redirect to model catalog configuration ', function() {

        var app_element = '<div id=app value=model_catalog></div>'
        $('body').append(app_element);

        $scope.init();

        expect($location.path()).toEqual('/modelparametersconfiguration')

        document.getElementById('app').remove()
    })

    it('should redirect to validation app configuration ', function() {

        var app_element = '<div id=app value="validation_app"></div>'
        $('body').append(app_element);

        $scope.init();

        expect($location.path()).toEqual('/validationparametersconfiguration')

        document.getElementById('app').remove()
    })

});
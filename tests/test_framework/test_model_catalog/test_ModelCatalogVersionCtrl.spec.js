describe('Testing controller: ModelCatalogVersionCtrl', function() {
    'use strict';

    //create variables
    var controller;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller, $stateParams;

    var ScientificModelInstanceRest;

    //load modules
    beforeEach(angular.mock.module('ModelCatalogApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _$stateParams_, _ScientificModelInstanceRest_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $stateParams = _$stateParams_;
        ScientificModelInstanceRest = _ScientificModelInstanceRest_;

        controller = $controller('ModelCatalogVersionCtrl', { $scope: $scope });

    })));

    beforeEach(function() {

        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        $httpBackend.whenPOST("model-instances/").respond();

    })

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function() {
        $httpBackend.flush();
        expect(controller).toBeDefined();
    });

    it('should save version', function() {
        $scope.model_instance = { version: "1.1", parameters: "", source: "http://version1-1.com" }
        $stateParams.uuid = 1234;
        var spy_model_save = spyOn(ScientificModelInstanceRest, 'save').and.callThrough();
        var res_expected = JSON.stringify([{ version: "1.1", parameters: "", source: "http://version1-1.com", model_id: 1234 }]);

        $scope.saveVersion();
        $httpBackend.flush();

        expect(spy_model_save).toHaveBeenCalledWith({ app_id: undefined }, res_expected);
    });

});
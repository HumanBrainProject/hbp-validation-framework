describe('Testing ModelCatalogCtrl', function() {
    'use strict';

    //create variables
    var controller;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;

    //load modules
    beforeEach(angular.mock.module('ModelCatalogApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;


        controller = $controller('ModelCatalogCtrl', { $scope: $scope });
    })));

    beforeEach(function() {
        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
    })

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function() {
        $httpBackend.flush();
        expect(controller).toBeDefined();
    });


});
describe('Testing service: Graphic Services', function() {
    'use strict';

    //create variables
    var $location, $scope, $rootScope, $httpBackend;

    var ScientificModelRest, ValidationTestDefinitionRest;
    //load modules
    beforeEach(angular.mock.module('GraphicServices', 'ApiCommunicationServices'));

    // inject app elements into variables
    beforeEach(inject(function(_GraphicServices_, _$httpBackend_, _$rootScope_, _$location_, _ValidationTestDefinitionRest_, _ScientificModelRest_) {
        GraphicServices = _GraphicServices_;
        ScientificModelRest = _ScientificModelRest_;
        ValidationTestDefinitionRest = _ValidationTestDefinitionRest_;

        $rootScope = _$rootScope_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;

    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

});
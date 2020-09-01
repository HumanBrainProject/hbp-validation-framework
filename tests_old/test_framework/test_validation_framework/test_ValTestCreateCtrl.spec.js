describe('Testing controller: ValTestCreateCtrl', function() {
    'use strict';

    //create variables
    var controller;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;
    var ValidationTestAliasRest, ValidationTestDefinitionRest;

    //load modules
    beforeEach(angular.mock.module('testApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _ValidationTestAliasRest_, _ValidationTestDefinitionRest_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        ValidationTestAliasRest = _ValidationTestAliasRest_;
        ValidationTestDefinitionRest = _ValidationTestDefinitionRest_;
        controller = $controller('ValTestCreateCtrl', { $scope: $scope });
    })));

    beforeEach(function() {

        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        // $httpBackend.whenPOST("tests/").respond();

    })
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function() {
        $httpBackend.flush();
        expect(controller).toBeDefined();
    });

    it('should check alias validity', function() {
        $httpBackend.flush();

        $scope.test = { name: "test1", author: 'Neuroinformatic Team', alias: "T1" }
        spyOn(ValidationTestAliasRest, 'get').and.returnValue({ is_valid: true });

        $scope.checkAliasValidity();

        expect($scope.alias_is_valid).toEqual({ is_valid: true });
    });

    it('should save test if alias is undefined or empty', function() {


        $scope.test = { name: "test1", author: 'Neuroinformatic Team', alias: "" }
        $httpBackend.whenPOST('tests/').respond(200)
        var spy_test_save = spyOn(ValidationTestDefinitionRest, 'save').and.callThrough();

        $scope.saveTest();
        $httpBackend.flush();

        var params = JSON.stringify({ test_data: $scope.test });
        expect(spy_test_save).toHaveBeenCalledWith({ app_id: $scope.app_id }, params)

        $scope.test = { name: "test1", author: 'Neuroinformatic Team', alias: undefined }
        $scope.saveTest();
        $httpBackend.flush();
        var params = JSON.stringify({ test_data: $scope.test });
        expect(spy_test_save).toHaveBeenCalledWith({ app_id: $scope.app_id }, params)
    });

    it('should save test if alias is defined and not empty and alias is valid', function() {

        $scope.test = { name: "test1", author: 'Neuroinformatic Team', alias: "T1" }
        $httpBackend.whenPOST('tests/').respond(200)
        $httpBackend.whenGET('test-aliases/?alias=T1&format=json&web_app=True').respond({ is_valid: true });
        var spy_test_save = spyOn(ValidationTestDefinitionRest, 'save').and.callThrough();

        $scope.saveTest();
        $httpBackend.flush();

        expect($scope.alias_is_valid.is_valid).toEqual(true);

        var params = JSON.stringify({ test_data: $scope.test });
        expect(spy_test_save).toHaveBeenCalledWith({ app_id: $scope.app_id }, params)

    });

    it('should not save test if alias is defined and not empty but invalid', function() {
        $scope.test = { name: "test1", author: 'Neuroinformatic Team', alias: "T1" }
        $httpBackend.whenPOST('tests/').respond(200)
        $httpBackend.whenGET('test-aliases/?alias=T1&format=json&web_app=True').respond({ is_valid: false });
        var spy_test_save = spyOn(ValidationTestDefinitionRest, 'save').and.callThrough();
        var spy_alert = spyOn(window, 'alert');

        $scope.saveTest();
        $httpBackend.flush();

        expect($scope.alias_is_valid.is_valid).toEqual(false);
        expect(spy_test_save).not.toHaveBeenCalled();
        expect(spy_alert).toHaveBeenCalledWith('Cannot update the test. Please check the alias.')
    })
});
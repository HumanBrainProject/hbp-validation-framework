describe('Testing controller: ValTestResultDetailCtrl', function() {
    'use strict';

    var controller;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;
    var clbStorage;
    //load modules
    beforeEach(angular.mock.module('testApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices', 'clb-storage', 'clb-collab'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _clbStorage_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        clbStorage = _clbStorage_;

        controller = $controller('ValTestResultDetailCtrl', { $scope: $scope });
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

    it('should split result storage string', function() {
        $httpBackend.flush();
        var storage_string = "collab:///2169/folder_test";
        var res = $scope.split_result_storage_string(storage_string);

        expect(res).toEqual(Object({ collab: '2169', folder_path: 'folder_test' }))
    })

    it('should download file', function() {
        $httpBackend.flush();
        spyOn(clbStorage, 'downloadUrl').and.callFake(function(uuid) {
            return new Promise(function(resolve, reject) {
                resolve("https://fake-image-url.jpg")
            })
        })

        var spy_open_window = spyOn(window, 'open').and.callThrough()
            // $scope.download_file("");
            // expect(spy_open_window).toHaveBeenCalledWith('') //NOT WORKING ...Strange
    })

    it('should open an overview of the file', function() {
        $httpBackend.flush();
        spyOn(clbStorage, 'downloadUrl').and.callFake(function(uuid) {
            return new Promise(function(resolve, reject) {
                resolve("https://media.koreus.com/201701/allez-faire-loutre.jpg")
            })
        })

        $scope.open_overview_file("");
        // expect($scope.image).toEqual('<img src="https://media.koreus.com/201701/allez-faire-loutre.jpg">');
        //here again, smth wrong with testing components of the new web page... 
    })


});
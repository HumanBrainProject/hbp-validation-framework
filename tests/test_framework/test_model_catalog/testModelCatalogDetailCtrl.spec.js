describe('Testing controller: ModelCatalogDetailCtrl', function() {
    'use strict';

    //create variables
    var controller;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;
    var clbStorage;

    //load modules
    beforeEach(angular.mock.module('ModelCatalogApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices', 'clb-storage'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _clbStorage_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        clbStorage = _clbStorage_;
        controller = $controller('ModelCatalogDetailCtrl', { $scope: $scope });
    })));

    beforeEach(function() {

        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        $httpBackend.whenPOST("models/").respond();
        $httpBackend.whenGET('/static/templates/model_catalog/model-catalog.tpl.html').respond()

    })

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function() {
        $httpBackend.flush();
        expect(controller).toBeDefined();
    });

    it('should get url from collab_storage', function() {
        $httpBackend.flush();
        spyOn(clbStorage, "downloadUrl").and.callFake(function() {
            return new Promise(function(resolve, reject) {
                resolve('https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466')
            })
        });
        $scope.model = {
            models: [{
                images: [
                    { id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }
                ]
            }]
        }
        var url = 'collab:///2180/img.png';
        $scope.get_url_from_collab_storage(url, 1);
        var expected_res = { images: [{ id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }] };
        expect($scope.model.models[0]).toEqual(expected_res);
    })

    it('should change collab url to real url', function() {
        $httpBackend.flush();
        spyOn(clbStorage, "downloadUrl").and.callFake(function() {
            return new Promise(function(resolve, reject) {
                resolve('https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466')
            })
        });

        $scope.model = {
            models: [{
                images: [
                    { id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }
                ]
            }]
        }
        $scope.change_collab_url_to_real_url();
        var expected_res = { images: [{ id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d', src: 'collab:///2180/img.png' }, { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d', src: 'collab:///2180/img.png' }] };
        expect($scope.model.models[0]).toEqual(expected_res);
    })

    it('should toggle size', function() {
        $httpBackend.flush();
        var img = {};
        img.src = "https://fake-image-url.jpg"
        $scope.toggleSize(1, img);
        expect($scope.bigImage).toEqual({ 'src': 'https://fake-image-url.jpg' });
    })

    it('should close image panel', function() {
        $httpBackend.flush();
        $scope.image = 'totest';
        $scope.closeImagePanel();
        expect($scope.image).toEqual({});
    })
});
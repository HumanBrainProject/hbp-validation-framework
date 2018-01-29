describe('Testing controller: ModelCatalogCreateCtrl', function() {
    'use strict';

    //create variables
    var controller;

    var ScientificModelAliasRest, ScientificModelRest;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;

    //load modules
    beforeEach(angular.mock.module('ModelCatalogApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _ScientificModelAliasRest_, _ScientificModelRest_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        ScientificModelAliasRest = _ScientificModelAliasRest_;
        ScientificModelRest = _ScientificModelRest_;

        controller = $controller('ModelCatalogCreateCtrl', { $scope: $scope });
    })));

    beforeEach(function() {

        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        $httpBackend.whenPOST("models/").respond();

    })
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function() {
        $httpBackend.flush();
        expect(controller).toBeDefined();
    });

    it('should display add image', function() {
        $httpBackend.flush();
        expect($scope.addImage).toBeFalsy();
        $scope.displayAddImage();
        expect($scope.addImage).toBeTruthy();
    });

    it('should not save an image and give an error if the url is not given', function() {
        var len_model_image = $scope.model_image.length;

        expect($scope.image).toBeUndefined();

        var response = $scope.saveImage();
        $httpBackend.flush();
        expect(response).toEqual(Error('Please enter the image url you want to add.'));
        expect($scope.model_image.length).toEqual(len_model_image);

    });

    it('should save an image if the url is given', function() {
        $scope.image = { url: 'http://image.com', caption: 'a simple image with a fake url' }
        var len_model_image = $scope.model_image.length;

        expect($scope.image).toBeDefined();

        $scope.saveImage();
        $httpBackend.flush();
        expect($scope.model_image.length).toEqual(len_model_image + 1);
    });

    it('should close image panel', function() {
        $scope.image = { url: 'http://image.com', caption: 'a simple image with a fake url' }
        $scope.addImage = true;

        $scope.closeImagePanel();
        $httpBackend.flush();
        expect($scope.image).toEqual({});
        expect($scope.addImage).toBeFalsy();

    });

    it('shoul add access control to model', function() {
        $scope.model = { id: 1, name: 'model_1', description: "a model to test", species: '', brain_region: '', cell_type: '', model_type: '', author: 'me', alias: 'M1' }
        $scope.app_id = 8888;

        expect($scope.model.app_id).toBeUndefined();

        $scope._add_access_control();
        $httpBackend.flush();
        expect($scope.model.app_id).toEqual(8888);
    });

    it('should delete image with a given index', function() {
        $scope.model_image = [{ url: 'http://image1.com', caption: 'a simple first image with a fake url' }, { url: 'http://image2.com', caption: 'a simple second image with a fake url' }, { url: 'http://image3.com', caption: 'a simple third image with a fake url' }]
        var index = 1;
        $scope.model_image.splice(index, 1);
        $httpBackend.flush();
        expect($scope.model_image.length).toEqual(2) //TOFINISH
        expect($scope.model_image).toEqual([{ url: 'http://image1.com', caption: 'a simple first image with a fake url' }, { url: 'http://image3.com', caption: 'a simple third image with a fake url' }])
    })

    it('should check alias validity and respond true', function() {
        $scope.model = { id: 1, name: 'model_1', description: "a model to test", species: '', brain_region: '', cell_type: '', model_type: '', author: 'me', alias: 'M1' }
        $scope.app_id = 8888;
        spyOn(ScientificModelAliasRest, 'get').and.returnValue(true);

        $scope.checkAliasValidity();
        $httpBackend.flush();
        expect($scope.alias_is_valid).toBeTruthy();
    });

    it('should check on model instance and return true if correctly filled', function() {
        $scope.model_instance = { source: "http://thisIsTheSource.com", version: "1.1" };
        var res = $scope._saveModel_CheckOnModelInstance();
        $httpBackend.flush();
        expect(res).toBeTruthy();
    });

    it('should check on model instance and return false if model_instance is undefined', function() {
        $scope.model_instance = undefined;
        var res = $scope._saveModel_CheckOnModelInstance();
        $httpBackend.flush();
        expect(res).toBeFalsy();
    });

    it('should check on model instance and return false if model_instance version and source are undefined or empty', function() {
        $scope.model_instance = { source: undefined, version: undefined };
        var res = $scope._saveModel_CheckOnModelInstance();
        $httpBackend.flush();
        expect(res).toBeFalsy();
    });

    it('should check on model instance and return false if model_instance is defined but source is undefined or empty and version filled', function() {
        $scope.model_instance = { source: undefined, version: "1.1" };
        var res = $scope._saveModel_CheckOnModelInstance();
        $httpBackend.flush();
        expect(res).toBeFalsy();

        $scope.model_instance = { source: "", version: "1.1" };
        var res = $scope._saveModel_CheckOnModelInstance();
        expect(res).toBeFalsy();
    });

    it('should check on model instance and return false if model_instance is defined but version is undefined or empty and source filled', function() {
        $scope.model_instance = { source: "http://thisIsTheSource.com", version: undefined };
        var res = $scope._saveModel_CheckOnModelInstance();
        expect(res).toBeFalsy();
        $httpBackend.flush();

        $scope.model_instance = { source: "http://thisIsTheSource.com", version: "" };
        var res = $scope._saveModel_CheckOnModelInstance();
        expect(res).toBeFalsy();

    });

    it('should save model and instance after all checks if withInstance is true', function() {
        var spy_model_save = spyOn(ScientificModelRest, 'save').and.callThrough();
        $scope.model = { name: 'model_1', description: "a model to test", species: '', brain_region: '', cell_type: '', model_type: '', author: 'me', alias: 'M1' }
        $scope.model_instance = { source: "http://thisIsTheSource.com", version: "1.1" };
        $scope.model_image = [];
        $scope._saveModel_AfterAllChecks(true);
        $httpBackend.flush();
        var params = JSON.stringify({ model: $scope.model, model_instance: [$scope.model_instance], model_image: $scope.model_image })
        expect(spy_model_save).toHaveBeenCalledWith({ app_id: undefined }, params);
    })

    it('should save model only after all checks if withInstance is false', function() {
        var spy_model_save = spyOn(ScientificModelRest, 'save').and.callThrough();
        $scope.model = { name: 'model_1', description: "a model to test", species: '', brain_region: '', cell_type: '', model_type: '', author: 'me', alias: 'M1' }
        $scope.model_instance = { source: "http://thisIsTheSource.com", version: "" };
        $scope.model_image = [];
        $scope._saveModel_AfterAllChecks(false);
        $httpBackend.flush();
        var params = JSON.stringify({ model: $scope.model, model_instance: [], model_image: $scope.model_image })
        expect(spy_model_save).toHaveBeenCalledWith({ app_id: undefined }, params);
    })


    it('should save model and instance after all checks if withInstance is undefined', function() {
        var spy_model_save = spyOn(ScientificModelRest, 'save').and.callThrough();
        $scope.model = { name: 'model_1', description: "a model to test", species: '', brain_region: '', cell_type: '', model_type: '', author: 'me', alias: 'M1' }
        $scope.model_instance = undefined
        $scope.model_image = [];
        $scope._saveModel_AfterAllChecks(undefined);
        $httpBackend.flush();
        expect(spy_model_save).not.toHaveBeenCalled();
    })

    it('it should not save model and throw error if model is correctly filled but alias already exists', function() {

        $scope.model = { name: 'model_1', description: "a model to test", author: 'me', alias: 'M1' };
        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        $httpBackend.whenGET("model-aliases/?alias=M1&format=json&model=%7B%22name%22:%22model_1%22,%22description%22:%22a+model+to+test%22,%22author%22:%22me%22,%22alias%22:%22M1%22%7D&web_app=True").respond({ is_valid: false });
        var spy_ModelRestSave = spyOn(ScientificModelRest, 'save').and.callThrough();

        $scope.saveModel();
        $httpBackend.flush();

        expect(spy_ModelRestSave).not.toHaveBeenCalled();
    })

    it('it should save model if model is correctly filled with an alias', function() {

        $scope.model = { name: 'model_1', description: "a model to test", author: 'me', alias: 'M1' };
        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        $httpBackend.whenGET("model-aliases/?alias=M1&format=json&model=%7B%22name%22:%22model_1%22,%22description%22:%22a+model+to+test%22,%22author%22:%22me%22,%22alias%22:%22M1%22%7D&web_app=True").respond({ is_valid: true });
        $httpBackend.whenPOST("models/").respond();
        var spy_ModelRestSave = spyOn(ScientificModelRest, 'save').and.callThrough();

        $scope.saveModel();
        $httpBackend.flush();

        expect(spy_ModelRestSave).toHaveBeenCalled();
    })

    it('it should save model if model is correctly filled without alias', function() {

        $scope.model = { name: 'model_1', description: "a model to test", author: 'me', alias: '' };

        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        $httpBackend.whenPOST("models/").respond();

        var spy_ModelRestSave = spyOn(ScientificModelRest, 'save').and.callThrough();

        $scope.saveModel();
        $httpBackend.flush();

        expect($scope.model.alias).toEqual(null);
        expect(spy_ModelRestSave).toHaveBeenCalled();
    })

});
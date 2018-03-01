describe('Testing controller: ModelCatalogEditCtrl', function() {
    'use strict';

    //create variables
    var controller;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller, $state, $stateParams;
    var clbStorage, ScientificModelImageRest, ScientificModelRest, ScientificModelInstanceRest, ScientificModelAliasRest;

    //load modules
    beforeEach(angular.mock.module('ModelCatalogApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices', 'clb-storage'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _clbStorage_, _ScientificModelImageRest_, _ScientificModelRest_, _ScientificModelAliasRest_, _$state_, _$stateParams_, _ScientificModelInstanceRest_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $state = _$state_;
        $stateParams = _$stateParams_;
        clbStorage = _clbStorage_;
        ScientificModelImageRest = _ScientificModelImageRest_;
        ScientificModelRest = _ScientificModelRest_;
        ScientificModelAliasRest = _ScientificModelAliasRest_;
        ScientificModelInstanceRest = _ScientificModelInstanceRest_;
        controller = $controller('ModelCatalogEditCtrl', { $scope: $scope });
    })));

    beforeEach(function() {
        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        $httpBackend.whenPOST("models/").respond('');

    })

    it('should be defined', function() {
        // $httpBackend.flush();
        expect(controller).toBeDefined();
    });

    it('should change collab url to real url', function() {
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

    it('should get url from collab storage', function() {
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

    it('should delete image', function() {

        $httpBackend.expectDELETE('images/?format=json&id=19fe20fc-6d76-4920-8256-a44b84dcc953&web_app=True').respond()
        $httpBackend.expectGET('/static/templates/model_catalog/model-catalog.tpl.html').respond()
        var spy_reload = spyOn($scope, 'reloadState').and.callFake(function() {});

        // spyOn(ScientificModelImageRest, 'delete').and.callThrough();
        var spy_delete = spyOn(window, 'alert').and.callThrough();

        var img = { id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }
        $scope.deleteImage(img);
        $httpBackend.flush();

        expect(spy_delete).toHaveBeenCalledWith('Image 19fe20fc-6d76-4920-8256-a44b84dcc953 has been deleted !');
        expect(spy_reload).toHaveBeenCalled();
    });

    it('should display add Image', function() {
        $scope.addImage = false;
        $scope.displayAddImage();
        expect($scope.addImage).toBeTruthy();
    });

    it('should save image if defined', function() {
        $scope.image = { url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '' }
        $scope.app_id = 888;
        $stateParams.uuid = '69eda8ec-13c2-4610-b12d-82d429e1e92d';

        $httpBackend.expectPOST('images/?app_id=888&format=json&web_app=True').respond();
        $httpBackend.expectGET('/static/templates/model_catalog/model-catalog.tpl.html').respond()

        var spy_reload = spyOn($scope, 'reloadState').and.callFake(function() {});
        var spy_post = spyOn(ScientificModelImageRest, 'post').and.callThrough();
        var spy_alert = spyOn(window, 'alert').and.callThrough();
        $scope.saveImage();
        $httpBackend.flush();

        expect(spy_post).toHaveBeenCalledWith(Object({ app_id: 888 }), '[{"url":"https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466","caption":"","model_id":"69eda8ec-13c2-4610-b12d-82d429e1e92d"}]');
        expect(spy_reload).toHaveBeenCalled();
        expect(spy_alert).toHaveBeenCalledWith('Image has been saved !');
        expect($scope.addImage).toBeFalsy();
    });

    it('should not save image if undefined and raise error', function() {
        var spy_alert = spyOn(window, 'alert').and.callThrough();
        var spy_post = spyOn(ScientificModelImageRest, 'post').and.callThrough();
        $scope.saveImage();
        expect(spy_alert).toHaveBeenCalledWith('You need to add an url !');
        expect(spy_post).not.toHaveBeenCalled();
    });

    it('should close Image Panel', function() {
        $scope.addImage = true;
        $scope.image = { url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '' }

        $scope.closeImagePanel();

        expect($scope.image).toEqual({});
        expect($scope.addImage).toBeFalsy;
    });

    it('should edit images', function() {
        $httpBackend.expectPUT('images/?format=json&web_app=True').respond()
        $httpBackend.expectGET('/static/templates/model_catalog/model-catalog.tpl.html').respond();
        var spy_alert = spyOn(window, 'alert').and.callThrough();
        var spy_put = spyOn(ScientificModelImageRest, 'put').and.callThrough();
        $scope.model = {
            models: [{
                images: [
                    { id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }
                ]
            }]
        }

        $scope.editImages()
        $httpBackend.flush();
        expect(spy_alert).toHaveBeenCalledWith('Model images have been correctly edited')
        expect(spy_put).toHaveBeenCalledWith({ app_id: undefined }, [{ id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }])
    });

    it('should save model if alias is defined, not empty and valid', function() {
        $httpBackend.expectGET('model-aliases/?alias=aValidAlias&format=json&model_id=69eda8ec-13c2-4610-b12d-82d429e1e92d&web_app=True').respond({ 'is_valid': true })
        $httpBackend.expectGET('/static/templates/model_catalog/model-catalog.tpl.html').respond();
        $httpBackend.expectPUT('models/?format=json&web_app=True').respond()
        var spy_alert = spyOn(window, 'alert').and.callThrough();
        var spy_put = spyOn(ScientificModelRest, 'put').and.callThrough();
        var spy_get = spyOn(ScientificModelAliasRest, 'get').and.callThrough();
        $scope.model = {
            models: [{
                id: '69eda8ec-13c2-4610-b12d-82d429e1e92d',
                alias: 'aValidAlias',
                images: [
                    { id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }
                ]
            }]
        }

        $scope.saveModel();
        $httpBackend.flush();

        expect(spy_alert).toHaveBeenCalledWith('Model correctly edited');
        expect(spy_put).toHaveBeenCalledWith({ app_id: undefined }, { models: [{ id: '69eda8ec-13c2-4610-b12d-82d429e1e92d', alias: 'aValidAlias', images: [{ id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }] }] });
        expect(spy_get).toHaveBeenCalledWith({ app_id: undefined, model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d', alias: 'aValidAlias' });
    });

    it('should save model if alias is undefined', function() {

        $httpBackend.expectPUT('models/?format=json&web_app=True').respond()
        $httpBackend.expectGET('/static/templates/model_catalog/model-catalog.tpl.html').respond();
        var spy_alert = spyOn(window, 'alert').and.callThrough();
        var spy_put = spyOn(ScientificModelRest, 'put').and.callThrough();
        var spy_get = spyOn(ScientificModelAliasRest, 'get').and.callThrough();

        $scope.model = {
            models: [{
                id: '69eda8ec-13c2-4610-b12d-82d429e1e92d',
                alias: '',
                images: [
                    { id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }
                ]
            }]
        }

        $scope.saveModel();
        $httpBackend.flush();

        expect(spy_alert).toHaveBeenCalledWith('Model correctly edited');
        expect(spy_put).toHaveBeenCalledWith({ app_id: undefined }, { models: [{ id: '69eda8ec-13c2-4610-b12d-82d429e1e92d', alias: null, images: [{ id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }, { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }] }] });
    });

    it('should not save model and raise error if alias is not valid', function() {
        $httpBackend.expectGET('model-aliases/?alias=aNotValidAlias&format=json&model_id=69eda8ec-13c2-4610-b12d-82d429e1e92d&web_app=True').respond({ 'is_valid': false })
        $httpBackend.expectGET('/static/templates/model_catalog/model-catalog.tpl.html').respond();

        var spy_alert = spyOn(window, 'alert').and.callThrough();
        var spy_put = spyOn(ScientificModelRest, 'put').and.callThrough();
        var spy_get = spyOn(ScientificModelAliasRest, 'get').and.callThrough();
        $scope.model = {
            models: [{
                id: '69eda8ec-13c2-4610-b12d-82d429e1e92d',
                alias: 'aNotValidAlias',
                images: [
                    { id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }
                ]
            }]
        }

        $scope.saveModel();
        $httpBackend.flush();

        expect(spy_alert).toHaveBeenCalledWith('Cannot update the model. Please check the alias.');
        expect(spy_put).not.toHaveBeenCalled();
        expect(spy_get).toHaveBeenCalledWith({ app_id: undefined, model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d', alias: 'aNotValidAlias' });
    });

    it('should save model instance', function() {
        var model_instance = {};
        var spy_put = spyOn(ScientificModelInstanceRest, 'put').and.callThrough();
        $httpBackend.expectPUT('model-instances/?format=json&web_app=True').respond()
        $httpBackend.expectGET('/static/templates/model_catalog/model-catalog.tpl.html').respond();
        $scope.saveModelInstance(model_instance);
        $httpBackend.flush();
        expect(spy_put).toHaveBeenCalledWith({ app_id: undefined }, '[{}]');
    });

    it('should check alias validity', function() {
        $scope.model = {
            models: [{
                id: '69eda8ec-13c2-4610-b12d-82d429e1e92d',
                alias: 'aValidAlias',
                images: [
                    { id: '19fe20fc-6d76-4920-8256-a44b84dcc953', url: 'https://collab.humanbrainproject.eu/#/collab/2180/nav/18995?state=uuid%3Df850feba-f029-469c-8dcc-24e3a0b15466', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: 'f4d056af-318c-4c82-a92a-43abd78d4c73', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' },
                    { id: '2de17c22-aa5f-4e86-ba13-6086a83daae7', url: 'collab:///2180/img.png', caption: '', model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d' }
                ]
            }]
        }
        $httpBackend.expectGET('model-aliases/?alias=aValidAlias&format=json&model_id=69eda8ec-13c2-4610-b12d-82d429e1e92d&web_app=True').respond({ is_valid: true });
        $httpBackend.expectGET('/static/templates/model_catalog/model-catalog.tpl.html').respond();
        var spy_get = spyOn(ScientificModelAliasRest, 'get').and.callThrough();
        $scope.checkAliasValidity();
        $httpBackend.flush();

        expect(spy_get).toHaveBeenCalledWith({ app_id: undefined, model_id: '69eda8ec-13c2-4610-b12d-82d429e1e92d', alias: 'aValidAlias' });
    });

    it('should check if element is in array', function() {
        var array = [0, 1, 5, 6, 7, 8];
        expect($scope.isInArray(5, array)).toBeTruthy();
        expect($scope.isInArray(3, array)).toBeFalsy();
    })

});
describe('Testing controller: ParametersConfigurationCtrl', function() {
    'use strict';

    //create variables
    var controller;

    var DataHandler, Context, CollabParameters;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;

    //load modules
    beforeEach(angular.mock.module('ParametersConfigurationApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _CollabParameters_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        CollabParameters = _CollabParameters_;
        controller = $controller('ParametersConfigurationCtrl', { $scope: $scope });

    })));

    it('should be defined', function() {
        expect(controller).toBeDefined();
    })

    it('should make post', function() {
        $scope.selected_data = { selected_data_modalities: [{ id: 1, authorized_value: "electrophysiology" }, { id: 2, authorized_value: "fMRI" }], selected_test_type: [{ id: 1, authorized_value: "behaviour" }], selected_model_type: [{ id: 1, authorized_value: "single cell" }], selected_species: [{ id: 1, authorized_value: "mouse" }], selected_brain_region: [{ id: 1, authorized_value: "hipocampus" }], selected_cell_type: [{ id: 1, authorized_value: "pyramidal cell" }], selected_organization: [{ id: 1, authorized_value: "Neuroinformatic Team" }] }

        var app_element = '<div id=app value=model_catalog></div>'
        $('body').append(app_element);

        $scope.collab = { collab_id: 9999 };

        var spy_putParameters = spyOn(CollabParameters, 'put_parameters').and.callThrough();
        var spy_getRequestParameters = spyOn(CollabParameters, 'getRequestParameters').and.callThrough();
        var spy_addParameters = spyOn(CollabParameters, 'addParameter').and.callThrough();
        var spy_initConfiguration = spyOn(CollabParameters, 'initConfiguration').and.callThrough();

        $scope.make_post();

        expect(spy_putParameters).toHaveBeenCalledTimes(1);

        expect(spy_addParameters).toHaveBeenCalledWith('data_modalities', "electrophysiology");
        expect(spy_addParameters).toHaveBeenCalledWith('data_modalities', "fMRI");
        expect(spy_addParameters).not.toHaveBeenCalledWith('data_modalities', "fakeshouldnotwork");

        expect(spy_addParameters).toHaveBeenCalledWith('test_type', "behaviour");
        expect(spy_addParameters).toHaveBeenCalledWith('model_type', "single cell");
        expect(spy_addParameters).toHaveBeenCalledWith('species', "mouse");
        expect(spy_addParameters).toHaveBeenCalledWith('brain_region', "hipocampus");
        expect(spy_addParameters).toHaveBeenCalledWith('cell_type', "pyramidal cell");
        expect(spy_addParameters).toHaveBeenCalledWith('organization', "Neuroinformatic Team");

        expect(spy_addParameters).toHaveBeenCalledTimes(9);

        expect(spy_initConfiguration).toHaveBeenCalledTimes(1);

        document.getElementById('app').remove()
    })

});
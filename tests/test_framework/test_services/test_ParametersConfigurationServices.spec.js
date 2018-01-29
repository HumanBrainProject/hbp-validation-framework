describe('Testing service: Collab Parameters', function() {
    'use strict';

    var state = undefined;

    var CollabParameterRest, AuthorizedCollabParameterRest, Context;
    var CollabParameters;

    var $location, $rootScope, $httpBackend, $window;
    var originalTimeout;
    beforeEach(angular.mock.module('ContextServices', 'ApiCommunicationServices', 'ParametersConfigurationServices'));

    //variables to mock results
    var ctx = 'fd9cabd9-99c0-4b14-ae6f-fa47b213b594';
    var authorizedParametersGetAnswer = {
        "cell_type": [{
            "id": "664fe42e-7080-4bda-b8f2-a5c9db11e47a",
            "authorized_value": "Granule Cell"
        }],
        "brain_region": [{
            "id": "f6a73a0d-9ebc-4785-b124-aa37f625b7bd",
            "authorized_value": "Basal Ganglia"
        }],
        "model_type": [{
            "id": "d7c0bd4d-2b77-44ca-b190-1cbcc699e0a9",
            "authorized_value": "Single Cell"
        }],
        "organization": [{
            "id": "c6d1439f-29b8-4526-8449-c718c335058b",
            "authorized_value": "HBP-SP4"
        }],
        "test_type": [{
            "id": "e2707801-7acc-46e3-acd4-939180bbb926",
            "authorized_value": "single cell activity"
        }],
        "score_type": [{
            "id": "2d366c6d-47d8-41e5-b627-24c4e69e3d7e",
            "authorized_value": "p-value"
        }],
        "data_modalities": [{
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        }],
        "species": [{
            "id": "2f5583e1-b0a8-4e21-a6dd-1630a1054d3c",
            "authorized_value": "Mouse (Mus musculus)"
        }]
    }
    var authorizedParametersGetAnswer_end = Object({ brain_region: ['Basal Ganglia'], cell_type: ['Granule Cell'], data_modalities: ['electrophysiology'], model_type: ['Single Cell'], organization: ['HBP-SP4'], score_type: ['p-value'], species: ['Mouse (Mus musculus)'], test_type: ['single cell activity'] });
    var collabParametersGetAnswer = { "param": [{ "id": "37928", "data_modalities": "", "test_type": "", "species": "", "brain_region": "", "cell_type": "", "model_type": "", "organization": "", "app_type": "validation_app", "collab_id": 2180 }] }
    var collabParametersGetAnswer_end = Object({ "id": "37928", "data_modalities": [], "test_type": [], "species": [], "brain_region": [], "cell_type": [], "model_type": [], "organization": [], "app_type": "validation_app", "collab_id": 2180 });


    beforeEach(inject(function(_CollabParameters_, _$window_, _$httpBackend_, _$rootScope_, _$location_, _Context_, _AuthorizedCollabParameterRest_, _CollabParameterRest_) {
        CollabParameters = _CollabParameters_;

        Context = _Context_;
        CollabParameterRest = _CollabParameterRest_;
        AuthorizedCollabParameterRest = _AuthorizedCollabParameterRest_;

        $rootScope = _$rootScope_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        $window = _$window_;

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(function() {
        spyOn(Context, 'getAppID').and.returnValue(8888)
    })

    it('should set the default_parameters', function() {

        //prepare answer to requests
        $httpBackend.whenGET('authorizedcollabparameterrest?app_id=app_id&format=json').respond(authorizedParametersGetAnswer);


        var rs = CollabParameters.build_formated_default_parameters();
        $httpBackend.flush();

        rs.then(function() {
            expect(CollabParameters.getDefaultParameters()).toEqual(authorizedParametersGetAnswer_end);

        });
    });

    it('should set the service', function() {

        //prepare answer to requests
        $httpBackend.whenGET('authorizedcollabparameterrest?app_id=app_id&format=json').respond(authorizedParametersGetAnswer);
        $httpBackend.whenGET('parametersconfigurationrest?app_id=8888&format=json').respond(collabParametersGetAnswer);


        var rs = CollabParameters.build_formated_default_parameters();
        $httpBackend.flush();

        var rs1 = CollabParameters.setService();
        $httpBackend.flush();


        rs1.then(function() {
            expect(CollabParameters.getAllParameters()).toEqual(collabParametersGetAnswer_end);
        });

    })


    it('should set Collab Id', function() {
        //TODO
    });

    it('should add Parameter', function() {
        //TODO
    });

    it('should delete a parameter', function() {
        //TODO
    });

    it('should get the parameters', function() {
        //TODO
    });

    it('should get the parameters or the defaults parameters', function() {
        //TODO
    });

    it('should format the parameters data', function() {
        //TODO
    });

    it('should build the formated default parameters', function() {
        //TODO
    });

    it('should get the formated authorized value', function() {
        //TODO
    });

    it('should request the parameters', function() {
        //TODO
    });

    it('should get all the parameters', function() {
        //TODO
    });

    it('should change a string tab to an array', function() {
        //TODO
    });

});
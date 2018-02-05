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
    it("should init configuration", function() {
        expect(CollabParameters._get_parameters()).toBeUndefined();

        CollabParameters.initConfiguration()

        expect(CollabParameters._get_parameters()).toBeDefined();
    });

    it('should set Collab Id', function() {
        //pb on this function!! does not add the collab id. need tocheck if mistake have been done.
    });

    it('should add Parameter', function() {
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        })

        var expected_answer = Object({ param: [Object({ data_modalities: [Object({ id: '4631f734-1661-4e16-94f6-5aeeec8ce5c3', authorized_value: 'electrophysiology' })], test_type: [], species: [], brain_region: [], cell_type: [], model_type: [], organization: [], app_type: [], collab_id: 0 })], $promise: true })

        expect(CollabParameters._get_parameters()).toEqual(expected_answer);
    });

    it('should delete a parameter', function() {
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        })
        var expected_answer = Object({ param: [Object({ data_modalities: [Object({ id: '4631f734-1661-4e16-94f6-5aeeec8ce5c3', authorized_value: 'electrophysiology' })], test_type: [], species: [], brain_region: [], cell_type: [], model_type: [], organization: [], app_type: [], collab_id: 0 })], $promise: true })
        expect(CollabParameters._get_parameters()).toEqual(expected_answer);

        CollabParameters.supprParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        });
        var expected_answer = Object({ param: [Object({ data_modalities: [], test_type: [], species: [], brain_region: [], cell_type: [], model_type: [], organization: [], app_type: [], collab_id: 0 })], $promise: true })
        expect(CollabParameters._get_parameters()).toEqual(expected_answer);
    });

    it('should get the parameters by type', function() {
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        })
        var expected_answer = [Object({ id: '4631f734-1661-4e16-94f6-5aeeec8ce5c3', authorized_value: 'electrophysiology' })];
        expect(CollabParameters.getParametersByType('data_modalities')).toEqual(expected_answer);
        expect(CollabParameters.getParametersByType('model_type')).toEqual([]);
    });

    it('should get the parameters if they are set and not the defaults parameters', function() {
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        })
        var res = CollabParameters.getParametersOrDefaultByType('data_modalities');

        var expected_answer = [Object({ id: '4631f734-1661-4e16-94f6-5aeeec8ce5c3', authorized_value: 'electrophysiology' })];
        expect(res).toEqual(expected_answer)
    });

    it('should format the parameters data', function() {
        var res = CollabParameters.format_parameter_data(authorizedParametersGetAnswer['data_modalities'])
        expect(res).toEqual(['electrophysiology']);
    });

    it('should build the formated default parameters if does not exist yet', function() {
        $httpBackend.whenGET('authorizedcollabparameterrest?app_id=app_id&format=json').respond(authorizedParametersGetAnswer);
        CollabParameters.initConfiguration();

        var build_default_params = CollabParameters.build_formated_default_parameters()
        $httpBackend.flush();

        build_default_params.then(function() {
            var res = CollabParameters._get_default_parameters();
            var expected_answer = Object({ brain_region: ['Basal Ganglia'], cell_type: ['Granule Cell'], data_modalities: ['electrophysiology'], model_type: ['Single Cell'], organization: ['HBP-SP4'], score_type: ['p-value'], species: ['Mouse (Mus musculus)'], test_type: ['single cell activity'] });
            expect(res).toEqual(expected_answer);
        })
    });

    it('should get the defaults parameters if parameters are not set', function() {
        $httpBackend.whenGET('authorizedcollabparameterrest?app_id=app_id&format=json').respond(authorizedParametersGetAnswer);
        CollabParameters.initConfiguration();

        var build_default_params = CollabParameters.build_formated_default_parameters()
        $httpBackend.flush();

        build_default_params.then(function() {
            var res = CollabParameters.getParametersOrDefaultByType('data_modalities');

            var expected_answer = ['electrophysiology'];
            expect(res).toEqual(expected_answer);
        })
    });

    it('should get the formated authorized value', function() {
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        });
        var res = CollabParameters.getParameters_authorized_value_formated('data_modalities');
        expect(res).toEqual([Object({ authorized_value: Object({ id: '4631f734-1661-4e16-94f6-5aeeec8ce5c3', authorized_value: 'electrophysiology' }) })]);
    });

    it('should request parameters', function() {
        $httpBackend.whenGET('parametersconfigurationrest?app_id=8888&format=json').respond(collabParametersGetAnswer);
        CollabParameters.getRequestParameters();
        $httpBackend.flush();

        var res = CollabParameters._get_parameters();

        var expected_answer = [Object({ id: '37928', data_modalities: '', test_type: '', species: '', brain_region: '', cell_type: '', model_type: '', organization: '', app_type: 'validation_app', collab_id: 2180 })];
        expect(res.param).toEqual(expected_answer);
    });

    it('should get all the parameters', function() {
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        });
        var res = CollabParameters.getAllParameters();
        var expected_answer = Object({ data_modalities: [Object({ id: '4631f734-1661-4e16-94f6-5aeeec8ce5c3', authorized_value: 'electrophysiology' })], test_type: [], species: [], brain_region: [], cell_type: [], model_type: [], organization: [], app_type: [], collab_id: 0 });
        expect(res).toEqual(expected_answer);
    });

    it('should change a string tab to an array', function() {
        var string = ['mouse,rat,monkey,duck'];
        var res = CollabParameters._StringTabToArray(string);
        expect(res).toEqual([
            ['mouse', 'rat', 'monkey', 'duck']
        ]);
    });

    it('should put parameters', function() {
        var spy_put_params = spyOn(CollabParameterRest, 'put').and.returnValue(200)
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        })
        var res = CollabParameters.put_parameters();

        expect(spy_put_params).toHaveBeenCalled();
        expect(res).toEqual(200);
    });

    it('should post parameters', function() {
        var spy_post_params = spyOn(CollabParameterRest, 'save').and.returnValue(200)
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        })

        var res = CollabParameters.post_parameters();

        expect(spy_post_params).toHaveBeenCalled();
        expect(res).toEqual(200);
    });

    it('should post parameters for initialization (postInitCollab)', function() {
        var spy_post_params = spyOn(CollabParameterRest, 'save').and.returnValue(200)
        var res = CollabParameters._postInitCollab()
        expect(spy_post_params).toHaveBeenCalled();
        expect(res).toEqual(200);
    });
    it('should set_parameters if parameters are not defined and get with not empty fields', function() {
        $httpBackend.whenGET('parametersconfigurationrest?app_id=8888&format=json').respond(collabParametersGetAnswer);

        var res = CollabParameters.set_parameters();
        $httpBackend.flush();

        res.then(function(data) {
            var data_expected = [Object({ id: '37928', data_modalities: [], test_type: [], species: [], brain_region: [], cell_type: [], model_type: [], organization: [], app_type: 'validation_app', collab_id: 2180 })]
            expect(data.param).toEqual(data_expected);
        })
    });

    it('should not set_parameters if parameters are already defined', function() {
        CollabParameters.initConfiguration();
        CollabParameters.addParameter('data_modalities', {
            "id": "4631f734-1661-4e16-94f6-5aeeec8ce5c3",
            "authorized_value": "electrophysiology"
        });

        var res = CollabParameters.set_parameters();

        res.then(function(data) {
            var data_expected = Object({ param: [Object({ data_modalities: [Object({ id: '4631f734-1661-4e16-94f6-5aeeec8ce5c3', authorized_value: 'electrophysiology' })], test_type: [], species: [], brain_region: [], cell_type: [], model_type: [], organization: [], app_type: [], collab_id: 0 })], $promise: true })
            expect(data).toEqual(data_expected);
        })
    });

    it('should get paramTab values', function() {
        CollabParameters.initConfiguration();
        var res = CollabParameters._getParamTabValues();
        expect(res).toEqual([
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]);
    });

    it('should set parameters new values', function() {
        CollabParameters.initConfiguration();
        var tab_to_set = [
            [{ 1: 1 }],
            [{ 2: 2 }],
            [{ 3: 3 }],
            [{ 4: 4 }],
            [{ 5: 5 }],
            [{ 6: 6 }],
            [{ 7: 7 }],
        ]
        CollabParameters._setParametersNewValues(tab_to_set);
        var params_expected = Object({ param: [Object({ data_modalities: [Object({ 1: 1 })], test_type: [Object({ 6: 6 })], species: [Object({ 2: 2 })], brain_region: [Object({ 3: 3 })], cell_type: [Object({ 4: 4 })], model_type: [Object({ 5: 5 })], organization: [Object({ 7: 7 })], app_type: [], collab_id: 0 })], $promise: true });
        expect(CollabParameters._get_parameters()).toEqual(params_expected)
    })
});
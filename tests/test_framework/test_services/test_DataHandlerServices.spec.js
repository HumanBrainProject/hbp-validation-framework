describe('Testing service: DataHandlerServices', function() {
    'use strict';

    //create variables
    var ScientificModelRest, ValidationTestDefinitionRest, DataHandler;

    var $location, $scope, $rootScope, $httpBackend;

    //load modules
    beforeEach(angular.mock.module('DataHandlerServices', 'ApiCommunicationServices'));

    // inject app elements into variables
    beforeEach(inject(function(_DataHandler_, _$httpBackend_, _$rootScope_, _$location_, _ValidationTestDefinitionRest_, _ScientificModelRest_) {
        DataHandler = _DataHandler_;
        ScientificModelRest = _ScientificModelRest_;
        ValidationTestDefinitionRest = _ValidationTestDefinitionRest_;

        $rootScope = _$rootScope_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;

    }));

    //spy on methods called //seems it is not really needed here...
    // beforeEach(function() {
    //     spyOn(ScientificModelRest, 'get').and.callThrough();

    // })

    // test
    it('should load models if app_id is defined', function() {
        //create fake answer and wraped it (easier to compare objects after)
        var models_answered = { id: 1, name: 'vfz' };
        var models_answered_wrapped = { 'models': models_answered };

        //create params
        var dict_params = { app_id: 9999 };

        // mock backend request and give a fake answer
        $httpBackend.expectGET("models?app_id=9999&format=json&web_app=True").respond(201, models_answered_wrapped);

        //call function to test
        var rs1 = DataHandler.loadModels(dict_params)

        $httpBackend.flush(); //say httpbackend can answer now

        //check answer is the one expected
        rs1.then(function(res) {
            expect(res.models).toEqual(models_answered);
        });

        // console.log(rs1);
        // rs1.then(function(res) {
        //     console.log('res', res);
        //     expect(res).toEqual(models_answered);
        // });

        // var res = ScientificModelRest.get();
        // $httpBackend.flush();
        // console.log(res)
        // console.log(models_answered2)
        // expect(res.$promise.$$state.value.models).toEqual(models_answered);

    });

    it('should load tests if app_id is defined', function() {

        var tests_answered = { id: 1, name: 'vfz' };
        var tests_answered_wrapped = { 'tests': tests_answered };

        var dict_params = { app_id: 9999 };

        $httpBackend.expectGET("tests?app_id=9999&format=json&web_app=True").respond(201, tests_answered_wrapped);

        var rs1 = DataHandler.loadTests(dict_params)

        $httpBackend.flush();

        rs1.then(function(res) {
            expect(res.tests).toEqual(tests_answered);
        });
    });

});
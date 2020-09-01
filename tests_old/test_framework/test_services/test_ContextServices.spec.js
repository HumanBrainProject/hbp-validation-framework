describe('Testing service: ContextServices', function() {
    'use strict';

    var state = undefined;

    var collabIDRest = undefined;
    var AppIDRest = undefined;
    var collabAppID = undefined;
    var Context;
    var $q, $location, $scope, $rootScope, deferred, $httpBackend, $window;
    var originalTimeout;
    beforeEach(angular.mock.module('ContextServices', 'ApiCommunicationServices'));


    beforeEach(inject(function(_Context_, _$window_, _$httpBackend_, _$rootScope_, _$location_, _AppIDRest_, _CollabIDRest_, _collabAppID_) {
        Context = _Context_;
        collabIDRest = _CollabIDRest_;
        collabAppID = _collabAppID_;
        AppIDRest = _AppIDRest_;

        $rootScope = _$rootScope_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        $window = _$window_;

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('testing route functions', function() {

        it('should go to validation Help View', function() {
            expect(Context.validation_goToHelpView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.validation_goToHelpView();
            expect($location.path()).toEqual("/home/validation_test/help");
        })

        it('should go to model catalog Help View', function() {
            expect(Context.modelCatalog_goToHelpView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.modelCatalog_goToHelpView();
            expect($location.path()).toEqual("/model-catalog/help");
        })

        it('should go to model catalog Home View', function() {
            expect(Context.modelCatalog_goToHomeView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.modelCatalog_goToHomeView();
            expect($location.path()).toEqual("/");
        })

        it('should go to model catalog Model Detail View', function() {
            expect(Context.modelCatalog_goToModelDetailView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.modelCatalog_goToModelDetailView(1);
            expect($location.path()).toEqual("/model-catalog/detail/1");
        })

        it('should go to test catalog View', function() {
            expect(Context.validation_goToTestCatalogView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.validation_goToTestCatalogView();
            expect($location.path()).toEqual("/home/validation_test");
        })

        it('should go to validation framework Home View', function() {
            expect(Context.validation_goToHomeView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.validation_goToHomeView();
            expect($location.path()).toEqual("/");
        })
        it('should go to validation framework model detail View', function() {
            expect(Context.validation_goToModelDetailView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.validation_goToModelDetailView(1);
            expect($location.path()).toEqual("/home/validation_model_detail/1");
        })
        it('should go to validation framework test detail View', function() {
            expect(Context.validation_goToTestDetailView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.validation_goToTestDetailView(1);
            expect($location.path()).toEqual("/home/validation_test/1");
        })
        it('should go to validation framework result detail View', function() {
            expect(Context.validation_goToResultDetailView).toBeDefined();
            $location.path('');
            expect($location.path()).toEqual('/');
            Context.validation_goToResultDetailView(1);
            expect($location.path()).toEqual("/home/validation_test_result/1");
        })
    })

    describe('testing other functions ', function() {

        it('should set state', function() {
            expect(Context.getState()).toBeUndefined();
            Context.setState(1);
            expect(Context.getState()).toEqual(1);
        })

        it('should clear state', function() {
            Context.setState(1);
            expect(Context.getState()).toEqual(1);
            Context.clearState()
            expect(Context.getState()).toEqual('');
            expect(Context.getStateType()).toBeUndefined();
        })

        it('should clear external', function() {
            //TODO
        });

        it('should set context service', function() {

            var url = 'https://localhost:9876/?ctx=fd9cabd9-99c0-4b14-ae6f-fa47b213b594#/home';

            var fake_collab_id = { 'collab_id': 9999 };
            var fake_app_id = { 'app_id': 8888 };
            var ctx = "fd9cabd9-99c0-4b14-ae6f-fa47b213b594"

            Context.setCtx(ctx);

            //prepare answers to requests
            $httpBackend.when('GET', 'collabidrest?ctx=fd9cabd9-99c0-4b14-ae6f-fa47b213b594&format=json').respond(fake_collab_id);
            $httpBackend.when('GET', 'appidrest?ctx=fd9cabd9-99c0-4b14-ae6f-fa47b213b594&format=json').respond(fake_app_id);

            expect(Context.getServiceSet()).toBeFalsy();

            var urlspy = spyOn(Context, 'getCurrentLocationSearch').and.returnValue(url);
            var rs1 = Context.setService();

            $httpBackend.flush();

            rs1.then(function() {
                expect(Context.getServiceSet()).toBeTruthy();
            });


        });

    });
});
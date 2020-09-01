describe('Testing controller: ValTestDetailCtrl', function() {
    'use strict';

    //fake_results
    var test_versions = {
        "test_codes": [
            { "id": "6d59d750-bd7c-4715-9f9a-6439379169fd", "repository": "", "version": "1.1", "description": null, "path": "", "timestamp": "2017-10-03T12:18:04.728547Z", "test_definition_id": "cfdb6b8b-9017-4191-a904-1527c7140001" },
            { "id": "554e6463-cd1d-453d-95ae-475f74f6f928", "repository": "", "version": "2.1", "description": null, "path": "", "timestamp": "2017-10-05T12:18:04.953497Z", "test_definition_id": "cfdb6b8b-9017-4191-a904-1527c7140001" },
            { "id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8", "repository": "https://collab.humanbrainproject.eu", "version": "1.5nhf", "description": null, "path": "hhhfdsd", "timestamp": "2017-10-27T12:04:53.156645Z", "test_definition_id": "cfdb6b8b-9017-4191-a904-1527c7140001" },
            { "id": "3e2777f6-bdb6-4010-8590-933ecfc04755", "repository": "https://collab.humanbrainproject.eu", "version": "mii", "description": null, "path": "mo", "timestamp": "2017-12-13T09:46:57.813819Z", "test_definition_id": "cfdb6b8b-9017-4191-a904-1527c7140001" }
        ]
    }
    var results_given = {
            "model_instances": {
                "a091c6b0-9f86-4094-be62-4e42bdcebc7f": {
                    "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                    "timestamp": "2017-10-03 12:18:05.178009+00:00",
                    "model_alias": "Mm1",
                    "test_codes": {
                        "9d39eebd-3185-44d6-9cea-d0819abf8ba8": {
                            "timestamp": "2017-10-27 12:04:53.156645+00:00",
                            "test_id": "cfdb6b8b-9017-4191-a904-1527c7140001",
                            "version": "1.5nhf",
                            "results": {
                                "341865f0-c934-448c-902e-cc02ddec7fa1": { "id": "341865f0-c934-448c-902e-cc02ddec7fa1", "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f", "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8", "results_storage": "azerty", "score": 0.8, "passed": null, "timestamp": "2017-11-14T15:35:25.344722Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.8 },
                                "269e0db3-b587-46dd-a639-ee2383390580": { "id": "269e0db3-b587-46dd-a639-ee2383390580", "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f", "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8", "results_storage": "azerty", "score": 0.3, "passed": null, "timestamp": "2017-11-14T15:35:25.235718Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.3 }
                            },
                            "test_alias": "Tt22"
                        },
                    },
                    "version": "version 1",
                    "model_name": "model for result test"
                },
                "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283": {
                    "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                    "timestamp": "2017-10-03 12:18:05.244111+00:00",
                    "model_alias": "Mm1",
                    "test_codes": {
                        "9d39eebd-3185-44d6-9cea-d0819abf8ba8": {
                            "timestamp": "2017-10-27 12:04:53.156645+00:00",
                            "test_id": "cfdb6b8b-9017-4191-a904-1527c7140001",
                            "version": "1.5nhf",
                            "results": {
                                "f7ddb5b1-85cf-482c-b0fc-40749dbb985d": { "id": "f7ddb5b1-85cf-482c-b0fc-40749dbb985d", "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283", "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8", "results_storage": "collab:///2180/", "score": 0.8, "passed": null, "timestamp": "2017-11-14T15:35:25.536056Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.8 },
                                "0e06a80a-6d19-4e4b-9a35-f6cafdbc105c": { "id": "0e06a80a-6d19-4e4b-9a35-f6cafdbc105c", "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283", "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8", "results_storage": "azerty", "score": 0.3, "passed": null, "timestamp": "2017-11-14T15:35:25.444335Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.3 }
                            },
                            "test_alias": "Tt22"
                        },
                        "554e6463-cd1d-453d-95ae-475f74f6f928": {
                            "timestamp": "2017-10-05 12:18:04.953497+00:00",
                            "test_id": "cfdb6b8b-9017-4191-a904-1527c7140001",
                            "version": "2.1",
                            "results": {
                                "b2288403-d05f-4563-8f80-5837f1da9b07": { "id": "b2288403-d05f-4563-8f80-5837f1da9b07", "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283", "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928", "results_storage": "azerty", "score": 0.3, "passed": null, "timestamp": "2017-11-14T15:35:24.952689Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.3 },
                                "01bbe77d-66a1-44e4-8f25-b562e2f7436a": { "id": "01bbe77d-66a1-44e4-8f25-b562e2f7436a", "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283", "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928", "results_storage": "azerty", "score": 0.8, "passed": null, "timestamp": "2017-11-14T15:35:25.027650Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.8 },
                                "0fe8565b-b469-434f-934b-d57977bec04a": { "id": "0fe8565b-b469-434f-934b-d57977bec04a", "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283", "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928", "results_storage": "azerty", "score": 0.888, "passed": null, "timestamp": "2025-10-03T15:21:24Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.888 }
                            },
                            "test_alias": "Tt22"
                        }
                    },
                    "version": "version 2",
                    "model_name": "model for result test"
                }
            }
        }
        //create variables
    var controller;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;
    var Graphics, ValidationTestCodeRest, ValidationTestDefinitionRest, ValidationTestAliasRest, TestTicketRest, TestCommentRest;

    //load modules
    beforeEach(angular.mock.module('testApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices', 'GraphicsServices', 'HelpServices', 'clb-storage'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _Graphics_, _ValidationTestCodeRest_, _ValidationTestDefinitionRest_, _ValidationTestAliasRest_, _TestTicketRest_, _TestCommentRest_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        Graphics = _Graphics_;
        ValidationTestCodeRest = _ValidationTestCodeRest_;
        ValidationTestDefinitionRest = _ValidationTestDefinitionRest_;
        ValidationTestAliasRest = _ValidationTestAliasRest_;
        TestTicketRest = _TestTicketRest_;
        TestCommentRest = _TestCommentRest_;
        controller = $controller('ValTestDetailCtrl', { $scope: $scope });
    })));

    beforeEach(function() {

        $httpBackend.whenGET("collabidrest/?ctx=&format=json").respond(9999);
        $httpBackend.whenGET("appidrest/?ctx=&format=json").respond(8888);
        $httpBackend.whenGET("/static/templates/validation_framework/home_1.tpl.html").respond();
    })

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function() {
        $httpBackend.flush();
        expect(controller).toBeDefined();
    });

    it('should init the graph checkbox with the latests_versions', function() {
        $httpBackend.flush();
        $scope.raw_data = results_given;
        var init_graph = Graphics.TestGraph_initTestGraph(test_versions, results_given)
        init_graph.then(function(data_init_graph) {
            $scope.init_graph = data_init_graph;
            $scope.graphic_data = $scope.init_graph.values; //initialise graph before to updte with latest versions
            $scope.init_checkbox = data_init_graph.list_ids;

            var graphic_data_initialized = [Object({ values: [Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })], key: 'Mm1 ( version 1 )', id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', color: '#781c81', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.178009+00:00' }), Object({ values: [Object({ x: 1, y: 0.3, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: 'b2288403-d05f-4563-8f80-5837f1da9b07' }), Object({ x: 1, y: 0.8, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: '01bbe77d-66a1-44e4-8f25-b562e2f7436a' }), Object({ x: 1, y: 0.888, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: '0fe8565b-b469-434f-934b-d57977bec04a' }), Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 2 )', id_test_result: 'f7ddb5b1-85cf-482c-b0fc-40749dbb985d' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 2 )', id_test_result: '0e06a80a-6d19-4e4b-9a35-f6cafdbc105c' })], key: 'Mm1 ( version 2 )', id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', color: '#d92120', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.244111+00:00' })];
            expect($scope.graphic_data).toEqual(graphic_data_initialized);
            $scope.init_checkbox_latest_versions();
            var graphic_data_after_function = [Object({ values: [Object({ x: 1, y: 0.3, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: 'b2288403-d05f-4563-8f80-5837f1da9b07' }), Object({ x: 1, y: 0.8, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: '01bbe77d-66a1-44e4-8f25-b562e2f7436a' }), Object({ x: 1, y: 0.888, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: '0fe8565b-b469-434f-934b-d57977bec04a' }), Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 2 )', id_test_result: 'f7ddb5b1-85cf-482c-b0fc-40749dbb985d' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 2 )', id_test_result: '0e06a80a-6d19-4e4b-9a35-f6cafdbc105c' })], key: 'Mm1 ( version 2 )', id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', color: '#d92120', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.244111+00:00' })];
            expect($scope.graphic_data).toEqual(graphic_data_after_function);
        })
    })

    it('should check if graph is not empty and return true if not', function() {
        $httpBackend.flush();
        $scope.raw_data = results_given;
        var init_graph = Graphics.TestGraph_initTestGraph(test_versions, results_given)
        init_graph.then(function(data_init_graph) {
            $scope.graphic_data = data_init_graph.values; //initialise graph before to updte with latest versions

            var res = $scope.is_graph_not_empty($scope.graphic_data);
            expect(res).toEqual(true)
        })
    })
    it('should check if graph is not empty and return false if is', function() {
        $httpBackend.flush();
        var values = [{ values: [] }]
        var res = $scope.is_graph_not_empty(values);
        expect(res).toEqual(false)
    })


    it('should chek if element in checkbox is checked', function() {
        $httpBackend.flush();
        spyOn(document, "getElementById").and.callFake(function() {
            return {
                checked: true,
            }
        });

        $scope.raw_data = results_given;
        var init_graph = Graphics.TestGraph_initTestGraph(test_versions, results_given)
        init_graph.then(function(data_init_graph) {
            $scope.init_graph = data_init_graph;
            $scope.graphic_data = $scope.init_graph.values; //initialise graph before to updte with latest versions
            $scope.init_checkbox = data_init_graph.list_ids;

            var res = $scope._IsCheck();
            expect(res).toEqual(['Mm1 ( version 1 )', 'Mm1 ( version 2 )']);
        })
    })

    it('should update graph', function() {
        $httpBackend.flush();
        spyOn($scope, "_IsCheck").and.callFake(function() {
            return ['Mm1 ( version 1 )'];
        });
        $scope.raw_data = results_given;
        var init_graph = Graphics.TestGraph_initTestGraph(test_versions, results_given)
        init_graph.then(function(data_init_graph) {
            $scope.init_graph = data_init_graph;
            $scope.graphic_data = $scope.init_graph.values; //initialise graph before to updte with latest versions
            $scope.init_checkbox = data_init_graph.list_ids;

            var res_initialized = [Object({ values: [Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })], key: 'Mm1 ( version 1 )', id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', color: '#781c81', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.178009+00:00' }), Object({ values: [Object({ x: 1, y: 0.3, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: 'b2288403-d05f-4563-8f80-5837f1da9b07' }), Object({ x: 1, y: 0.8, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: '01bbe77d-66a1-44e4-8f25-b562e2f7436a' }), Object({ x: 1, y: 0.888, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: '0fe8565b-b469-434f-934b-d57977bec04a' }), Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 2 )', id_test_result: 'f7ddb5b1-85cf-482c-b0fc-40749dbb985d' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 2 )', id_test_result: '0e06a80a-6d19-4e4b-9a35-f6cafdbc105c' })], key: 'Mm1 ( version 2 )', id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', color: '#d92120', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.244111+00:00' })]
            expect($scope.graphic_data).toEqual(res_initialized)
            $scope.updateGraph();
            var res_expected = [Object({ values: [Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })], key: 'Mm1 ( version 1 )', id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', color: '#781c81', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.178009+00:00' })];
            expect($scope.graphic_data).toEqual(res_expected);
            expect($scope.result_focussed).toBeNull();
        })
    })


    it('should save version', function() {
        $httpBackend.flush();
        $scope.detail_test = { tests: [{ id: 'cfdb6b8b-9017-4191-a904-1527c7140001', name: "T1" }] };
        $scope.test_code = {};

        $httpBackend.expectPOST("test-instances/?test_definition_id=cfdb6b8b-9017-4191-a904-1527c7140001").respond(200)
        spyOn(document, "getElementById").and.callFake(function() {
            return { style: { display: 'none' } }
        });
        var spy_post = spyOn(ValidationTestCodeRest, 'save').and.callThrough();
        $scope.saveVersion();
        $httpBackend.flush();

        expect(spy_post).toHaveBeenCalledWith(Object({ app_id: undefined, test_definition_id: 'cfdb6b8b-9017-4191-a904-1527c7140001' }), '[{"test_definition_id":"cfdb6b8b-9017-4191-a904-1527c7140001"}]')
    })

    it('should edit test if alias is defined but empty or not null and valid', function() {
        $scope.detail_test = { tests: [{ alias: "anAliasNotTaken", id: "cfdb6b8b-9017-4191-a904-1527c7140001" }] }
        $httpBackend.flush();
        $httpBackend.expectGET('test-aliases/?alias=anAliasNotTaken&format=json&test_id=cfdb6b8b-9017-4191-a904-1527c7140001&web_app=True').respond({ is_valid: true })
        $httpBackend.expectPUT('tests/?format=json&id=cfdb6b8b-9017-4191-a904-1527c7140001&web_app=True').respond(200)
        var spy_put = spyOn(ValidationTestDefinitionRest, 'put').and.callThrough();
        spyOn(document, "getElementById").and.callFake(function() {
            return { style: { display: 'none' } }
        });

        $scope.editTest();
        $httpBackend.flush();

        expect(spy_put).toHaveBeenCalledWith(Object({ app_id: undefined, id: 'cfdb6b8b-9017-4191-a904-1527c7140001' }), '{"alias":"anAliasNotTaken","id":"cfdb6b8b-9017-4191-a904-1527c7140001"}');
    })

    it('should not edit test if alias is defined but not valid and raise an error', function() {
        $httpBackend.flush();

        $scope.detail_test = { tests: [{ alias: "anAliasNotTaken", id: "cfdb6b8b-9017-4191-a904-1527c7140001" }] }
        $httpBackend.expectGET('test-aliases/?alias=anAliasNotTaken&format=json&test_id=cfdb6b8b-9017-4191-a904-1527c7140001&web_app=True').respond({ is_valid: false })
        var spy_put = spyOn(ValidationTestDefinitionRest, 'put').and.callThrough();
        var spy_alert = spyOn(window, 'alert').and.callThrough();
        $scope.editTest();
        $httpBackend.flush();

        expect(spy_put).not.toHaveBeenCalled();
        expect(spy_alert).toHaveBeenCalledWith('Cannot update the test. Please check the alias.');
    })

    it('should edit test if alias is undefined', function() {
        $scope.detail_test = { tests: [{ alias: undefined, id: "cfdb6b8b-9017-4191-a904-1527c7140001" }] }
        $httpBackend.flush();
        $httpBackend.expectPUT('tests/?format=json&id=cfdb6b8b-9017-4191-a904-1527c7140001&web_app=True').respond(200)
        var spy_put = spyOn(ValidationTestDefinitionRest, 'put').and.callThrough();
        spyOn(document, "getElementById").and.callFake(function() {
            return { style: { display: 'none' } }
        });

        $scope.editTest();
        $httpBackend.flush();

        expect(spy_put).toHaveBeenCalledWith(Object({ app_id: undefined, id: 'cfdb6b8b-9017-4191-a904-1527c7140001' }), '{"alias":null,"id":"cfdb6b8b-9017-4191-a904-1527c7140001"}');
    })

    it('should display a version edition fields', function() {
        $httpBackend.flush();
        var element = { contenteditable: 'false', bgcolor: 'white', attr: function() { return true } };
        spyOn(angular, "element").and.returnValue(element);
        // spyOn(angular.element, "attr").and.returnValue(true);
        $scope.version_in_edition = [];
        expect($scope.version_in_edition).toEqual([]);
        $scope.editVersion(1);
        expect($scope.version_in_edition).toEqual([1]);
        $scope.editVersion(55);
        expect($scope.version_in_edition).toEqual([1, 55]);
    })

    it('should save the edited version', function() {
        $httpBackend.flush();
        var index = 1;
        $httpBackend.expectPUT('test-instances/?app_id=888&format=json&web_app=True').respond(200);
        var spy_put = spyOn(ValidationTestCodeRest, 'put').and.callThrough();
        $scope.app_id = 888;
        $scope.version_in_edition = [55, 1, 3, 4];
        $scope.save_edited_version(index);
        $httpBackend.flush();

        expect(spy_put).toHaveBeenCalledWith(Object({ app_id: 888 }), '[{"id":1,"repository":"","version":"","path":"","description":"","parameters":""}]')
        expect($scope.version_in_edition).toEqual([55, 3, 4])

        $httpBackend.expectPUT('test-instances/?app_id=888&format=json&web_app=True').respond(200);
        $scope.save_edited_version(55);
        $httpBackend.flush();
        expect($scope.version_in_edition).toEqual([3, 4])
    })

    it('should check alias validity', function() {
        $httpBackend.flush();
        $scope.detail_test = { tests: [{ alias: undefined, id: "cfdb6b8b-9017-4191-a904-1527c7140001" }] }
        $httpBackend.expectGET('test-aliases/?format=json&test_id=cfdb6b8b-9017-4191-a904-1527c7140001&web_app=True').respond({ is_valid: true })
        var spy_get = spyOn(ValidationTestAliasRest, 'get').and.callThrough();
        $scope.checkAliasValidity();
        $httpBackend.flush();
        expect(spy_get).toHaveBeenCalledWith(Object({ app_id: undefined, test_id: 'cfdb6b8b-9017-4191-a904-1527c7140001', alias: undefined }));
    })

    it('should save ticket ', function() {
        $httpBackend.flush();
        $scope.test_tickets = { 'tickets': [] };
        var res = {
            new_ticket: [{
                id: 'af18656a-1267-11e8-b642-0ed5f89f718b',
                author: 'me',
                title: 'Ticket1',
                text: 'Nothing to say, it is just for testing'
            }]
        };
        $httpBackend.expectPOST('testticket/?format=json&web_app=True').respond(res);
        var spy_post = spyOn(TestTicketRest, 'post').and.callThrough();
        spyOn(document, 'getElementById').and.returnValue({ reset: Function })
        $scope.ticket = { author: 'me', title: 'Ticket1', text: 'Nothing to say, it is just for testing' };
        $scope.saveTicket();
        $httpBackend.flush();
    })

    it('should save comment', function() {
        $httpBackend.flush();
        spyOn(document, 'getElementById').and.returnValue({ innerHTML: 'Hide', reset: Function });
        $httpBackend.expectPOST('testcomment/?format=json&web_app=True').respond({
            new_comment: [{
                id: 'fhr1656a-1267-11e8-b642-0ed5f8957frb',
                author: 'me',
                title: 'Ticket1',
                text: 'Nothing to say, it is just for testing',
                Ticket_id: 'af18656a-1267-11e8-b642-0ed5f89f718b'
            }]
        })
        var spy_post = spyOn(TestCommentRest, 'post').and.callThrough();
        $scope.test_tickets = { tickets: [{ id: 'gr18656a-1267-11e8-b642-0ed5f7569348b', title: 'T1', text: "nvjfoenz", author: 'me', comments: [] }, { id: 'af18656a-1267-11e8-b642-0ed5f89f718b', title: 'T2', text: "nvjfoenz", author: 'me', comments: [] }, { id: 'a456656a-1267-11e8-b642-0ed5f89f722b', title: "T3", text: "nvjfoenz", author: 'me', comments: [] }] }
        $scope.create_comment_to_show = ['gr18656a-1267-11e8-b642-0ed5f7569348b', 'af18656a-1267-11e8-b642-0ed5f89f718b', 'a456656a-1267-11e8-b642-0ed5f89f722b']
        var ticket_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';
        var ticket_index = 1;
        var comment_post = {
            author: 'me',
            title: 'Ticket1',
            text: 'Nothing to say, it is just for testing'
        }

        $scope.saveComment(ticket_id, comment_post, ticket_index)
        $httpBackend.flush();

        expect(spy_post).toHaveBeenCalled()
        expect($scope.test_tickets.tickets).toEqual([{ id: 'gr18656a-1267-11e8-b642-0ed5f7569348b', title: 'T1', text: 'nvjfoenz', author: 'me', comments: [] }, { id: 'af18656a-1267-11e8-b642-0ed5f89f718b', title: 'T2', text: 'nvjfoenz', author: 'me', comments: [{ id: 'fhr1656a-1267-11e8-b642-0ed5f8957frb', author: 'me', title: 'Ticket1', text: 'Nothing to say, it is just for testing', Ticket_id: 'af18656a-1267-11e8-b642-0ed5f89f718b' }] }, { id: 'a456656a-1267-11e8-b642-0ed5f89f722b', title: 'T3', text: 'nvjfoenz', author: 'me', comments: [] }])
        expect($scope.create_comment_to_show).toEqual(['gr18656a-1267-11e8-b642-0ed5f7569348b', 'a456656a-1267-11e8-b642-0ed5f89f722b']);
    })

    it('should unshow comments of a specific ticket', function() {
        $httpBackend.flush();
        spyOn(document, 'getElementById').and.returnValue({ className: "glyphicon glyphicon-plus button-click" });
        var ticket_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';

        $scope.showComments(ticket_id);

        expect($scope.comments_to_show).toEqual(['af18656a-1267-11e8-b642-0ed5f89f718b'])
    })

    it('should show comments of a specific ticket', function() {
        $httpBackend.flush();
        spyOn(document, 'getElementById').and.returnValue({ className: "glyphicon glyphicon-minus button-click" });
        var ticket_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';
        $scope.comments_to_show = ['gr12568a-1267-11e8-b642-0ed5f89f789h', 'af18656a-1267-11e8-b642-0ed5f89f718b', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5']

        $scope.showComments(ticket_id);

        expect($scope.comments_to_show).toEqual(['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5'])
    })

    it('should show the panel to create comment', function() {
        $httpBackend.flush();
        $scope.create_comment_to_show = ['gr12568a-1267-11e8-b642-0ed5f89f789h', 'af18656a-1267-11e8-b642-0ed5f89f718b', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5']
        var ticket_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';
        spyOn(document, 'getElementById').and.returnValue({ innerHTML: 'Hide', reset: Function });

        $scope.showCreateComment(ticket_id);

        expect($scope.create_comment_to_show).toEqual(['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5'])
    })

    it('should unshow the panel to create comment', function() {
        $httpBackend.flush();
        $scope.create_comment_to_show = ['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5']
        var ticket_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';
        spyOn(document, 'getElementById').and.returnValue({ innerHTML: 'Reply', reset: Function });

        $scope.showCreateComment(ticket_id);

        expect($scope.create_comment_to_show).toEqual(['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5', 'af18656a-1267-11e8-b642-0ed5f89f718b'])
    })


    it('should edit ticket ', function() {
        $httpBackend.flush();
        var element = { contenteditable: 'false', bgcolor: 'white', attr: function() { return true } };
        spyOn(angular, "element").and.returnValue(element);
        var ticket_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';
        $scope.button_save_ticket = ['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5']

        $scope.editTicket(ticket_id);

        expect($scope.button_save_ticket).toEqual(['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5', 'af18656a-1267-11e8-b642-0ed5f89f718b'])
    })

    it('should save edited ticket', function() {
        $httpBackend.flush();
        $httpBackend.expectPUT('testticket/?format=json&web_app=True').respond();
        var element = { contenteditable: 'false', bgcolor: 'white', attr: function() { return true } };
        spyOn(angular, "element").and.returnValue(element);
        var ticket_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';
        $scope.button_save_ticket = ['gr12568a-1267-11e8-b642-0ed5f89f789h', 'af18656a-1267-11e8-b642-0ed5f89f718b', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5']

        $scope.saveEditedTicket(ticket_id);
        $httpBackend.flush();
        expect($scope.button_save_ticket).toEqual(['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5'])
    })

    it('should edit comment', function() {
        $httpBackend.flush();
        var element = { contenteditable: 'false', bgcolor: 'white', attr: function() { return true } };
        spyOn(angular, "element").and.returnValue(element);
        var com_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';
        $scope.button_save_comment = ['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5']

        $scope.editComment(com_id);

        expect($scope.button_save_comment).toEqual(['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5', 'af18656a-1267-11e8-b642-0ed5f89f718b'])
    })

    it('should save edited comment', function() {
        $httpBackend.flush();
        $httpBackend.expectPUT('testcomment/?format=json&web_app=True').respond();
        var element = { contenteditable: 'false', bgcolor: 'white', attr: function() { return true } };
        spyOn(angular, "element").and.returnValue(element);
        var com_id = 'af18656a-1267-11e8-b642-0ed5f89f718b';
        $scope.button_save_comment = ['gr12568a-1267-11e8-b642-0ed5f89f789h', 'af18656a-1267-11e8-b642-0ed5f89f718b', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5']

        $scope.saveEditedComment(com_id);
        $httpBackend.flush()
        expect($scope.button_save_comment).toEqual(['gr12568a-1267-11e8-b642-0ed5f89f789h', 'jd8er56a-1267-11e8-b642-0ed5f89f7ff5'])

    })

    it('should check if element is in array', function() {
        $httpBackend.flush();
        var array = [1, 2, 6, 5, 3];
        expect($scope.isInArray(4, array)).toBeFalsy();
        expect($scope.isInArray(3, array)).toBeTruthy();
    })
});
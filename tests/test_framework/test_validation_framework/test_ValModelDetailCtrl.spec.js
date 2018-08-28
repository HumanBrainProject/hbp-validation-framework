describe('Testing controller: ValModelDetailCtrl', function() {
    'use strict';

    //create variables
    var results_given_for_models = {
        "score_type": {
            "Rsquare": {
                "test_codes": {
                    "9d39eebd-3185-44d6-9cea-d0819abf8ba8": {
                        "timestamp": "2017-10-27 12:04:53.156645+00:00",
                        "test_alias": "Tt22",
                        "model_instances": {
                            "a091c6b0-9f86-4094-be62-4e42bdcebc7f": {
                                "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                                "version": "version 1",
                                "results": {
                                    "341865f0-c934-448c-902e-cc02ddec7fa1": { "id": "341865f0-c934-448c-902e-cc02ddec7fa1", "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f", "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8", "results_storage": "azerty", "score": 0.8, "passed": null, "timestamp": "2017-11-14T15:35:25.344722Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.8 },
                                    "269e0db3-b587-46dd-a639-ee2383390580": { "id": "269e0db3-b587-46dd-a639-ee2383390580", "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f", "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8", "results_storage": "azerty", "score": 0.3, "passed": null, "timestamp": "2017-11-14T15:35:25.235718Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.3 }
                                },
                                "model_alias": "Mm1",
                                "timestamp": "2017-10-03 12:18:05.178009+00:00"
                            }
                        },
                        "version": "1.5nhf",
                        "test_name": "name 2",
                        "test_id": "cfdb6b8b-9017-4191-a904-1527c7140001"
                    }
                }
            },
            "p-value": {
                "test_codes": {
                    "35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a": {
                        "timestamp": "2017-10-03 12:18:04.653952+00:00",
                        "test_alias": "None",
                        "model_instances": {
                            "a091c6b0-9f86-4094-be62-4e42bdcebc7f": {
                                "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                                "version": "version 1",
                                "results": {
                                    "ed079410-b059-4c65-8546-8b59ee883b4f": { "id": "ed079410-b059-4c65-8546-8b59ee883b4f", "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f", "test_code_id": "35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a", "results_storage": "azerty", "score": 0.25, "passed": true, "timestamp": "2017-10-03T12:18:04Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.25 }
                                },
                                "model_alias": "Mm1",
                                "timestamp": "2017-10-03 12:18:05.178009+00:00"
                            },
                            "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283": { "model_id": "61df5b12-c885-4cb7-a511-e5315101b420", "version": "version 2", "results": { "64220ecf-b641-43ac-b1f0-3d55dcc71332": { "id": "64220ecf-b641-43ac-b1f0-3d55dcc71332", "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283", "test_code_id": "35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a", "results_storage": "azerty", "score": 0.4, "passed": null, "timestamp": "2025-10-03T15:21:24Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.8 } }, "model_alias": "Mm1", "timestamp": "2017-10-03 12:18:05.244111+00:00" }
                        },
                        "version": "1.1",
                        "test_name": "name 1",
                        "test_id": "53a7a2db-b18f-49ef-b1de-88bd48960c81"
                    },
                    "f9e9d549-738e-4600-91ae-bff5eaec2991": {
                        "timestamp": "2017-10-03 12:18:04.870213+00:00",
                        "test_alias": "None",
                        "model_instances": {
                            "a091c6b0-9f86-4094-be62-4e42bdcebc7f": {
                                "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                                "version": "version 1",
                                "results": {
                                    "ab490a1f-029a-4614-a6e5-311c7f65966d": { "id": "ab490a1f-029a-4614-a6e5-311c7f65966d", "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f", "test_code_id": "f9e9d549-738e-4600-91ae-bff5eaec2991", "results_storage": "azerty", "score": 0.25, "passed": true, "timestamp": "2017-10-03T12:18:04Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.25 }
                                },
                                "model_alias": "Mm1",
                                "timestamp": "2017-10-03 12:18:05.178009+00:00"
                            },
                            "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283": { "model_id": "61df5b12-c885-4cb7-a511-e5315101b420", "version": "version 2", "results": { "bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b": { "id": "bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b", "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283", "test_code_id": "f9e9d549-738e-4600-91ae-bff5eaec2991", "results_storage": "azerty", "score": 0.5, "passed": null, "timestamp": "2025-10-03T15:21:24Z", "platform": "azerty", "project": "azerty", "normalized_score": 0.8 } }, "model_alias": "Mm1", "timestamp": "2017-10-03 12:18:05.244111+00:00" }
                        },
                        "version": "2.1",
                        "test_name": "name 1",
                        "test_id": "53a7a2db-b18f-49ef-b1de-88bd48960c81"
                    }
                }
            }
        }
    }
    var model_instances = {
        "instances": [
            { "id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f", "version": "version 1", "description": null, "parameters": "param", "code_format": null, "source": "http://dd.com", "model_id": "61df5b12-c885-4cb7-a511-e5315101b420" },
            { "id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283", "version": "version 2", "description": null, "parameters": "param", "code_format": null, "source": "http://dd.com", "model_id": "61df5b12-c885-4cb7-a511-e5315101b420" },
            { "id": "69f3495a-dd92-4165-aa91-2d3811d0ba0b", "version": "version 3", "description": null, "parameters": "param", "code_format": null, "source": "http://dd.com", "model_id": "61df5b12-c885-4cb7-a511-e5315101b420" },
            { "id": "eebce4df-e83a-4537-85b3-c5488848cc4b", "version": ",jkuy", "description": null, "parameters": "g,jg", "code_format": null, "source": "https://collab.humanbrainproject.eu", "model_id": "61df5b12-c885-4cb7-a511-e5315101b420" }
        ]
    }

    var controller;

    var $location, $scope, $rootScope, $httpBackend, $http, $controller;
    var Graphics;
    //load modules
    beforeEach(angular.mock.module('testApp', 'DataHandlerServices', 'ApiCommunicationServices', 'ParametersConfigurationServices', 'GraphicsServices', 'clb-storage'));

    // inject app elements into variables
    beforeEach(inject(angular.mock.inject(function(_$rootScope_, _$location_, _$controller_, _$httpBackend_, _Graphics_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        Graphics = _Graphics_;
        controller = $controller('ValModelDetailCtrl', { $scope: $scope });
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

    it('should check if graph is not empty and return true if not', function() {
        $httpBackend.flush();
        var graphic_data = {
            score_type: 'p-value',
            values: {
                values: [{ values: [{ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }, { x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' }], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' }, { values: [{ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'ab490a1f-029a-4614-a6e5-311c7f65966d' }, { x: 1, y: 0.5, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b' }], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', color: '#d92120', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.870213+00:00' }],
                results: [
                    [{ id: 'ed079410-b059-4c65-8546-8b59ee883b4f', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a', results_storage: 'azerty', score: 0.25, passed: true, timestamp: '2017-10-03T12:18:04Z', platform: 'azerty', project: 'azerty', normalized_score: 0.25 }, { id: '64220ecf-b641-43ac-b1f0-3d55dcc71332', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a', results_storage: 'azerty', score: 0.4, passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }],
                    [{ id: 'ab490a1f-029a-4614-a6e5-311c7f65966d', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: 'f9e9d549-738e-4600-91ae-bff5eaec2991', results_storage: 'azerty', score: 0.25, passed: true, timestamp: '2017-10-03T12:18:04Z', platform: 'azerty', project: 'azerty', normalized_score: 0.25 }, { id: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: 'f9e9d549-738e-4600-91ae-bff5eaec2991', results_storage: 'azerty', score: 0.5, passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }]
                ],
                list_ids: ['53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )'],
                abs_info: { 'version 1': 0, 'version 2': 1, 'version 3': 2, ',jkuy': 3 },
                latest_test_versions_line_id: [{ latest_line_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', latest_timestamp: '2017-10-03 12:18:04.653952+00:00' }]
            }
        }

        var res = $scope.is_graph_not_empty(graphic_data);
        expect(res).toEqual(true)
    })

    it('should check if graph is not empty and return false if is', function() {
        $httpBackend.flush();
        var values = { values: { results: [] } }
        var res = $scope.is_graph_not_empty(values);
        expect(res).toEqual(false)
    })

    it('should init checkbox and graphs with latest versions', function() {
        $httpBackend.flush();
        spyOn(document, "getElementById").and.callFake(function() {
            return { checked: false }
        });
        $scope.raw_data = results_given_for_models;
        var init_graph = Graphics.ModelGraph_init_Graphs(model_instances, results_given_for_models);

        init_graph.then(function(data_init_graph) {

            $scope.init_graph = data_init_graph;
            $scope.init_graph_all = [];
            $scope.line_result_focussed = []
            for (var score_type in $scope.init_graph.single_graphs_data) {
                $scope.init_graph_all.push($scope.init_graph.single_graphs_data[score_type]);
            }

            var graphic_data_initialized = [Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' }), Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'ab490a1f-029a-4614-a6e5-311c7f65966d' }), Object({ x: 1, y: 0.5, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', color: '#d92120', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.870213+00:00' })];

            expect($scope.init_graph_all[1].values.values).toEqual(graphic_data_initialized);

            $scope.init_checkbox_latest_versions();

            var graphic_data_after_function = [Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' })];
            expect($scope.init_graph_all[1].values.values).toEqual(graphic_data_after_function);
        })
    })

    it('should update graph', function() {
        $httpBackend.flush();
        var list_ids = ["Mm1 ( 1.1 )"]
        spyOn($scope, '_IsCheck').and.callFake(function(key) {
            return list_ids
        })
        $scope.raw_data = results_given_for_models;
        var init_graph = Graphics.ModelGraph_init_Graphs(model_instances, results_given_for_models);

        init_graph.then(function(data_init_graph) {

            $scope.init_graph = data_init_graph;
            $scope.init_graph_all = [];
            $scope.line_result_focussed = []
            for (var score_type in $scope.init_graph.single_graphs_data) {
                $scope.init_graph_all.push($scope.init_graph.single_graphs_data[score_type]);
            }

            var expected_value = [Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' }), Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'ab490a1f-029a-4614-a6e5-311c7f65966d' }), Object({ x: 1, y: 0.5, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', color: '#d92120', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.870213+00:00' })];
            expect($scope.init_graph_all[1].values.values).toEqual(expected_value);
            $scope.updateGraph(1);

            expect($scope.init_graph_all[1].values.values).toEqual([]);
        })
    })

    it('should verify if line is checked', function() {
        $httpBackend.flush();
        $scope.raw_data = results_given_for_models;
        spyOn(document, "getElementById").and.callFake(function() {
            return { checked: true }
        });
        var init_graph = Graphics.ModelGraph_init_Graphs(model_instances, results_given_for_models);

        init_graph.then(function(data_init_graph) {

            $scope.init_graph = data_init_graph;
            $scope.init_graph_all = [];
            $scope.line_result_focussed = []
            for (var score_type in $scope.init_graph.single_graphs_data) {
                $scope.init_graph_all.push($scope.init_graph.single_graphs_data[score_type]);
            }

            var res = $scope._IsCheck(1);

            expect(res).toEqual(['53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )'])
        })


    })
})
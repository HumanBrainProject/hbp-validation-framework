describe('Testing service: Graphic Services', function() {
    'use strict';

    //fill parameters
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
        // var raw_data = new Promise(function(resolve, reject) {
        //     resolve(results_given)
        // });

    var results_data = [
            [{
                    "result": [{
                            "id": "341865f0-c934-448c-902e-cc02ddec7fa1",
                            "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-14T15:35:25.344722Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:368"
                        },
                        {
                            "id": "269e0db3-b587-46dd-a639-ee2383390580",
                            "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-14T15:35:25.235718Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:369"
                        }
                    ],
                    "additional_data": {
                        "model_name": "model for result test",
                        "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                        "model_instance": "version 1",
                        "test_code": "1.5nhf"
                    }
                },
                {
                    "result": [{
                            "id": "701b0f6d-c477-41f8-ba0e-8710883b46eb",
                            "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f",
                            "test_code_id": "6d59d750-bd7c-4715-9f9a-6439379169fd",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-14T15:35:24.870710Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:354"
                        },
                        {
                            "id": "d1df04a4-122a-44e7-a865-6ab3b373e198",
                            "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f",
                            "test_code_id": "6d59d750-bd7c-4715-9f9a-6439379169fd",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-14T15:35:24.792239Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:355"
                        }
                    ],
                    "additional_data": {
                        "model_name": "model for result test",
                        "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                        "model_instance": "version 1",
                        "test_code": "1.1"
                    }
                },
                {
                    "result": [{
                        "id": "81c1f66d-8caa-4bf7-b920-af6ab0611a36",
                        "model_version_id": "a091c6b0-9f86-4094-be62-4e42bdcebc7f",
                        "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928",
                        "results_storage": "azerty",
                        "score": "0.43000",
                        "passed": null,
                        "timestamp": "2017-10-03T12:18:04Z",
                        "platform": "azerty",
                        "project": "azerty",
                        "normalized_score": 0.43,
                        "$$hashKey": "object:363"
                    }],
                    "additional_data": {
                        "model_name": "model for result test",
                        "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                        "model_instance": "version 1",
                        "test_code": "2.1"
                    }
                }
            ],
            [{
                    "result": [{
                            "id": "f7ddb5b1-85cf-482c-b0fc-40749dbb985d",
                            "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "collab:///2180/",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-14T15:35:25.536056Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:266"
                        },
                        {
                            "id": "0e06a80a-6d19-4e4b-9a35-f6cafdbc105c",
                            "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-14T15:35:25.444335Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:267"
                        }
                    ],
                    "additional_data": {
                        "model_name": "model for result test",
                        "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                        "model_instance": "version 2",
                        "test_code": "1.5nhf"
                    }
                },
                {
                    "result": [{
                            "id": "0fe8565b-b469-434f-934b-d57977bec04a",
                            "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283",
                            "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928",
                            "results_storage": "azerty",
                            "score": "0.88800",
                            "passed": null,
                            "timestamp": "2025-10-03T15:21:24Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.888,
                            "$$hashKey": "object:253"
                        },
                        {
                            "id": "01bbe77d-66a1-44e4-8f25-b562e2f7436a",
                            "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283",
                            "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-14T15:35:25.027650Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:254"
                        },
                        {
                            "id": "b2288403-d05f-4563-8f80-5837f1da9b07",
                            "model_version_id": "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283",
                            "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-14T15:35:24.952689Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:255"
                        }
                    ],
                    "additional_data": {
                        "model_name": "model for result test",
                        "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                        "model_instance": "version 2",
                        "test_code": "2.1"
                    }
                }
            ],
            [{
                    "result": [{
                            "id": "f90ae820-ad68-4d2c-b9ae-760d4ebbe158",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:47.280246Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:308",
                            "additional_data": {
                                "model_name": "public model from ohter app but same collab",
                                "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                                "model_instance": "vfezvfez",
                                "test_code": "1.5nhf"
                            },
                            "line_id": "f2831902... ( vfezvfez )"
                        },
                        {
                            "id": "eeec27a2-52c7-4c88-aa10-0454ddff8542",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:47.198181Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:309",
                            "additional_data": {
                                "model_name": "public model from ohter app but same collab",
                                "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                                "model_instance": "vfezvfez",
                                "test_code": "1.5nhf"
                            },
                            "line_id": "f2831902... ( vfezvfez )"
                        },
                        {
                            "id": "842467b7-691b-4714-9140-af83d8930a17",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:47.114489Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:310",
                            "additional_data": {
                                "model_name": "public model from ohter app but same collab",
                                "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                                "model_instance": "vfezvfez",
                                "test_code": "1.5nhf"
                            },
                            "line_id": "f2831902... ( vfezvfez )"
                        },
                        {
                            "id": "7d1816d3-c7f8-4196-9d2a-6890f469322d",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:47.030300Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:311",
                            "additional_data": {
                                "model_name": "public model from ohter app but same collab",
                                "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                                "model_instance": "vfezvfez",
                                "test_code": "1.5nhf"
                            },
                            "line_id": "f2831902... ( vfezvfez )"
                        },
                        {
                            "id": "6a5c26e2-befa-4b4b-9169-935cd3d088db",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:46.939570Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:312",
                            "additional_data": {
                                "model_name": "public model from ohter app but same collab",
                                "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                                "model_instance": "vfezvfez",
                                "test_code": "1.5nhf"
                            },
                            "line_id": "f2831902... ( vfezvfez )"
                        },
                        {
                            "id": "ff0ffc04-0169-4790-8c8a-29d622c82cfd",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:46.856855Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:313",
                            "additional_data": {
                                "model_name": "public model from ohter app but same collab",
                                "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                                "model_instance": "vfezvfez",
                                "test_code": "1.5nhf"
                            },
                            "line_id": "f2831902... ( vfezvfez )"
                        }
                    ],
                    "additional_data": {
                        "model_name": "public model from ohter app but same collab",
                        "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                        "model_instance": "vfezvfez",
                        "test_code": "1.5nhf"
                    }
                },
                {
                    "result": [{
                            "id": "7b075014-2afb-4db9-8cc1-9fabdacc59aa",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "6d59d750-bd7c-4715-9f9a-6439379169fd",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:46.472251Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:282"
                        },
                        {
                            "id": "367b4736-9287-470a-a138-c6210f6bdf29",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "6d59d750-bd7c-4715-9f9a-6439379169fd",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:46.388160Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:283"
                        }
                    ],
                    "additional_data": {
                        "model_name": "public model from ohter app but same collab",
                        "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                        "model_instance": "vfezvfez",
                        "test_code": "1.1"
                    }
                },
                {
                    "result": [{
                            "id": "5476f2c7-f4c6-4bea-b095-002afae0fd9e",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:46.771309Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:291"
                        },
                        {
                            "id": "b0a76e33-76f8-4c5c-82b8-ba6cc8f2b4b9",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:46.705219Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:292"
                        },
                        {
                            "id": "21146350-a59e-4371-aa11-beb0c2485253",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928",
                            "results_storage": "azerty",
                            "score": "0.80000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:46.638469Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.8,
                            "$$hashKey": "object:293"
                        },
                        {
                            "id": "e6b253be-5ef9-43a1-ac90-49ad380016c0",
                            "model_version_id": "c60f266e-c069-407f-9016-6e09ffd703e2",
                            "test_code_id": "554e6463-cd1d-453d-95ae-475f74f6f928",
                            "results_storage": "azerty",
                            "score": "0.30000",
                            "passed": null,
                            "timestamp": "2017-11-15T13:10:46.555428Z",
                            "platform": "azerty",
                            "project": "azerty",
                            "normalized_score": 0.3,
                            "$$hashKey": "object:294"
                        }
                    ],
                    "additional_data": {
                        "model_name": "public model from ohter app but same collab",
                        "model_id": "f2831902-bc06-43ea-a1e7-6ff676a4fefd",
                        "model_instance": "vfezvfez",
                        "test_code": "2.1"
                    }
                }
            ],
            [{
                "result": [{
                        "id": "51a119c8-3790-43db-a14e-f616b4579620",
                        "model_version_id": "69f3495a-dd92-4165-aa91-2d3811d0ba0b",
                        "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                        "results_storage": "azerty",
                        "score": "0.80000",
                        "passed": null,
                        "timestamp": "2017-11-14T15:35:25.684738Z",
                        "platform": "azerty",
                        "project": "azerty",
                        "normalized_score": 0.8,
                        "$$hashKey": "object:338",
                        "additional_data": {
                            "model_name": "model for result test",
                            "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                            "model_instance": "version 3",
                            "test_code": "1.5nhf"
                        },
                        "line_id": "Mm1 ( version 3 )"
                    },
                    {
                        "id": "d7e5d3b8-23da-4c1e-b325-4a419108b405",
                        "model_version_id": "69f3495a-dd92-4165-aa91-2d3811d0ba0b",
                        "test_code_id": "9d39eebd-3185-44d6-9cea-d0819abf8ba8",
                        "results_storage": "azerty",
                        "score": "0.30000",
                        "passed": null,
                        "timestamp": "2017-11-14T15:35:25.609431Z",
                        "platform": "azerty",
                        "project": "azerty",
                        "normalized_score": 0.3,
                        "$$hashKey": "object:339",
                        "additional_data": {
                            "model_name": "model for result test",
                            "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                            "model_instance": "version 3",
                            "test_code": "1.5nhf"
                        },
                        "line_id": "Mm1 ( version 3 )"
                    }
                ],
                "additional_data": {
                    "model_name": "model for result test",
                    "model_id": "61df5b12-c885-4cb7-a511-e5315101b420",
                    "model_instance": "version 3",
                    "test_code": "1.5nhf"
                }
            }]
        ]
        //create variables
    var $location, $scope, $rootScope, $httpBackend;

    var ScientificModelRest, ValidationTestDefinitionRest;
    var Graphics;

    //load modules
    beforeEach(angular.mock.module('GraphicsServices', 'ApiCommunicationServices'));

    // inject app elements into variables
    beforeEach(inject(function(_Graphics_, _$httpBackend_, _$rootScope_, _$location_, _ValidationTestDefinitionRest_, _ScientificModelRest_) {
        Graphics = _Graphics_;
        ScientificModelRest = _ScientificModelRest_;
        ValidationTestDefinitionRest = _ValidationTestDefinitionRest_;

        $rootScope = _$rootScope_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should get line options', function() {
        var title = "";
        var subtitle = "";
        var Yaxislabel = "p-value";
        var caption = "";
        var results_data = [Object({ result: [Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '269e0db3-b587-46dd-a639-ee2383390580', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.235718Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })], additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 1', test_code: '1.5nhf' }) }), [Object({ result: [Object({ id: 'f7ddb5b1-85cf-482c-b0fc-40749dbb985d', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'collab:///2180/', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.536056Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '0e06a80a-6d19-4e4b-9a35-f6cafdbc105c', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.444335Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })], additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 2', test_code: '1.5nhf' }) }), Object({ result: [Object({ id: '0fe8565b-b469-434f-934b-d57977bec04a', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: 0.888, passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.888 }), Object({ id: '01bbe77d-66a1-44e4-8f25-b562e2f7436a', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.027650Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: 'b2288403-d05f-4563-8f80-5837f1da9b07', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:24.952689Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })], additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 2', test_code: '2.1' }) })]];
        var type = "test";
        var graph_key = "";
        var abscissa_value = Object({ "1.1": 0, "2.1": 1, "1.5nhf": 2, mii: 3 });

        var res = Graphics.get_lines_options(title, subtitle, Yaxislabel, caption, results_data, type, graph_key, abscissa_value)

        var expected_result = Object({
            chart: Object({
                type: 'lineChart',
                height: 450,
                margin: Object({ top: 20, right: 20, bottom: 40, left: 55 }),
                x: Function,
                y: Function,
                useInteractiveGuideline: true,
                dispatch: Object({ stateChange: Function, changeState: Function, tooltipShow: Function, tooltipHide: Function }),
                xAxis: Object({ axisLabel: 'Version', tickValues: [0, 1, 2, 3], ticks: 4, tickFormat: Function }),
                yAxis: Object({ axisLabel: 'p-value', showMaxMin: false, tickFormat: Function, axisLabelDistance: -10 }),
                xDomain: [0, 3],
                xRange: null,
                yDomain: [0.27, 0.9768],
                yRange: null,
                tooltips: true,
                callback: Function
            }),
            title: Object({ enable: false, text: '' }),
            subtitle: Object({ enable: false, text: '', css: Object({ 'text-align': 'center', margin: '10px 13px 0px 7px' }) }),
            caption: Object({ enable: false, html: '', css: Object({ 'text-align': 'justify', margin: '10px 13px 0px 7px' }) })
        });

        expect(res.title).toEqual(Object({ enable: false, text: '' }));
        expect(res.subtitle).toEqual(Object({ enable: false, text: '', css: Object({ 'text-align': 'center', margin: '10px 13px 0px 7px' }) }));
        expect(res.caption).toEqual(Object({ enable: false, html: '', css: Object({ 'text-align': 'justify', margin: '10px 13px 0px 7px' }) }));
        expect(res.chart.xDomain).toEqual([0, 3]);
        expect(res.chart.yDomain).toEqual([0.27, 0.9768]);
        expect(res.chart.xAxis.tickValues).toEqual([0, 1, 2, 3]);
    })

    it('focus', function() {
        spyOn($rootScope, '$broadcast').and.callThrough();
        var list_of_results_id = [{
                "id_line": "f2831902... ( vfezvfez )",
                "id_result": "6a5c26e2-befa-4b4b-9169-935cd3d088db"
            },
            {
                "id_line": "f2831902... ( vfezvfez )",
                "id_result": "ff0ffc04-0169-4790-8c8a-29d622c82cfd"
            },
            {
                "id_line": "f2831902... ( vfezvfez )",
                "id_result": "f90ae820-ad68-4d2c-b9ae-760d4ebbe158"
            },
            {
                "id_line": "f2831902... ( vfezvfez )",
                "id_result": "842467b7-691b-4714-9140-af83d8930a17"
            },
            {
                "id_line": "f2831902... ( vfezvfez )",
                "id_result": "7d1816d3-c7f8-4196-9d2a-6890f469322d"
            },
            {
                "id_line": "f2831902... ( vfezvfez )",
                "id_result": "eeec27a2-52c7-4c88-aa10-0454ddff8542"
            },
            {
                "id_line": "Mm1 ( version 3 )",
                "id_result": "d7e5d3b8-23da-4c1e-b325-4a419108b405"
            },
            {
                "id_line": "Mm1 ( version 3 )",
                "id_result": "51a119c8-3790-43db-a14e-f616b4579620"
            }
        ]


        var type = "test";
        var graph_key = "";

        var res = Graphics.focus(list_of_results_id, results_data, type, graph_key);
        var expected_list_data = [Object({ id: '6a5c26e2-befa-4b4b-9169-935cd3d088db', model_version_id: 'c60f266e-c069-407f-9016-6e09ffd703e2', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.80000', passed: null, timestamp: '2017-11-15T13:10:46.939570Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8, $$hashKey: 'object:312', additional_data: Object({ model_name: 'public model from ohter app but same collab', model_id: 'f2831902-bc06-43ea-a1e7-6ff676a4fefd', model_instance: 'vfezvfez', test_code: '1.5nhf' }), line_id: 'f2831902... ( vfezvfez )' }), Object({ id: 'ff0ffc04-0169-4790-8c8a-29d622c82cfd', model_version_id: 'c60f266e-c069-407f-9016-6e09ffd703e2', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.30000', passed: null, timestamp: '2017-11-15T13:10:46.856855Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3, $$hashKey: 'object:313', additional_data: Object({ model_name: 'public model from ohter app but same collab', model_id: 'f2831902-bc06-43ea-a1e7-6ff676a4fefd', model_instance: 'vfezvfez', test_code: '1.5nhf' }), line_id: 'f2831902... ( vfezvfez )' }), Object({ id: 'f90ae820-ad68-4d2c-b9ae-760d4ebbe158', model_version_id: 'c60f266e-c069-407f-9016-6e09ffd703e2', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.80000', passed: null, timestamp: '2017-11-15T13:10:47.280246Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8, $$hashKey: 'object:308', additional_data: Object({ model_name: 'public model from ohter app but same collab', model_id: 'f2831902-bc06-43ea-a1e7-6ff676a4fefd', model_instance: 'vfezvfez', test_code: '1.5nhf' }), line_id: 'f2831902... ( vfezvfez )' }), Object({ id: '842467b7-691b-4714-9140-af83d8930a17', model_version_id: 'c60f266e-c069-407f-9016-6e09ffd703e2', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.80000', passed: null, timestamp: '2017-11-15T13:10:47.114489Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8, $$hashKey: 'object:310', additional_data: Object({ model_name: 'public model from ohter app but same collab', model_id: 'f2831902-bc06-43ea-a1e7-6ff676a4fefd', model_instance: 'vfezvfez', test_code: '1.5nhf' }), line_id: 'f2831902... ( vfezvfez )' }), Object({ id: '7d1816d3-c7f8-4196-9d2a-6890f469322d', model_version_id: 'c60f266e-c069-407f-9016-6e09ffd703e2', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.30000', passed: null, timestamp: '2017-11-15T13:10:47.030300Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3, $$hashKey: 'object:311', additional_data: Object({ model_name: 'public model from ohter app but same collab', model_id: 'f2831902-bc06-43ea-a1e7-6ff676a4fefd', model_instance: 'vfezvfez', test_code: '1.5nhf' }), line_id: 'f2831902... ( vfezvfez )' }), Object({ id: 'eeec27a2-52c7-4c88-aa10-0454ddff8542', model_version_id: 'c60f266e-c069-407f-9016-6e09ffd703e2', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.30000', passed: null, timestamp: '2017-11-15T13:10:47.198181Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3, $$hashKey: 'object:309', additional_data: Object({ model_name: 'public model from ohter app but same collab', model_id: 'f2831902-bc06-43ea-a1e7-6ff676a4fefd', model_instance: 'vfezvfez', test_code: '1.5nhf' }), line_id: 'f2831902... ( vfezvfez )' }), Object({ id: 'd7e5d3b8-23da-4c1e-b325-4a419108b405', model_version_id: '69f3495a-dd92-4165-aa91-2d3811d0ba0b', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.30000', passed: null, timestamp: '2017-11-14T15:35:25.609431Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3, $$hashKey: 'object:339', additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 3', test_code: '1.5nhf' }), line_id: 'Mm1 ( version 3 )' }), Object({ id: '51a119c8-3790-43db-a14e-f616b4579620', model_version_id: '69f3495a-dd92-4165-aa91-2d3811d0ba0b', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.80000', passed: null, timestamp: '2017-11-14T15:35:25.684738Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8, $$hashKey: 'object:338', additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 3', test_code: '1.5nhf' }), line_id: 'Mm1 ( version 3 )' })];
        var expected_graph_key = '';
        expect($rootScope.$broadcast).toHaveBeenCalledWith('data_focussed:updated', expected_list_data, expected_graph_key)
    });

    it('find_result_in_data for test', function() {
        var id_couple = {
            "id_line": "f2831902... ( vfezvfez )",
            "id_result": "6a5c26e2-befa-4b4b-9169-935cd3d088db"
        };
        var type = 'test';
        var res = Graphics.find_result_in_data(id_couple, results_data, type);

        expect(res).toEqual(Object({ id: '6a5c26e2-befa-4b4b-9169-935cd3d088db', model_version_id: 'c60f266e-c069-407f-9016-6e09ffd703e2', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.80000', passed: null, timestamp: '2017-11-15T13:10:46.939570Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8, $$hashKey: 'object:312', additional_data: Object({ model_name: 'public model from ohter app but same collab', model_id: 'f2831902-bc06-43ea-a1e7-6ff676a4fefd', model_instance: 'vfezvfez', test_code: '1.5nhf' }), line_id: 'f2831902... ( vfezvfez )' }));
    })
    it('find_result_in_data for model', function() {
        var results = [
            [
                Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }),
                Object({ id: '269e0db3-b587-46dd-a639-ee2383390580', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.235718Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })
            ]
        ]

        var id_couple = {
            "id_line": "Tt22 ( 1.5nhf )",
            "id_result": "341865f0-c934-448c-902e-cc02ddec7fa1"
        }
        var type = "model"
        var res = Graphics.find_result_in_data(id_couple, results, type);

        expect(res).toEqual(Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }));
    });

    it('getUpdatedGraph', function() {
        var graph_values = [Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' }), Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'ab490a1f-029a-4614-a6e5-311c7f65966d' }), Object({ x: 1, y: 0.5, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', color: '#d92120', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.870213+00:00' })];

        var list_ids = ['53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )'];

        var res = Graphics.getUpdatedGraph(graph_values, list_ids);

        var expected_result = [Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' })];

        expect(res).toEqual(expected_result);
    })


    describe('testing test graph functions', function() {
        it('should get raw data', function() {
            $httpBackend.expectGET('results?format=json&order=model_instance&test_id=cfdb6b8b-9017-4191-a904-1527c7140001').respond(results_given)
            var res = Graphics.TestGraph_getRawData(test_versions)
            res.then(function(results) {
                expect(results).toEqual(d(results_given), '$promise: Promise({ $$state: Object({ status: 1, pending: undefined, value: <circular reference: Object>, processScheduled: false }) }), $resolved: true })');
            });

            $httpBackend.flush();
        })

        it('should get abscissa value', function() {
            var res = Graphics.TestGraph_getAbscissaValues(test_versions);
            var object_expected = { "1.1": 0, "2.1": 1, "1.5nhf": 2, "mii": 3 };
            expect(res).toEqual(object_expected);
        })

        it('should init test graph', function() {
            $httpBackend.expectGET('results?format=json&order=model_instance&test_id=cfdb6b8b-9017-4191-a904-1527c7140001').respond(results_given)
            var raw_data = Graphics.TestGraph_getRawData(test_versions);
            $httpBackend.flush();

            raw_data.then(function(raw) {
                var res = Graphics.TestGraph_initTestGraph(test_versions, raw);
                var expected_answer = Object({
                    values: [Object({ values: [Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })], key: 'Mm1 ( version 1 )', id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', color: '#781c81', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.178009+00:00' }), Object({ values: [Object({ x: 1, y: 0.3, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: 'b2288403-d05f-4563-8f80-5837f1da9b07' }), Object({ x: 1, y: 0.8, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: '01bbe77d-66a1-44e4-8f25-b562e2f7436a' }), Object({ x: 1, y: 0.888, label: '2.1', id: 'Mm1 ( version 2 )', id_test_result: '0fe8565b-b469-434f-934b-d57977bec04a' }), Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 2 )', id_test_result: 'f7ddb5b1-85cf-482c-b0fc-40749dbb985d' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 2 )', id_test_result: '0e06a80a-6d19-4e4b-9a35-f6cafdbc105c' })], key: 'Mm1 ( version 2 )', id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', color: '#d92120', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.244111+00:00' })],
                    results: [
                        [Object({ result: [Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '269e0db3-b587-46dd-a639-ee2383390580', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.235718Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })], additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 1', test_code: '1.5nhf' }) })],
                        [Object({ result: [Object({ id: 'f7ddb5b1-85cf-482c-b0fc-40749dbb985d', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'collab:///2180/', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.536056Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '0e06a80a-6d19-4e4b-9a35-f6cafdbc105c', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.444335Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })], additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 2', test_code: '1.5nhf' }) }), Object({ result: [Object({ id: '0fe8565b-b469-434f-934b-d57977bec04a', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: 0.888, passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.888 }), Object({ id: '01bbe77d-66a1-44e4-8f25-b562e2f7436a', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.027650Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: 'b2288403-d05f-4563-8f80-5837f1da9b07', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:24.952689Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })], additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 2', test_code: '2.1' }) })]
                    ],
                    list_ids: ['Mm1 ( version 1 )', 'Mm1 ( version 2 )'],
                    abs_info: Object({ "1.1": 0, "2.1": 1, "1.5nhf": 2, mii: 3 }),
                    latest_model_instances_line_id: [Object({ latest_line_id: 'Mm1 ( version 2 )', latest_timestamp: '2017-10-03 12:18:05.244111+00:00' })]
                });
                res.then(function(result) {
                    expect(result).toEqual(expected_answer);
                })
            })
        })

        it('should get latest version model', function() {
            var instance_id = "a091c6b0-9f86-4094-be62-4e42bdcebc7f";
            var instance = results_given.model_instances[instance_id];
            var timestamp = instance.timestamp;
            var line_id = 'Mm1 ( version 1 )';
            var model_id = instance.model_id;
            var abscissa_values = { "1.1": 0, "2.1": 1, "1.5nhf": 2, "mii": 3 };
            var colors = Object({ 'a091c6b0-9f86-4094-be62-4e42bdcebc7f': '781c81', '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283': 'd92120' });
            var res = Graphics.TestGraph_manageDataForTestGraph(instance.test_codes, timestamp, line_id, model_id, instance_id, abscissa_values, colors[instance_id])

            var instance_id2 = "4d02d0a9-adfc-4b9e-af4a-2f1f007e1283";
            var instance2 = results_given.model_instances[instance_id2];
            var timestamp2 = instance2.timestamp;
            var line_id2 = 'Mm1 ( version 2 )';
            var model_id2 = instance2.model_id;
            var res2 = Graphics.TestGraph_manageDataForTestGraph(instance2.test_codes, timestamp2, line_id2, model_id2, instance_id2, abscissa_values, colors[instance_id2])


            var values = [res, res2];
            var list_ids = [line_id, line_id2];

            var result = Graphics.TestGraph_getLatestVersionModel(values, list_ids);
            var expected_result = [Object({ latest_line_id: 'Mm1 ( version 2 )', latest_timestamp: '2017-10-03 12:18:05.244111+00:00' })];
            expect(result).toEqual(expected_result);
        })

        it('it should return a line_id containing the model_alias if alias exists', function() {
            var res = Graphics.TestGraph_getLineId(results_given.model_instances["a091c6b0-9f86-4094-be62-4e42bdcebc7f"])
            expect(res).toEqual('Mm1 ( version 1 )');
        })

        it('it should return a line_id containing the model_id if alias is undefined, null, empty or None', function() {
            var instance_without_alias = results_given.model_instances["a091c6b0-9f86-4094-be62-4e42bdcebc7f"];

            instance_without_alias.model_alias = undefined;
            var res = Graphics.TestGraph_getLineId(instance_without_alias)
            expect(res).toEqual('61df5b12... ( version 1 )');

            instance_without_alias.model_alias = '';
            var res = Graphics.TestGraph_getLineId(instance_without_alias)
            expect(res).toEqual('61df5b12... ( version 1 )');

            instance_without_alias.model_alias = null;
            var res = Graphics.TestGraph_getLineId(instance_without_alias)
            expect(res).toEqual('61df5b12... ( version 1 )');

            instance_without_alias.model_alias = 'None';
            var res = Graphics.TestGraph_getLineId(instance_without_alias)
            expect(res).toEqual('61df5b12... ( version 1 )');
        })

        it(' should manage data for test graph', function() {
            var instance_id = "a091c6b0-9f86-4094-be62-4e42bdcebc7f";
            var instance = results_given.model_instances[instance_id];
            var timestamp = instance.timestamp;
            var line_id = 'Mm1 ( version 1 )';
            var model_id = instance.model_id;
            var abscissa_values = { "1.1": 0, "2.1": 1, "1.5nhf": 2, "mii": 3 };
            var colors = Object({ 'a091c6b0-9f86-4094-be62-4e42bdcebc7f': '781c81', '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283': 'd92120' });
            var res = Graphics.TestGraph_manageDataForTestGraph(instance.test_codes, timestamp, line_id, model_id, instance_id, abscissa_values, colors[instance_id])

            var result_expected = Object({ values: [Object({ x: 2, y: 0.8, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 2, y: 0.3, label: '1.5nhf', id: 'Mm1 ( version 1 )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })], key: 'Mm1 ( version 1 )', id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', color: '#781c81', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', timestamp: '2017-10-03 12:18:05.178009+00:00' });
            expect(res).toEqual(result_expected);
        })

        it('should manage data for results tab ', function() {
            var instance_id = "a091c6b0-9f86-4094-be62-4e42bdcebc7f";
            var instance = results_given.model_instances[instance_id];
            var res = Graphics.TestGraph__manageDataForResultsTab(instance)

            var result_expected = [Object({ result: [Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '269e0db3-b587-46dd-a639-ee2383390580', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.235718Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })], additional_data: Object({ model_name: 'model for result test', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_instance: 'version 1', test_code: '1.5nhf' }) })];
            expect(res).toEqual(result_expected);
        })

        it('should reorganize raw data for result table', function() {
            var res = Graphics.TestGraph_reorganizeRawDataForResultTable(results_given.model_instances, test_versions.test_codes)

            var expected_answer = Object({ model_instances: [Object({ timestamp: '2017-10-03 12:18:05.244111+00:00', id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_name: 'model for result test', line_id: 'Mm1 ( version 2 )', test_instances: [Object({ id: '6d59d750-bd7c-4715-9f9a-6439379169fd', repository: '', version: '1.1', description: null, path: '', timestamp: '2017-10-03T12:18:04.728547Z', test_definition_id: 'cfdb6b8b-9017-4191-a904-1527c7140001' }), Object({ version: '2.1', timestamp: '2017-10-05 12:18:04.953497+00:00', results: [Object({ id: '0fe8565b-b469-434f-934b-d57977bec04a', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: '0.88800', passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.888 }), Object({ id: '01bbe77d-66a1-44e4-8f25-b562e2f7436a', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: '0.80000', passed: null, timestamp: '2017-11-14T15:35:25.027650Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: 'b2288403-d05f-4563-8f80-5837f1da9b07', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '554e6463-cd1d-453d-95ae-475f74f6f928', results_storage: 'azerty', score: '0.30000', passed: null, timestamp: '2017-11-14T15:35:24.952689Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })] }), Object({ version: '1.5nhf', timestamp: '2017-10-27 12:04:53.156645+00:00', results: [Object({ id: 'f7ddb5b1-85cf-482c-b0fc-40749dbb985d', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'collab:///2180/', score: '0.80000', passed: null, timestamp: '2017-11-14T15:35:25.536056Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '0e06a80a-6d19-4e4b-9a35-f6cafdbc105c', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.30000', passed: null, timestamp: '2017-11-14T15:35:25.444335Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })] }), Object({ id: '3e2777f6-bdb6-4010-8590-933ecfc04755', repository: 'https://collab.humanbrainproject.eu', version: 'mii', description: null, path: 'mo', timestamp: '2017-12-13T09:46:57.813819Z', test_definition_id: 'cfdb6b8b-9017-4191-a904-1527c7140001' })], last_result_timestamp: '2025-10-03T15:21:24Z' }), Object({ timestamp: '2017-10-03 12:18:05.178009+00:00', id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', model_id: '61df5b12-c885-4cb7-a511-e5315101b420', model_name: 'model for result test', line_id: '61df5b12... ( version 1 )', test_instances: [Object({ id: '6d59d750-bd7c-4715-9f9a-6439379169fd', repository: '', version: '1.1', description: null, path: '', timestamp: '2017-10-03T12:18:04.728547Z', test_definition_id: 'cfdb6b8b-9017-4191-a904-1527c7140001' }), Object({ id: '554e6463-cd1d-453d-95ae-475f74f6f928', repository: '', version: '2.1', description: null, path: '', timestamp: '2017-10-05T12:18:04.953497Z', test_definition_id: 'cfdb6b8b-9017-4191-a904-1527c7140001' }), Object({ version: '1.5nhf', timestamp: '2017-10-27 12:04:53.156645+00:00', results: [Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.80000', passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '269e0db3-b587-46dd-a639-ee2383390580', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: '0.30000', passed: null, timestamp: '2017-11-14T15:35:25.235718Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })] }), Object({ id: '3e2777f6-bdb6-4010-8590-933ecfc04755', repository: 'https://collab.humanbrainproject.eu', version: 'mii', description: null, path: 'mo', timestamp: '2017-12-13T09:46:57.813819Z', test_definition_id: 'cfdb6b8b-9017-4191-a904-1527c7140001' })], last_result_timestamp: '2017-11-14T15:35:25.344722Z' })] });

            expect(res).toEqual(expected_answer);
        })

        it('should get last result timestamp', function() {
            var res = Graphics.TestGraph_getLastResultTimestamp(results_given.model_instances['4d02d0a9-adfc-4b9e-af4a-2f1f007e1283'].test_codes)
            expect(res).not.toBeUndefined()
            expect(res).toEqual('2017-11-14T15:35:25.536056Z')
        })
    })

    describe('testing model graph functions', function() {
        it('should get raw data', function() {
            $httpBackend.expectGET('results?format=json&model_id=%7B%22instances%22:%5B%7B%22id%22:%22a091c6b0-9f86-4094-be62-4e42bdcebc7f%22,%22version%22:%22version+1%22,%22description%22:null,%22parameters%22:%22param%22,%22code_format%22:null,%22source%22:%22http:%2F%2Fdd.com%22,%22model_id%22:%2261df5b12-c885-4cb7-a511-e5315101b420%22%7D,%7B%22id%22:%224d02d0a9-adfc-4b9e-af4a-2f1f007e1283%22,%22version%22:%22version+2%22,%22description%22:null,%22parameters%22:%22param%22,%22code_format%22:null,%22source%22:%22http:%2F%2Fdd.com%22,%22model_id%22:%2261df5b12-c885-4cb7-a511-e5315101b420%22%7D,%7B%22id%22:%2269f3495a-dd92-4165-aa91-2d3811d0ba0b%22,%22version%22:%22version+3%22,%22description%22:null,%22parameters%22:%22param%22,%22code_format%22:null,%22source%22:%22http:%2F%2Fdd.com%22,%22model_id%22:%2261df5b12-c885-4cb7-a511-e5315101b420%22%7D,%7B%22id%22:%22eebce4df-e83a-4537-85b3-c5488848cc4b%22,%22version%22:%22,jkuy%22,%22description%22:null,%22parameters%22:%22g,jg%22,%22code_format%22:null,%22source%22:%22https:%2F%2Fcollab.humanbrainproject.eu%22,%22model_id%22:%2261df5b12-c885-4cb7-a511-e5315101b420%22%7D%5D%7D&order=score_type').respond(results_given_for_models)
            var res = Graphics.ModelGraph_getRawData(model_instances)
            res.then(function(results) {
                expect(results).toEqual(d(results_given_for_models), '$promise: Promise({ $$state: Object({ status: 1, pending: undefined, value: <circular reference: Object>, processScheduled: false }) }), $resolved: true })');
            });

            $httpBackend.flush();
        })

        it(' should init graphs', function() {
            var res = Graphics.ModelGraph_init_Graphs(model_instances, results_given_for_models);
            res.then(function(result) {
                var expected_result = Object({
                    values: [
                        Object({ values: [Object({ x: 0, y: 0.8, label: 'version 1', id: 'Tt22 ( 1.5nhf )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 0, y: 0.3, label: 'version 1', id: 'Tt22 ( 1.5nhf )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })], key: 'Tt22 ( 1.5nhf )', color: '#781c81', test_id: 'cfdb6b8b-9017-4191-a904-1527c7140001', test_score_type: 'Rsquare', timestamp: '2017-10-27 12:04:53.156645+00:00' }), Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' }), Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'ab490a1f-029a-4614-a6e5-311c7f65966d' }), Object({ x: 1, y: 0.5, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', color: '#d92120', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.870213+00:00' })
                    ],
                    single_graphs_data: [
                        Object({
                            score_type: 'Rsquare',
                            values: Object({
                                values: [Object({
                                    values: [
                                        Object({ x: 0, y: 0.8, label: 'version 1', id: 'Tt22 ( 1.5nhf )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 0, y: 0.3, label: 'version 1', id: 'Tt22 ( 1.5nhf )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })
                                    ],
                                    key: 'Tt22 ( 1.5nhf )',
                                    color: '#781c81',
                                    test_id: 'cfdb6b8b-9017-4191-a904-1527c7140001',
                                    test_score_type: 'Rsquare',
                                    timestamp: '2017-10-27 12:04:53.156645+00:00'
                                })],
                                results: [
                                    [Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '269e0db3-b587-46dd-a639-ee2383390580', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.235718Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })]
                                ],
                                list_ids: ['Tt22 ( 1.5nhf )'],
                                abs_info: Object({ 'version 1': 0, 'version 2': 1, 'version 3': 2, ',jkuy': 3 }),
                                latest_test_versions_line_id: [Object({ latest_line_id: 'Tt22 ( 1.5nhf )', latest_timestamp: '2017-10-27 12:04:53.156645+00:00' })]
                            })
                        }),
                        Object({
                            score_type: 'p-value',
                            values: Object({
                                values: [Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' }), Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'ab490a1f-029a-4614-a6e5-311c7f65966d' }), Object({ x: 1, y: 0.5, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', color: '#d92120', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.870213+00:00' })],
                                results: [
                                    [Object({ id: 'ed079410-b059-4c65-8546-8b59ee883b4f', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a', results_storage: 'azerty', score: 0.25, passed: true, timestamp: '2017-10-03T12:18:04Z', platform: 'azerty', project: 'azerty', normalized_score: 0.25 }), Object({ id: '64220ecf-b641-43ac-b1f0-3d55dcc71332', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a', results_storage: 'azerty', score: 0.4, passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 })],
                                    [Object({ id: 'ab490a1f-029a-4614-a6e5-311c7f65966d', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: 'f9e9d549-738e-4600-91ae-bff5eaec2991', results_storage: 'azerty', score: 0.25, passed: true, timestamp: '2017-10-03T12:18:04Z', platform: 'azerty', project: 'azerty', normalized_score: 0.25 }), Object({ id: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: 'f9e9d549-738e-4600-91ae-bff5eaec2991', results_storage: 'azerty', score: 0.5, passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 })]
                                ],
                                list_ids: ['53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )'],
                                abs_info: Object({ 'version 1': 0, 'version 2': 1, 'version 3': 2, ',jkuy': 3 }),
                                latest_test_versions_line_id: [Object({ latest_line_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', latest_timestamp: '2017-10-03 12:18:04.653952+00:00' })]
                            })
                        })
                    ]
                });

                expect(result).toEqual(expected_result);
            })
        })

        it('should get abscissa values', function() {
            var res = Graphics.ModelGraph_getAbscissaValues(model_instances);
            var object_expected = { 'version 1': 0, 'version 2': 1, 'version 3': 2, ',jkuy': 3 };
            expect(res).toEqual(object_expected);
        })

        it('should init single model graphs', function() {
            var raw = results_given_for_models;

            var abscissa_value = { 'version 1': 0, 'version 2': 1, 'version 3': 2, ',jkuy': 3 };

            var res = Graphics.ModelGraph_init_single_ModelGraphs(raw.score_type['p-value'], abscissa_value, 'p-value');
            var expected_answer = Object({
                values: [Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' }), Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'ab490a1f-029a-4614-a6e5-311c7f65966d' }), Object({ x: 1, y: 0.5, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', color: '#d92120', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.870213+00:00' })],
                results: [
                    [Object({ id: 'ed079410-b059-4c65-8546-8b59ee883b4f', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a', results_storage: 'azerty', score: 0.25, passed: true, timestamp: '2017-10-03T12:18:04Z', platform: 'azerty', project: 'azerty', normalized_score: 0.25 }), Object({ id: '64220ecf-b641-43ac-b1f0-3d55dcc71332', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: '35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a', results_storage: 'azerty', score: 0.4, passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 })],
                    [Object({ id: 'ab490a1f-029a-4614-a6e5-311c7f65966d', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: 'f9e9d549-738e-4600-91ae-bff5eaec2991', results_storage: 'azerty', score: 0.25, passed: true, timestamp: '2017-10-03T12:18:04Z', platform: 'azerty', project: 'azerty', normalized_score: 0.25 }), Object({ id: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b', model_version_id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', test_code_id: 'f9e9d549-738e-4600-91ae-bff5eaec2991', results_storage: 'azerty', score: 0.5, passed: null, timestamp: '2025-10-03T15:21:24Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 })]
                ],
                list_ids: ['53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )'],
                abs_info: Object({ "version 1": 0, "version 2": 1, "version 3": 2, ",jkuy": 3 }),
                latest_test_versions_line_id: [Object({ latest_line_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', latest_timestamp: '2017-10-03 12:18:04.653952+00:00' })]
            });

            expect(res).toEqual(expected_answer);
        })

        it('should get all graph values', function() {
            var raw = results_given_for_models;

            var abscissa_value = { 'version 1': 0, 'version 2': 1, 'version 3': 2, ',jkuy': 3 };

            var res1 = Graphics.ModelGraph_init_single_ModelGraphs(raw.score_type['p-value'], abscissa_value, 'p-value');
            var res2 = Graphics.ModelGraph_init_single_ModelGraphs(raw.score_type['Rsquare'], abscissa_value, 'Rsquare');
            var single_graph_data = [{ score_type: 'p-value', values: res1 }, { score_type: 'Rsquare', values: res2 }];
            var res = Graphics.ModelGraph_get_all_graph_values(single_graph_data);

            var expected_result = [Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: 'ed079410-b059-4c65-8546-8b59ee883b4f' }), Object({ x: 1, y: 0.4, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', id_test_result: '64220ecf-b641-43ac-b1f0-3d55dcc71332' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )', color: '#781c81', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.653952+00:00' }), Object({ values: [Object({ x: 0, y: 0.25, label: 'version 1', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'ab490a1f-029a-4614-a6e5-311c7f65966d' }), Object({ x: 1, y: 0.5, label: 'version 2', id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', id_test_result: 'bfe7a33c-a9de-47d5-8a52-e2fe4872dd8b' })], key: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )', color: '#d92120', test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81', test_score_type: 'p-value', timestamp: '2017-10-03 12:18:04.870213+00:00' }), Object({ values: [Object({ x: 0, y: 0.8, label: 'version 1', id: 'Tt22 ( 1.5nhf )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 0, y: 0.3, label: 'version 1', id: 'Tt22 ( 1.5nhf )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })], key: 'Tt22 ( 1.5nhf )', color: '#781c81', test_id: 'cfdb6b8b-9017-4191-a904-1527c7140001', test_score_type: 'Rsquare', timestamp: '2017-10-27 12:04:53.156645+00:00' })];
            expect(res).toEqual(expected_result)
        })

        it('should get latest version test', function() {
            var code_id = '35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a';
            var score_type = 'p-value';
            var code = results_given_for_models.score_type[score_type].test_codes[code_id];
            var timestamp = code.timestamp;
            var line_id = 'Mm1 ( version 1 )';
            var test_id = code.test_id;
            var abscissa_values = { 'version 1': 0, 'version 2': 1, 'version 3': 2, ',jkuy': 3 };
            var colors = Graphics._get_color_array(results_given_for_models.score_type[score_type].test_codes)
            var res = Graphics.ModelGraph_manageDataForGraph(timestamp, code.model_instances, line_id, test_id, score_type, abscissa_values, colors[code_id])

            var code_id2 = 'f9e9d549-738e-4600-91ae-bff5eaec2991';
            var code2 = results_given_for_models.score_type[score_type].test_codes[code_id];
            var timestamp2 = code.timestamp;
            var line_id2 = 'Mm1 ( version 2 )';
            var test_id2 = code2.test_id;
            var res2 = Graphics.ModelGraph_manageDataForGraph(timestamp2, code2.model_instances, line_id2, test_id2, score_type, abscissa_values, colors[code_id])


            var values = [res, res2];
            var list_ids = [line_id, line_id2];

            var result = Graphics.ModelGraph_get_latest_version_test(values, list_ids);
            var expected_result = [Object({ latest_line_id: 'Mm1 ( version 1 )', latest_timestamp: '2017-10-03 12:18:04.653952+00:00' })];
            expect(result).toEqual(expected_result);
        })

        it('should get line id ', function() {
            var res = Graphics.ModelGraph_getLineId(results_given_for_models.score_type['Rsquare'].test_codes['9d39eebd-3185-44d6-9cea-d0819abf8ba8'])
            expect(res).toEqual('Tt22 ( 1.5nhf )');
        })

        it('should manage data for results tab', function() {
            var code_id = '9d39eebd-3185-44d6-9cea-d0819abf8ba8';
            var score_type = 'Rsquare';
            var code = results_given_for_models.score_type[score_type].test_codes[code_id];
            var res = Graphics.ModelGraph_manageDataForResultsTab(code)

            var result_expected = [Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }), Object({ id: '269e0db3-b587-46dd-a639-ee2383390580', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.235718Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })];
            expect(res).toEqual(result_expected);
        })

        it('should manage data for graph', function() {
            var code_id = '9d39eebd-3185-44d6-9cea-d0819abf8ba8';
            var score_type = 'Rsquare';
            var code = results_given_for_models.score_type[score_type].test_codes[code_id];
            var timestamp = code.timestamp;
            var line_id = 'Mm1 ( version 1 )';
            var test_id = code.test_id;
            var abscissa_values = { 'version 1': 0, 'version 2': 1, 'version 3': 2, ',jkuy': 3 };
            var colors = Graphics._get_color_array(results_given_for_models.score_type[score_type].test_codes)
            var res = Graphics.ModelGraph_manageDataForGraph(timestamp, code.model_instances, line_id, test_id, score_type, abscissa_values, colors[code_id])

            var result_expected = Object({ values: [Object({ x: 0, y: 0.8, label: 'version 1', id: 'Mm1 ( version 1 )', id_test_result: '341865f0-c934-448c-902e-cc02ddec7fa1' }), Object({ x: 0, y: 0.3, label: 'version 1', id: 'Mm1 ( version 1 )', id_test_result: '269e0db3-b587-46dd-a639-ee2383390580' })], key: 'Mm1 ( version 1 )', color: '#781c81', test_id: 'cfdb6b8b-9017-4191-a904-1527c7140001', test_score_type: 'Rsquare', timestamp: '2017-10-27 12:04:53.156645+00:00' });
            expect(res).toEqual(result_expected);
        })

        it('should reorganize raw data for result table', function() {
            var res = Graphics.ModelGraphs_reorganizeRawDataForResultTable(results_given_for_models, model_instances);
            var result_expected = Object({
                test_codes: [Object({
                    timestamp: '2017-10-27 12:04:53.156645+00:00',
                    id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8',
                    test_id: 'cfdb6b8b-9017-4191-a904-1527c7140001',
                    test_name: 'name 2',
                    line_id: 'Tt22 ( 1.5nhf )',
                    model_instances: [
                        [Object({ id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', version: 'version 1', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', version: 'version 2', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: '69f3495a-dd92-4165-aa91-2d3811d0ba0b', version: 'version 3', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: 'eebce4df-e83a-4537-85b3-c5488848cc4b', version: ',jkuy', description: null, parameters: 'g,jg', code_format: null, source: 'https://collab.humanbrainproject.eu', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' })]
                    ],
                    last_result_timestamp: undefined
                }), Object({
                    timestamp: '2017-10-03 12:18:04.653952+00:00',
                    id: '35d9ced3-9a2d-49a8-b7bf-cb67cb42a05a',
                    test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81',
                    test_name: 'name 1',
                    line_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 1.1 )',
                    model_instances: [
                        [Object({ id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', version: 'version 1', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', version: 'version 2', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: '69f3495a-dd92-4165-aa91-2d3811d0ba0b', version: 'version 3', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: 'eebce4df-e83a-4537-85b3-c5488848cc4b', version: ',jkuy', description: null, parameters: 'g,jg', code_format: null, source: 'https://collab.humanbrainproject.eu', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' })]
                    ],
                    last_result_timestamp: undefined
                }), Object({
                    timestamp: '2017-10-03 12:18:04.870213+00:00',
                    id: 'f9e9d549-738e-4600-91ae-bff5eaec2991',
                    test_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81',
                    test_name: 'name 1',
                    line_id: '53a7a2db-b18f-49ef-b1de-88bd48960c81 ( 2.1 )',
                    model_instances: [
                        [Object({ id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', version: 'version 1', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283', version: 'version 2', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: '69f3495a-dd92-4165-aa91-2d3811d0ba0b', version: 'version 3', description: null, parameters: 'param', code_format: null, source: 'http://dd.com', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' }), Object({ id: 'eebce4df-e83a-4537-85b3-c5488848cc4b', version: ',jkuy', description: null, parameters: 'g,jg', code_format: null, source: 'https://collab.humanbrainproject.eu', model_id: '61df5b12-c885-4cb7-a511-e5315101b420' })]
                    ],
                    last_result_timestamp: undefined
                })]
            });
            expect(res).toEqual(result_expected);
        })
    })

    describe('testing utilitary functions', function() {
        it('should get color array', function() {
            var res = Graphics._get_color_array(results_given.model_instances);
            var result_expected = Object({ 'a091c6b0-9f86-4094-be62-4e42bdcebc7f': '781c81', '4d02d0a9-adfc-4b9e-af4a-2f1f007e1283': 'd92120' });
            expect(res).toEqual(result_expected)
        })
        it('should sort results by timestamp desc', function() {
            var res = Graphics._sort_results_by_timestamp_desc(results_given.model_instances['a091c6b0-9f86-4094-be62-4e42bdcebc7f'], results_given.model_instances['4d02d0a9-adfc-4b9e-af4a-2f1f007e1283'])
            expect(res).toBeGreaterThan(0);
        })

        it(' _sort_results_by_timestamp_asc', function() {
            var res = Graphics._sort_results_by_timestamp_asc(results_given.model_instances['a091c6b0-9f86-4094-be62-4e42bdcebc7f'], results_given.model_instances['4d02d0a9-adfc-4b9e-af4a-2f1f007e1283'])
            expect(res).toBeLessThan(0);
        })
        it('_sort_by_last_result_timestamp_desc', function() {
            var res = Graphics._sort_results_by_timestamp_desc(results_given.model_instances['a091c6b0-9f86-4094-be62-4e42bdcebc7f'], results_given.model_instances['4d02d0a9-adfc-4b9e-af4a-2f1f007e1283'])
            expect(res).toBeGreaterThan(0);
        })
        it('_sort_results_by_x', function() {
            var a = { x: 0 }
            var b = { x: 1 }
            var res = Graphics._sort_results_by_x(a, b);
            expect(res).toEqual(-1);
        })

        it('should get min max Yvalues if results_data is defined', function() {
            var results = [
                [
                    Object({ id: '341865f0-c934-448c-902e-cc02ddec7fa1', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.8, passed: null, timestamp: '2017-11-14T15:35:25.344722Z', platform: 'azerty', project: 'azerty', normalized_score: 0.8 }),
                    Object({ id: '269e0db3-b587-46dd-a639-ee2383390580', model_version_id: 'a091c6b0-9f86-4094-be62-4e42bdcebc7f', test_code_id: '9d39eebd-3185-44d6-9cea-d0819abf8ba8', results_storage: 'azerty', score: 0.3, passed: null, timestamp: '2017-11-14T15:35:25.235718Z', platform: 'azerty', project: 'azerty', normalized_score: 0.3 })
                ]
            ]

            var res = Graphics._get_min_max_yvalues(results);
            expect(res).toEqual([0.27, 0.8800000000000001]);
        })
        it('should get min max values and return [null, null] if results_data is undefined', function() {
            var results = []

            var res = Graphics._get_min_max_yvalues(results);
            expect(res).toEqual([null, null]);
        })
        it('should get min max Xvalues', function() {
            var abscissa_value = Object({ "1.1": 0, "2.1": 1, "1.5nhf": 2, mii: 3 });

            var res = Graphics._get_min_max_xvalues(abscissa_value);
            expect(res).toEqual(Object({ value: [0, 3], range: [0, 1, 2, 3] }));
        })
    })
});
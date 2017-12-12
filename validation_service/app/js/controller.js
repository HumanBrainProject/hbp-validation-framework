'use strict';

/* Controllers */
var testApp = angular.module('testApp');

testApp.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', "ScientificModelRest", "ValidationTestDefinitionRest", 'CollabParameters', 'IsCollabMemberRest', 'Context', 'ScientificModelInstanceRest', 'ValidationTestCodeRest', 'DataHandler',
    function($scope, $rootScope, $http, $location, ScientificModelRest, ValidationTestDefinitionRest, CollabParameters, IsCollabMemberRest, Context, ScientificModelInstanceRest, ValidationTestCodeRest, DataHandler) {

        Context.setService().then(function() {


            $scope.Context = Context;
            var ctx = Context.getCtx();
            var app_id = Context.getAppID();


            if (Context.getStateType() == "" || Context.getStateType() == undefined) {

                CollabParameters.setService(ctx).then(function() {

                    $scope.collab_species = CollabParameters.getParametersOrDefault("species");
                    $scope.collab_brain_region = CollabParameters.getParametersOrDefault("brain_region");
                    $scope.collab_cell_type = CollabParameters.getParametersOrDefault("cell_type");
                    $scope.collab_model_type = CollabParameters.getParametersOrDefault("model_type");
                    $scope.collab_test_type = CollabParameters.getParametersOrDefault("test_type");
                    $scope.collab_data_modalities = CollabParameters.getParametersOrDefault("data_modalities");
                    $scope.collab_organization = CollabParameters.getParametersOrDefault("organization");

                    // $scope.models = ScientificModelRest.get({ app_id: app_id }, function(data) {});

                    DataHandler.loadModels({ app_id: app_id }).then(function(data) {
                        $scope.models = data
                        $scope.$apply()
                    });


                    // $scope.tests = ValidationTestDefinitionRest.get({ app_id: app_id }, function(data) {});
                    DataHandler.loadTests({ app_id: app_id }).then(function(data) {
                        $scope.tests = data
                        $scope.$apply()
                    });
                    // //for test
                    // $scope.put_test1 = ValidationTestCodeRest.put({ app_id: app_id, test_definition_id: "53a7a2db-b18f-49ef-b1de-88bd48960c81", version: "1.1" });
                });
            } else {
                var element;

                var state_type = Context.getStateType();
                element = Context.getState();

                if (state_type == "model") {
                    Context.validation_goToModelDetailView(element);
                } else if (state_type == "test") {
                    Context.validation_goToTestDetailView(element);
                } else if (state_type == "result") {
                    Context.validation_goToResultDetailView(element);
                }

            }

        });





    }
]);

testApp.controller('ValTestCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'CollabParameters', 'IsCollabMemberRest', 'Context', 'DataHandler',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, CollabParameters, IsCollabMemberRest, Context, DataHandler) {

        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {

                $scope.collab_species = CollabParameters.getParametersOrDefault("species");
                $scope.collab_brain_region = CollabParameters.getParametersOrDefault("brain_region");
                $scope.collab_cell_type = CollabParameters.getParametersOrDefault("cell_type");
                $scope.collab_model_type = CollabParameters.getParametersOrDefault("model_type");
                $scope.collab_test_type = CollabParameters.getParametersOrDefault("test_type");
                $scope.collab_data_modalities = CollabParameters.getParametersOrDefault("data_modalities");
                // $scope.collab_organization = CollabParameters.getParameters("organization");

                $scope.is_collab_member = false;
                $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id, });
                $scope.is_collab_member.$promise.then(function() {
                    $scope.is_collab_member = $scope.is_collab_member.is_member;
                });

                // $scope.test_list = ValidationTestDefinitionRest.get({ app_id: app_id }, function(data) {});

                // $scope.tests = ValidationTestDefinitionRest.get({ app_id: app_id }, function(data) {});
                DataHandler.loadTests({ app_id: app_id }).then(function(data) {
                    $scope.test_list = data
                    $scope.$apply()
                });
            });
        });

    }
]);


testApp.controller('ValModelDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest', 'CollabParameters', 'IsCollabMemberRest', 'AppIDRest', 'Graphics', 'Context', 'AuthorizedCollabParameterRest',

    function($scope, $rootScope, $http, $location, $stateParams, ScientificModelRest, ScientificModelInstanceRest, CollabParameters, IsCollabMemberRest, AppIDRest, Graphics, Context, AuthorizedCollabParameterRest) {
        $scope.Context = Context;
        // var latest_test_versions_line_id = {};
        Context.setService().then(function() {
            $scope.Context = Context;
            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {
                // $scope.is_collab_member = false;
                // $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id });
                // $scope.is_collab_member.$promise.then(function() {
                //     $scope.is_collab_member = $scope.is_collab_member.is_member;
                // });

                $scope.authorized_parameters = AuthorizedCollabParameterRest.get();

                // console.log($scope.authorized_parameters);

                $scope.model = ScientificModelRest.get({ app_id: app_id, id: $stateParams.uuid });
                $scope.model_instances = ScientificModelInstanceRest.get({ app_id: app_id, model_id: $stateParams.uuid })
                $scope.model.$promise.then(function() {
                    $scope.model_instances.$promise.then(function() {
                        //graph and table results
                        Graphics.getResultsfromModelResultID2($scope.model, $scope.model_instances, undefined).then(function(init_graph) {
                            $scope.data = init_graph.values;
                            $scope.init_graph_all = new Array();
                            $scope.line_result_focussed = new Array();
                            $scope.options5 = new Array();
                            $scope.init_checkbox = new Array();


                            for (var i in $scope.authorized_parameters.score_type) {

                                var score_type = $scope.authorized_parameters.score_type[i].authorized_value;

                                Graphics.getResultsfromModelResultID2($scope.model, $scope.model_instances, score_type).then(function(value) {
                                    var key = $scope.init_graph_all.push(value);

                                    $scope.options5.push(Graphics.get_lines_options('', '', $scope.authorized_parameters.score_type[key - 1].authorized_value, "", value.results, "model", key - 1));
                                    //  $scope.init_checkbox.push(value.list_ids);

                                    $scope.line_result_focussed.push();
                                    $scope.$apply();


                                    if ($scope.authorized_parameters.score_type[i] == $scope.authorized_parameters.score_type[$scope.authorized_parameters.score_type.length - 1]) {
                                        init_checkbox_latest_versions();
                                    }

                                });

                            };
                            $scope.$on('data_focussed:updated', function(event, data, key) {
                                $scope.line_result_focussed[key] = data;
                                $scope.$apply();
                            });


                            // console.log($scope.init_graph_all);
                            $scope.init_checkbox = init_graph.list_ids;
                            // $scope.init_graph = format_data_for_table(init_graph);
                            $scope.init_graph = init_graph;


                            var raw_results_data = init_graph.results_data
                            $scope.data_for_table = raw_result_data_formated_for_table_data(raw_results_data);
                            console.log("$scope.data_for_table", $scope.data_for_table)

                        })


                    });
                });
            }).then(function() {

            });

        });

        var raw_result_data_formated_for_table_data = function(raw) {

            for (var i in raw.test_codes) {
                // console.log("previous model_instances", raw.test_codes[i].model_instances);
                raw.test_codes[i].model_instances = reformat_model_instances_into_sorted_array(raw.test_codes[i].model_instances);
                raw.test_codes[i].model_instances = reformat_model_instances_results_into_sorted_array(raw.test_codes[i].model_instances);
                // console.log("new model_instances", raw.test_codes[i].model_instances);
            }
            return raw;

        };
        var reformat_model_instances_results_into_sorted_array = function(model_instances) {
            for (var i in model_instances) {
                model_instances[i].results = dict_to_array(model_instances[i].results);
                model_instances[i].results = reformat_results_into_sorted_array(model_instances[i].results);
            }

            return model_instances;
        };

        var dict_to_array = function(dict) {
            var array = []
            for (var i in dict) {
                array.push(dict[i]);
            }
            return (array);
        };

        var reformat_results_into_sorted_array = function(results) {
            var temp_results = Object.assign([], results);
            var new_results = [];

            for (var i in results) {
                new_results.push(get_and_clean_newest_result(temp_results));
            }

            return new_results;
        }

        var get_and_clean_newest_result = function(list) {
            var newest_element = null;
            for (var i in list) {

                if (newest_element == null) {
                    newest_element = list[i];
                    var count = i;
                } else {
                    if (list[i].timestamp < newest_element.timestamp) {
                        newest_element = list[i];
                        var count = i;
                    }
                }
            }
            delete(list[count]);
            return (newest_element);

        };

        var reformat_model_instances_into_sorted_array = function(model_instances) {

            var temp_model_instances = Object.assign({}, model_instances);
            var new_instances = [];

            for (var new_instances_count in model_instances) {
                new_instances.push(get_and_clean_newest_instance(temp_model_instances));
            }

            return new_instances;

        };


        var get_and_clean_newest_instance = function(dict) {

            var newest_element = null;
            for (var i in dict) {

                if (newest_element == null) {
                    newest_element = dict[i];
                    var count = i;
                } else {
                    if (dict[i].timestamp < newest_element.timestamp) {
                        newest_element = dict[i];
                        var count = i;
                    }
                }
            }
            delete(dict[count]);
            return (newest_element);

        }

        var get_newest = function(dict) {


            var newest_element = null;
            for (var i in dict) {
                if (dict[i].timestamp < newest_element.timestamp || newest_element.timestamp == undefined) {
                    newest_element = dict[i];
                }
            }
            return (newest_element);

        }


        // var format_data_for_table = function(init_graph) {
        //     console.log(init_graph)

        //     for (i in init_graph.values) {
        //         init_graph.values[i]
        //         init_graph.values[i].last_result = "";
        //         init_graph.values[i].versions_for_table = organise_version_for_table(init_graph.values[i].values);
        //     }


        //     return (init_graph);
        // };

        // var organise_version_for_table = function(values) {

        //     var formated_data = [];

        //     console.log("IN for :");
        //     for (var i in values) {

        //         console.log(values);

        //         var formated_data_index = get_index_label_in_list_dict(values[i].label, formated_data)

        //         console.log("formated_data ", formated_data)
        //         console.log("formated_data_index", formated_data_index)

        //         //if formated_data has values[i].label
        //         if (Number.isInteger(formated_data_index)) {

        //             console.log(formated_data[formated_data_index]);

        //             // then add the dict value
        //             formated_data[formated_data_index].values.push({ id_test_result: values[i].id_test_result, score: values[i].y });


        //         } else {
        //             // create this new label 
        //             formated_data.push({ label: values[i].label, values: [] })

        //             //add the value inside
        //             formated_data[formated_data.length - 1].values.push({ id_test_result: values[i].id_test_result, score: values[i].y });

        //         }
        //     }

        // };
        // var get_index_label_in_list_dict = function(label, list_dict) {
        //     for (var i in list_dict) {
        //         if (list_dict[i].label == label) {
        //             return (i);
        //         }
        //     }
        //     return (false);

        // }

        var init_checkbox_latest_versions = function() {
            var list_ids = [];

            for (var i = 0; i < $scope.init_graph_all.length; i++) {
                if ($scope.init_graph_all[i].values.length > 0) {
                    var graph = $scope.init_graph_all[i];
                    var score_type = graph.values[0].test_score_type

                    for (var line_id in graph.latest_test_versions_line_id) {
                        list_ids.push(graph.latest_test_versions_line_id[line_id].latest_line_id);
                        // console.log(graph.latest_test_versions_line_id[line_id].latest_line_id);
                        document.getElementById('check-' + i + '-' + graph.latest_test_versions_line_id[line_id].latest_line_id).checked = true;
                    }

                    $scope.init_graph_all[i].values = Graphics.getUpdatedGraph($scope.init_graph_all[i].values, list_ids); // might have problem here
                    $scope.line_result_focussed[i] = null;

                }
            }
        };

        $scope.updateGraph = function(key) {
            var list_ids = _IsCheck(key);

            console.log("key : ", key);
            console.log("list_ids : ", list_ids);

            console.log("$scope.init_graph_all[key]", $scope.init_graph_all[key]);
            console.log("$scope.init_graph", $scope.init_graph);


            $scope.init_graph_all[key].values = Graphics.getUpdatedGraph($scope.init_graph.values, list_ids);
            $scope.line_result_focussed[key] = null;
        };

        var _IsCheck = function(key) {
            var list_ids = [];
            var i = 0;

            for (i; i < $scope.init_graph_all[key].list_ids.length; i++) {
                if (document.getElementById('check-' + key + '-' + $scope.init_graph_all[key].list_ids[i]).checked) {
                    list_ids.push($scope.init_graph_all[key].list_ids[i]);
                };
            };
            return list_ids
        };
    }
]);

testApp.directive('markdown', function() {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            function renderMarkdown() {
                var htmlText = converter.makeHtml(scope.$eval(attrs.markdown) || '');
                element.html(htmlText);
            }
            scope.$watch(attrs.markdown, renderMarkdown);
            renderMarkdown();
        }
    };
});


testApp.controller('ValTestDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', '$state', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest', 'CollabParameters', 'TestCommentRest', "IsCollabMemberRest", "Graphics", "Context", 'TestTicketRest', 'AuthorizedCollabParameterRest', 'ValidationTestAliasRest', 'NotificationRest', 'AreVersionsEditableRest', 'DataHandler',

    function($scope, $rootScope, $http, $location, $stateParams, $state, ValidationTestDefinitionRest, ValidationTestCodeRest, CollabParameters, TestCommentRest, IsCollabMemberRest, Graphics, Context, TestTicketRest, AuthorizedCollabParameterRest, ValidationTestAliasRest, NotificationRest, AreVersionsEditableRest, DataHandler) {
        Context.setService().then(function() {
            $scope.Context = Context;
            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {

                $scope.detail_test = ValidationTestDefinitionRest.get({ app_id: app_id, id: $stateParams.uuid });

                $scope.auhtorized_params = AuthorizedCollabParameterRest.get();

                $scope.species = CollabParameters.getParametersOrDefault("species");
                $scope.brain_region = CollabParameters.getParametersOrDefault("brain_region");
                $scope.cell_type = CollabParameters.getParametersOrDefault("cell_type");
                $scope.model_type = CollabParameters.getParametersOrDefault("model_type");
                $scope.test_type = CollabParameters.getParametersOrDefault("test_type");
                $scope.data_modalities = CollabParameters.getParametersOrDefault("data_modalities");

                $scope.detail_version_test = ValidationTestCodeRest.get({ app_id: app_id, test_definition_id: $stateParams.uuid });
                //TODO: take detail_test and detail_version_test in one get

                $scope.detail_test.$promise.then(function() {
                    // $scope.is_collab_member = false;
                    // $scope.is_collab_member = IsCollabMemberRest.get({ app_id: $scope.detail_test.tests[0].app_id });
                    // $scope.is_collab_member.$promise.then(function() {
                    //     $scope.is_collab_member = $scope.is_collab_member.is_member;
                    // });
                    $scope.detail_version_test.$promise.then(function() {
                        Graphics.getResultsfromTestID2($scope.detail_test, $scope.detail_version_test).then(function(init_graph) {


                            $scope.result_focussed;
                            $scope.$on('data_focussed:updated', function(event, data, key) {
                                $scope.result_focussed = data;
                                $scope.$apply();
                            });

                            $scope.init_graph = init_graph;

                            $scope.init_checkbox = init_graph.list_ids;
                            $scope.graphic_options = Graphics.get_lines_options('', '', $scope.detail_test.tests[0].score_type, "", init_graph.results, "test", "", init_graph.abs_info);
                            var raw_data = init_graph.raw_data;
                            raw_data.$promise.then(function() {
                                $scope.data_for_table = _reorganize_raw_data_for_table(raw_data);
                                var recent_datas = _get_more_recent_versions(init_graph.values, $scope.data_for_table);
                                $scope.graphic_data = recent_datas.values;
                                check_elements_in_checkbox(init_graph.list_ids, recent_datas.list_ids);

                            });

                        }).catch(function(err) {
                            console.error('Erreur !');
                            console.dir(err);
                            console.log(err);
                        });

                        //for tab version (edit)
                        $scope.version_in_edition = [];
                        $scope.version_is_editable = [];
                        //for tab_comments
                        $scope.test_tickets = TestTicketRest.get({ app_id: app_id, test_id: $stateParams.uuid });
                        $scope.comments_to_show = [];
                        $scope.create_comment_to_show = [];
                        $scope.button_save_ticket = [];
                        $scope.button_save_comment = [];




                        var version_editable = AreVersionsEditableRest.get({ app_id: app_id, test_id: $stateParams.uuid });
                        version_editable.$promise.then(function(versions) {
                            $scope.version_is_editable = versions.are_editable;
                        });

                    });
                });

                var check_elements_in_checkbox = function(list_all_ids, recent_ids) {
                    $(function() {
                        //not working yet
                        // console.log(document.querySelectorAll('*[id]:not([id=""])'));
                        for (var id in recent_ids) {
                            var i = 0;
                            for (i; i <= list_all_ids.length; i++) {
                                if (recent_ids[id] == list_all_ids[i]) {
                                    $("#check-" + i).prop("checked", true);
                                    // console.log($("#check-" + i).is(":checked"));
                                };
                            };
                        };
                    });
                };

                var _get_more_recent_versions = function(values, data) {

                    var key_list_recent_versions = _get_more_recent_version_keys(data.model_instances)
                        //take values corresponding to the key list
                    var new_values = [];
                    for (var value in values) {
                        for (var key in key_list_recent_versions) {
                            if (values[value].key == key_list_recent_versions[key]) {
                                new_values.push(values[value]);
                            };
                        }

                    };

                    return { values: new_values, list_ids: key_list_recent_versions }
                }

                var _get_more_recent_version_keys = function(model_instances) {
                    var temp_models = [];
                    var res = [];
                    for (var instance in model_instances) {
                        if (temp_models[model_instances[instance].model_name]) {
                            temp_models[model_instances[instance].model_name].push(model_instances[instance]);
                        } else {
                            temp_models[model_instances[instance].model_name] = [];
                            temp_models[model_instances[instance].model_name].push(model_instances[instance]);
                        }
                    }
                    //reorder data by time and take the last one
                    for (var raw in temp_models) {
                        temp_models[raw].sort(_sort_by_timestamp_desc);
                        res.push(temp_models[raw][0].line_id);
                    }
                    return res
                }

                var _reorganize_raw_data_for_table = function(data) {
                    var organized_data = new Object();
                    organized_data.model_instances = [];


                    for (var model_instance in data.model_instances) {
                        var instance = new Object();
                        if (data.model_instances[model_instance].model_alias && data.model_instances[model_instance].model_alias !== null && data.model_instances[model_instance].model_alias !== '' && data.model_instances[model_instance].model_alias !== "None") {
                            instance.line_id = data.model_instances[model_instance].model_alias + ' ( ' + data.model_instances[model_instance].version + ' )';

                        } else {
                            instance.line_id = data.model_instances[model_instance].model_id + ' ( ' + data.model_instances[model_instance].version + ' )';
                        }
                        instance.timestamp = data.model_instances[model_instance].timestamp;
                        instance.id = model_instance;
                        instance.model_id = data.model_instances[model_instance].model_id;
                        instance.model_name = data.model_instances[model_instance].model_name;

                        instance.test_instances = [];

                        for (var test_instance in data.model_instances[model_instance].test_codes) {
                            var code = new Object();
                            code.version = data.model_instances[model_instance].test_codes[test_instance].version;
                            code.timestamp = data.model_instances[model_instance].test_codes[test_instance].timestamp;

                            code.results = [];
                            for (var result in data.model_instances[model_instance].test_codes[test_instance].results) {
                                code.results.push(data.model_instances[model_instance].test_codes[test_instance].results[result]);
                            }
                            //order results by timestamp
                            code.results = code.results.sort(_sort_by_timestamp_desc);

                            instance.test_instances.push(code);
                        }
                        //order test_instances by timestamp
                        instance.test_instances = instance.test_instances.sort(_sort_by_timestamp_asc);
                        organized_data.model_instances.push(instance);
                    }
                    return organized_data;

                };


                var _sort_by_timestamp_desc = function(a, b) {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                }

                var _sort_by_timestamp_asc = function(a, b) {
                    return new Date(a.timestamp) - new Date(b.timestamp);
                }

                var _add_params = function() {
                    $scope.test_code.test_definition_id = $scope.detail_test.tests[0].id;
                };

                $scope.selected_tab = "";
                $scope.toogleTabs = function(id_tab) {
                    $scope.selected_tab = id_tab;

                    var list_tab_id = [
                        "tab_description",
                        "tab_version",
                        "tab_new_version",
                        "tab_results", // this one must be visibility: hidden or visible
                        "tab_comments",
                        "tab_edit_test",
                    ]

                    //set all tabs style display to "none"
                    var i = 0;
                    for (i; i < list_tab_id.length; i++) {
                        if (list_tab_id[i] == "tab_results") {
                            document.getElementById(list_tab_id[i]).style.visibility = "hidden";

                        } else {
                            document.getElementById(list_tab_id[i]).style.display = "none";
                        }

                    }

                    //set id_tab style display to "block" or visible
                    if (id_tab == "tab_results") {
                        document.getElementById(id_tab).style.visibility = "visible";
                    } else {
                        document.getElementById(id_tab).style.display = "block";
                    };

                    _active_tab(id_tab);
                };

                var _active_tab = function(id_tab) {
                    var a = document.getElementById("li_tab_description");
                    var b = document.getElementById("li_tab_version");
                    var c = document.getElementById("li_tab_results");
                    var d = document.getElementById("li_tab_comments");
                    a.className = b.className = c.className = d.className = "nav-link";
                    if (id_tab != "tab_new_version" || id_tab != "tab_edit_test") {
                        var e = document.getElementById("li_" + id_tab);
                        e.className += " active";

                    };
                };
                $scope.updateGraph = function() {
                    var list_ids = _IsCheck();
                    $scope.graphic_data = Graphics.getUpdatedGraph($scope.init_graph.values, list_ids);
                    $scope.result_focussed = null;
                    // $scope.$apply();
                    // $scope.api.refresh();
                };
                var _IsCheck = function() {
                    var list_ids = [];
                    var i = 0;
                    for (i; i < $scope.init_checkbox.length; i++) {
                        if (document.getElementById('check-' + i).checked) {
                            list_ids.push($scope.init_checkbox[i]);
                        };
                    };
                    return list_ids
                };
                $scope.saveVersion = function() {
                    _add_params();

                    var parameters = JSON.stringify([$scope.test_code]);
                    var test_version_response = ValidationTestCodeRest.save({ app_id: app_id, test_definition_id: $scope.detail_test.tests[0].id }, parameters).$promise.then(function() {
                        document.getElementById("tab_description").style.display = "none";
                        document.getElementById("tab_version").style.display = "block";
                        document.getElementById("tab_new_version").style.display = "none";
                        document.getElementById("tab_results").style.visibility = "hidden";
                        document.getElementById("tab_comments").style.display = "none";
                        $state.reload();
                    }).catch(function(e) {
                        alert(e.data);
                    });
                };

                $scope.editTest = function() {
                    if ($scope.detail_test.tests[0].alias != '' && $scope.detail_test.tests[0].alias != null) {
                        $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: app_id, test_id: $scope.detail_test.tests[0].id, alias: $scope.detail_test.tests[0].alias });
                        $scope.alias_is_valid.$promise.then(function() {
                            if ($scope.alias_is_valid.is_valid) {
                                var parameters = JSON.stringify($scope.detail_test.tests[0]);
                                ValidationTestDefinitionRest.put({ app_id: app_id, id: $scope.detail_test.tests[0].id }, parameters).$promise.then(function() {
                                    document.getElementById("tab_description").style.display = "none";
                                    document.getElementById("tab_version").style.display = "block";
                                    document.getElementById("tab_new_version").style.display = "none";
                                    document.getElementById("tab_results").style.display = "none";
                                    document.getElementById("tab_comments").style.display = "none";
                                    $state.reload();
                                    DataHandler.setStoredTestsAsOutdated();
                                });
                            } else {
                                alert('Cannot update the test. Please check the alias.');
                            };
                        });
                    } else {
                        $scope.detail_test.tests[0].alias = null;
                        var parameters = JSON.stringify($scope.detail_test.tests[0]);
                        ValidationTestDefinitionRest.put({ app_id: app_id, id: $scope.detail_test.tests[0].id }, parameters).$promise.then(function() {
                            document.getElementById("tab_description").style.display = "none";
                            document.getElementById("tab_version").style.display = "block";
                            document.getElementById("tab_new_version").style.display = "none";
                            document.getElementById("tab_results").style.display = "none";
                            document.getElementById("tab_comments").style.display = "none";
                            $state.reload();
                            DataHandler.setStoredTestsAsOutdated();
                        });
                    }
                };
                $scope.editVersion = function(index) {
                    angular.element(document.querySelector("#editable-repository-" + index)).attr('contenteditable', "true");
                    angular.element(document.querySelector("#editable-repository-" + index)).attr('bgcolor', 'ghostwhite');
                    angular.element(document.querySelector("#editable-version-" + index)).attr('contenteditable', "true");
                    angular.element(document.querySelector("#editable-version-" + index)).attr('bgcolor', 'ghostwhite');
                    angular.element(document.querySelector("#editable-path-" + index)).attr('contenteditable', "true");
                    angular.element(document.querySelector("#editable-path-" + index)).attr('bgcolor', 'ghostwhite');
                    $scope.version_in_edition.push(index);

                };
                $scope.save_edited_version = function(index) {
                    var repository = $("#editable-repository-" + index).text();
                    var version = $("#editable-version-" + index).text();
                    var pathway = $("#editable-path-" + index).text();
                    var new_version = JSON.stringify([
                        { 'id': index, 'repository': repository, 'version': version, 'path': pathway }
                    ]);
                    ValidationTestCodeRest.put({ app_id: app_id }, new_version).$promise.then(function() {
                        angular.element(document.querySelector("#editable-repository-" + index)).attr('contenteditable', "false");
                        angular.element(document.querySelector("#editable-repository-" + index)).attr('bgcolor', 'white');
                        angular.element(document.querySelector("#editable-version-" + index)).attr('contenteditable', "false");
                        angular.element(document.querySelector("#editable-version-" + index)).attr('bgcolor', 'white');
                        angular.element(document.querySelector("#editable-path-" + index)).attr('contenteditable', "false");
                        angular.element(document.querySelector("#editable-path-" + index)).attr('bgcolor', 'white');
                        $scope.version_in_edition.splice(index);
                    });


                }
                $scope.checkAliasValidity = function() {
                    $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: app_id, test_id: $scope.detail_test.tests[0].id, alias: $scope.detail_test.tests[0].alias });
                };

                var _send_notification = function() {
                    NotificationRest.post({ app_id: app_id, ctx: ctx }).$promise.then(function(data) {
                        // console.log(data)
                    });
                }

                $scope.saveTicket = function() {
                    $scope.ticket.test_id = $stateParams.uuid;
                    var data = JSON.stringify($scope.ticket);
                    $scope.new_ticket = TestTicketRest.post({ app_id: app_id }, data, function(value) {})
                    $scope.new_ticket.$promise.then(function() {
                        // console.log($scope.new_ticket)
                        $scope.test_tickets.tickets.push($scope.new_ticket.new_ticket[0]);
                        document.getElementById("formT").reset();
                        _send_notification();
                    });

                };
                $scope.saveComment = function(ticket_id, comment_post, ticket_index) {
                    comment_post.Ticket_id = ticket_id;
                    var data = JSON.stringify(comment_post);
                    $scope.new_comment = TestCommentRest.post({ app_id: app_id }, data, function(value) {})
                    $scope.new_comment.$promise.then(function() {
                        $scope.create_comment_to_show.splice($scope.create_comment_to_show.indexOf(ticket_id));

                        if ($scope.test_tickets.tickets[ticket_index].comments) {
                            $scope.test_tickets.tickets[ticket_index].comments.push($scope.new_comment.new_comment[0]);
                        } else {
                            $scope.test_tickets.tickets[ticket_index].comments = [];
                            $scope.test_tickets.tickets[ticket_index].comments.push($scope.new_comment.new_comment[0]);
                        }
                        document.getElementById("btn-create-comment-" + ticket_id).innerHTML = "Reply";
                        document.getElementById("formC-" + ticket_id).reset();
                    });

                };

                $scope._reset = function(form) {
                    if (form) {
                        form.$setPristine();
                        form.$setUntouched();
                    };
                };

                $scope.showComments = function(ticket_id) {
                    var classe = document.getElementById("button-com-" + ticket_id).className;
                    if (classe == "glyphicon glyphicon-plus button-click") {
                        $scope.comments_to_show.push(ticket_id);
                        document.getElementById("button-com-" + ticket_id).className = "glyphicon glyphicon-minus button-click";
                    } else {
                        $scope.comments_to_show.splice($scope.comments_to_show.indexOf(ticket_id));
                        document.getElementById("button-com-" + ticket_id).className = "glyphicon glyphicon-plus button-click";
                    };
                };
                $scope.showCreateComment = function(ticket_id) {
                    var button = document.getElementById("btn-create-comment-" + ticket_id);
                    if (button.innerHTML == "Reply") {
                        $scope.create_comment_to_show.push(ticket_id);
                        button.innerHTML = "Hide";
                    } else {
                        $scope.create_comment_to_show.splice($scope.create_comment_to_show.indexOf(ticket_id));
                        button.innerHTML = "Reply";

                    };
                };

                $scope.editTicket = function(ticket_id) {
                    angular.element(document.querySelector("#editable-title-" + ticket_id)).attr('contenteditable', "true");
                    angular.element(document.querySelector("#editable-title-" + ticket_id)).attr('bgcolor', 'ghostwhite');
                    angular.element(document.querySelector("#editable-text-" + ticket_id)).attr('contenteditable', "true");
                    angular.element(document.querySelector("#editable-text-" + ticket_id)).attr('bgcolor', 'ghostwhite');
                    $scope.button_save_ticket.push(ticket_id);
                };

                $scope.saveEditedTicket = function(ticket_id) {
                    var text = $("#editable-text-" + ticket_id).text();
                    var title = $("#editable-title-" + ticket_id).text();
                    var parameters = JSON.stringify({ 'id': ticket_id, 'title': title, 'text': text });
                    var a = TestTicketRest.put({ app_id: app_id }, parameters).$promise.then(function(data) {
                        angular.element(document.querySelector("#editable-title-" + ticket_id)).attr('contenteditable', "false");
                        angular.element(document.querySelector("#editable-title-" + ticket_id)).attr('bgcolor', '');
                        angular.element(document.querySelector("#editable-text-" + ticket_id)).attr('contenteditable', "false");
                        angular.element(document.querySelector("#editable-text-" + ticket_id)).attr('bgcolor', 'white');
                        $scope.button_save_ticket.splice($scope.button_save_ticket.indexOf(ticket_id));
                    });
                };
                $scope.editComment = function(com_id) {
                    angular.element(document.querySelector("#editable-ctext-" + com_id)).attr('contenteditable', "true");
                    angular.element(document.querySelector("#editable-ctext-" + com_id)).attr('bgcolor', 'ghostwhite');
                    $scope.button_save_comment.push(com_id);
                };

                $scope.saveEditedComment = function(com_id) {
                    var text = $("#editable-ctext-" + com_id).text();

                    var parameters = JSON.stringify({ 'id': com_id, 'text': text });
                    var a = TestCommentRest.put({ app_id: app_id }, parameters).$promise.then(function(data) {
                        angular.element(document.querySelector("#editable-ctext-" + com_id)).attr('contenteditable', "false");
                        angular.element(document.querySelector("#editable-ctext-" + com_id)).attr('bgcolor', 'white');
                        $scope.button_save_comment.splice($scope.button_save_comment.indexOf(com_id));
                    });
                }
                $scope.isInArray = function(value, array) {
                    return array.indexOf(value) > -1;
                }

            });

        });



    }
]);

testApp.controller('ValTestResultDetailCtrl', ['$window', '$scope', '$rootScope', '$http', '$sce', '$location', '$stateParams', 'IsCollabMemberRest', 'AppIDRest', 'ValidationResultRest', 'CollabParameters', 'ScientificModelRest', 'ValidationTestDefinitionRest', "Context", "clbStorage", "clbAuth",
    function($window, $scope, $rootScope, $http, $sce, $location, $stateParams, IsCollabMemberRest, AppIDRest, ValidationResultRest, CollabParameters, ScientificModelRest, ValidationTestDefinitionRest, Context, clbStorage, clbAuth) {
        var vm = this;

        Context.setService().then(function() {
            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {

                var test_result = ValidationResultRest.get({ id: $stateParams.uuid, order: "", detailed_view: true });

                test_result.$promise.then(function() {
                    $scope.test_result = test_result.results[0];

                    var result_storage = $scope.test_result.results_storage;
                    result_storage = split_result_storage_sting(result_storage);
                    var collab_storage = result_storage[0];
                    var folder_name = result_storage[1];

                    clbStorage.getEntity({ path: "?path=/" + collab_storage + "/" + folder_name + "/" }).then(function(collabStorageFolder) {

                        clbStorage.getChildren({ uuid: collabStorageFolder.uuid, entity_type: 'folder' }).then(function(storage_folder_children) {
                                $scope.storage_files = storage_folder_children.results

                            }, function() {})
                            .finally(function() {});

                    }, function(not_worked) {}).finally(function() {});

                });
            });


            var split_result_storage_sting = function(storage_string) {
                storage_string = storage_string.slice(10, storage_string.length)
                return (storage_string.split('/'));
            };

            var get_correct_folder_using_name = function(name, folders) {
                for (var i in folders) {
                    if (folders[i].name == name) {
                        return (folders[i]);
                    }
                }
                return null;
            };

            $scope.download_file = function(uuid) {
                clbStorage.downloadUrl({ uuid: uuid }).then(function(DownloadURL) {
                        var DownloadURL = DownloadURL;

                        var win = window.open(DownloadURL, '_blank');
                        win.focus();

                    }, function() {

                    })
                    .finally(function() {

                    });

            };

            $scope.open_overview_file = function(uuid) {

                clbStorage.downloadUrl({ uuid: uuid }).then(function(FileURL) {
                        var FileURL = FileURL;

                        $scope.image = new Image();
                        $scope.image.src = FileURL;

                    }, function() {

                    })
                    .finally(function() {

                    });

            };


        });

    }
]);


testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location', '$timeout', 'CollabParameters', 'Graphics', "Context",

    function($scope, $rootScope, $http, $location, $timeout, CollabParameters, Graphics, Context) {
        Context.setService().then(function() {
            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {

                var temp_test = Graphics.data_fromAPI();
                temp_test.then(function() {
                    $scope.data5 = temp_test.$$state.value;
                });

                $scope.options5 = Graphics.get_lines_options();

                $scope.line_result_focussed;
                $scope.$on('data_focussed:updated', function(event, data) {
                    $scope.line_result_focussed = data;
                    $scope.$apply();
                });

            });

        });
    }
]);


testApp.controller('ValTestCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest', 'CollabParameters', 'Context', 'AuthorizedCollabParameterRest', 'ValidationTestAliasRest', 'DataHandler',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest, CollabParameters, Context, AuthorizedCollabParameterRest, ValidationTestAliasRest, DataHandler) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();


            CollabParameters.setService(ctx).then(function() {

                $scope.alias_is_valid = "";
                $scope.auhtorized_params = AuthorizedCollabParameterRest.get();

                $scope.species = CollabParameters.getParametersOrDefault("species");
                $scope.brain_region = CollabParameters.getParametersOrDefault("brain_region");
                $scope.cell_type = CollabParameters.getParametersOrDefault("cell_type");
                $scope.data_modalities = CollabParameters.getParametersOrDefault("data_modalities");
                $scope.test_type = CollabParameters.getParametersOrDefault("test_type");

                // $scope.data_type = CollabParameters.getParameters("data_type");
                $scope.data_type;


                $scope.saveTest = function() {
                    if ($scope.test.alias != '' && $scope.test.alias != undefined) {
                        $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: app_id, alias: $scope.test.alias });
                        $scope.alias_is_valid.$promise.then(function() {
                            if ($scope.alias_is_valid.is_valid) {
                                var parameters = JSON.stringify({ test_data: $scope.test, code_data: $scope.code });
                                ValidationTestDefinitionRest.save({ app_id: app_id }, parameters).$promise.then(function(data) {
                                    DataHandler.setStoredTestsAsOutdated();
                                    Context.validation_goToTestDetailView(data.uuid);
                                });
                            } else {
                                alert('Cannot update the test. Please check the alias.');
                            };
                        });
                    } else {
                        $scope.test.alias = null;
                        var parameters = JSON.stringify({ test_data: $scope.test, code_data: $scope.code });
                        ValidationTestDefinitionRest.save({ app_id: app_id }, parameters).$promise.then(function(data) {
                            DataHandler.setStoredTestsAsOutdated();
                            Context.validation_goToTestDetailView(data.uuid);
                        });
                    };
                };
                $scope.checkAliasValidity = function() {
                    $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: app_id, alias: $scope.test.alias });
                };
            });

        });
    }
]);




//Filter multiple
testApp.filter('filterMultiple', ['$parse', '$filter', function($parse, $filter) {
    return function(items, keyObj) {
        var x = false;
        if (!angular.isArray(items)) {
            return items;
        }
        var filterObj = {
            data: items,
            filteredData: [],
            applyFilter: function(obj, key) {
                var fData = [];
                if (this.filteredData.length == 0 && x == false)
                    this.filteredData = this.data;
                if (obj) {
                    var fObj = {};
                    if (!angular.isArray(obj)) {
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData, fObj));
                    } else if (angular.isArray(obj)) {
                        if (obj.length > 0) {
                            for (var i = 0; i < obj.length; i++) {
                                if (angular.isDefined(obj[i])) {
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData, fObj));
                                }
                            }
                        }
                    }
                    if (fData.length > 0) {
                        this.filteredData = fData;
                    }
                    if (fData.length == 0) {
                        if (obj != "" && obj != undefined) {
                            this.filteredData = fData;
                            x = true;
                        }
                    }

                }
            }
        };
        if (keyObj) {
            angular.forEach(keyObj, function(obj, key) {
                filterObj.applyFilter(obj, key);
            });
        }

        return filterObj.filteredData;
    }
}]);




//Model catalog
//directives and filters 
var ModelCatalogApp = angular.module('ModelCatalogApp');

ModelCatalogApp.directive('markdown', function() {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            function renderMarkdown() {
                var htmlText = converter.makeHtml(scope.$eval(attrs.markdown) || '');
                element.html(htmlText);
            }
            scope.$watch(attrs.markdown, renderMarkdown);
            renderMarkdown();
        }
    };
});

//Filter multiple
ModelCatalogApp.filter('filterMultiple', ['$parse', '$filter', function($parse, $filter) {
    return function(items, keyObj) {
        var x = false;
        if (!angular.isArray(items)) {
            return items;
        }
        var filterObj = {
            data: items,
            filteredData: [],
            applyFilter: function(obj, key) {
                var fData = [];
                if (this.filteredData.length == 0 && x == false)
                    this.filteredData = this.data;
                if (obj) {
                    var fObj = {};
                    if (!angular.isArray(obj)) {
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData, fObj));
                    } else if (angular.isArray(obj)) {
                        if (obj.length > 0) {
                            for (var i = 0; i < obj.length; i++) {
                                if (angular.isDefined(obj[i])) {
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData, fObj));
                                }
                            }
                        }
                    }
                    if (fData.length > 0) {
                        this.filteredData = fData;
                    }
                    if (fData.length == 0) {
                        if (obj != "" && obj != undefined) {
                            this.filteredData = fData;
                            x = true;
                        }
                    }

                }
            }
        };
        if (keyObj) {
            angular.forEach(keyObj, function(obj, key) {
                filterObj.applyFilter(obj, key);
            });
        }

        return filterObj.filteredData;
    }
}]);

//controllers
ModelCatalogApp.controller('ModelCatalogCtrl', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    'ScientificModelRest',
    'CollabParameters',
    'IsCollabMemberRest',
    'Context',
    'Help',
    'DataHandler',

    function($scope, $rootScope, $http, $location, ScientificModelRest, CollabParameters, IsCollabMemberRest, Context, Help, DataHandler) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            if (Context.getState() == "" || Context.getState() == undefined || Context.getState() == "n") {
                Context.sendState("model", "n");

                CollabParameters.setService(ctx).then(function() {

                    $scope.model_privacy = [{ "name": "private", "value": true }, { "name": "public", "value": false }];
                    $scope.selected_privacy = $scope.model_privacy;

                    $scope.collab_species = CollabParameters.getParametersOrDefault("species");
                    $scope.collab_brain_region = CollabParameters.getParametersOrDefault("brain_region");
                    $scope.collab_cell_type = CollabParameters.getParametersOrDefault("cell_type");
                    $scope.collab_model_type = CollabParameters.getParametersOrDefault("model_type");
                    $scope.collab_organization = CollabParameters.getParametersOrDefault("organization");

                    // $scope.models = ScientificModelRest.get({ app_id: app_id });
                    DataHandler.loadModels({ app_id: app_id }).then(function(data) {
                        $scope.models = data
                        $scope.$apply()
                    });



                    $scope.is_collab_member = false;
                    $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id, });
                    $scope.is_collab_member.$promise.then(function() {
                        $scope.is_collab_member = $scope.is_collab_member.is_member;
                    });
                });
            } else {
                var model_id = Context.getState();
                Context.modelCatalog_goToModelDetailView(model_id);
                $scope.$apply()
            }
        });
    }
]);

ModelCatalogApp.controller('ModelCatalogCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ScientificModelRest', 'CollabParameters', 'CollabIDRest', "Context", "ScientificModelAliasRest", "AuthorizedCollabParameterRest", 'DataHandler',

    function($scope, $rootScope, $http, $location, ScientificModelRest, CollabParameters, CollabIDRest, Context, ScientificModelAliasRest, AuthorizedCollabParameterRest, DataHandler) {
        Context.setService().then(function() {
            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {

                $scope.addImage = false;
                $scope.alias_is_valid = "";

                $scope.authorized_params = AuthorizedCollabParameterRest.get();

                $scope.species = CollabParameters.getParametersOrDefault("species");
                $scope.brain_region = CollabParameters.getParametersOrDefault("brain_region");
                $scope.cell_type = CollabParameters.getParametersOrDefault("cell_type");
                $scope.model_type = CollabParameters.getParametersOrDefault("model_type");
                $scope.organization = CollabParameters.getParametersOrDefault("organization");


                $scope.model_image = [];

                $scope.displayAddImage = function() {
                    $scope.addImage = true;
                };
                $scope.saveImage = function() {
                    if (JSON.stringify($scope.image) != undefined) {
                        $scope.model_image.push($scope.image);
                        $scope.addImage = false;
                        $scope.image = undefined;
                    } else { alert("you need to add an url!"); }
                };
                $scope.closeImagePanel = function() {
                    $scope.image = {};
                    $scope.addImage = false;
                };

                var _add_access_control = function() {
                    $scope.model.app_id = app_id;
                };

                $scope.saveModel = function() {
                    if ($scope.model.alias != '' && $scope.model.alias != undefined) {
                        $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: app_id, model: $scope.model, alias: $scope.model.alias })
                        $scope.alias_is_valid.$promise.then(function() {
                            if ($scope.alias_is_valid.is_valid) {
                                _add_access_control();
                                var parameters = JSON.stringify({ model: $scope.model, model_instance: [$scope.model_instance], model_image: $scope.model_image });
                                var a = ScientificModelRest.save({ app_id: app_id }, parameters).$promise.then(function(data) {
                                    DataHandler.setStoredModelsAsOutdated();
                                    Context.modelCatalog_goToModelDetailView(data.uuid);
                                });
                            } else {
                                alert('Cannot create the model. Please check your Alias.');
                            };
                        });
                    } else {
                        $scope.model.alias = null;
                        var parameters = JSON.stringify({ model: $scope.model, model_instance: [$scope.model_instance], model_image: $scope.model_image });
                        var a = ScientificModelRest.save({ app_id: app_id }, parameters).$promise.then(function(data) {
                            DataHandler.setStoredModelsAsOutdated();
                            Context.modelCatalog_goToModelDetailView(data.uuid);
                        });
                    };

                };
                $scope.deleteImage = function(index) {
                    $scope.model_image.splicen(index, 1);
                };

                $scope.checkAliasValidity = function() {
                    $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: app_id, model: $scope.model, alias: $scope.model.alias });
                };

            });
        });
    }
]);

ModelCatalogApp.controller('ModelCatalogDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$state', '$stateParams', 'ScientificModelRest', 'CollabParameters', 'IsCollabMemberRest', 'Context',

    function($scope, $rootScope, $http, $location, $state, $stateParams, ScientificModelRest, CollabParameters, IsCollabMemberRest, Context) {
        Context.setService().then(function() {

            $scope.Context = Context;
            $scope.ctx = Context.getCtx();
            $scope.collab_id = Context.getCollabID();
            $scope.app_id = Context.getAppID();

            if (Context.getState() == "" || Context.getState() == undefined) {
                $location.path('/model-catalog/');
            } else {
                CollabParameters.setService($scope.ctx).then(function() {

                    $("#ImagePopupDetail").hide();
                    $scope.model = ScientificModelRest.get({ app_id: $scope.app_id, id: $stateParams.uuid, web_app: "True" });

                    $scope.toggleSize = function(index, img) {
                        $scope.bigImage = img;
                        $("#ImagePopupDetail").show();
                    }

                    $scope.closeImagePanel = function() {
                        $scope.image = {};
                        $("#ImagePopupDetail").hide();
                    };

                    $scope.is_collab_member = false;
                    $scope.model.$promise.then(function() {
                        $scope.is_collab_member = IsCollabMemberRest.get({
                            app_id: $scope.model.models[0].app.id,
                        })
                        $scope.is_collab_member.$promise.then(function() {
                            $scope.is_collab_member = $scope.is_collab_member.is_member;
                        });
                    })
                });
            }
        });




    }
]);

ModelCatalogApp.controller('ModelCatalogEditCtrl', ['$scope', '$rootScope', '$http', '$location', '$state', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest', 'ScientificModelImageRest', 'CollabParameters', 'Context', 'ScientificModelAliasRest', 'AreVersionsEditableRest', 'DataHandler',

    function($scope, $rootScope, $http, $location, $state, $stateParams, ScientificModelRest, ScientificModelInstanceRest, ScientificModelImageRest, CollabParameters, Context, ScientificModelAliasRest, AreVersionsEditableRest, DataHandler) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {

                $scope.addImage = false;

                $scope.species = CollabParameters.getParametersOrDefault("species");
                $scope.brain_region = CollabParameters.getParametersOrDefault("brain_region");
                $scope.cell_type = CollabParameters.getParametersOrDefault("cell_type");
                $scope.model_type = CollabParameters.getParametersOrDefault("model_type");
                $scope.organization = CollabParameters.getParametersOrDefault("organization");


                $scope.version_is_editable = [];
                $scope.model = ScientificModelRest.get({ app_id: app_id, id: $stateParams.uuid });

                var version_editable = AreVersionsEditableRest.get({ app_id: app_id, model_id: $stateParams.uuid });
                version_editable.$promise.then(function(versions) {
                    $scope.version_is_editable = versions.are_editable;
                });
                $scope.deleteImage = function(img) {
                    var image = img
                    ScientificModelImageRest.delete({ app_id: app_id, id: image.id }).$promise.then(
                        function(data) {
                            alert('Image ' + img.id + ' has been deleted !');
                            $state.reload();
                        });
                };
                $scope.displayAddImage = function() {
                    $scope.addImage = true;
                };
                $scope.saveImage = function() {
                    if (JSON.stringify($scope.image) != undefined) {
                        $scope.image.model_id = $stateParams.uuid;

                        var parameters = JSON.stringify([$scope.image]);
                        ScientificModelImageRest.post({ app_id: app_id }, parameters).$promise.then(function(data) {
                            $scope.addImage = false;
                            alert('Image has been saved !');
                            $state.reload();
                        }).catch(function(e) {
                            alert(e.data);
                        });
                    } else { alert("You need to add an url !") }
                };
                $scope.closeImagePanel = function() {
                    $scope.image = {};
                    $scope.addImage = false;
                };
                $scope.editImages = function() {
                    var parameters = $scope.model.models[0].images;
                    var a = ScientificModelImageRest.put({ app_id: app_id }, parameters).$promise.then(function(data) {
                        alert('Model images have been correctly edited');
                    }).catch(function(e) {
                        alert(e.data);
                    });
                };
                $scope.saveModel = function() {
                    if ($scope.model.models[0].alias != '' && $scope.model.models[0].alias != null) {
                        $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: app_id, model_id: $scope.model.models[0].id, alias: $scope.model.models[0].alias });
                        $scope.alias_is_valid.$promise.then(function() {
                            if ($scope.alias_is_valid.is_valid) {
                                var parameters = $scope.model;
                                var a = ScientificModelRest.put({ app_id: app_id }, parameters).$promise.then(function(data) {
                                    DataHandler.setStoredModelsAsOutdated();
                                    alert('Model correctly edited');
                                }).catch(function(e) {
                                    alert(e.data);
                                });
                            } else {
                                alert('Cannot update the model. Please check the alias.');
                            }
                        });
                    } else {
                        $scope.model.models[0].alias = null;
                        var parameters = $scope.model;
                        var a = ScientificModelRest.put({ app_id: app_id }, parameters).$promise.then(function(data) {
                            DataHandler.setStoredModelsAsOutdated();

                            alert('Model correctly edited');
                        }).catch(function(e) {
                            alert(e.data);
                        });
                    }
                };
                $scope.saveModelInstance = function(model_instance) {
                    var parameters = JSON.stringify([model_instance]);
                    var a = ScientificModelInstanceRest.put({ app_id: app_id }, parameters).$promise.then(function(data) { alert('model instances correctly edited') }).catch(function(e) {
                        alert(e.data);
                    });
                };
                $scope.checkAliasValidity = function() {
                    $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: app_id, model_id: $scope.model.models[0].id, alias: $scope.model.models[0].alias });
                };
                $scope.isInArray = function(value, array) {
                    return array.indexOf(value) > -1;
                }
            });
        });


    }
]);

ModelCatalogApp.controller('ModelCatalogVersionCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest', 'CollabParameters', 'Context',
    function($scope, $rootScope, $http, $location, $stateParams, ScientificModelRest, ScientificModelInstanceRest, CollabParameters, Context) {
        Context.setService().then(function() {
            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {
                $scope.model = ScientificModelRest.get({ id: $stateParams.uuid });
                $scope.saveVersion = function() {
                    $scope.model_instance.model_id = $stateParams.uuid;
                    var parameters = JSON.stringify([$scope.model_instance]);
                    ScientificModelInstanceRest.save({ app_id: app_id }, parameters).$promise.then(function(data) {
                        $location.path('/model-catalog/detail/' + $stateParams.uuid);
                    }).catch(function(e) {
                        alert(e.data);
                    });
                };
            });

        });
    }
]);



///////////////////////////////////////////////////////////////////////

var ParametersConfigurationApp = angular.module('ParametersConfigurationApp');

ParametersConfigurationApp.controller('ParametersConfigurationCtrl', ['$scope', '$rootScope', '$http', '$location', 'CollabParameters', 'AuthorizedCollabParameterRest', 'CollabIDRest', 'Context',
    function($scope, $rootScope, $http, $location, CollabParameters, AuthorizedCollabParameterRest, CollabIDRest, Context) {
        Context.setService().then(function() {

            $scope.Context = Context;
            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            var app_type = document.getElementById("app").getAttribute("value");
            var collab = CollabIDRest.get({ ctx: ctx });

            $scope.list_param = AuthorizedCollabParameterRest.get({ ctx: ctx });

            $scope.list_param.$promise.then(function() {
                $scope.data_modalities = $scope.list_param.data_modalities;
                $scope.test_type = $scope.list_param.test_type;
                $scope.model_type = $scope.list_param.model_type;
                $scope.species = $scope.list_param.species;
                $scope.brain_region = $scope.list_param.brain_region;
                $scope.cell_type = $scope.list_param.cell_type;
                $scope.organization = $scope.list_param.organization;
            });



            CollabParameters.setService(ctx).then(function() {

                var app_type = document.getElementById("app").getAttribute("value");
                var collab = CollabIDRest.get({ ctx: ctx });

                $scope.selected_data = {};
                $scope.selected_data.selected_data_modalities = CollabParameters.getParameters_authorized_value_formated("data_modalities");
                $scope.selected_data.selected_test_type = CollabParameters.getParameters_authorized_value_formated("test_type");
                $scope.selected_data.selected_model_type = CollabParameters.getParameters_authorized_value_formated("model_type");
                $scope.selected_data.selected_species = CollabParameters.getParameters_authorized_value_formated("species");
                $scope.selected_data.selected_brain_region = CollabParameters.getParameters_authorized_value_formated("brain_region");
                $scope.selected_data.selected_cell_type = CollabParameters.getParameters_authorized_value_formated("cell_type");
                $scope.selected_data.selected_organization = CollabParameters.getParameters_authorized_value_formated("organization");

                $scope.make_post = function() {

                    CollabParameters.initConfiguration();

                    $scope.selected_data.selected_data_modalities.forEach(function(value, i) {
                        CollabParameters.addParameter("data_modalities", value.authorized_value);
                    });

                    $scope.selected_data.selected_test_type.forEach(function(value, i) {
                        CollabParameters.addParameter("test_type", value.authorized_value);
                    });

                    $scope.selected_data.selected_model_type.forEach(function(value, i) {
                        CollabParameters.addParameter("model_type", value.authorized_value);
                    });

                    $scope.selected_data.selected_species.forEach(function(value, i) {
                        CollabParameters.addParameter("species", value.authorized_value);
                    });

                    $scope.selected_data.selected_brain_region.forEach(function(value, i) {
                        CollabParameters.addParameter("brain_region", value.authorized_value);
                    });

                    $scope.selected_data.selected_cell_type.forEach(function(value, i) {
                        CollabParameters.addParameter("cell_type", value.authorized_value);
                    });

                    $scope.selected_data.selected_organization.forEach(function(value, i) {
                        CollabParameters.addParameter("organization", value.authorized_value);
                    });

                    CollabParameters.addParameter("app_type", app_type);

                    CollabParameters.setCollabId("collab_id", collab.collab_id);

                    CollabParameters.put_parameters().$promise.then(function() {
                        CollabParameters.getRequestParameters().$promise.then(function() {});
                        alert("Your app has been configured")
                    });

                };

            });
        });


    }
]);


ParametersConfigurationApp.controller('ParametersConfigurationRedirectCtrl', ['$scope', '$rootScope', '$http', '$location', 'CollabParameters', 'AuthorizedCollabParameterRest', 'Context',
    function($scope, $rootScope, $http, $location, CollabParameters, AuthorizedCollabParameterRest, Context) {
        $scope.init = function() {
            var app_type = document.getElementById("app").getAttribute("value");
            if (app_type == "model_catalog") {
                $location.path('/modelparametersconfiguration');
            } else if (app_type == "validation_app") {
                $location.path('/validationparametersconfiguration');
            }
        }

    }
]);
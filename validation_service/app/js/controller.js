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

                    $scope.collab_species = CollabParameters.getParametersOrDefaultByType("species");
                    $scope.collab_brain_region = CollabParameters.getParametersOrDefaultByType("brain_region");
                    $scope.collab_cell_type = CollabParameters.getParametersOrDefaultByType("cell_type");
                    $scope.collab_model_type = CollabParameters.getParametersOrDefaultByType("model_type");
                    $scope.collab_test_type = CollabParameters.getParametersOrDefaultByType("test_type");
                    $scope.collab_data_modalities = CollabParameters.getParametersOrDefaultByType("data_modalities");
                    $scope.collab_organization = CollabParameters.getParametersOrDefaultByType("organization");

                    // $scope.models = ScientificModelRest.get({ app_id: app_id }, function(data) {});
                    // $scope.tests = ValidationTestDefinitionRest.get({ app_id: app_id }, function(data) {});

                    // //for test
                    // $scope.put_test1 = ValidationTestCodeRest.put({ app_id: app_id, test_definition_id: "53a7a2db-b18f-49ef-b1de-88bd48960c81", version: "1.1" });
                    DataHandler.loadModels({ app_id: app_id }).then(function(data) {
                        $scope.models = data
                        $scope.$apply()
                    });

                    DataHandler.loadTests({ app_id: app_id }).then(function(data) {
                        $scope.tests = data
                        $scope.$apply()
                    });
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

            DataHandler.loadModels({ app_id: app_id }).then(function(data) {
                $scope.models = data;
                $scope.$apply()
            });

            DataHandler.loadTests({ app_id: app_id }).then(function(data) {
                $scope.tests = data;
                $scope.$apply()
            });
            CollabParameters.setService(ctx).then(function() {

                $scope.collab_species = CollabParameters.getParametersOrDefaultByType("species");
                $scope.collab_brain_region = CollabParameters.getParametersOrDefaultByType("brain_region");
                $scope.collab_cell_type = CollabParameters.getParametersOrDefaultByType("cell_type");
                $scope.collab_model_type = CollabParameters.getParametersOrDefaultByType("model_type");
                $scope.collab_test_type = CollabParameters.getParametersOrDefaultByType("test_type");
                $scope.collab_data_modalities = CollabParameters.getParametersOrDefaultByType("data_modalities");
                // $scope.collab_organization = CollabParameters.getParametersByType("organization");

                $scope.is_collab_member = false;
                $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id, });
                $scope.is_collab_member.$promise.then(function() {
                    $scope.is_collab_member = $scope.is_collab_member.is_member;
                });

                // $scope.test_list = ValidationTestDefinitionRest.get({ app_id: app_id }, function(data) {});

                // $scope.tests = ValidationTestDefinitionRest.get({ app_id: app_id }, function(data) {});

            });
        });

    }
]);


testApp.controller('ValModelDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest', 'CollabParameters', 'IsCollabMemberRest', 'AppIDRest', 'Graphics', 'Context', 'AuthorizedCollabParameterRest', 'DataHandler',

    function($scope, $rootScope, $http, $location, $stateParams, ScientificModelRest, ScientificModelInstanceRest, CollabParameters, IsCollabMemberRest, AppIDRest, Graphics, Context, AuthorizedCollabParameterRest, DataHandler) {

        $scope.validation_goToModelCatalog = function(model) {
            Context.validation_goToModelCatalog(model = model);
        }

        $scope.is_graph_not_empty = function(score_type) {
            if (score_type.values.results.length < 2) {
                return false;
            }
            return true;
        }

        $scope.init_checkbox_latest_versions = function() {
            var list_ids = [];
            for (var i = 0; i < $scope.init_graph_all.length; i++) {

                var graph = $scope.init_graph_all[i];
                var score_type = graph.values.values[0].test_score_type

                for (var line_id in graph.values.latest_test_versions_line_id) {
                    list_ids.push(graph.values.latest_test_versions_line_id[line_id].latest_line_id);

                    document.getElementById('check-' + i + '-' + graph.values.latest_test_versions_line_id[line_id].latest_line_id).checked = true;
                }
                $scope.init_graph_all[i].values.values = Graphics.getUpdatedGraph($scope.init_graph_all[i].values.values, list_ids);
                $scope.line_result_focussed[i] = null;
            }
        };

        $scope.updateGraph = function(key) {

            var list_ids = $scope._IsCheck(key);

            $scope.init_graph_all[key].values.values = Graphics.getUpdatedGraph($scope.init_graph, list_ids);
            $scope.line_result_focussed[key] = null;
        };

        $scope._IsCheck = function(key) {

            var list_ids = [];
            var i = 0;

            for (i; i < $scope.init_graph_all[key].values.list_ids.length; i++) {
                if (document.getElementById('check-' + key + '-' + $scope.init_graph_all[key].values.list_ids[i]).checked) {
                    list_ids.push($scope.init_graph_all[key].values.list_ids[i]);
                };
            };

            return list_ids
        };


        Context.setService().then(function() {
            $scope.Context = Context;
            $scope.ctx = Context.getCtx();
            $scope.app_id = Context.getAppID();


            CollabParameters.setService($scope.ctx).then(function() {

                $scope.authorized_parameters = AuthorizedCollabParameterRest.get();

                $scope.model = ScientificModelRest.get({ app_id: $scope.app_id, id: $stateParams.uuid });
                $scope.model_instances = ScientificModelInstanceRest.get({ app_id: $scope.app_id, model_id: $stateParams.uuid })
                $scope.model.$promise.then(function() {

                    $scope.model_instances.$promise.then(function() {

                        var get_raw_data = Graphics.ModelGraph_getRawData($scope.model.models[0].id);

                        get_raw_data.then(function(raw_data) {

                            $scope.raw_data = raw_data;
                            $scope.init_graph_all = new Array();
                            $scope.line_result_focussed = new Array();
                            $scope.options5 = new Array();
                            $scope.init_checkbox = new Array();

                            Graphics.ModelGraph_init_Graphs($scope.model_instances, raw_data).then(function(init_graph) {
                                $scope.data = init_graph.values;

                                for (var i in init_graph.single_graphs_data) {

                                    var key = $scope.init_graph_all.push(init_graph.single_graphs_data[i]);

                                    $scope.options5.push(Graphics.get_lines_options('', '', init_graph.single_graphs_data[i].score_type, "", init_graph.single_graphs_data[i].values.results, "model", key - 1, init_graph.single_graphs_data[i].values.abs_info));

                                    $scope.line_result_focussed.push();
                                    $scope.$apply();

                                };

                                $scope.init_checkbox = init_graph.list_ids;

                                var raw_results_data = init_graph.results_data

                                $scope.data_for_table = Graphics.ModelGraphs_reorganizeRawDataForResultTable($scope.raw_data, $scope.model_instances.instances);
                                $scope.init_checkbox_latest_versions();
                                $scope.$on('data_focussed:updated', function(event, data, key) {
                                    $scope.line_result_focussed[key] = data;
                                    $scope.$apply();
                                });
                                $scope.init_graph = init_graph.values;
                            });

                            DataHandler.loadModels({ app_id: $scope.app_id }).then(function(data) {
                                $scope.models = data
                                $scope.$apply()
                            });

                            DataHandler.loadTests({ app_id: $scope.app_id }).then(function(data) {
                                $scope.tests = data
                                $scope.$apply()
                            });

                        }).catch(function(err) {
                            console.error('Erreur !');
                            console.dir(err);
                            console.log(err);
                        });


                    });
                });
            });

        });


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

        $scope.init_graph, $scope.graphic_data, $scope.init_checkbox, $scope.graphic_options;
        $scope.data_for_table;
        $scope.selected_tab = "";

        //for tab version (edit)
        $scope.version_in_edition = [];
        $scope.version_is_editable = [];
        //for tab_comments
        $scope.comments_to_show = [];
        $scope.create_comment_to_show = [];
        $scope.button_save_ticket = [];
        $scope.button_save_comment = [];


        $scope.init_checkbox_latest_versions = function() {
            var list_ids = [];
            for (var line_id in $scope.init_graph.latest_model_instances_line_id) {
                list_ids.push($scope.init_graph.latest_model_instances_line_id[line_id].latest_line_id);
                // document.getElementById('check-' + $scope.init_graph.latest_model_instances_line_id[line_id].latest_line_id).checked = true;
            }
            $scope.graphic_data = Graphics.getUpdatedGraph($scope.init_graph.values, list_ids);
            $scope.line_result_focussed = null;
        };


        $scope.is_graph_not_empty = function(data_graph) {
            if (data_graph.length < 2 && data_graph[0].values.length < 2) {
                return false;
            }
            return true;
        }

        // var _sort_by_last_result_timestamp_desc = function(a, b) {
        //     return new Date(b.last_result_timestamp) - new Date(a.last_result_timestamp);
        // }

        // var _sort_by_timestamp_desc = function(a, b) {
        //     return new Date(b.timestamp) - new Date(a.timestamp);
        // }

        // var _sort_by_timestamp_asc = function(a, b) {
        //     return new Date(a.timestamp) - new Date(b.timestamp);
        // }

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
            var list_ids = $scope._IsCheck();
            $scope.graphic_data = Graphics.getUpdatedGraph($scope.init_graph.values, list_ids);
            $scope.result_focussed = null;
        };

        $scope._IsCheck = function() {
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
            $scope.test_code.test_definition_id = $scope.detail_test.tests[0].id;

            var parameters = JSON.stringify([$scope.test_code]);
            var test_version_response = ValidationTestCodeRest.save({ app_id: $scope.app_id, test_definition_id: $scope.detail_test.tests[0].id }, parameters).$promise.then(function() {
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
                $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: $scope.app_id, test_id: $scope.detail_test.tests[0].id, alias: $scope.detail_test.tests[0].alias });
                $scope.alias_is_valid.$promise.then(function() {
                    if ($scope.alias_is_valid.is_valid) {
                        var parameters = JSON.stringify($scope.detail_test.tests[0]);
                        ValidationTestDefinitionRest.put({ app_id: $scope.app_id, id: $scope.detail_test.tests[0].id }, parameters).$promise.then(function() {
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
                ValidationTestDefinitionRest.put({ app_id: $scope.app_id, id: $scope.detail_test.tests[0].id }, parameters).$promise.then(function() {
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
            angular.element(document.querySelector("#editable-code-description-" + index)).attr('contenteditable', "true");
            angular.element(document.querySelector("#editable-code-description-" + index)).attr('bgcolor', 'ghostwhite');
            angular.element(document.querySelector("#editable-version-" + index)).attr('contenteditable', "true");
            angular.element(document.querySelector("#editable-version-" + index)).attr('bgcolor', 'ghostwhite');
            angular.element(document.querySelector("#editable-path-" + index)).attr('contenteditable', "true");
            angular.element(document.querySelector("#editable-path-" + index)).attr('bgcolor', 'ghostwhite');
            $scope.version_in_edition.push(index);

        };
        $scope.save_edited_version = function(index) {
            var repository = $("#editable-repository-" + index).text();
            var code_description = $("#editable-code-description-" + index).text();
            var version = $("#editable-version-" + index).text();
            var pathway = $("#editable-path-" + index).text();
            var new_version = JSON.stringify([
                { 'id': index, 'repository': repository, 'version': version, 'path': pathway, 'description': code_description }
            ]);
            ValidationTestCodeRest.put({ app_id: $scope.app_id }, new_version).$promise.then(function() {
                angular.element(document.querySelector("#editable-repository-" + index)).attr('contenteditable', "false");
                angular.element(document.querySelector("#editable-repository-" + index)).attr('bgcolor', 'white');
                angular.element(document.querySelector("#editable-code-description-" + index)).attr('contenteditable', "false");
                angular.element(document.querySelector("#editable-code-description-" + index)).attr('bgcolor', 'white');
                angular.element(document.querySelector("#editable-version-" + index)).attr('contenteditable', "false");
                angular.element(document.querySelector("#editable-version-" + index)).attr('bgcolor', 'white');
                angular.element(document.querySelector("#editable-path-" + index)).attr('contenteditable', "false");
                angular.element(document.querySelector("#editable-path-" + index)).attr('bgcolor', 'white');

                var i = $scope.version_in_edition.indexOf(index)
                if (i == 0) {
                    $scope.version_in_edition.splice(0, 1)
                } else { $scope.version_in_edition.splice(i, i); }
            });


        }

        $scope.checkAliasValidity = function() {
            $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: $scope.app_id, test_id: $scope.detail_test.tests[0].id, alias: $scope.detail_test.tests[0].alias });
        };

        var _send_notification = function() {
            //not used for now
            NotificationRest.post({ app_id: $scope.app_id, ctx: $scope.ctx }).$promise.then(function(data) {});
        }

        $scope.saveTicket = function() {
            $scope.ticket.test_id = $stateParams.uuid;
            var data = JSON.stringify($scope.ticket);
            $scope.new_ticket = TestTicketRest.post({ app_id: $scope.app_id }, data, function(value) {})
            $scope.new_ticket.$promise.then(function() {
                $scope.test_tickets.tickets.push($scope.new_ticket.new_ticket[0]);
                document.getElementById("formT").reset();
                //_send_notification();
            });

        };
        $scope.saveComment = function(ticket_id, comment_post, ticket_index) {
            comment_post.Ticket_id = ticket_id;
            var data = JSON.stringify(comment_post);
            $scope.new_comment = TestCommentRest.post({ app_id: $scope.app_id }, data, function(value) {})
            $scope.new_comment.$promise.then(function() {
                var i = $scope.create_comment_to_show.indexOf(ticket_id)
                if (i == 0) {
                    $scope.create_comment_to_show.splice(0, 1)
                } else { $scope.create_comment_to_show.splice(i, i); }

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

        // $scope._reset = function(form) {
        //     if (form) {
        //         form.$setPristine();
        //         form.$setUntouched();
        //     };
        // };

        $scope.showComments = function(ticket_id) {
            var classe = document.getElementById("button-com-" + ticket_id).className;
            if (classe == "glyphicon glyphicon-plus button-click") {
                $scope.comments_to_show.push(ticket_id);
                document.getElementById("button-com-" + ticket_id).className = "glyphicon glyphicon-minus button-click";
            } else {
                var i = $scope.comments_to_show.indexOf(ticket_id);
                if (i == 0) {
                    $scope.comments_to_show.splice(0, 1);
                } else { $scope.comments_to_show.splice(i, i); }

                document.getElementById("button-com-" + ticket_id).className = "glyphicon glyphicon-plus button-click";
            };
        };

        $scope.showCreateComment = function(ticket_id) {
            var button = document.getElementById("btn-create-comment-" + ticket_id);
            if (button.innerHTML == "Reply") {
                $scope.create_comment_to_show.push(ticket_id);
                button.innerHTML = "Hide";
            } else {
                var i = $scope.create_comment_to_show.indexOf(ticket_id);
                if (i == 0) {
                    $scope.create_comment_to_show.splice(0, 1);
                } else { $scope.create_comment_to_show.splice(i, i); }
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
            var a = TestTicketRest.put({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
                angular.element(document.querySelector("#editable-title-" + ticket_id)).attr('contenteditable', "false");
                angular.element(document.querySelector("#editable-title-" + ticket_id)).attr('bgcolor', '');
                angular.element(document.querySelector("#editable-text-" + ticket_id)).attr('contenteditable', "false");
                angular.element(document.querySelector("#editable-text-" + ticket_id)).attr('bgcolor', 'white');

                var i = $scope.button_save_ticket.indexOf(ticket_id);
                if (i == 0) {
                    $scope.button_save_ticket.splice(0, 1);
                } else {
                    $scope.button_save_ticket.splice(i, i);
                }
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
            var a = TestCommentRest.put({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
                angular.element(document.querySelector("#editable-ctext-" + com_id)).attr('contenteditable', "false");
                angular.element(document.querySelector("#editable-ctext-" + com_id)).attr('bgcolor', 'white');
                var i = $scope.button_save_comment.indexOf(com_id);
                if (i == 0) {
                    $scope.button_save_comment.splice(0, 1);
                } else {
                    $scope.button_save_comment.splice(i, i);
                }
            });
        }

        $scope.isInArray = function(value, array) {
            return array.indexOf(value) > -1;
        }

        //code
        Context.setService().then(function() {
            $scope.Context = Context;
            $scope.ctx = Context.getCtx();
            $scope.app_id = Context.getAppID();

            CollabParameters.setService($scope.ctx).then(function() {

                $scope.detail_test = ValidationTestDefinitionRest.get({ app_id: $scope.app_id, id: $stateParams.uuid });

                $scope.auhtorized_params = AuthorizedCollabParameterRest.get();

                $scope.species = CollabParameters.getParametersOrDefaultByType("species");
                $scope.brain_region = CollabParameters.getParametersOrDefaultByType("brain_region");
                $scope.cell_type = CollabParameters.getParametersOrDefaultByType("cell_type");
                $scope.model_type = CollabParameters.getParametersOrDefaultByType("model_type");
                $scope.test_type = CollabParameters.getParametersOrDefaultByType("test_type");
                $scope.data_modalities = CollabParameters.getParametersOrDefaultByType("data_modalities");

                $scope.detail_version_test = ValidationTestCodeRest.get({ app_id: $scope.app_id, test_definition_id: $stateParams.uuid });
                //TODO: take detail_test and detail_version_test in one get

                $scope.detail_test.$promise.then(function() {
                    $scope.detail_version_test.$promise.then(function() {

                        var get_raw_data = Graphics.TestGraph_getRawData($scope.detail_version_test)

                        get_raw_data.then(function(raw_data) {

                            $scope.raw_data = raw_data;

                            var init_graph = Graphics.TestGraph_initTestGraph($scope.detail_version_test, $scope.raw_data);

                            $scope.data_for_table = Graphics.TestGraph_reorganizeRawDataForResultTable($scope.raw_data.model_instances, $scope.detail_version_test.test_codes);

                            init_graph.then(function(data_init_graph) {

                                $scope.init_graph = data_init_graph;
                                $scope.graphic_data = $scope.init_graph.values; //initialise graph before to updte with latest versions

                                $scope.init_checkbox = data_init_graph.list_ids;

                                $scope.graphic_options = Graphics.get_lines_options('', '', $scope.detail_test.tests[0].score_type, "", data_init_graph.results, "test", "", data_init_graph.abs_info);

                                $scope.init_checkbox_latest_versions();

                                $scope.result_focussed;
                                $scope.$on('data_focussed:updated', function(event, data, key) {
                                    $scope.result_focussed = data;
                                    $scope.$apply();
                                });
                            }).catch(function(err) {
                                console.error('Erreur !');
                                console.dir(err);
                                console.log(err);
                            });

                        }).catch(function(err) {
                            console.error('Erreur !');
                            console.dir(err);
                            console.log(err);
                        });

                        $scope.test_tickets = TestTicketRest.get({ app_id: $scope.app_id, test_id: $stateParams.uuid });


                        var version_editable = AreVersionsEditableRest.get({ app_id: $scope.app_id, test_id: $stateParams.uuid });
                        version_editable.$promise.then(function(versions) {
                            $scope.version_is_editable = versions.are_editable;
                        });

                    });
                });
            });
        });
    }
]);

testApp.controller('ValTestResultDetailCtrl', ['$window', '$scope', '$rootScope', '$http', '$sce', '$location', '$stateParams', 'IsCollabMemberRest', 'AppIDRest', 'ValidationResultRest', 'CollabParameters', 'ScientificModelRest', 'ValidationTestDefinitionRest', "Context", "clbStorage", "clbAuth", 'DataHandler', 'clbCollabNav',
    function($window, $scope, $rootScope, $http, $sce, $location, $stateParams, IsCollabMemberRest, AppIDRest, ValidationResultRest, CollabParameters, ScientificModelRest, ValidationTestDefinitionRest, Context, clbStorage, clbAuth, DataHandler, clbCollabNav) {
        // var vm = this;

        $scope.split_result_storage_string = function(storage_string) {
            storage_string = storage_string.slice(10, storage_string.length)

            storage_string = storage_string.split(/\/(.+)/)

            var dict_to_return = { collab: storage_string[0], folder_path: storage_string[1] }

            return (dict_to_return);
        };

        //NOT USED?
        //  $scope.get_correct_folder_using_name = function(name, folders) {
        //     for (var i in folders) {
        //         if (folders[i].name == name) {
        //             return (folders[i]);
        //         }
        //     }
        //     return null;
        // };

        $scope.download_file = function(uuid) {
            clbStorage.downloadUrl({ uuid: uuid }).then(function(DownloadURL) {
                var DownloadURL = DownloadURL;

                var win = window.open(DownloadURL, '_blank');
                win.focus();

            });
        };

        $scope.open_overview_file = function(uuid) {
            clbStorage.downloadUrl({ uuid: uuid }).then(function(FileURL) {
                // var FileURL = FileURL;
                $scope.image = new Image();
                $scope.image.src = FileURL;
            });
        };

        Context.setService().then(function() {
            $scope.Context = Context;

            $scope.ctx = Context.getCtx();
            $scope.app_id = Context.getAppID();


            CollabParameters.setService($scope.ctx).then(function() {

                var test_result = ValidationResultRest.get({ id: $stateParams.uuid, order: "", detailed_view: true });

                test_result.$promise.then(function() {

                    $scope.test_result = test_result.results[0];

                    var result_storage = $scope.test_result.results_storage;
                    var result_storage_dict = $scope.split_result_storage_string(result_storage);
                    var collab = result_storage_dict.collab;
                    var folder_name = result_storage_dict.folder_path;
                    $scope.folder_name = folder_name;

                    var storage_app_id = undefined;

                    clbCollabNav.getRoot(collab).then(function(clb_collab) {

                                for (var i in clb_collab.children) {
                                    if (clb_collab.children[i].name == "Storage") {
                                        storage_app_id = clb_collab.children[i].id;
                                        break;
                                    }
                                }


                                if (storage_app_id != undefined) {
                                    $scope.storage_url = "https://collab.humanbrainproject.eu/#/collab/" + collab + "/nav/" + storage_app_id;
                                } else {
                                    $scope.storage_url = "";
                                }
                                // $scope.storage_url = 
                                //https://collab.humanbrainproject.eu/#/collab/2169/nav/18935


                            },
                            function(not_working) {})
                        .finally(function() {});

                    clbStorage.getEntity({ path: "?path=/" + collab + "/" + folder_name + "/" }).then(function(collabStorageFolder) {

                        clbStorage.getChildren({ uuid: collabStorageFolder.uuid, entity_type: 'folder' }).then(function(storage_folder_children) {

                                $scope.storage_files = storage_folder_children.results

                            }, function() {})
                            .finally(function() {});

                    }, function(not_worked) {}).finally(function() {});

                    DataHandler.loadModels({ app_id: $scope.app_id }).then(function(data) {
                        $scope.models = data
                        $scope.$apply()
                    });

                    DataHandler.loadTests({ app_id: $scope.app_id }).then(function(data) {
                        $scope.tests = data
                        $scope.$apply()
                    });
                });
            });



        });
    }
]);


testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location', '$timeout', 'CollabParameters', 'Graphics', "Context", 'DataHandler',

    function($scope, $rootScope, $http, $location, $timeout, CollabParameters, Graphics, Context, DataHandler) {
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
                DataHandler.loadModels({ app_id: app_id }).then(function(data) {
                    $scope.models = data
                    $scope.$apply()
                });

                DataHandler.loadTests({ app_id: app_id }).then(function(data) {
                    $scope.tests = data
                    $scope.$apply()
                });

            });

        });
    }
]);


testApp.controller('ValTestCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest', 'CollabParameters', 'Context', 'AuthorizedCollabParameterRest', 'ValidationTestAliasRest', 'DataHandler',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest, CollabParameters, Context, AuthorizedCollabParameterRest, ValidationTestAliasRest, DataHandler) {

        $scope.saveTest = function() {
            if ($scope.test.alias != '' && $scope.test.alias != undefined) {
                $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: $scope.app_id, alias: $scope.test.alias });
                $scope.alias_is_valid.$promise.then(function() {
                    if ($scope.alias_is_valid.is_valid) {
                        var parameters = JSON.stringify({ test_data: $scope.test, code_data: $scope.code });
                        ValidationTestDefinitionRest.save({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
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
                ValidationTestDefinitionRest.save({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
                    DataHandler.setStoredTestsAsOutdated();
                    Context.validation_goToTestDetailView(data.uuid);
                });
            };
        };

        $scope.checkAliasValidity = function() {
            $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: $scope.app_id, alias: $scope.test.alias });
        };

        Context.setService().then(function() {

            $scope.Context = Context;

            $scope.ctx = Context.getCtx();
            $scope.app_id = Context.getAppID();


            CollabParameters.setService($scope.ctx).then(function() {

                $scope.alias_is_valid = "";
                $scope.auhtorized_params = AuthorizedCollabParameterRest.get();

                $scope.species = CollabParameters.getParametersOrDefaultByType("species");
                $scope.brain_region = CollabParameters.getParametersOrDefaultByType("brain_region");
                $scope.cell_type = CollabParameters.getParametersOrDefaultByType("cell_type");
                $scope.data_modalities = CollabParameters.getParametersOrDefaultByType("data_modalities");
                $scope.test_type = CollabParameters.getParametersOrDefaultByType("test_type");

                // $scope.data_type = CollabParameters.getParametersByType("data_type");
                $scope.data_type;
            });

        });
    }
]);


testApp.controller('ValHelpCtrl', ['$scope', '$rootScope', '$http', '$location', 'DataHandler', 'Context', 'CollabParameters',

    function($scope, $rootScope, $http, $location, DataHandler, Context, CollabParameters) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {});

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

                DataHandler.loadModels({ app_id: app_id }).then(function(data) {
                    $scope.models = data
                        //change organization value to avoid errors
                    for (var model in $scope.models.models) {
                        if ($scope.models.models[model].organization == "<<empty>>") {
                            $scope.models.models[model].organization = "";
                        }
                    }
                    $scope.$apply();
                });
                Context.sendState("model", "n");

                CollabParameters.setService(ctx).then(function() {

                    $scope.model_privacy = [{ "name": "private", "value": true }, { "name": "public", "value": false }];
                    $scope.selected_privacy = $scope.model_privacy;

                    $scope.collab_species = CollabParameters.getParametersOrDefaultByType("species");
                    $scope.collab_brain_region = CollabParameters.getParametersOrDefaultByType("brain_region");
                    $scope.collab_cell_type = CollabParameters.getParametersOrDefaultByType("cell_type");
                    $scope.collab_model_type = CollabParameters.getParametersOrDefaultByType("model_type");
                    $scope.collab_organization = CollabParameters.getParametersOrDefaultByType("organization");

                    // $scope.models = ScientificModelRest.get({ app_id: app_id });



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

        //variables to define
        $scope.Context = undefined;
        $scope.ctx = undefined;
        $scope.app_id = undefined;

        $scope.addImage = false;
        $scope.alias_is_valid = "";
        $scope.model_image = [];
        $scope.authorized_params = undefined;
        $scope.species = undefined;
        $scope.brain_region = undefined;
        $scope.cell_type = undefined;
        $scope.model_type = undefined;
        $scope.organization = undefined;

        //functions
        $scope.displayAddImage = function() {
            $scope.addImage = true;
        };

        $scope.saveImage = function() {
            if (JSON.stringify($scope.image) != undefined) {
                $scope.model_image.push($scope.image);
                $scope.addImage = false;
                $scope.image = undefined;
            } else {
                alert("you need to add an url!");
                return Error('Please enter the image url you want to add.')
            }
        };

        $scope.closeImagePanel = function() {
            $scope.image = {};
            $scope.addImage = false;
        };

        $scope._add_access_control = function() {
            $scope.model.app_id = $scope.app_id;
        };

        $scope.deleteImage = function(index) {
            $scope.model_image.splice(index, 1);
        };

        $scope.checkAliasValidity = function() {
            $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: $scope.app_id, model: $scope.model, alias: $scope.model.alias });
            return $scope.alias_is_valid;
        };

        $scope._saveModel_AfterAllChecks = function(withInstance) {

            if (withInstance != undefined) {
                if (withInstance) {
                    var parameters = JSON.stringify({ model: $scope.model, model_instance: [$scope.model_instance], model_image: $scope.model_image });
                } else {
                    var parameters = JSON.stringify({ model: $scope.model, model_instance: [], model_image: $scope.model_image });
                }

                var a = ScientificModelRest.save({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
                    DataHandler.setStoredModelsAsOutdated();
                    Context.modelCatalog_goToModelDetailView(data.uuid);
                });
            }
        }

        $scope._saveModel_CheckOnModelInstance = function() {

            var saveInstance = undefined;
            if ($scope.model_instance) {
                //version is undefined or empty
                if ($scope.model_instance.version == undefined || $scope.model_instance.version == "") {
                    //and source is undefined or empty
                    if ($scope.model_instance.source == undefined || $scope.model_instance.source == "") {
                        saveInstance = false;
                    }
                    // and source not null or undefined then error
                    else {
                        alert("If you want to create a new version, please ensure the version name and the code source are correctly filled.")
                    }
                }
                //version is defined and not empty
                else {
                    //and source is undefined and empty then error 
                    if ($scope.model_instance.source == undefined || $scope.model_instance.source == "") {
                        alert("If you want to create a new version, please ensure the version name and the code source are correctly filled.")
                    }
                    //and source is defined then save version 
                    else {
                        saveInstance = true;
                    }
                }
            } else {
                saveInstance = false;
            }
            return saveInstance;
        };

        $scope.saveModel = function() {

            if ($scope.model.alias != '' && $scope.model.alias != undefined) {
                $scope.alias_is_valid = $scope.checkAliasValidity();
                $scope.alias_is_valid.$promise.then(function() {
                    if ($scope.alias_is_valid.is_valid) {
                        $scope._add_access_control();
                        var saveInstance = $scope._saveModel_CheckOnModelInstance()
                        $scope._saveModel_AfterAllChecks(saveInstance);
                    } else {
                        alert('Cannot create the model. Please check your Alias.');
                    };
                });
            } else {
                $scope.model.alias = null;
                var saveInstance = $scope._saveModel_CheckOnModelInstance()
                $scope._saveModel_AfterAllChecks(saveInstance);
            };
        };


        //code
        Context.setService().then(function() {
            $scope.Context = Context;
            $scope.ctx = Context.getCtx();
            $scope.app_id = Context.getAppID();

            CollabParameters.setService($scope.ctx).then(function() {

                $scope.authorized_params = AuthorizedCollabParameterRest.get();

                $scope.species = CollabParameters.getParametersOrDefaultByType("species");
                $scope.brain_region = CollabParameters.getParametersOrDefaultByType("brain_region");
                $scope.cell_type = CollabParameters.getParametersOrDefaultByType("cell_type");
                $scope.model_type = CollabParameters.getParametersOrDefaultByType("model_type");
                $scope.organization = CollabParameters.getParametersOrDefaultByType("organization");
            });
        });
    }
]);

ModelCatalogApp.controller('ModelCatalogDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$state', '$stateParams', 'ScientificModelRest', 'CollabParameters', 'IsCollabMemberRest', 'Context', 'DataHandler', 'clbStorage',

    function($scope, $rootScope, $http, $location, $state, $stateParams, ScientificModelRest, CollabParameters, IsCollabMemberRest, Context, DataHandler, clbStorage) {

        $scope.change_collab_url_to_real_url = function() {
            for (var i in $scope.model.models[0].images) {
                var substring = $scope.model.models[0].images[i].url.substring(0, 35);
                if (substring == "https://collab.humanbrainproject.eu") {
                    $scope.get_url_from_collab_storage($scope.model.models[0].images[i].url, i);
                } else {
                    $scope.model.models[0].images[i].src = $scope.model.models[0].images[i].url;
                };
            };
        }

        $scope.get_url_from_collab_storage = function(url, i) {
            var index = url.indexOf("%3D");
            var image_uuid = url.slice(index + 3);
            clbStorage.downloadUrl({ uuid: image_uuid }).then(function(fileURL) {
                $scope.model.models[0].images[i].src = fileURL;
            });
        }

        $scope.toggleSize = function(index, img) {
            $scope.bigImage = img;
            $("#ImagePopupDetail").show();
        }

        $scope.closeImagePanel = function() {
            $scope.image = {};
            $("#ImagePopupDetail").hide();
        };


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
                    $scope.model.$promise.then(function(model) {
                        $scope.change_collab_url_to_real_url()
                    });

                    $scope.is_collab_member = false;
                    $scope.model.$promise.then(function() {
                        $scope.is_collab_member = IsCollabMemberRest.get({
                            app_id: $scope.model.models[0].app.id,
                        })
                        $scope.is_collab_member.$promise.then(function() {
                            $scope.is_collab_member = $scope.is_collab_member.is_member;
                        });
                    })
                    DataHandler.loadModels({ app_id: $scope.app_id }).then(function(data) {
                        $scope.models = data
                        $scope.$apply()
                    });
                });
            }
        });
    }
]);

ModelCatalogApp.controller('ModelCatalogEditCtrl', ['$scope', '$rootScope', '$http', '$location', '$state', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest', 'ScientificModelImageRest', 'CollabParameters', 'Context', 'ScientificModelAliasRest', 'AreVersionsEditableRest', 'DataHandler', 'clbStorage',

    function($scope, $rootScope, $http, $location, $state, $stateParams, ScientificModelRest, ScientificModelInstanceRest, ScientificModelImageRest, CollabParameters, Context, ScientificModelAliasRest, AreVersionsEditableRest, DataHandler, clbStorage) {

        $scope.change_collab_url_to_real_url = function() {
            //COULD BE IN A SERVICE
            for (var i in $scope.model.models[0].images) {
                var substring = $scope.model.models[0].images[i].url.substring(0, 35);
                if (substring == "https://collab.humanbrainproject.eu") {
                    $scope.get_url_from_collab_storage($scope.model.models[0].images[i].url, i);
                } else {
                    $scope.model.models[0].images[i].src = $scope.model.models[0].images[i].url;
                };
            };
        };

        $scope.get_url_from_collab_storage = function(url, i) {
            //COULD BE IN A SERVICE
            var index = url.indexOf("%3D");
            var image_uuid = url.slice(index + 3);
            clbStorage.downloadUrl({ uuid: image_uuid }).then(function(fileURL) {
                $scope.model.models[0].images[i].src = fileURL;
            });
        }

        $scope.deleteImage = function(img) {
            var image = img
            ScientificModelImageRest.delete({ app_id: $scope.app_id, id: image.id }).$promise.then(
                function(data) {
                    alert('Image ' + img.id + ' has been deleted !');
                    $scope.reloadState();
                });
        };
        $scope.reloadState = function() {
            //to simplify testing
            $state.reload();
        }

        $scope.displayAddImage = function() {
            $scope.addImage = true;
        };
        $scope.saveImage = function() {
            if (JSON.stringify($scope.image) != undefined) {
                $scope.image.model_id = $stateParams.uuid;

                var parameters = JSON.stringify([$scope.image]);
                ScientificModelImageRest.post({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
                    $scope.addImage = false;
                    alert('Image has been saved !');
                    $scope.reloadState();
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
            var a = ScientificModelImageRest.put({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
                alert('Model images have been correctly edited');
            }).catch(function(e) {
                alert(e.data);
            });
        };
        $scope.saveModel = function() {
            if ($scope.model.models[0].alias != '' && $scope.model.models[0].alias != null) {
                $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: $scope.app_id, model_id: $scope.model.models[0].id, alias: $scope.model.models[0].alias });
                $scope.alias_is_valid.$promise.then(function() {
                    if ($scope.alias_is_valid.is_valid) {
                        var parameters = $scope.model;
                        var a = ScientificModelRest.put({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
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
                var a = ScientificModelRest.put({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
                    DataHandler.setStoredModelsAsOutdated();

                    alert('Model correctly edited');
                }).catch(function(e) {
                    alert(e.data);
                });
            }
        };
        $scope.saveModelInstance = function(model_instance) {
            var parameters = JSON.stringify([model_instance]);
            var a = ScientificModelInstanceRest.put({ app_id: $scope.app_id }, parameters).$promise.then(function(data) { alert('model instances correctly edited') }).catch(function(e) {
                alert(e.data);
            });
        };
        $scope.checkAliasValidity = function() {
            $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: $scope.app_id, model_id: $scope.model.models[0].id, alias: $scope.model.models[0].alias });
        };
        $scope.isInArray = function(value, array) {
            return array.indexOf(value) > -1;
        }


        Context.setService().then(function() {

            $scope.Context = Context;

            $scope.ctx = Context.getCtx();
            $scope.app_id = Context.getAppID();
            // DataHandler.loadModels({ app_id: app_id }).then(function(data) {
            //     $scope.models = data
            //     $scope.$apply()
            // });

            CollabParameters.setService($scope.ctx).then(function() {

                $scope.addImage = false;

                $scope.species = CollabParameters.getParametersOrDefaultByType("species");
                $scope.brain_region = CollabParameters.getParametersOrDefaultByType("brain_region");
                $scope.cell_type = CollabParameters.getParametersOrDefaultByType("cell_type");
                $scope.model_type = CollabParameters.getParametersOrDefaultByType("model_type");
                $scope.organization = CollabParameters.getParametersOrDefaultByType("organization");

                $scope.version_is_editable = [];
                $scope.model = ScientificModelRest.get({ app_id: $scope.app_id, id: $stateParams.uuid });

                $scope.model.$promise.then(function(model) {
                    $scope.change_collab_url_to_real_url();
                });

                var version_editable = AreVersionsEditableRest.get({ app_id: $scope.app_id, model_id: $stateParams.uuid });
                version_editable.$promise.then(function(versions) {
                    $scope.version_is_editable = versions.are_editable;
                });

            });
        });


    }
]);

ModelCatalogApp.controller('ModelCatalogVersionCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest', 'CollabParameters', 'Context', 'DataHandler',
    function($scope, $rootScope, $http, $location, $stateParams, ScientificModelRest, ScientificModelInstanceRest, CollabParameters, Context, DataHandler) {

        $scope.ctx, $scope.app_id;
        $scope.model;


        $scope.saveVersion = function() {
            $scope.model_instance.model_id = $stateParams.uuid;
            var parameters = JSON.stringify([$scope.model_instance]);
            ScientificModelInstanceRest.save({ app_id: $scope.app_id }, parameters).$promise.then(function(data) {
                $location.path('/model-catalog/detail/' + $stateParams.uuid);
            }).catch(function(e) {
                alert(e.data);
            });
        };

        //code
        Context.setService().then(function() {
            $scope.Context = Context;

            $scope.ctx = Context.getCtx();
            $scope.app_id = Context.getAppID();

            CollabParameters.setService($scope.ctx).then(function() {
                $scope.model = ScientificModelRest.get({ id: $stateParams.uuid });
            });

        });
    }
]);

ModelCatalogApp.controller('ModelCatalogHelpCtrl', ['$scope', '$rootScope', '$http', '$location', 'DataHandler', 'Context', 'CollabParameters',

    function($scope, $rootScope, $http, $location, DataHandler, Context, CollabParameters) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).then(function() {});

        });
    }
]);

///////////////////////////////////////////////////////////////////////

var ParametersConfigurationApp = angular.module('ParametersConfigurationApp');

ParametersConfigurationApp.controller('ParametersConfigurationCtrl', ['$scope', '$rootScope', '$http', '$location', 'CollabParameters', 'AuthorizedCollabParameterRest', 'CollabIDRest', 'Context',
    function($scope, $rootScope, $http, $location, CollabParameters, AuthorizedCollabParameterRest, CollabIDRest, Context) {

        $scope.ctx, $scope.app_id, $scope.collab;
        $scope.list_params;
        // $scope.selected_data = {};



        Context.setService().then(function() {

            $scope.Context = Context;
            $scope.ctx = Context.getCtx();
            $scope.app_id = Context.getAppID();
            $scope.collab = CollabIDRest.get({ ctx: $scope.ctx });

            $scope.list_param = AuthorizedCollabParameterRest.get({ ctx: $scope.ctx });

            $scope.list_param.$promise.then(function() {
                $scope.data_modalities = $scope.list_param.data_modalities;
                $scope.test_type = $scope.list_param.test_type;
                $scope.model_type = $scope.list_param.model_type;
                $scope.species = $scope.list_param.species;
                $scope.brain_region = $scope.list_param.brain_region;
                $scope.cell_type = $scope.list_param.cell_type;
                $scope.organization = $scope.list_param.organization;
            });



            CollabParameters.setService($scope.ctx).then(function() {

                $scope.selected_data = {};
                $scope.selected_data.selected_data_modalities = CollabParameters.getParameters_authorized_value_formated("data_modalities");
                $scope.selected_data.selected_test_type = CollabParameters.getParameters_authorized_value_formated("test_type");
                $scope.selected_data.selected_model_type = CollabParameters.getParameters_authorized_value_formated("model_type");
                $scope.selected_data.selected_species = CollabParameters.getParameters_authorized_value_formated("species");
                $scope.selected_data.selected_brain_region = CollabParameters.getParameters_authorized_value_formated("brain_region");
                $scope.selected_data.selected_cell_type = CollabParameters.getParameters_authorized_value_formated("cell_type");
                $scope.selected_data.selected_organization = CollabParameters.getParameters_authorized_value_formated("organization");

                $scope.make_post = function() {
                    $scope.app_type = document.getElementById("app").getAttribute("value");

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

                    CollabParameters.addParameter("app_type", $scope.app_type);

                    CollabParameters.setCollabId("collab_id", $scope.collab.collab_id);

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
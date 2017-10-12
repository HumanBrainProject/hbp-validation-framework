'use strict';

/* Controllers */
var testApp = angular.module('testApp');

testApp.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', "ScientificModelRest", "ValidationTestDefinitionRest", 'CollabParameters', 'IsCollabMemberRest', 'Context', 'ScientificModelInstanceRest',
    function($scope, $rootScope, $http, $location, ScientificModelRest, ValidationTestDefinitionRest, CollabParameters, IsCollabMemberRest, Context, ScientificModelInstanceRest) {

        // console.log(ScientificModelInstanceRest.get({ model_alias: "tsdfzfgsdg" }));

        Context.setService().then(function() {

            $scope.Context = Context;
            var ctx = Context.getCtx();
            var app_id = Context.getAppID();


            if (Context.getStateType() == "" || Context.getStateType() == undefined) {
                CollabParameters.setService(ctx).$promise.then(function() {

                    $scope.collab_species = CollabParameters.getParameters("species");
                    $scope.collab_brain_region = CollabParameters.getParameters("brain_region");
                    $scope.collab_cell_type = CollabParameters.getParameters("cell_type");
                    $scope.collab_model_type = CollabParameters.getParameters("model_type");
                    $scope.collab_test_type = CollabParameters.getParameters("test_type");
                    $scope.collab_data_modalities = CollabParameters.getParameters("data_modalities");

                    $scope.models = ScientificModelRest.get({ app_id: app_id }, function(data) {});
                    $scope.tests = ValidationTestDefinitionRest.get({ app_id: app_id }, function(data) {});

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

testApp.controller('ValTestCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'CollabParameters', 'IsCollabMemberRest', 'Context',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, CollabParameters, IsCollabMemberRest, Context) {

        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).$promise.then(function() {


                $scope.collab_species = CollabParameters.getParameters("species");
                $scope.collab_brain_region = CollabParameters.getParameters("brain_region");
                $scope.collab_cell_type = CollabParameters.getParameters("cell_type");
                $scope.collab_model_type = CollabParameters.getParameters("model_type");
                $scope.collab_test_type = CollabParameters.getParameters("test_type");
                $scope.collab_data_modalities = CollabParameters.getParameters("data_modalities");

                $scope.is_collab_member = false;
                $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id, });
                $scope.is_collab_member.$promise.then(function() {
                    $scope.is_collab_member = $scope.is_collab_member.is_member;
                });

                $scope.test_list = ValidationTestDefinitionRest.get({ app_id: app_id }, function(data) {});
            });
        });

    }
]);


testApp.controller('ValModelDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest', 'CollabParameters', 'IsCollabMemberRest', 'AppIDRest', 'Graphics', 'Context', 'AuthorizedCollabParameterRest',

    function($scope, $rootScope, $http, $location, $stateParams, ScientificModelRest, ScientificModelInstanceRest, CollabParameters, IsCollabMemberRest, AppIDRest, Graphics, Context, AuthorizedCollabParameterRest) {
        $scope.Context = Context;
        Context.setService().then(function() {
            $scope.Context = Context;
            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).$promise.then(function() {
                $scope.is_collab_member = false;
                $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id });
                $scope.is_collab_member.$promise.then(function() {
                    $scope.is_collab_member = $scope.is_collab_member.is_member;
                });
                $scope.authorized_parameters = AuthorizedCollabParameterRest.get();
                $scope.model = ScientificModelRest.get({ app_id: app_id, id: $stateParams.uuid });
                $scope.model.$promise.then(function() {
                    //graph and table results
                    Graphics.getResultsfromModelResultID2($scope.model).then(function(init_graph) {
                            $scope.data = init_graph.values;
                            $scope.init_graph_all = new Array();
                            $scope.line_result_focussed = new Array();
                            $scope.options5 = new Array();
                            $scope.init_checkbox = new Array();
                            for (var i in $scope.authorized_parameters.score_type) {
                                var score_type = $scope.authorized_parameters.score_type[i].authorized_value;
                                Graphics.getResultsfromModelResultID2($scope.model, score_type).then(function(value) {
                                    var key = $scope.init_graph_all.push(value);
                                    $scope.options5.push(Graphics.get_lines_options('title', '', $scope.authorized_parameters.score_type[key - 1].authorized_value, "", value.results, "model", key - 1));
                                    //  $scope.init_checkbox.push(value.list_ids);
                                    $scope.line_result_focussed.push();
                                    $scope.$on('data_focussed:updated', function(event, data, key) {
                                        $scope.line_result_focussed[key] = data;
                                        $scope.$apply();
                                    });
                                    $scope.$apply();
                                });
                            };
                            // $scope.init_graph_all = $scope.init_graph_all_original;
                            $scope.init_checkbox = init_graph.list_ids;
                            $scope.init_graph = init_graph;
                            // $scope.line_result_focussed;
                            // $scope.$on('data_focussed:updated', function(event, data) {
                            //     $scope.line_result_focussed = data;
                            //     $scope.$apply();
                            // });
                        })
                        // shitty solution to go faster. will need to be replaced with a clean solution. This one get data for each score_type. the best would be to subset data from the previous get directly
                        //for p-value




                    // let multi_graphs = await Graphics.getGraphsByScoreType(init_graph.values);
                    // $scope.multi_graphs = multi_graphs;

                    // console.log("multi graphs", $scope.multi_graphs);

                    // Graphics.getResultsfromModelResultID2($scope.model).then(function(init_graph) {
                    //     //$scope.init_graph= Graphics.getResultsfromModelID($scope.model); 
                    //     $scope.data = init_graph.values;
                    //     $scope.init_checkbox = init_graph.list_ids;
                    //     $scope.init_graph = init_graph;
                    //     $scope.line_result_focussed;
                    //     $scope.$on('data_focussed:updated', function(event, data) {
                    //         $scope.line_result_focussed = data;
                    //         $scope.$apply();
                    //     })
                    //     console.log("init graph promise", init_graph)

                    //     Graphics.getGraphsByScoreType(init_graph.values).then(function(multi_graphs) {
                    //         $scope.multi_graphs = multi_graphs;
                    //         $scope.options5 = Graphics.get_lines_options('Model/p-value', '', "p-value", "this is a caption", init_graph.results, "model");
                    //         console.log("multi graphs", $scope.multi_graphs);
                    //     });


                    //     console.log("score_type", $scope.authorized_parameters.score_type)
                    //     console.log("init_graph", init_graph)
                    //     console.log("init_graph scope", $scope.init_graph)
                    //     console.log("init_graph values", init_graph.values[2])
                    //     console.log("data", $scope.data)
                    //     console.log("checkbox list", $scope.init_checkbox)


                    // })
                });

            });
        });

        $scope.updateGraph = function(key) {
            var list_ids = _IsCheck(key);
            $scope.init_graph_all[key].values = Graphics.getUpdatedGraph($scope.init_graph.values, list_ids);
            $scope.line_result_focussed[key] = null;
        };

        var _IsCheck = function(key) {
            var list_ids = [];
            var i = 0;
            for (i; i < $scope.init_graph_all[key].list_ids.length; i++) {
                if (document.getElementById('check-' + key + '-' + i).checked) {
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


testApp.controller('ValTestDetailCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', '$state', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest', 'CollabParameters', 'TestCommentRest', "IsCollabMemberRest", "Graphics", "Context", 'TestTicketRest', 'AuthorizedCollabParameterRest', 'ValidationTestAliasRest', 'NotificationRest',

    function($scope, $rootScope, $http, $location, $stateParams, $state, ValidationTestDefinitionRest, ValidationTestCodeRest, CollabParameters, TestCommentRest, IsCollabMemberRest, Graphics, Context, TestTicketRest, AuthorizedCollabParameterRest, ValidationTestAliasRest, NotificationRest) {
        Context.setService().then(function() {
            $scope.Context = Context;
            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).$promise.then(function() {
                $scope.is_collab_member = false;
                $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id });
                $scope.is_collab_member.$promise.then(function() {
                    $scope.is_collab_member = $scope.is_collab_member.is_member;
                });

                $scope.detail_test = ValidationTestDefinitionRest.get({ app_id: app_id, id: $stateParams.uuid });

                $scope.auhtorized_params = AuthorizedCollabParameterRest.get();
                $scope.species = CollabParameters.getParameters("species");
                $scope.brain_region = CollabParameters.getParameters("brain_region");
                $scope.cell_type = CollabParameters.getParameters("cell_type");
                $scope.model_type = CollabParameters.getParameters("model_type");
                $scope.test_type = CollabParameters.getParameters("test_type");
                $scope.data_modalities = CollabParameters.getParameters("data_modalities");
                $scope.detail_version_test = ValidationTestCodeRest.get({ app_id: app_id, test_definition_id: $stateParams.uuid });


                $scope.detail_test.$promise.then(function() {
                    Graphics.getResultsfromTestID2($scope.detail_test).then(function(init_graph) {

                        $scope.result_focussed;
                        $scope.$on('data_focussed:updated', function(event, data, key) {
                            $scope.result_focussed = data;
                            $scope.$apply();
                        });
                        $scope.init_graph = init_graph;
                        $scope.graphic_data = init_graph.values;
                        $scope.init_checkbox = init_graph.list_ids;
                        //main table result

                        $scope.graphic_options = Graphics.get_lines_options('Test/result', '', $scope.detail_test.score_type, "this is a caption", init_graph.results, "test", "");

                    }).catch(function(err) {
                        console.error('Erreur !');
                        console.dir(err);
                        console.log(err);
                    });
                    //for tab_comments
                    $scope.test_tickets = TestTicketRest.get({ app_id: app_id, test_id: $stateParams.uuid });
                    $scope.comments_to_show = [];
                    $scope.create_comment_to_show = [];
                    $scope.button_save_ticket = [];
                    $scope.button_save_comment = [];
                });

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
                    var test_version_response = ValidationTestCodeRest.save({ app_id: app_id, id: $scope.detail_test.tests[0].id }, parameters).$promise.then(function() {
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
                                });
                            } else {
                                alert('Cannot update the test. Please check the alias.');
                            };
                        });
                    } else {
                        var parameters = JSON.stringify($scope.detail_test.tests[0]);
                        ValidationTestDefinitionRest.put({ app_id: app_id, id: $scope.detail_test.tests[0].id }, parameters).$promise.then(function() {
                            document.getElementById("tab_description").style.display = "none";
                            document.getElementById("tab_version").style.display = "block";
                            document.getElementById("tab_new_version").style.display = "none";
                            document.getElementById("tab_results").style.display = "none";
                            document.getElementById("tab_comments").style.display = "none";
                            $state.reload();
                        });
                    }


                };

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
                        console.log($scope.new_ticket)
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
                    var text = $("#editable-text-" + com_id).text();
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

testApp.controller('ValTestResultDetailCtrl', ['$window', '$scope', '$rootScope', '$http', '$location', '$stateParams', 'IsCollabMemberRest', 'AppIDRest', 'ValidationResultRest', 'CollabParameters', 'ScientificModelRest', 'ValidationTestDefinitionRest', "Context",
    function($window, $scope, $rootScope, $http, $location, $stateParams, IsCollabMemberRest, AppIDRest, ValidationResultRest, CollabParameters, ScientificModelRest, ValidationTestDefinitionRest, Context) {
        Context.setService().then(function() {
            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();


            CollabParameters.setService(ctx).$promise.then(function() {
                $scope.is_collab_member = false;
                $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id, });
                $scope.is_collab_member.$promise.then(function() {
                    $scope.is_collab_member = $scope.is_collab_member.is_member;
                });
                $scope.test_result = ValidationResultRest.get({ app_id: app_id, id: $stateParams.uuid });

                $scope.test_result.$promise.then(function() {
                    $scope.model = ScientificModelRest.get({ app_id: app_id, id: $scope.test_result.data.model_version.model_id });
                    $scope.test = ValidationTestDefinitionRest.get({ app_id: app_id, id: $scope.test_result.data.test_code.test_definition_id });
                });

            });

        });


    }
]);


testApp.controller('TestResultCtrl', ['$scope', '$rootScope', '$http', '$location', '$timeout', 'CollabParameters', 'ValidationResultRest_fortest', 'ValidationResultRest', 'Graphics', "Context",

    function($scope, $rootScope, $http, $location, $timeout, CollabParameters, ValidationResultRest_fortest, ValidationResultRest, Graphics, Context) {
        Context.setService().then(function() {
            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).$promise.then(function() {

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


testApp.controller('ValTestCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ValidationTestDefinitionRest', 'ValidationTestCodeRest', 'CollabParameters', 'Context', 'AuthorizedCollabParameterRest', 'ValidationTestAliasRest',
    function($scope, $rootScope, $http, $location, ValidationTestDefinitionRest, ValidationTestCodeRest, CollabParameters, Context, AuthorizedCollabParameterRest, ValidationTestAliasRest) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();


            CollabParameters.setService(ctx).$promise.then(function() {
                $scope.alias_is_valid = "";
                $scope.auhtorized_params = AuthorizedCollabParameterRest.get();
                $scope.species = CollabParameters.getParameters("species");
                $scope.brain_region = CollabParameters.getParameters("brain_region");
                $scope.cell_type = CollabParameters.getParameters("cell_type");
                $scope.data_type = CollabParameters.getParameters("data_type");
                $scope.data_modalities = CollabParameters.getParameters("data_modalities");
                $scope.test_type = CollabParameters.getParameters("test_type");

                $scope.saveTest = function() {
                    if ($scope.test.alias != '' && $scope.test.alias != undefined) {
                        $scope.alias_is_valid = ValidationTestAliasRest.get({ app_id: app_id, alias: $scope.test.alias });
                        $scope.alias_is_valid.$promise.then(function() {
                            if ($scope.alias_is_valid.is_valid) {
                                var parameters = JSON.stringify({ test_data: $scope.test, code_data: $scope.code });
                                ValidationTestDefinitionRest.save({ app_id: app_id }, parameters).$promise.then(function(data) {
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




testApp.controller('ConfigCtrl', ['$scope', '$rootScope', '$http', '$location', 'CollabParameters', 'AuthorizedCollabParameterRest', "Context",
    function($scope, $rootScope, $http, $location, CollabParameters, AuthorizedCollabParameterRest, Context) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppId();

            CollabParameters.setService(ctx).$promise.then(function() {

                $scope.list_param = AuthorizedCollabParameterRest.get({ app_id: app_id });

                $scope.make_post = function() {

                    CollabParameters.initConfiguration();

                    $scope.selected_data_modalities.forEach(function(value, i) {
                        CollabParameters.addParameter("data_modalities", value.authorized_value);
                    });

                    $scope.selected_test_type.forEach(function(value, i) {
                        CollabParameters.addParameter("test_type", value.authorized_value);
                    });

                    $scope.selected_model_type.forEach(function(value, i) {
                        CollabParameters.addParameter("model_type", value.authorized_value);
                    });

                    $scope.selected_species.forEach(function(value, i) {
                        CollabParameters.addParameter("species", value.authorized_value);
                    });

                    $scope.selected_brain_region.forEach(function(value, i) {
                        CollabParameters.addParameter("brain_region", value.authorized_value);
                    });

                    $scope.selected_cell_type.forEach(function(value, i) {
                        CollabParameters.addParameter("cell_type", value.authorized_value);
                    });

                    CollabParameters.put_parameters().$promise.then(function() {
                        CollabParameters.getRequestParameters().$promise.then(function() {
                            $location.path('/home');
                        });
                    });
                };

                //not working : might require to clean up the the selectors.
                $scope.reloadPage = function() {
                    $location.path('/home/config');
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

    function($scope, $rootScope, $http, $location, ScientificModelRest, CollabParameters, IsCollabMemberRest, Context, Help) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            if (Context.getState() == "" || Context.getState() == undefined || Context.getState() == "n") {
                Context.sendState("model", "n");

                CollabParameters.setService(ctx).$promise.then(function() {

                    $scope.collab_species = CollabParameters.getParameters("species");
                    $scope.collab_brain_region = CollabParameters.getParameters("brain_region");
                    $scope.collab_cell_type = CollabParameters.getParameters("cell_type");
                    $scope.collab_model_type = CollabParameters.getParameters("model_type");
                    $scope.collab_organization = CollabParameters.getParameters("organization");
                    // will have data here to make redirection directly
                    $scope.models = ScientificModelRest.get({ app_id: app_id });

                    $scope.is_collab_member = false;
                    $scope.is_collab_member = IsCollabMemberRest.get({ app_id: app_id, });
                    $scope.is_collab_member.$promise.then(function() {
                        $scope.is_collab_member = $scope.is_collab_member.is_member;
                    });

                    //just to test Help funtions

                    // var help = Help.getAuthorizedValues('all');
                    // help.then(function() {
                    //     console.log(help)
                    // })
                });
            } else {
                var model_id = Context.getState();
                Context.modelCatalog_goToModelDetailView(model_id);
                $scope.$apply()
            }
        });



    }

]);

ModelCatalogApp.controller('ModelCatalogCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'ScientificModelRest', 'CollabParameters', 'CollabIDRest', "Context", "ScientificModelAliasRest", "AuthorizedCollabParameterRest",

    function($scope, $rootScope, $http, $location, ScientificModelRest, CollabParameters, CollabIDRest, Context, ScientificModelAliasRest, AuthorizedCollabParameterRest) {
        Context.setService().then(function() {
            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();


            CollabParameters.setService(ctx).$promise.then(function() {
                $scope.addImage = false;
                $scope.alias_is_valid = "";

                $scope.authorized_params = AuthorizedCollabParameterRest.get();
                $scope.species = CollabParameters.getParameters("species");
                $scope.brain_region = CollabParameters.getParameters("brain_region");
                $scope.cell_type = CollabParameters.getParameters("cell_type");
                $scope.model_type = CollabParameters.getParameters("model_type");
                $scope.organization = CollabParameters.getParameters("organization");

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
                CollabParameters.setService($scope.ctx).$promise.then(function() {

                    $("#ImagePopupDetail").hide();
                    $scope.model = ScientificModelRest.get({ app_id: $scope.app_id, id: $stateParams.uuid });

                    $scope.toggleSize = function(index, img) {
                        $scope.bigImage = img;
                        $("#ImagePopupDetail").show();
                    }

                    $scope.closeImagePanel = function() {
                        $scope.image = {};
                        $("#ImagePopupDetail").hide();
                    };

                    $scope.is_collab_member = false;
                    $scope.is_collab_member = IsCollabMemberRest.get({ app_id: $scope.app_id, })
                    $scope.is_collab_member.$promise.then(function() {
                        $scope.is_collab_member = $scope.is_collab_member.is_member;
                    });
                });

                //to test follow fuctionality and notifications
                // $scope.followModel = function() {
                //     var parameters = JSON.stringify({ model_id: $stateParams.uuid, user_id: 0 })
                //     ModelFollowRest.post({ app_id: $scope.app_id }, parameters);
                // };
            }
        });




    }
]);

ModelCatalogApp.controller('ModelCatalogEditCtrl', ['$scope', '$rootScope', '$http', '$location', '$state', '$stateParams', 'ScientificModelRest', 'ScientificModelInstanceRest', 'ScientificModelImageRest', 'CollabParameters', 'Context', 'ScientificModelAliasRest',

    function($scope, $rootScope, $http, $location, $state, $stateParams, ScientificModelRest, ScientificModelInstanceRest, ScientificModelImageRest, CollabParameters, Context, ScientificModelAliasRest) {
        Context.setService().then(function() {

            $scope.Context = Context;

            var ctx = Context.getCtx();
            var app_id = Context.getAppID();

            CollabParameters.setService(ctx).$promise.then(function() {

                $scope.addImage = false;
                $scope.species = CollabParameters.getParameters("species");
                $scope.brain_region = CollabParameters.getParameters("brain_region");
                $scope.cell_type = CollabParameters.getParameters("cell_type");
                $scope.model_type = CollabParameters.getParameters("model_type");
                $scope.organization = CollabParameters.getParameters("organization");

                $scope.model = ScientificModelRest.get({ app_id: app_id, id: $stateParams.uuid });

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
                    });
                };
                $scope.saveModel = function() {
                    if ($scope.model.models[0].alias != '' && $scope.model.models[0].alias != null) {
                        $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: app_id, model_id: $scope.model.models[0].id, alias: $scope.model.models[0].alias });
                        $scope.alias_is_valid.$promise.then(function() {
                            if ($scope.alias_is_valid.is_valid) {
                                var parameters = $scope.model;
                                var a = ScientificModelRest.put({ app_id: app_id }, parameters).$promise.then(function(data) {
                                    alert('Model correctly edited');
                                });
                            } else {
                                alert('Cannot update the model. Please check the alias.');
                            }
                        });
                    } else {
                        var parameters = $scope.model;
                        var a = ScientificModelRest.put({ app_id: app_id }, parameters).$promise.then(function(data) {
                            alert('Model correctly edited');
                        });
                    }
                };
                $scope.saveModelInstance = function() {
                    var parameters = $scope.model.models[0].instances;
                    var a = ScientificModelInstanceRest.put({ app_id: app_id }, parameters).$promise.then(function(data) { alert('model instances correctly edited') });
                };
                $scope.checkAliasValidity = function() {
                    $scope.alias_is_valid = ScientificModelAliasRest.get({ app_id: app_id, model_id: $scope.model.models[0].id, alias: $scope.model.models[0].alias });
                };

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

            CollabParameters.setService(ctx).$promise.then(function() {
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



            CollabParameters.setService(ctx).$promise.then(function() {

                var app_type = document.getElementById("app").getAttribute("value");
                var collab = CollabIDRest.get({ ctx: ctx });
                $scope.list_param = AuthorizedCollabParameterRest.get({ app_id: app_id });

                $scope.list_param.$promise.then(function() {
                    $scope.data_modalities = $scope.list_param.data_modalities;
                    $scope.test_type = $scope.list_param.test_type;
                    $scope.model_type = $scope.list_param.model_type;
                    $scope.species = $scope.list_param.species;
                    $scope.brain_region = $scope.list_param.brain_region;
                    $scope.cell_type = $scope.list_param.cell_type;
                    $scope.organization = $scope.list_param.organization;
                });

                $scope.selected_data_modalities = CollabParameters.getParameters_authorized_value_formated("data_modalities");
                $scope.selected_test_type = CollabParameters.getParameters_authorized_value_formated("test_type");
                $scope.selected_model_type = CollabParameters.getParameters_authorized_value_formated("model_type");
                $scope.selected_species = CollabParameters.getParameters_authorized_value_formated("species");
                $scope.selected_brain_region = CollabParameters.getParameters_authorized_value_formated("brain_region");
                $scope.selected_cell_type = CollabParameters.getParameters_authorized_value_formated("cell_type");
                $scope.selected_organization = CollabParameters.getParameters_authorized_value_formated("organization");

                $scope.make_post = function() {

                    CollabParameters.initConfiguration();

                    $scope.selected_data_modalities.forEach(function(value, i) {
                        CollabParameters.addParameter("data_modalities", value.authorized_value);
                    });

                    $scope.selected_test_type.forEach(function(value, i) {
                        CollabParameters.addParameter("test_type", value.authorized_value);
                    });

                    $scope.selected_model_type.forEach(function(value, i) {
                        CollabParameters.addParameter("model_type", value.authorized_value);
                    });

                    $scope.selected_species.forEach(function(value, i) {
                        CollabParameters.addParameter("species", value.authorized_value);
                    });

                    $scope.selected_brain_region.forEach(function(value, i) {
                        CollabParameters.addParameter("brain_region", value.authorized_value);
                    });

                    $scope.selected_cell_type.forEach(function(value, i) {
                        CollabParameters.addParameter("cell_type", value.authorized_value);
                    });

                    $scope.selected_organization.forEach(function(value, i) {
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
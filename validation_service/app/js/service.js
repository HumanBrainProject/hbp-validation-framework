var ContextServices = angular.module('ContextServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', ]);

ContextServices.service('Context', ['$rootScope', '$location', 'AppIDRest', 'CollabIDRest',
    function($rootScope, $location, AppIDRest, CollabIDRest) {
        var ctx;
        var state_type = undefined;
        var state = undefined;
        var external = undefined;
        var collabID = undefined;
        var appID = undefined;
        var serviceSet = false;


        var modelCatalog_goToHomeView = function() {
            clearState();
            setTimeout(function() {
                // $location.path('/model-catalog/');

            }, 300);
        };
        var modelCatalog_goToModelDetailView = function(model_id) {

            sendState("model", model_id);
            setState(model_id);

            $location.path('/model-catalog/detail/' + model_id);
            // $location.replace();


            // $scope.$apply()

            setTimeout(function() {}, 0);
        };
        var validation_goToTestCatalogView = function() {
            sendState("id", '0');
            setState('0');
            $location.path('/home/validation_test');
        };

        var validation_goToHomeView = function() {
            clearState();
            setTimeout(function() {
                // $location.path('/home/');
            }, 500);
        };
        var validation_goToModelDetailView = function(model_id) {
            sendState("model", model_id);
            setState(model_id);
            $location.path('/home/validation_model_detail/' + model_id);
        };
        var validation_goToTestDetailView = function(test_id) {
            sendState("test", test_id);
            setState(test_id);
            $location.path('/home/validation_test/' + test_id);
        };
        var validation_goToResultDetailView = function(result_id) {
            sendState("result", result_id);
            setState(result_id);
            $location.path('/home/validation_test_result/' + result_id);
        };
        var validation_goToModelCatalog = function(model) {

            //here we need to use the current collab_id to get the app_id of local model_cataloge. 
            //if no such app : rize allert
            // console.log(collabID);
            // console.log(collabID);

            // console.log(window.bbpConfig);

            // clbStorage.getEntity({ collab: collabID }).then(function(collab_entity) {
            //     console.log(collab_entity);

            //     // clbStorage.getChildren({ uuid: collabStorageFolder.uuid, entity_type: 'folder' }).then(function(storage_folder_children) {
            //     //         $scope.storage_files = storage_folder_children.results

            //     //     }, function() {})
            //     //     .finally(function() {});

            // }, function(not_worked) {}).finally(function() {});


            // console.log("model", model)
            var collab_id = model.app.collab_id;
            var app_id = model.app.id;

            var url = "https://collab.humanbrainproject.eu/#/collab/" + collab_id + "/nav/" + app_id +
                "?state=model." + model.id + ",external"; //to go to collab api
            window.open(url, 'modelCatalog');
        }

        var setService = function() {
            return new Promise(function(resolve, reject) {

                if (serviceSet == false) {
                    // _getState();
                    temp_state = window.location.search.split("&")[1];


                    if (temp_state != undefined && temp_state != "ctxstate=") {
                        temp_state2 = temp_state.split("%2C")[0];
                        temp_state2 = temp_state2.substring(9);
                        state_type = temp_state2.split(".")[0]
                        state = temp_state2.split(".")[1]

                        if (temp_state.split("%2C")[1] != undefined) {
                            external = temp_state.split("%2C")[1];
                        }
                    }

                    // _getCtx();
                    if (ctx == undefined) {
                        ctx = window.location.search.split("&")[0].substring(5);
                    }

                    // getCollabID();
                    if (collabID == undefined || collabID == "") {
                        var collab_request = CollabIDRest.get({ ctx: ctx }); //.collab_id;
                        collab_request.$promise.then(function() {
                            collabID = collab_request.collab_id
                        });
                    }

                    // getAppID();
                    if (appID == undefined || appID == "") {
                        var app_request = AppIDRest.get({ ctx: ctx }); //.collab_id;
                        app_request.$promise.then(function() {
                            appID = app_request.app_id
                        });
                    }

                    if (app_request == undefined) {
                        if (collab_request == undefined) {
                            serviceSet = true;
                            resolve();
                        } else {
                            collab_request.$promise.then(function() {
                                serviceSet = true;
                                resolve();
                            });
                        }
                    } else {
                        app_request.$promise.then(function() {

                            if (collab_request == undefined) {
                                serviceSet = true;
                                resolve();

                            } else {
                                collab_request.$promise.then(function() {
                                    serviceSet = true;
                                    resolve();
                                });
                            }
                        });
                    }

                } else {
                    resolve();
                }

            });
        };

        var setState = function(id) {
            state = id;
        };


        var getExternal = function() {
            return external;
        }

        var getState = function() {
            return state;
        };

        var getCtx = function() {
            return ctx;
        };

        var getCollabID = function() {
            return collabID;
        };

        var getAppID = function() {
            return appID;
        };



        var sendState = function(type, id) {
            state_type = type;
            window.parent.postMessage({
                eventName: 'workspace.context',

                data: {
                    state: type + '.' + id
                }
            }, 'https://collab.humanbrainproject.eu/');
        };


        var clearState = function() {

            window.parent.postMessage({
                eventName: 'workspace.context',

                data: {
                    state: ''
                }
            }, 'https://collab.humanbrainproject.eu/');

            state = "";
            state_type = undefined;


            setTimeout(function() {
                // window.location.href = "ctx=" + getCtx() + "&ctxstate=";
                window.location.hash = "ctx=" + getCtx() + "&ctxstate=";
                // console.log(window.location.hash);

                // window.location.search = "ctx=" + getCtx() + "&ctxstate=";


            }, 300);

        };

        var clearExternal = function() {
            sendState(state_type, state);
            // window.location.search = "ctx=" + getCtx() + "&ctxstate="+state_type+"."+state;
            window.location.search = "ctx=" + getCtx() + "&ctxstate=";
        };

        var getStateType = function() {
            return state_type;
        };

        return {
            setService: setService,
            getCtx: getCtx,
            getCollabID: getCollabID,
            getAppID: getAppID,
            getState: getState,
            sendState: sendState,
            clearState: clearState,
            clearExternal: clearExternal,
            setState: setState,
            getExternal: getExternal,
            getStateType: getStateType,
            modelCatalog_goToHomeView: modelCatalog_goToHomeView,
            modelCatalog_goToModelDetailView: modelCatalog_goToModelDetailView,
            validation_goToHomeView: validation_goToHomeView,
            validation_goToModelDetailView: validation_goToModelDetailView,
            validation_goToTestDetailView: validation_goToTestDetailView,
            validation_goToResultDetailView: validation_goToResultDetailView,
            validation_goToModelCatalog: validation_goToModelCatalog,
            validation_goToTestCatalogView: validation_goToTestCatalogView,
        }
    }
]);



var DataHandlerServices = angular.module('DataHandlerServices', ['ngResource', 'btorfs.multiselect']);
DataHandlerServices.service('DataHandler', ['$rootScope', 'ScientificModelRest', 'ValidationTestDefinitionRest',
    function($rootScope, ScientificModelRest, ValidationTestDefinitionRest) {
        var models = { date_last_load: undefined, status: undefined, data: undefined };
        var tests = { date_last_load: undefined, status: undefined, data: undefined };
        var results = { date_last_load: undefined, status: undefined, data: undefined };
        //possible states status : 
        //- up to date
        //- outdated 
        //- undefined


        //TODO function to complete the list when the user create a new model
        var loadModels = function(dict_params) {
            return new Promise(function(resolve, reject) {
                console.log(models);

                if (dict_params.id != undefined) {
                    reject("this function does not support id of models yet")
                        // throw "this function does not support id of models yet"
                }
                if (models.status == undefined) {
                    var temp_models = ScientificModelRest.get(dict_params);
                    temp_models.$promise.then(function() {
                        models = { date_last_load: new Date(), status: "up to date", data: temp_models };
                        resolve(models.data);
                    });

                } else {
                    if (models.status == "up to date") {
                        var data = _loadStoredModels();
                        resolve(data);
                    } else {
                        var temp_models = ScientificModelRest.get(dict_params);
                        temp_models.$promise.then(function() {
                            models = { date_last_load: new Date(), status: "up to date", data: temp_models };
                            resolve(models.data);
                        });
                    }
                }

            });
        };

        var loadTests = function(dict_params) {
            return new Promise(function(resolve, reject) {
                if (dict_params.id != undefined) {
                    reject("this function does not support id of tests yet")
                        // throw "this function does not support id of models yet"
                }
                if (tests.status == undefined) {
                    var temp_tests = ValidationTestDefinitionRest.get(dict_params);
                    temp_tests.$promise.then(function() {
                        tests = { date_last_load: new Date(), status: "up to date", data: temp_tests };
                        resolve(tests.data);
                    });

                } else {
                    if (tests.status == "up to date") {
                        var data = _loadStoredTests();
                        resolve(data);
                    } else {
                        var temp_tests = ValidationTestDefinitionRest.get(dict_params);
                        temp_tests.$promise.then(function() {
                            tests = { date_last_load: new Date(), status: "up to date", data: temp_tests };
                            resolve(tests.data);
                        });
                    }
                }

            });
        };

        var _loadStoredModels = function() {
            return (models.data);
        };

        var _loadStoredTests = function() {
            return (tests.data);
        };


        var setStoredModelsAsOutdated = function() {
            models.status = "outdated";
        };

        var setStoredTestsAsOutdated = function() {
            tests.status = "outdated";
        };

        return {
            loadModels: loadModels,
            loadTests: loadTests,
            setStoredModelsAsOutdated: setStoredModelsAsOutdated,
            setStoredTestsAsOutdated: setStoredTestsAsOutdated,
        };

    }
]);

var ParametersConfigurationServices = angular.module('ParametersConfigurationServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', 'ContextServices']);
ParametersConfigurationServices.service('CollabParameters', ['$rootScope', 'CollabParameterRest', 'Context', 'AuthorizedCollabParameterRest',
    function($rootScope, CollabParameterRest, Context, AuthorizedCollabParameterRest) {
        var parameters;
        var default_parameters = undefined; // = build_formated_default_parameters();
        var ctx;

        var setCollabId = function(type, newObj) {
            parameters.param[0][type] = newObj;
        };

        var addParameter = function(type, newObj) {
            parameters.param[0][type].push(newObj);
        };

        var supprParameter = function(type, Obj) {
            index = parameters.param[0][type].indexOf(Obj);
            parameters.param[0][type].splice(index, 1);
        };

        var getParameters = function(type) {
            return parameters.param[0][type];
        };

        var getParametersOrDefault = function(type) {
            var param = getParameters(type);

            if (param.length > 0) {
                return param;
            } else {
                return default_parameters[type];
            }
        };

        var format_parameter_data = function(data) {
            formated_data = [];

            size = data.length;
            for (var i = 0; i < size; i++) {
                formated_data.push(data[i].authorized_value);
            }
            return formated_data;
        };
        var build_formated_default_parameters = function() {
            return new Promise(function(resolve, reject) {
                if (default_parameters == undefined) {
                    var data = AuthorizedCollabParameterRest.get();

                    data.$promise.then(function() {

                        var data_to_return = {}

                        data_to_return.brain_region = format_parameter_data(data.brain_region);
                        data_to_return.cell_type = format_parameter_data(data.cell_type);
                        data_to_return.data_modalities = format_parameter_data(data.data_modalities);
                        data_to_return.model_type = format_parameter_data(data.model_type);
                        data_to_return.organization = format_parameter_data(data.organization);
                        data_to_return.score_type = format_parameter_data(data.score_type);
                        data_to_return.species = format_parameter_data(data.species);
                        data_to_return.test_type = format_parameter_data(data.test_type);

                        default_parameters = data_to_return;
                        // return data_to_return;


                        resolve("loaded");
                    });


                } else {
                    resolve("was already ready");


                }

            });
        };


        var getParameters_authorized_value_formated = function(type) {
            data = getParameters(type);
            formated_data = [];

            size = data.length;
            for (var i = 0; i < size; i++) {
                formated_data.push({ authorized_value: data[i] });
            }
            return formated_data;
        };

        var getRequestParameters = function() {
            // console.log("getRequestParameters");
            // console.log(Context.getCollabID());
            // console.log(Context.getAppID());

            parameters = CollabParameterRest.get({ app_id: Context.getAppID() });
            return parameters
        };

        var getAllParameters = function() {
            return parameters.param[0];
        };

        var _StringTabToArray = function(tab) {
            tab.forEach(function(value, i) {
                if (value == "") {
                    tab[i] = [];

                } else {
                    tab[i] = value.split(",");
                }

            });

            return tab;
        };

        var _getParamTabValues = function() {
            var param_tab = [
                parameters.param[0]['data_modalities'],
                parameters.param[0]['species'],
                parameters.param[0]['brain_region'],
                parameters.param[0]['cell_type'],
                parameters.param[0]['model_type'],
                parameters.param[0]['test_type'],
                parameters.param[0]['organization'],
            ];

            return param_tab;
        };

        var _setParametersNewValues = function(string_tab) {
            parameters.param[0]['data_modalities'] = string_tab[0];
            parameters.param[0]['species'] = string_tab[1];
            parameters.param[0]['brain_region'] = string_tab[2];
            parameters.param[0]['cell_type'] = string_tab[3];
            parameters.param[0]['model_type'] = string_tab[4];
            parameters.param[0]['test_type'] = string_tab[5];
            parameters.param[0]['organization'] = string_tab[6];
        };

        var setService = function(ctx_param) {
            return new Promise(function(resolve, reject) {
                // ctx = ctx_param;
                // default_parameters = AuthorizedCollabParameterRest.get();
                // default_parameters = build_formated_default_parameters();

                build_formated_default_parameters().then(function() {

                    if (typeof(parameters) == "undefined") {
                        parameters = CollabParameterRest.get({ app_id: Context.getAppID() }); //need to get collab number
                        parameters.$promise.then(function() {

                            if (parameters.param.length == 0) {
                                post = _postInitCollab();
                                post.$promise.then(function() {
                                    parameters = CollabParameterRest.get({ app_id: Context.getAppID() });

                                    parameters.$promise.then(function() {
                                        resolve(parameters);
                                    });

                                });
                            } else {
                                param_tab = _getParamTabValues();
                                string_tab = _StringTabToArray(param_tab);
                                _setParametersNewValues(string_tab);
                                resolve(parameters);

                            }
                        });
                    } else {
                        parameters.$promise.then(function() {
                            resolve(parameters);
                        });
                    }
                    // return parameters;
                });
            });
        };

        var _postInitCollab = function() {
            initConfiguration();

            post = post_parameters();
            return post;

        };

        var post_parameters = function() {

            var data_to_send = JSON.stringify({
                'id': Context.getAppID(),
                'data_modalities': String(parameters.param[0]['data_modalities']),
                'test_type': String(parameters.param[0]['test_type']),
                'species': String(parameters.param[0]['species']),
                'brain_region': String(parameters.param[0]['brain_region']),
                'cell_type': String(parameters.param[0]['cell_type']),
                'model_type': String(parameters.param[0]['model_type']),
                'organization': String(parameters.param[0]['organization']),
                'app_type': String(parameters.param[0]['app_type']),
                'collab_id': Context.getCollabID(),
            });
            post = CollabParameterRest.save({ app_id: Context.getAppID(), collab_id: Context.getCollabID() }, data_to_send, function(value) {});
            return post;
        };

        var put_parameters = function() {

            var data_to_send = JSON.stringify({
                'id': Context.getAppID(),
                'data_modalities': String(parameters.param[0]['data_modalities']),
                'test_type': String(parameters.param[0]['test_type']),
                'species': String(parameters.param[0]['species']),
                'brain_region': String(parameters.param[0]['brain_region']),
                'cell_type': String(parameters.param[0]['cell_type']),
                'model_type': String(parameters.param[0]['model_type']),
                'organization': String(parameters.param[0]['organization']),
                'app_type': String(parameters.param[0]['app_type']),
                'collab_id': Context.getCollabID(),
            });

            put = CollabParameterRest.put({ app_id: Context.getAppID() }, data_to_send, function(value) {});
            return put;
        };

        var initConfiguration = function() {
            parameters = {
                'param': [{
                    'data_modalities': [],
                    'test_type': [],
                    'species': [],
                    'brain_region': [],
                    'cell_type': [],
                    'model_type': [],
                    'organization': [],
                    'app_type': [],
                    'collab_id': 0,
                }, ],
                '$promise': true,
            };
        };

        var getDefaultParameters = function() {
            return default_parameters;
        };

        return {
            addParameter: addParameter,
            getParameters: getParameters,
            getParameters_authorized_value_formated: getParameters_authorized_value_formated,
            getAllParameters: getAllParameters,
            setService: setService,
            supprParameter: supprParameter,
            post_parameters: post_parameters,
            put_parameters: put_parameters,
            initConfiguration: initConfiguration,
            getRequestParameters: getRequestParameters,
            setCollabId: setCollabId,
            getDefaultParameters: getDefaultParameters,
            getParametersOrDefault: getParametersOrDefault,
        };

    }
]);


var GraphicsServices = angular.module('GraphicsServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', 'ParametersConfigurationServices', 'ContextServices']);

GraphicsServices.factory('Graphics', ['$rootScope', 'Context', 'ValidationResultRest',
    function($rootScope, Context, ValidationResultRest) {
        // var results_data = undefined;

        var focus = function(list_id_couple, results_data, type, graph_key) {
            var list_data = [];
            var i = 0;
            for (i; i < list_id_couple.length; i++) {
                data = find_result_in_data(list_id_couple[i], results_data, type);
                data.line_id = list_id_couple[i].id_line;
                list_data.push(data);
            }
            // console.log(list_data)
            // console.log(graph_key)
            $rootScope.$broadcast('data_focussed:updated', list_data, graph_key);
        };
        var find_result_in_data = function(id_couple, results_data, type) {
            var result_to_return = undefined;
            // console.log("id_couple", id_couple)
            var id_line = id_couple.id_line;
            var id_result = id_couple.id_result;
            //find the correct datablock
            // if (type == 'old') {
            //     var datablock = undefined;
            //     var i = 0;
            //     for (i; i < results_data.data_block_id.length; i++) {
            //         if (results_data.data_block_id[i].id == id_line) {
            //             datablock = results_data.data[i];
            //             i = results_data.data_block_id.length;
            //         }
            //     }
            //     //find the correct result in datablock
            //     var j = 0;
            //     for (j; j < datablock.length; j++) {
            //         if (datablock[j].id == id_result) {
            //             result_to_return = datablock[j];
            //         };
            //     };
            //     return result_to_return;

            // }

            if (type == 'model') {
                //find the correct result in datablock
                for (var i in results_data) {
                    if (id_result == results_data[i].id) {
                        result_to_return = results_data[i];
                    };
                };
                return result_to_return;
            };
            if (type == 'test') {
                for (var i in results_data) {
                    for (var j in results_data[i].result) {
                        if (id_result == results_data[i].result[j].id) {
                            var result_to_return = results_data[i].result[j];
                            result_to_return.additional_data = results_data[i].additional_data;
                        };
                    };
                };
                return result_to_return;
            };
        };

        var getResultsfromTestID = function(test, ids) {
            return new Promise(function(resolve, reject) {
                var values = [];
                var list_ids = [];
                var j = 0;
                var x = 0;

                var results_data = ValidationTestResultRest.get({ app_id: Context.getAppID(), test_id: test.tests[0].id, list_id: ids, });
                results_data.$promise.then(function() {
                    for (j; j < results_data.data.length; j++) {
                        values[j] = _manageDataForGraph(results_data.data[j], results_data.data_block_id[j].id)
                    };
                    for (x; x < results_data.versions_id_all.length; x++) {
                        list_ids[x] = results_data.versions_id_all[x];
                    };
                    var data = { 'values': values, 'ids_all': list_ids, 'results': results_data }
                    resolve(data);
                });
            });
        };
        var getResultsfromTestID2 = function(test, test_versions) {
            return new Promise(function(resolve, reject) {

                var values = [];
                var list_ids = [];
                var results = [];
                var abscissa_value = [];

                for (var tv in test_versions.test_codes) {
                    var version_name = test_versions.test_codes[tv].version;

                    abscissa_value[version_name] = parseInt(tv);
                }

                var results_data = ValidationResultRest.get({ app_id: Context.getAppID(), test_id: test.tests[0].id, order: 'model_instance' });
                results_data.$promise.then(function() {

                    for (var instance in results_data.model_instances) {
                        // if (results_data.model_instances[instance].model_alias) {
                        //     m = results_data.model_instances[instance].model_alias
                        // } else { m = results_data.model_instances[instance].model_id }


                        //get line id; model_id is replaced by alias if it exists
                        if (results_data.model_instances[instance].model_alias && results_data.model_instances[instance].model_alias !== null && results_data.model_instances[instance].model_alias !== '' && results_data.model_instances[instance].model_alias !== "None") {
                            var line_id = results_data.model_instances[instance].model_alias + ' ( ' + results_data.model_instances[instance].version + ' )';
                        } else {
                            var line_id = results_data.model_instances[instance].model_id + ' ( ' + results_data.model_instances[instance].version + ' )';
                        }
                        //manage data for graph
                        values.push(_manageDataForTestGraph2(results_data.model_instances[instance].test_codes, line_id, results_data.model_instances[instance].model_id, abscissa_value));
                        list_ids.push(line_id)

                        //manage data for results
                        for (var c in results_data.model_instances[instance].test_codes) {
                            var additional_data = {
                                "model_name": results_data.model_instances[instance].model_name,
                                "model_id": results_data.model_instances[instance].model_id,
                                "model_instance": results_data.model_instances[instance].version,
                                "test_code": results_data.model_instances[instance].test_codes[c].version
                            }

                            var res = [];
                            for (var r in results_data.model_instances[instance].test_codes[c].results) {
                                res.push(results_data.model_instances[instance].test_codes[c].results[r]);
                            }

                            results.push({ "result": res.sort(_sort_results_by_timestamp), "additional_data": additional_data });
                            // results.push({ "result": results_data.model_instances[instance].test_codes[c].results, "additional_data": additional_data });
                        }
                    }

                });
                resolve({ 'raw_data': results_data, 'values': values, 'results': results, 'list_ids': list_ids, 'abs_info': abscissa_value });
            });
        }
        var _sort_results_by_timestamp = function(a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        }

        var _manageDataForTestGraph2 = function(data, line_id, model_id, abscissa_value) {
            var values_temp = [];

            for (var c in data) {
                for (var r in data[c].results) {
                    var temp = {
                        x: abscissa_value[data[c].version], //new Date(data[t].test_codes[c].result.timestamp),
                        y: data[c].results[r].score,
                        label: data[c].version,
                        id: line_id,
                        id_test_result: data[c].results[r].id,
                    };
                    values_temp.push(temp);
                };
            };
            //sort datas by test code abscissa value

            var data_to_return = {
                values: values_temp.sort(_sort_results_by_x), //values - represents the array of {x,y} data points
                key: line_id, //key  - the name of the series.
                color: _pickRandomColor(), //color - optional: choose your own line color.
                test_id: model_id,
            };

            return data_to_return;
        }

        function _sort_results_by_x(a, b) {
            return a.x - b.x
        }

        function getResultsfromModelResultID2(model, model_instances, score_type) {
            return new Promise(function(resolve, reject) {
                var values = [];
                var list_ids = [];
                var results = [];
                var abscissa_value = [];

                //give an abscissa value to each model instance
                for (var mi in model_instances.instances) {
                    var version_name = model_instances.instances[mi].version;
                    abscissa_value[version_name] = parseInt(mi);
                }

                var results_data = ValidationResultRest.get({ app_id: Context.getAppID(), model_id: model.models[0].id, order: 'test_code', score_type: score_type });
                results_data.$promise.then(function() {

                    for (var code in results_data.test_codes) {
                        if (results_data.test_codes[code].test_alias && results_data.test_codes[code].test_alias != null && results_data.test_codes[code].test_alias != '' && results_data.test_codes[code].test_alias != 'None') {
                            var line_id = results_data.test_codes[code].test_alias + ' ( ' + results_data.test_codes[code].version + ' )';
                        } else {
                            var line_id = results_data.test_codes[code].test_id + ' ( ' + results_data.test_codes[code].version + ' )';
                        }

                        results_data.test_codes[code].line_id = line_id;

                        var a = values.push(_manageDataForGraph2(results_data.test_codes[code].timestamp, results_data.test_codes[code].model_instances, line_id, results_data.test_codes[code].test_id, score_type, abscissa_value));
                        list_ids.push(line_id);
                    };

                    var latest_test_versions_line_id = get_latest_version_test(values, list_ids);

                    // manage data for focus
                    for (var code in results_data.test_codes) {
                        for (var v in results_data.test_codes[code].model_instances) {
                            var keys = Object.keys(results_data.test_codes[code].model_instances[v].results);
                            results.push(results_data.test_codes[code].model_instances[v].results[keys[0]]);
                        }
                    }
                    resolve({ results_data: results_data, 'values': values, 'results': results, 'list_ids': list_ids, 'abs_info': abscissa_value, 'latest_test_versions_line_id': latest_test_versions_line_id });
                });
            });
        };

        var get_latest_version_test = function(values, list_ids) {

            var latest_version_of_tests = {}

            for (i in values) {

                if (list_ids.indexOf(values[i].key) === -1) {

                } else {

                    if (latest_version_of_tests[values[i].test_id] == undefined) {
                        latest_version_of_tests[values[i].test_id] = { 'latest_line_id': values[i].key, 'latest_timestamp': values[i].timestamp }
                    } else {

                        if (latest_version_of_tests[values[i].test_id].latest_timestamp < values[i].timestamp) {
                            latest_version_of_tests[values[i].test_id].latest_line_id = values[i].key;
                            latest_version_of_tests[values[i].test_id].latest_timestamp = values[i].timestamp;
                        }
                    }
                }
            }

            return (latest_version_of_tests);

        }

        var _manageDataForGraph2 = function(timestamp, data, line_id, test_id, score_type, abscissa_value) {
            var values_temp = [];

            for (var v in data) {
                for (var r in data[v].results) {
                    var temp = {
                        x: abscissa_value[data[v].version], //new Date(data[v].result.timestamp),
                        y: data[v].results[r].score,
                        label: data[v].version,
                        id: line_id,
                        id_test_result: data[v].results[r].id,
                    };
                    values_temp.push(temp);
                };
            };
            var data_to_return = {
                values: values_temp.sort(_sort_results_by_x), //values - represents the array of {x,y} data points
                key: line_id, //key  - the name of the series.
                color: _pickRandomColor(), //color - optional: choose your own line color.
                test_id: test_id,
                test_score_type: score_type,
                timestamp: timestamp,
            };
            return data_to_return;
        };
        var getUpdatedGraph = function(data, list_ids) {
            var newdata = [];
            for (var i in data) {
                for (var j in list_ids) {
                    if (data[i].key == list_ids[j]) {
                        newdata.push(data[i]);
                    }
                }
            }
            return newdata;
        }

        // async function getGraphsByScoreType(data) {
        //     var new_data;
        //     var score_types = [];
        //     console.log("fegzethgrtz", data, data.length, data[0])
        //     for (var i in data) {
        //         console.log(i, 'iiiiiiiiiiiiii')
        //         var sc_t = data[i].test_score_type;
        //         if (score_types.includes(sc_t)) {
        //             new_data[sc_t].push(data[i]);
        //         } else {
        //             score_types.push(sc_t);
        //             new_data[sc_t] = [];
        //             new_data[sc_t].push(data[i]);
        //         }
        //     }
        //     return await new_data
        // }

        var getResultsfromModelID = function(model, ids) {
            var values = [];
            var list_ids = [];
            var j = 0;
            var x = 0;

            var results_data = ValidationModelResultRest.get({ app_id: Context.getAppID(), model_id: model.models[0].id, list_id: ids, });
            results_data.$promise.then(function() {
                for (j; j < results_data.data.length; j++) {
                    values[j] = _manageDataForGraph(results_data.data[j], results_data.data_block_id[j].id)
                };
                for (x; x < results_data.versions_id_all.length; x++) {
                    list_ids[x] = results_data.versions_id_all[x];
                };
            });

            return { 'values': values, 'ids_all': list_ids, 'results': results_data };
        };

        var _manageDataForGraph = function(data, line_id) {
            var values_temp = [];
            var ij = 0;

            for (ij; ij < data.length; ij++) {
                var temp = {
                    x: new Date(data[ij].timestamp),
                    y: data[ij].score,
                    id: line_id,
                    id_test_result: data[ij].id,
                };
                values_temp.push(temp);
            };
            var data_to_return = {
                values: values_temp, //values - represents the array of {x,y} data points
                key: line_id, //key  - the name of the series.
                color: _pickRandomColor(), //color - optional: choose your own line color.
                infosup: data,
            };
            return data_to_return;
        };

        var _pickRandomColor = function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            var i = 0;
            for (i; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        var get_lines_options = function(title, subtitle, Yaxislabel, caption, results_data, type, graph_key, abscissa_value) {
            options = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function(d) { return d.x; },
                    y: function(d) { return d.y; },
                    useInteractiveGuideline: true,
                    dispatch: {
                        stateChange: function(e) { console.log("stateChange"); },
                        changeState: function(e) { console.log("changeState"); },
                        tooltipShow: function(e) { console.log("tooltipShow"); },
                        tooltipHide: function(e) { console.log("tooltipHide"); },
                    },
                    xAxis: {
                        axisLabel: 'Version',
                        tickValues: function(d) {
                            return d3.format('.02f')(d);
                        },
                        tickFormat: function(d) {
                            for (var a in abscissa_value) {
                                if (abscissa_value[a] == d) {
                                    return a;
                                }
                            }
                            //return d3.time.format('%d-%m-%y')(new Date(d))
                        },
                    },

                    yAxis: {
                        axisLabel: Yaxislabel,
                        tickFormat: function(d) {
                            return d3.format('.02f')(d);
                        },
                        axisLabelDistance: -10
                    },
                    callback: function(chart) {
                        chart.lines.dispatch.on('elementClick', function(e) {
                            console.log("e", e);
                            var list_of_results_id = [];
                            var i = 0;
                            for (i; i < e.length; i++) {
                                var j = 0;
                                for (j; j < e[i].series.values.length; j++) {
                                    if (e[i].series.values[j].x == e[i].point.x) {
                                        list_of_results_id.push({ id_line: e[i].series.values[j].id, id_result: e[i].series.values[j].id_test_result });
                                    }
                                }
                            }
                            focus(list_of_results_id, results_data, type, graph_key);
                        });
                    }
                },
                title: {
                    enable: false,
                    text: ""
                },
                subtitle: {
                    enable: false,
                    text: "", //subtitle,
                    css: {
                        'text-align': 'center',
                        'margin': '10px 13px 0px 7px'
                    }
                },
                caption: {
                    enable: false,
                    html: caption,
                    css: {
                        'text-align': 'justify',
                        'margin': '10px 13px 0px 7px'
                    }
                }
            };

            return options;


        }
        var get_DataMultipleResult = function() {
            return multiple_result_data;
        }


        return {
            get_lines_options: get_lines_options,
            find_result_in_data: find_result_in_data,
            focus: focus,
            getResultsfromModelID: getResultsfromModelID,
            getResultsfromTestID: getResultsfromTestID,
            getResultsfromModelResultID2: getResultsfromModelResultID2,
            getResultsfromTestID2: getResultsfromTestID2,
            getUpdatedGraph: getUpdatedGraph,
            // getGraphsByScoreType: getGraphsByScoreType,
        };

    }
]);


var HelpServices = angular.module('HelpServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', 'ParametersConfigurationServices', 'ContextServices']);

HelpServices.factory('Help', ['$rootScope', 'Context', 'AuthorizedCollabParameterRest',

    function($rootScope, Context, AuthorizedCollabParameterRest) {
        // var results_data = undefined;
        var getAuthorizedValues = function(parameter) {
            return new Promise(function(resolve, reject) {
                var authorized_params = AuthorizedCollabParameterRest.get({ app_id: Context.getAppID() });
                authorized_params.$promise.then(function() {
                    if (parameter == 'species') {
                        res = _get_values_only(authorized_params.species);
                        resolve(res);
                    } else if (parameter == 'brain_region') {
                        res = _get_values_only(authorized_params.brain_region);
                        resolve(res);
                    } else if (parameter == 'cell_type') {
                        res = _get_values_only(authorized_params.cell_type);
                        resolve(res);
                    } else if (parameter == 'test_type') {
                        res = _get_values_only(authorized_params.test_type);
                        resolve(res);
                    } else if (parameter == 'model_type') {
                        res = _get_values_only(authorized_params.model_type);
                        resolve(res);
                    } else if (parameter == 'score_type') {
                        res = _get_values_only(authorized_params.score_type);
                        resolve(res);
                    } else if (parameter == 'data_modalities') {
                        res = _get_values_only(authorized_params.data_modalities);
                        resolve(res);
                    } else if (parameter == 'all') {
                        var j = 0;
                        var res = {
                            'species': _get_values_only(authorized_params.species),
                            'brain_region': _get_values_only(authorized_params.brain_region),
                            'cell_type': _get_values_only(authorized_params.cell_type),
                            'test_type': _get_values_only(authorized_params.test_type),
                            'model_type': _get_values_only(authorized_params.model_type),
                            'score_type': _get_values_only(authorized_params.score_type),
                            'data_modalities': _get_values_only(authorized_params.data_modalities),
                        };
                        resolve(res);
                    } else {
                        resolve(onerror(parameter + ' is not a valid parameter!'));
                    }

                });
            });
        }
        var _get_values_only = function(list_values) {
            values_only = []
            var i = 0;
            for (i; i < list_values.length; i++) {
                values_only.push(list_values[i].authorized_value);
            }

            return values_only;
        }

        return {
            getAuthorizedValues: getAuthorizedValues,
        };

    }
]);
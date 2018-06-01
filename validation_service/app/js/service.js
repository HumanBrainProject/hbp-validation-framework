var ContextServices = angular.module('ContextServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', ]);

ContextServices.service('Context', ['$rootScope', '$location', 'AppIDRest', 'CollabIDRest', 'collabAppID',
    function($rootScope, $location, AppIDRest, CollabIDRest, collabAppID) {
        var ctx;
        var state_type = undefined;
        var state = undefined;
        var external = undefined;
        var collabID = undefined;
        var appID = undefined;
        var serviceSet = false;


        var validation_goToHelpView = function() {
            sendState("id", '0');
            setState('0');

            $location.path("/home/validation_test/help");
        };

        var modelCatalog_goToHelpView = function() {
            sendState("id", '0');
            setState('0');

            $location.path("/model-catalog/help");
        };

        var modelCatalog_goToHomeView = function() {
            clearState();
            setTimeout(function() {
                // $location.path('/model-catalog/');

            }, 300);
        };
        var newTab_goToValidationTest = function(test_id) {
            _getCollabIDAndAppIDFromUrl().then(function(ids) {
                var url = "https://collab.humanbrainproject.eu/#/collab/" + ids.collab_id + "/nav/" + ids.app_id +
                    "?state=test." + test_id + ",external"; //to go to collab api
                window.open(url, '_blank');
            })
        }
        var newTab_goToValidationModel = function(model) {
            _getCollabIDAndAppIDFromUrl().then(function(ids) {
                var url = "https://collab.humanbrainproject.eu/#/collab/" + ids.collab_id + "/nav/" + ids.app_id +
                    "?state=model." + model.id + ",external"; //to go to collab api
                window.open(url, '_blank');
            })
        }
        var newTab_goToModelCatalogModel = function(model_id, app_type) {
            _getCollabIDAndAppIDFromUrl(app_type).then(function(ids) {
                var url = "https://collab.humanbrainproject.eu/#/collab/" + ids.collab_id + "/nav/" + ids.app_id +
                    "?state=model." + model_id + ",external"; //to go to collab api
                window.open(url, '_blank')
            })
        }
        var newTab_goToTestResult = function(result_id) {
            app_type = ''
            _getCollabIDAndAppIDFromUrl(app_type).then(function(ids) {
                var url = "https://collab.humanbrainproject.eu/#/collab/" + ids.collab_id + "/nav/" + ids.app_id +
                    "?state=result." + result_id + ",external"; //to go to collab api
                window.open(url, '_blank')
            })
        }
        var goToModelDetailView = function(evt, model_id, app_type) {
            switch (evt.which) {
                case 1:
                    if (app_type == 'validation') {
                        newTab_goToModelCatalogModel(model_id, app_type)
                    } else {
                        modelCatalog_goToModelDetailView(model_id)
                    }

                    break;

                case 3:
                    // this is right click
                    newTab_goToModelCatalogModel(model_id, app_type)
                    break;
            }
        }

        var modelCatalog_goToModelDetailView = function(model_id) {
            sendState("model", model_id);
            setState(model_id);

            $location.path('/model-catalog/detail/' + model_id); // this is left click
            setTimeout(function() {}, 0);
        };

        var validation_goToModelCatalog = function(model, collab_id) {

            collab_id = typeof collab_id !== 'undefined' ? collab_id : this.collabID;

            var collab_id = collabID;
            var app_id = collabAppID.get({ collab_id: collab_id });

            app_id.$promise.then(function() {
                var url = "https://collab.humanbrainproject.eu/#/collab/" + collab_id + "/nav/" + app_id.app_id +
                    "?state=model." + model.id + ",external"; //to go to collab api
                window.open(url, 'ModelCatalog');
            });
        }
        var goToTestDetailView = function(evt, test_id) {
            console.log("test_id", test_id)
            switch (evt.which) {
                case 1:
                    validation_goToTestDetailView(test_id)
                    break;

                case 3:
                    // open in new tab
                    newTab_goToValidationTest(test_id);
                    break;
            }
        }
        var goToResultDetailView = function(evt, result) {
            switch (evt.which) {
                case 1:
                    validation_goToResultDetailView(result.id)
                    break;

                case 3:
                    // open in new tab
                    newTab_goToTestResult(result);
                    break;
            }
        }
        var goToValidationModelView = function(evt, model) {
            switch (evt.which) {
                case 1:
                    validation_goToModelDetailView(model.id)
                    break;

                case 3:
                    // open in new tab
                    newTab_goToValidationModel(model);
                    break;
            }
        }
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


        var getCurrentLocationSearch = function() {
            return window.location.search;
        }
        var setService = function() {
            return new Promise(function(resolve, reject) {

                if (serviceSet == false) {
                    // _getState();
                    var location = getCurrentLocationSearch();
                    temp_state = location.split("&")[1];


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
        _getCollabIDAndAppIDFromUrl = function(app_type) {
            return new Promise(function(resolve, reject) {
                var location = getCurrentLocationSearch();
                temp_state = location.split("&")[1];


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

                if (app_type == 'validation') {
                    var app_id = collabAppID.get({ collab_id: collabID });
                    app_id.$promise.then(function() {
                        appID = app_id.app_id;
                        console.log('app_id', app_id)
                        resolve({ collab_id: collabID, app_id: appID })
                    })
                } else {
                    if (appID == undefined || appID == "") {
                        var app_request = AppIDRest.get({ ctx: ctx }); //.collab_id;
                        app_request.$promise.then(function() {
                            appID = app_request.app_id
                        });
                    }
                    resolve({ collab_id: collabID, app_id: appID })
                }


            })

        }
        var setState = function(id) {
            state = id;
        };


        var getExternal = function() {
            return external;
        }

        var getState = function() {
            return state;
        };

        var getStateType = function() {
            return state_type;
        }

        var getCtx = function() {
            return ctx;
        };

        var setCtx = function(context) {
            ctx = context;
        }

        var getCollabID = function() {
            return collabID;
        };

        var getAppID = function() {
            return appID;
        };

        var getServiceSet = function() {
            return serviceSet;
        }

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

        return {
            setService: setService,
            setCtx: setCtx,
            getCtx: getCtx,
            getCollabID: getCollabID,
            getAppID: getAppID,
            getState: getState,
            getServiceSet: getServiceSet,
            sendState: sendState,
            clearState: clearState,
            clearExternal: clearExternal,
            setState: setState,
            getExternal: getExternal,
            getStateType: getStateType,
            getCurrentLocationSearch: getCurrentLocationSearch,
            goToModelDetailView: goToModelDetailView,
            goToTestDetailView: goToTestDetailView,
            goToValidationModelView: goToValidationModelView,
            goToResultDetailView: goToResultDetailView,
            newTab_goToModelCatalogModel: newTab_goToModelCatalogModel,
            newTab_goToValidationTest: newTab_goToValidationTest,
            newTab_goToTestResult: newTab_goToTestResult,
            newTab_goToValidationModel: newTab_goToValidationModel,
            modelCatalog_goToHomeView: modelCatalog_goToHomeView,
            modelCatalog_goToModelDetailView: modelCatalog_goToModelDetailView,
            validation_goToHomeView: validation_goToHomeView,
            validation_goToModelDetailView: validation_goToModelDetailView,
            validation_goToTestDetailView: validation_goToTestDetailView,
            validation_goToResultDetailView: validation_goToResultDetailView,
            validation_goToModelCatalog: validation_goToModelCatalog,
            validation_goToTestCatalogView: validation_goToTestCatalogView,
            validation_goToHelpView: validation_goToHelpView,
            modelCatalog_goToHelpView: modelCatalog_goToHelpView,
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
        //- loading //loading the pages


        //TODO function to complete the list when the user create a new model
        var loadModels = function(dict_params) {
            return new Promise(function(resolve, reject) {

                if (dict_params.id != undefined) {
                    reject("this function does not support id of models yet")
                        // throw "this function does not support id of models yet"
                }
                if (models.status == undefined) {
                    var temp_models = ScientificModelRest.get(dict_params);
                    temp_models.$promise.then(function() {
                        models = { date_last_load: new Date(), status: "loading", data: temp_models };
                        resolve(models.data);
                    });

                } else {
                    if (models.status == "up to date") {
                        var data = _loadStoredModels();
                        resolve(data);
                    } else {
                        var temp_models = ScientificModelRest.get(dict_params);
                        temp_models.$promise.then(function() {
                            if (temp_models.total_nb_pages == dict_params.page) {
                                models = { date_last_load: new Date(), status: "loading", data: temp_models };
                            } else {
                                models = { date_last_load: new Date(), status: "up_to_date", data: temp_models };
                            }
                            resolve(models.data);
                        });
                    }
                }
            });
        };

        var loadModelsByPage = function(dict_params) {
            return new Promise(function(resolve, reject) {
                var temp_models = ScientificModelRest.get(dict_params);
                //var temp_models = _get_models_sequentially(dict_params);
                temp_models.$promise.then(function() {
                    if (temp_models.total_nb_pages == dict_params.page) {
                        models = { date_last_load: new Date(), status: "loading", data: temp_models };
                    } else {
                        models = { date_last_load: new Date(), status: "up_to_date", data: temp_models };
                    }
                    resolve(models.data);
                });
            })
        }
        var _get_models_sequentially = function(dict_params) {
            //load 50 first elements should return also the number of pages
            var temp_models = ScientificModelRest.get(dict_params);
            temp_models.$promise.then(function() {
                models = { date_last_load: new Date(), status: "up to date", data: temp_models };
                // resolve(models.data);

                for (i = 1; i <= temp_models.total_nb_pages; i++) {
                    dict_params['page'] = i;
                    ScientificModelRest.get(dict_params).$promise.then(function(next_models) {
                        new_models = models //will have to change to append new files
                        models = { date_last_load: new Date(), status: "up to date", data: new_models };
                        resolve(models.data);
                    });
                }
            })
        }
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

        var getStoredModels = function() {
            return models;
        }
        var getStoredTests = function() {
            return tests;
        }

        return {
            loadModels: loadModels,
            loadModelsByPage: loadModelsByPage,
            loadTests: loadTests,
            getStoredModels: getStoredModels,
            getStoredTests: getStoredTests,
            setStoredModelsAsOutdated: setStoredModelsAsOutdated,
            setStoredTestsAsOutdated: setStoredTestsAsOutdated,
        };

    }
]);

var ParametersConfigurationServices = angular.module('ParametersConfigurationServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', 'ContextServices']);
ParametersConfigurationServices.service('CollabParameters', ['$rootScope', 'CollabParameterRest', 'Context', 'AuthorizedCollabParameterRest',
    function($rootScope, CollabParameterRest, Context, AuthorizedCollabParameterRest) {
        var parameters = undefined;
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

        var getParametersByType = function(type) {
            return parameters.param[0][type];
        };

        var getParametersOrDefaultByType = function(type) {
            var param = getParametersByType(type);

            if (param.length > 0) {
                param = _move_element_at_the_end_of_array("Other", param)
                return param;
            } else {
                param = _move_element_at_the_end_of_array("Other", default_parameters[type])
                return param;
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
            data = getParametersByType(type);
            formated_data = [];

            size = data.length;
            for (var i = 0; i < size; i++) {
                formated_data.push({ authorized_value: data[i] });
            }
            return formated_data;
        };

        var getRequestParameters = function() {

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

        var _move_element_at_the_end_of_array = function(elem, array) {
            if (array.indexOf(elem) > 0) {
                array.splice(array.indexOf(elem), 1)
                array.push(elem)
            }
            return array;
        }

        var setService = function(ctx_param) {
            return new Promise(function(resolve, reject) {

                if (default_parameters == undefined) {

                    build_formated_default_parameters().then(function() {

                        set_parameters().then(function() {
                            resolve(parameters)
                        });
                    });
                } else {

                    param = set_parameters().then(function() {
                        resolve(parameters)
                    });
                }
            });
        };

        var set_parameters = function() {
            return new Promise(function(resolve, reject) {
                if (typeof(parameters) == "undefined") {
                    var app_id = Context.getAppID();

                    parameters = CollabParameterRest.get({ app_id: app_id }); //need to get collab number

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
            var app_id = Context.getAppID();
            put = CollabParameterRest.put({ app_id: app_id }, data_to_send, function(value) {});
            return put;
        };

        var initConfiguration = function() {
            return new Promise(function(resolve, reject) {
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
                resolve(parameters);
            });
        };

        var getDefaultParameters = function() {
            return default_parameters;
        };

        var _get_parameters = function() {
            return parameters;
        }
        var _get_default_parameters = function() {
            return default_parameters;
        }
        var _set_default_parameters = function() {
            default_parameters = {
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
        }

        return {
            _set_default_parameters: _set_default_parameters,
            _get_parameters: _get_parameters,
            _get_default_parameters: _get_default_parameters,
            _StringTabToArray: _StringTabToArray,
            _postInitCollab: _postInitCollab,
            _getParamTabValues: _getParamTabValues,
            _setParametersNewValues: _setParametersNewValues,
            _move_element_at_the_end_of_array: _move_element_at_the_end_of_array,
            format_parameter_data: format_parameter_data,
            set_parameters: set_parameters,
            addParameter: addParameter,
            getParametersByType: getParametersByType,
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
            getParametersOrDefaultByType: getParametersOrDefaultByType,
            build_formated_default_parameters: build_formated_default_parameters,
        };

    }
]);


var GraphicsServices = angular.module('GraphicsServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', 'ParametersConfigurationServices', 'ContextServices']);

GraphicsServices.factory('Graphics', ['$rootScope', 'Context', 'ValidationResultRest',
    function($rootScope, Context, ValidationResultRest) {

        //graphs functions 
        var get_lines_options = function(title, subtitle, Yaxislabel, caption, results_data, type, graph_key, abscissa_value) {

            var yminymax = _get_min_max_yvalues(results_data);
            var xminxmax = _get_min_max_xvalues(abscissa_value);

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
                        tickValues: xminxmax.range,
                        // tickValues: function(d) {
                        //     return d3.format('.02f')(d);
                        // },
                        ticks: xminxmax.range.length,

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
                        showMaxMin: false,
                        tickFormat: function(d) {
                            return d3.format('.02f')(d);
                        },
                        axisLabelDistance: -10,

                    },

                    xDomain: xminxmax.value,
                    xRange: null,
                    yDomain: yminymax,
                    yRange: null,
                    tooltips: true,
                    callback: function(chart) {
                        chart.lines.dispatch.on('elementClick', function(e) {
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

        var focus = function(list_id_couple, results_data, type, graph_key) {
            var list_data = [];
            var i = 0;
            for (i; i < list_id_couple.length; i++) {
                data = find_result_in_data(list_id_couple[i], results_data, type);
                data.line_id = list_id_couple[i].id_line;
                list_data.push(data);
            }
            $rootScope.$broadcast('data_focussed:updated', list_data, graph_key);
        };

        var find_result_in_data = function(id_couple, results_data, type) {
            var result_to_return = undefined;
            var id_line = id_couple.id_line;
            var id_result = id_couple.id_result;

            if (type == 'model') {
                //find the correct result in datablock
                for (var i in results_data) {
                    for (var j in results_data[i]) {
                        if (id_result == results_data[i][j].id) {
                            result_to_return = results_data[i][j];
                        };
                    }
                };
                return result_to_return;
            };
            if (type == 'test') {
                for (var i in results_data) {
                    for (var j in results_data[i]) {
                        for (var k in results_data[i][j].result) {
                            if (id_result == results_data[i][j].result[k].id) {
                                var result_to_return = results_data[i][j].result[k];
                                result_to_return.additional_data = results_data[i][j].additional_data;
                            };
                        };
                    }
                };
                return result_to_return;
            };
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

        //tests graphs

        var TestGraph_getRawData = function(test_versions) {
            return new Promise(function(resolve, reject) {
                var test_id = test_versions.test_codes[0].test_definition_id;
                var get_raw_data = ValidationResultRest.get({ app_id: Context.getAppID(), test_id: test_id, order: 'model_instance' });
                get_raw_data.$promise.then(function(raw_data) {
                    resolve(raw_data);
                });
            });
        };

        var TestGraph_initTestGraph = function(test_versions, raw_data) {
            return new Promise(function(resolve, reject) {
                var graph_values = [];
                var list_line_ids = [];
                var results = [];
                var abscissa_values = [];

                var colors; //color array for the graph

                abscissa_values = TestGraph_getAbscissaValues(test_versions); //abscissa array for graphs


                colors = _get_color_array(raw_data.model_instances);

                for (var instance in raw_data.model_instances) {

                    var model_id = raw_data.model_instances[instance].model_id;

                    var line_id = TestGraph_getLineId(raw_data.model_instances[instance])

                    list_line_ids.push(line_id)
                        //manage data for graph
                    graph_values.push(TestGraph_manageDataForTestGraph(raw_data.model_instances[instance].test_codes, raw_data.model_instances[instance].timestamp, line_id, model_id, instance, abscissa_values, colors[instance]));
                    results.push(TestGraph__manageDataForResultsTab(raw_data.model_instances[instance]))
                }
                var latest_model_instances_line_id = TestGraph_getLatestVersionModel(graph_values, list_line_ids);
                resolve({ 'values': graph_values, 'results': results, 'list_ids': list_line_ids, 'abs_info': abscissa_values, 'latest_model_instances_line_id': latest_model_instances_line_id });
            });

        }

        var TestGraph_getLatestVersionModel = function(values, list_ids) {
            var latest_version_of_models = [];
            var models_array = [];

            for (var i in values) {
                if (models_array[values[i].model_id] == undefined) {
                    models_array[values[i].model_id] = [];
                    if (list_ids.includes(values[i].key)) {
                        models_array[values[i].model_id].push(values[i]);
                    }

                } else {
                    if (list_ids.includes(values[i].key)) {
                        models_array[values[i].model_id].push(values[i]);
                    }
                }
            }

            for (var model in models_array) {
                models_array[model].sort(_sort_results_by_timestamp_desc);
                latest_version_of_models.push({ 'latest_line_id': models_array[model][0].key, 'latest_timestamp': models_array[model][0].timestamp })
            }
            return latest_version_of_models;
        }

        var TestGraph_getAbscissaValues = function(test_versions) {
            var abscissa_value = new Object();

            for (var tv in test_versions.test_codes) {
                var version_name = test_versions.test_codes[tv].version;
                abscissa_value[version_name] = parseInt(tv);
            }
            return abscissa_value;
        }

        var TestGraph_getLineId = function(instance) {
            var line_id;

            if (instance.model_alias && instance.model_alias != null && instance.model_alias != '' && instance.model_alias != "None") {
                line_id = instance.model_alias + ' ( ' + instance.version + ' )';
            } else {
                line_id = instance.model_id.substring(0, 8) + '... ( ' + instance.version + ' )';
            }
            return line_id;
        }

        var TestGraph__manageDataForResultsTab = function(instance) {
            var results = new Array();
            for (var c in instance.test_codes) {
                var additional_data = {
                    "model_name": instance.model_name,
                    "model_id": instance.model_id,
                    "model_instance": instance.version,
                    "test_code": instance.test_codes[c].version
                }

                var res = new Array();
                for (var r in instance.test_codes[c].results) {
                    res.push(instance.test_codes[c].results[r]);
                }
                results.push({ "result": res.sort(_sort_results_by_timestamp_desc), "additional_data": additional_data });
            }
            return results;
        }

        var TestGraph_manageDataForTestGraph = function(data, timestamp, line_id, model_id, instance_id, abscissa_value, color) {
            var values_temp = [];
            for (var c in data) {
                for (var r in data[c].results) {
                    var temp = {
                        x: abscissa_value[data[c].version],
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
                id: instance_id,
                color: "#" + color, //_pickRandomColor(), //color - optional: choose your own line color.
                model_id: model_id,
                timestamp: timestamp,
            };
            return (data_to_return);
        }

        var TestGraph_reorganizeRawDataForResultTable = function(model_instances, code_versions) {
            var organized_data = new Object();
            organized_data.model_instances = [];

            for (var model_instance in model_instances) {
                var instance = new Object();
                var model_id = model_instances[model_instance].model_id;
                var line_id = TestGraph_getLineId(model_instances[model_instance]);
                instance.timestamp = model_instances[model_instance].timestamp;
                instance.id = model_instance;
                instance.model_id = model_instances[model_instance].model_id;
                instance.model_name = model_instances[model_instance].model_name;
                instance.line_id = line_id;
                instance.test_instances = [];

                for (var c in code_versions) {
                    instance.test_instances.push(code_versions[c]);
                }

                for (var test_instance in model_instances[model_instance].test_codes) {
                    var code = new Object();
                    code.version = model_instances[model_instance].test_codes[test_instance].version;
                    code.timestamp = model_instances[model_instance].test_codes[test_instance].timestamp;

                    code.results = [];
                    for (var result in model_instances[model_instance].test_codes[test_instance].results) {
                        //only keep the first five significant score figures 
                        var res = model_instances[model_instance].test_codes[test_instance].results[result];
                        res.score = res.score; //.toPrecision(5);
                        code.results.push(res);
                    }
                    //order results by timestamp
                    code.results = code.results.sort(_sort_results_by_timestamp_desc);

                    for (var i in instance.test_instances) {
                        if (instance.test_instances[i].version == code.version) {
                            instance.test_instances[i] = code;
                        }
                    }
                }

                //order test_instances by timestamp
                instance.last_result_timestamp = TestGraph_getLastResultTimestamp(instance.test_instances);
                instance.test_instances = instance.test_instances.sort(_sort_results_by_timestamp_asc);
                organized_data.model_instances.push(instance);
            }
            //sort model instances by last result timestamp

            organized_data.model_instances = organized_data.model_instances.sort(_sort_by_last_result_timestamp_desc)

            return organized_data;
        };

        var TestGraph_getLastResultTimestamp = function(codes) {
            var newest_timestamp = undefined;
            for (var code in codes) {
                if (codes[code].results) {
                    var id_first = Object.keys(codes[code].results);
                    var timestamp = codes[code].results[id_first[0]].timestamp;
                    if (newest_timestamp == undefined || (newest_timestamp && timestamp > newest_timestamp)) {
                        newest_timestamp = timestamp;
                    }
                }
            }
            return newest_timestamp;
        }

        // var TestGraph_getMoreRecentVersionsGraphValues = function(list_version_ids, test_versions, raw_data) {
        //     return new Promise(function(resolve, reject) {
        //         var graph_values = [];
        //         var abscissa_values = [];

        //         var colors; //color array for the graph

        //         abscissa_values = TestGraph_getAbscissaValues(test_versions); //abscissa array for graphs

        //         raw_data.$promise.then(function() {
        //             colors = _get_color_array(raw_data.model_instances);
        //             for (var instance in raw_data.model_instances) {

        //                 if (list_version_ids.includes(instance)) {
        //                     var model_id = raw_data.model_instances[instance].model_id;
        //                     var line_id = TestGraph_getLineId(raw_data.model_instances[instance])

        //                     //manage data for graph
        //                     graph_values.push(TestGraph_manageDataForTestGraph(raw_data.model_instances[instance].test_codes, line_id, model_id, instance, abscissa_values, colors[instance]));
        //                 }
        //             }
        //             resolve(graph_values);
        //         });
        //     });
        // }


        // Model detail graphs
        var ModelGraph_getRawData = function(model_id, score_type_array) {
            return new Promise(function(resolve, reject) {
                var get_raw_data = ValidationResultRest.get({ app_id: Context.getAppID(), model_id: model_id, order: 'score_type' });
                get_raw_data.$promise.then(function(raw_data) {
                    // var data = _rearrange_raw_data_in_score_type_array(raw_data)
                    resolve(raw_data);
                })
            })
        };


        var ModelGraph_init_Graphs = function(model_instances, raw_data) {
            return new Promise(function(resolve, reject) {

                var abscissa_value = [];

                var single_graphs_datas = [];

                for (var sc_t in raw_data.score_type) {
                    abscissa_value = ModelGraph_getAbscissaValues(model_instances);

                    single_graphs_datas.push({ score_type: sc_t, values: ModelGraph_init_single_ModelGraphs(raw_data.score_type[sc_t], abscissa_value, sc_t) });
                }

                var all_graphs_values = ModelGraph_get_all_graph_values(single_graphs_datas);

                resolve({ 'values': all_graphs_values, 'single_graphs_data': single_graphs_datas })

            });
        }

        var ModelGraph_getAbscissaValues = function(model_instances) {
            var abscissa_value = new Object();
            for (var mi in model_instances.instances) {
                var version_name = model_instances.instances[mi].version;
                abscissa_value[version_name] = parseInt(mi);
            }
            return abscissa_value;
        }

        var ModelGraph_init_single_ModelGraphs = function(raw_data, abscissa_value, score_type) {

            var graph_values = [];
            var list_line_ids = [];
            var results = [];

            var colors; //color array for the graph

            colors = _get_color_array(raw_data.test_codes)

            for (var code in raw_data.test_codes) {

                var line_id = ModelGraph_getLineId(raw_data.test_codes[code]);
                var test_id = raw_data.test_codes[code].test_id;
                list_line_ids.push(line_id);
                raw_data.test_codes[code].line_id = line_id;
                graph_values.push(ModelGraph_manageDataForGraph(raw_data.test_codes[code].timestamp, raw_data.test_codes[code].model_instances, line_id, test_id, score_type, abscissa_value, colors[code]));
                results.push(ModelGraph_manageDataForResultsTab(raw_data.test_codes[code]))
            }

            var latest_test_versions_line_id = ModelGraph_get_latest_version_test(graph_values, list_line_ids);

            return ({ 'values': graph_values, 'results': results, 'list_ids': list_line_ids, 'abs_info': abscissa_value, 'latest_test_versions_line_id': latest_test_versions_line_id });
        }

        var ModelGraph_get_all_graph_values = function(single_graphs_data) {
            all_values = [];

            for (var i in single_graphs_data) {
                for (var j in single_graphs_data[i].values.values) {
                    all_values.push(single_graphs_data[i].values.values[j]);
                }
            }

            return all_values
        }

        var ModelGraph_get_latest_version_test = function(values, list_ids) {

            var latest_version_of_tests = [];
            var tests_array = [];

            for (var i in values) {
                if (tests_array[values[i].test_id] == undefined) {
                    tests_array[values[i].test_id] = [];
                    if (list_ids.includes(values[i].key)) {
                        tests_array[values[i].test_id].push(values[i]);
                    }

                } else {
                    if (list_ids.includes(values[i].key)) {
                        tests_array[values[i].test_id].push(values[i]);
                    }
                }
            }

            for (var test in tests_array) {
                tests_array[test].sort(_sort_by_last_result_timestamp_desc);
                latest_version_of_tests.push({ 'latest_line_id': tests_array[test][0].key, 'latest_timestamp': tests_array[test][0].timestamp })
            }

            return latest_version_of_tests;
        }

        var ModelGraph_getLineId = function(code) {
            var line_id;
            if (code.test_alias && code.test_alias != null && code.test_alias != '' && code.test_alias != 'None') {
                line_id = code.test_alias + ' ( ' + code.version + ' )';
            } else {
                line_id = code.test_id + ' ( ' + code.version + ' )';
            }
            return line_id;
        }

        var ModelGraph_manageDataForResultsTab = function(code) {
            var results = [];
            for (var v in code.model_instances) {
                var keys = Object.keys(code.model_instances[v].results);
                for (var k in keys) {
                    results.push(code.model_instances[v].results[keys[k]]);
                }
            }
            return results;
        }

        var ModelGraph_manageDataForGraph = function(timestamp, data, line_id, test_id, score_type, abscissa_value, color) {
            var values_temp = [];

            for (var v in data) {
                for (var r in data[v].results) {
                    var temp = {
                        x: abscissa_value[data[v].version],
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
                color: "#" + color,
                test_id: test_id,
                test_score_type: score_type,
                timestamp: timestamp,
            };
            return data_to_return;
        }
        var ModelGraphs_reorganizeRawDataForResultTable = function(raw_data, model_instances) {
            var organized_data = new Object();
            organized_data.test_codes = [];

            for (score_type in raw_data.score_type) {
                for (test_code in raw_data.score_type[score_type].test_codes) {
                    var code = new Object();

                    code.timestamp = raw_data.score_type[score_type].test_codes[test_code].timestamp;

                    code.id = test_code;
                    code.test_id = raw_data.score_type[score_type].test_codes[test_code].test_id;
                    code.test_name = raw_data.score_type[score_type].test_codes[test_code].test_name;

                    code.line_id = ModelGraph_getLineId(raw_data.score_type[score_type].test_codes[test_code]);
                    code.model_instances = [];

                    for (var i in model_instances) {
                        code.model_instances.push(model_instances[i]);
                    }

                    for (var model_instance in raw_data.score_type[score_type].test_codes[test_code].model_instances) {
                        var instance = new Object();
                        instance.version = raw_data.score_type[score_type].test_codes[test_code].model_instances[model_instance].version;
                        instance.timestamp = raw_data.score_type[score_type].test_codes[test_code].model_instances[model_instance].timestamp;

                        instance.results = [];
                        for (var result in raw_data.score_type[score_type].test_codes[test_code].model_instances[model_instance].results) {
                            //only keep the first five significant score figures 
                            var res = raw_data.score_type[score_type].test_codes[test_code].model_instances[model_instance].results[result];
                            res.score = res.score; //.toPrecision(5);
                            instance.results.push(res);
                        }
                        //order results by timestamp
                        instance.results = instance.results.sort(_sort_results_by_timestamp_desc);
                        for (var j in code.model_instances) {
                            if (code.model_instances[j].version == instance.version) {
                                code.model_instances[j] = instance;
                            }
                        }
                        // code.model_instances.push(instance);
                    }
                    //order test_instances by timestamp
                    code.last_result_timestamp = TestGraph_getLastResultTimestamp(code.model_instances);
                    code.model_instances = code.model_instances.sort(_sort_results_by_timestamp_asc);
                    organized_data.test_codes.push(code);
                }
                //sort model instances by last result timestamp
                organized_data.test_codes = organized_data.test_codes.sort(_sort_by_last_result_timestamp_desc)

            }
            return organized_data;
        };

        //utilitary functions
        var _get_color_array = function(data_row) {
            list_ids = [];
            for (var i in data_row) {
                list_ids.push(i);
            }

            var colorMap = palette('tol-rainbow', list_ids.length);

            var res = new Object();
            for (var j in list_ids) {
                res[list_ids[j]] = colorMap[j];
            }
            return res;
        }

        var _sort_results_by_timestamp_desc = function(a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        }
        var _sort_results_by_timestamp_asc = function(a, b) {
            return new Date(a.timestamp) - new Date(b.timestamp);
        }

        var _sort_by_last_result_timestamp_desc = function(a, b) {
            return new Date(b.last_result_timestamp) - new Date(a.last_result_timestamp);
        }

        function _sort_results_by_x(a, b) {
            return a.x - b.x
        }

        var _pickRandomColor = function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            var i = 0;
            for (i; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        var _get_min_max_yvalues = function(results_data) {
            if (results_data[0]) {
                var minY = undefined;
                var maxY = undefined;

                var all_scores = [];
                //get all score value
                var i = 0;
                var k = 0;
                for (i; i < results_data.length; i++) {
                    for (k; k < results_data[i].length; k++) {
                        if (results_data[i][k].result != undefined) {
                            for (var j in results_data[i][k].result) {

                                all_scores.push(results_data[i][k].result[j].score);
                            }
                        } else {

                            if (results_data[i][k].score) {

                                all_scores.push(results_data[i][k].score);
                            }
                        }
                    }
                }
                //define min and max value as a purcentage of min and max scores
                minY = Math.min.apply(Math, all_scores);
                maxY = Math.max.apply(Math, all_scores);
                minY = minY - 0.10 * minY;
                maxY = maxY + 0.10 * maxY;
                return [minY, maxY];
            } else {
                return [null, null];
            }
        }

        var _get_min_max_xvalues = function(abscissa_value) {
            var minX = undefined;
            var maxX = undefined;
            var all_abscissa_values = [];
            //get all score value
            for (var i in abscissa_value) {
                all_abscissa_values.push(abscissa_value[i]);
            }

            minX = Math.min.apply(Math, all_abscissa_values);
            maxX = Math.max.apply(Math, all_abscissa_values);

            return { value: [minX, maxX], range: all_abscissa_values.sort() };
        }

        return {
            get_lines_options: get_lines_options,
            find_result_in_data: find_result_in_data,
            focus: focus,
            getUpdatedGraph: getUpdatedGraph,
            _get_min_max_yvalues: _get_min_max_yvalues,
            _get_min_max_xvalues: _get_min_max_xvalues,
            _sort_by_last_result_timestamp_desc: _sort_by_last_result_timestamp_desc,
            _sort_results_by_timestamp_desc: _sort_results_by_timestamp_desc,
            _sort_results_by_timestamp_asc: _sort_results_by_timestamp_asc,
            _sort_results_by_x: _sort_results_by_x,
            _get_color_array: _get_color_array,

            TestGraph_getRawData: TestGraph_getRawData,
            TestGraph_getAbscissaValues: TestGraph_getAbscissaValues,
            TestGraph_getLineId: TestGraph_getLineId,
            TestGraph_manageDataForTestGraph: TestGraph_manageDataForTestGraph,
            TestGraph__manageDataForResultsTab: TestGraph__manageDataForResultsTab,
            TestGraph_getLatestVersionModel: TestGraph_getLatestVersionModel,
            TestGraph_getLastResultTimestamp: TestGraph_getLastResultTimestamp,
            TestGraph_reorganizeRawDataForResultTable: TestGraph_reorganizeRawDataForResultTable,
            TestGraph_initTestGraph: TestGraph_initTestGraph,

            ModelGraph_getRawData: ModelGraph_getRawData,
            ModelGraph_getAbscissaValues: ModelGraph_getAbscissaValues,
            ModelGraph_getLineId: ModelGraph_getLineId,
            ModelGraph_manageDataForResultsTab: ModelGraph_manageDataForResultsTab,
            ModelGraph_manageDataForGraph: ModelGraph_manageDataForGraph,
            ModelGraph_get_latest_version_test: ModelGraph_get_latest_version_test,
            ModelGraph_init_single_ModelGraphs: ModelGraph_init_single_ModelGraphs,
            ModelGraph_get_all_graph_values: ModelGraph_get_all_graph_values,
            ModelGraph_init_Graphs: ModelGraph_init_Graphs,
            ModelGraphs_reorganizeRawDataForResultTable: ModelGraphs_reorganizeRawDataForResultTable,


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
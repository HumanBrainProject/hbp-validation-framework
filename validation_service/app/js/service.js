var ContextServices = angular.module('ContextServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices']);

ContextServices.service('Context', ['$rootScope',
    function($rootScope) {
        var ctx;
        var state = undefined;

        var setService = function() {
            _getState();
            _getCtx();

        };
        var setState = function(id) {
            state = id;
        };

        var _getState = function() {
            // console.log("_getState");
            // console.log();
            state = window.location.search.split("&")[1]
                // console.log(state);

            if (state != undefined) {
                state = state.substring(15);
                // console.log(state);

            }

        };

        var _getCtx = function() {
            if (typeof(ctx) == "undefined") {
                ctx = window.location.search.split("&")[0].substring(5);
            }
        };

        var getCtx = function() {
            if (ctx == undefined) {
                _getCtx();
            }
            return ctx;
        };
        var getState = function() {
            return state;
        };

        var sendState = function(id) {
            window.parent.postMessage({
                eventName: 'workspace.context',

                data: {
                    state: 'model.' + id
                }
            }, 'https://collab.humanbrainproject.eu/');
        };


        var clearState = function() {
            // window.location.search = "ctx=df7a74fe-7bf6-4c40-bfa9-5c04c7cb4a3c&ctxstate=model.n";

            window.parent.postMessage({
                eventName: 'workspace.context',

                data: {
                    state: 'model.n'
                }
            }, 'https://collab.humanbrainproject.eu/');

            state = "n"

            window.location.search = "ctx=" + getCtx() + "&ctxstate=model.n";
        };

        return {
            setService: setService,
            getCtx: getCtx,
            getState: getState,
            sendState: sendState,
            clearState: clearState,
            setState: setState,
        }
    }
]);






var ParametersConfigurationServices = angular.module('ParametersConfigurationServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', 'ContextServices']);
ParametersConfigurationServices.service('CollabParameters', ['$rootScope', 'CollabParameterRest', 'Context',
    function($rootScope, CollabParameterRest, Context) {
        var parameters;
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
            parameters = CollabParameterRest.get({ ctx: ctx, id: ctx });
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
        };

        var _getCtx = function() {
            if (typeof(ctx) == "undefined") {
                ctx = Context.getCtx()


                return (ctx);
            }
        };

        var setService = function() {
            _getCtx();

            if (typeof(parameters) == "undefined") {

                parameters = CollabParameterRest.get({ ctx: ctx, id: ctx }); //need to get collab number
                parameters.$promise.then(function() {

                    if (parameters.param.length == 0) {

                        post = _postInitCollab();
                        post.$promise.then(function() {
                            parameters = CollabParameterRest.get({ ctx: ctx, id: ctx });

                        });
                    } else {

                        param_tab = _getParamTabValues();
                        string_tab = _StringTabToArray(param_tab);
                        _setParametersNewValues(string_tab);


                    }
                });
            }
            return parameters;
        };

        var _postInitCollab = function() {
            initConfiguration();

            post = post_parameters();
            return post;

        };

        var post_parameters = function() {

            var data_to_send = JSON.stringify({
                'id': ctx,
                'data_modalities': String(parameters.param[0]['data_modalities']),
                'test_type': String(parameters.param[0]['test_type']),
                'species': String(parameters.param[0]['species']),
                'brain_region': String(parameters.param[0]['brain_region']),
                'cell_type': String(parameters.param[0]['cell_type']),
                'model_type': String(parameters.param[0]['model_type']),
                'app_type': String(parameters.param[0]['app_type']),
                'collab_id': String(parameters.param[0]['collab_id']),
            });
            post = CollabParameterRest.save({ ctx: ctx }, data_to_send, function(value) {});
            return post;
        };

        var put_parameters = function() {

            var data_to_send = JSON.stringify({
                'id': ctx,
                'data_modalities': String(parameters.param[0]['data_modalities']),
                'test_type': String(parameters.param[0]['test_type']),
                'species': String(parameters.param[0]['species']),
                'brain_region': String(parameters.param[0]['brain_region']),
                'cell_type': String(parameters.param[0]['cell_type']),
                'model_type': String(parameters.param[0]['model_type']),
                'app_type': String(parameters.param[0]['app_type']),
                'collab_id': String(parameters.param[0]['collab_id']),
            });

            put = CollabParameterRest.put({ ctx: ctx, id: ctx }, data_to_send, function(value) {});
            return put;
        };

        var getCtx = function() {

            return ctx;
        }

        var initConfiguration = function() {
            parameters = {
                'param': [{
                    'data_modalities': [],
                    'test_type': [],
                    'species': [],
                    'brain_region': [],
                    'cell_type': [],
                    'model_type': [],
                    'app_type': [],
                    'collab_id': 0,
                }, ],
                '$promise': true,
            };

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
            getCtx: getCtx,
            initConfiguration: initConfiguration,
            getRequestParameters: getRequestParameters,
            setCollabId: setCollabId,
        };

    }
]);




var GraphicsServices = angular.module('GraphicsServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices', 'ParametersConfigurationServices']);

GraphicsServices.factory('Graphics', ['$rootScope', 'ValidationResultRest', 'CollabParameters', 'ValidationTestResultRest', 'ValidationModelResultRest',
    function($rootScope, ValidationResultRest, CollabParameters, ValidationTestResultRest, ValidationModelResultRest) {

        var results_data = undefined;

        var focus = function(list_id_couple) {
            var list_data = [];
            var i = 0;
            for (i; i < list_id_couple.length; i++) {
                data = find_result_in_data(list_id_couple[i]);
                list_data.push(data);
            }
            $rootScope.$broadcast('data_focussed:updated', list_data);
        };


        var find_result_in_data = function(id_couple) {
            var result_to_return = undefined;

            var id_line = id_couple.id_line;
            var id_result = id_couple.id_result;

            //find the correct datablock
            var datablock = undefined;
            var i = 0;
            for (i; i < results_data.data_block_id.length; i++) {
                // console.log(results_data.data[i]);

                if (results_data.data_block_id[i].id == id_line) {
                    datablock = results_data.data[i];
                    i = results_data.data_block_id.length;
                }
            }

            //find the correct result in datablock
            var j = 0;
            for (j; j < datablock.length; j++) {
                if (datablock[j].id == id_result) {
                    result_to_return = datablock[j];
                }
            }
            return result_to_return;
        };

        var getResultsfromTestID = function(test) {
            return new Promise(function(resolve, reject) {
                // resolve("Succès !");
                // ou
                // reject("Erreur !");

                var values = [];
                var j = 0;
                results_data = ValidationTestResultRest.get({
                    ctx: CollabParameters.getCtx(),
                    test_id: test.tests[0].id,
                });

                results_data.$promise.then(function() {
                    for (j; j < results_data.data_block_id.length; j++) {
                        values[j] = _manageDataForGraph(results_data.data[j], results_data.data_block_id[j].id)
                    };
                    resolve(values);
                });
            });
        };


        // could still be usefull
        // var getResultsfromModelID = function(model) {
        //     var values = [];
        //     var j = 0;
        //     for (j; j < model.model_instances.length; j++) {

        //         values[j] = _getDatafromModelID(model.model_instances[j])
        //     };

        //     return values;
        // };

        var getResultsfromModelID = function(model) {
            var values = [];
            var j = 0;
            results_data = ValidationModelResultRest.get({
                ctx: CollabParameters.getCtx(),
                model_id: model.models[0].id,
            });
            results_data.$promise.then(function() {

                for (j; j < results_data.data_block_id.length; j++) {
                    values[j] = _manageDataForGraph(results_data.data[j], results_data.data_block_id[j].id)
                };

            });

            return values;
        };

        var _manageDataForGraph = function(data, line_id) {
            // var multiple_result_data = [];
            var values_temp = [];
            var ij = 0;

            for (ij; ij < data.length; ij++) {
                var temp = {
                    x: new Date(data[ij].timestamp),
                    y: data[ij].result,
                    id: line_id,
                    id_test_result: data[ij].id,
                };
                values_temp.push(temp);
            };
            // multiple_result_data.push(data);
            var data_to_return = {
                values: values_temp, //values - represents the array of {x,y} data points
                key: line_id, //key  - the name of the series.
                color: _pickRandomColor(), //color - optional: choose your own line color.
                infosup: data, //maybe not usefull. need to see
            };
            return data_to_return;
        };
        //to keep. could be usefull
        // var _getDatafromModelID = function(model_instance) {
        //     var values_temp = [];
        //     var i = 0;
        //     var result_data = ValidationResultRest.get({
        //         ctx: CollabParameters.getCtx(),
        //         test_code_id: "0",
        //         model_instance_id: model_instance.id
        //     });
        //     result_data.$promise.then(function() {

        //         for (i; i < result_data.data.length; i++) {
        //             values_temp.push({
        //                 x: new Date(result_data.data[i].timestamp),
        //                 y: result_data.data[i].result,
        //                 id: result_data.data[i].id,
        //             });
        //         };
        //         multiple_result_data.push(result_data);
        //     });
        //     return {
        //         values: values_temp, //values - represents the array of {x,y} data points
        //         key: model_instance.version, //key  - the name of the series.
        //         color: _pickRandomColor(), //color - optional: choose your own line color.
        //     };
        // };

        var _pickRandomColor = function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            var i = 0;
            for (i; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        var get_lines_options = function(title, subtitle, Yaxislabel, caption) {
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
                        axisLabel: 'Time (ms)',


                        tickFormat: function(d) {
                            return d3.time.format('%d-%m-%y')(new Date(d))
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
                            // console.log('elementClick in callback', e);

                            //return the list of results for t time.
                            var list_of_results_id = [];
                            var i = 0;
                            for (i; i < e.length; i++) {
                                list_of_results_id.push({ id_line: e[i].point.id, id_result: e[i].point.id_test_result });
                            }

                            focus(list_of_results_id);
                        });
                    }
                },
                title: {
                    enable: true,
                    text: title
                },
                subtitle: {
                    enable: true,
                    text: subtitle,
                    css: {
                        'text-align': 'center',
                        'margin': '10px 13px 0px 7px'
                    }
                },
                caption: {
                    enable: true,
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
        };

    }
]);
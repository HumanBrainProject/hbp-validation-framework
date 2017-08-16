var ParametersConfigurationServices = angular.module('ParametersConfigurationServices', ['ngResource', 'btorfs.multiselect', 'ApiCommunicationServices']);
ParametersConfigurationServices.service('CollabParameters', ['$rootScope', 'CollabParameterRest',
    function($rootScope, CollabParameterRest) {
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

                // var url = (window.location != window.parent.location) ?
                //     document.referrer :
                //     document.location.href;

                ctx = document.location.href;
                ctx = ctx.split("?")[1]
                ctx = ctx.split("#")[0]
                ctx = ctx.substring(4);

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

GraphicsServices.factory('Graphics', ['$rootScope', 'ValidationResultRest', 'CollabParameters', 'ValidationTestResultRest','ValidationModelResultRest',
    function($rootScope, ValidationResultRest, CollabParameters, ValidationTestResultRest, ValidationModelResultRest) {

        // var linechart_id_result_clicked;
        // var current_result_focussed;
        // var results_data;
       

        var focus = function(id) {
            data = find_result_in_data(id);
            $rootScope.$broadcast('data_focussed:updated', data);
        };


        var find_result_in_data = function(id) {
            var i = 0;
            for (i; i < results_data.data.length; i++) {
                if (results_data.data[i].id == id) {
                    return [results_data.data[i]];
                }
            }
            return [];

        };





        var data_fromAPI = function() {


            var tab_test_code_id = ["622f8ee151c940f3b502980831c7fc09"];
            // var tab_model_instance_id = ["d1135abda9ad46909e6783d41dd42d00", "d1135abda9ad46909e6783d41dd42d01"];

            var tab_model_instance_id = ["d1135abd-a9ad-4690-9e67-83d41dd42d01", "d1135abd-a9ad-4690-9e67-83d41dd42d00"];

            var data_to_return = _prepare_data_to_return(tab_test_code_id, tab_model_instance_id, "test");


            results_data = ValidationTestResultRest.get({
                ctx: CollabParameters.getCtx(),
                test_code_id: tab_test_code_id,
                tab_model_instance_id: tab_model_instance_id,
            })

            final_data = results_data.$promise.then(function() {
                //for each results from API
                var indice_result = 0;
                for (indice_result; indice_result < results_data.data.length; indice_result++) {

                    // read data_to_return to compleat it
                    var i = 0;
                    for (i; i < data_to_return.length; i++) {

                        //check if key == result.model to find corresponding data_to_return element
                        if (data_to_return[i].key == results_data.data[indice_result].model_instance_id) {
                            // console.log("PASSES IF");

                            data_to_return[i].values.push({
                                x: new Date(results_data.data[indice_result].timestamp),
                                y: results_data.data[indice_result].result,
                                id: results_data.data[indice_result].id,
                            });
                        }
                    }
                }

                return data_to_return;
            })
            return final_data;
        };

        var _prepare_data_to_return = function(tab_test_code_id, tab_model_instance_id, mode) {
            data_to_return = [];
            if (mode == "test") {
                var indice_model_id = 0;
                for (indice_model_id; indice_model_id < tab_model_instance_id.length; indice_model_id++) {
                    data_to_return.push({
                        values: [],
                        key: tab_model_instance_id[indice_model_id],
                        color: '#ff7f0e',
                    });
                }
                return data_to_return;
            }
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
            var result_data = ValidationModelResultRest.get({
                ctx: CollabParameters.getCtx(),
                model_id: model.models[0].id,
            });
            result_data.$promise.then(function(){
                 for (j; j < model.model_instances.length; j++) {
                    values[j] = _manageDataByTest(result_data.data[j], result_data.test_versions[j])
            };

            });
           
            return values;
        };

        var _manageDataByTest = function(data, version) {
            // var multiple_result_data = [];
            var values_temp = [];
            var ij = 0;
           
                for (ij; ij<data.length; ij++) {
                    var temp = {
                        x: new Date(data[ij].timestamp),
                        y: data[ij].result,
                        id: version.test_definition_id,
                    };
                    values_temp.push(temp);
                };
                // multiple_result_data.push(data);
            var data_to_return = {
                values: values_temp, //values - represents the array of {x,y} data points
                key: version.test_definition_id, //key  - the name of the series.
                color: _pickRandomColor(), //color - optional: choose your own line color.
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
            var i=0;
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
                            focus(e[0].point.id);
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
            data_fromAPI: data_fromAPI,
            find_result_in_data: find_result_in_data,
            focus: focus,
            getResultsfromModelID: getResultsfromModelID,
        };

    }
]);
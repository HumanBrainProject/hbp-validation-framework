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





GraphicsServices.factory('Graphics', ['$rootScope', 'ValidationResultRest', 'CollabParameters',
    function($rootScope, ValidationResultRest, CollabParameters) {

        // var current_result_focussed;
        var results_data;
        //lock the data location for controler scope
        var line_result_focussed = { current_result_focussed: 1 };

        var focus = function(id) {

            line_result_focussed.current_result_focussed = find_result_in_data(id);

            console.log("Focus");
            // console.log(current_result_focussed);

            console.log(line_result_focussed);

            //think to put it out
            // $scope.$apply();
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
            var values = [];

            results_data = ValidationResultRest.get({
                ctx: CollabParameters.getCtx(),
                test_code_id: "622f8ee151c940f3b502980831c7fc09",
                model_instance_id: "d1135abda9ad46909e6783d41dd42d00"
            })

            var data_to_return = results_data.$promise.then(function() {

                var i = 0;
                for (i; i < results_data.data.length; i++) {
                    // data_to_return.push({ x: i, y: data.data[i].result });
                    values.push({
                        // x: i,
                        x: new Date(results_data.data[i].timestamp),
                        y: results_data.data[i].result,
                        id: results_data.data[i].id,
                    });
                }

                return [{
                        values: values, //values - represents the array of {x,y} data points
                        key: 'title', //key  - the name of the series.
                        color: '#ff7f0e', //color - optional: choose your own line color.
                    },
                    // {
                    //     values: data_to_return, //values - represents the array of {x,y} data points
                    //     key: 'title', //key  - the name of the series.
                    //     color: '#ff7f0e', //color - optional: choose your own line color.

                    // },
                ];
            })

            return data_to_return;
        };


        var get_lines_options = function() {
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
                        axisLabel: 'axisLabel',
                        tickFormat: function(d) {
                            return d3.format('.02f')(d);
                        },
                        axisLabelDistance: -10
                    },
                    callback: function(chart) {
                        chart.lines.dispatch.on('elementClick', function(e) {
                            console.log('elementClick in callback', e);
                            focus(e[0].point.id);
                        });
                    }
                },
                title: {
                    enable: true,
                    text: 'Title for Line Chart'
                },
                subtitle: {
                    enable: true,
                    text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                    css: {
                        'text-align': 'center',
                        'margin': '10px 13px 0px 7px'
                    }
                },
                caption: {
                    enable: true,
                    html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                    css: {
                        'text-align': 'justify',
                        'margin': '10px 13px 0px 7px'
                    }
                }
            };

            return options;


        }

        return {
            get_lines_options: get_lines_options,
            data_fromAPI: data_fromAPI,
            find_result_in_data: find_result_in_data,
            focus: focus,

        };



    }
]);
import { Typography } from '@material-ui/core';
import Box from "@material-ui/core/Box";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Plotly from "plotly.js";
import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import { updateHash } from "./globals";
import ResultDetail from './ResultDetail';
import Theme from './theme';

const ToggleSwitch = withStyles({
    switchBase: {
        '&$checked + $track': {
            backgroundColor: "grey",
        },
    },
    thumb: {
        width: 24,
        height: 24,
        color: Theme.darkOrange
    },
    checked: {},
    track: {},
})(Switch);

function ResultsFiguresSummary_XaxisModels(props) {
    console.log(props.dict_results);
    let dict_results = props.dict_results;

    const Plot = createPlotlyComponent(Plotly);
    var traces = [];
    var layout = {};
    var label_resultJSON_map = {};
    var customdata = [];

    // a separate trace for each test instance
    for (let test_id in dict_results) {
        for (let test_inst_id in dict_results[test_id]["test_instances"]) {
            // a seperate bar group for each model (all instances of same model within the same bar group)
            var model_labels = [];
            var model_version_labels = [];
            var model_version_result_ids = [];
            var model_version_scores = [];
            var customdata = [];
            for (let model_id in dict_results[test_id]["test_instances"][test_inst_id]["models"]) {
                for (let model_inst_id in dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"]) {
                    dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_inst_id]["results"].forEach(function (result_entry, r_ind) {
                        model_labels.push(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_name"]);
                        model_version_labels.push(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_inst_id]["model_version"]);
                        // customdata is used for setting hover description
                        customdata.push([dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_name"],
                        dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_inst_id]["model_version"],
                        dict_results[test_id]["test_name"],
                        dict_results[test_id]["test_instances"][test_inst_id]["test_version"]])
                        model_version_result_ids.push(result_entry["result_id"]);
                        model_version_scores.push(result_entry.score);
                        label_resultJSON_map[result_entry["result_id"]] = result_entry.result_json;
                    });
                }
            }
            traces.push(
                {
                    x: [
                        model_labels,
                        model_version_labels
                    ],
                    y: model_version_scores,
                    // text:model_labels,
                    // Note: hovertext is only being used hold a unique identifier for onClick()
                    hovertext: model_version_result_ids,
                    // customdata is used for setting hover description
                    customdata: customdata,
                    hovertemplate: 'Model: <b>%{customdata[0]}</b><br>' +
                        'Model Version: <b>%{customdata[1]}</b><br>' +
                        'Test: <b>%{customdata[2]}</b><br>' +
                        'Test Version: <b>%{customdata[3]}</b><br>' +
                        'Score: <b>%{y}</b><extra></extra>',
                    name: dict_results[test_id]["test_name"] + " (" + dict_results[test_id]["test_instances"][test_inst_id]["test_version"] + ")",
                    type: 'bar',
                    // marker: { size: 16, color: Theme.plotBarColor }
                    width: 0.1
                }
            )

        }
    }

    layout = {
        // bargap: 0.1,
        // bargroupgap: 0.5,
        showlegend: true,
        legend: {
            x: 1,
            y: 0.5
        },
        hovermode: 'closest',
        // width: 640,
        // height: 480,
        // title: 'Plot Title',
        xaxis: {//tickvals: ["1", "2", "3", "4", "5"],
            //ticktext : ["a", "b", "c", "d" ,"e"],
            title: "Model Instance",
            automargin: true,
            // tickangle: -45,
            // textangle: "auto"
        },
        yaxis: { title: "Score" },
        autosize: true,
        barmode: 'group'
    };

    console.log(traces);
    return (
        <Plot
            data={traces}
            layout={layout}
            onClick={(data) => props.handleResultEntryClick(label_resultJSON_map[data["points"][0]["hovertext"]])}
            config={{
                displaylogo: false,
            }}
        />
    )
}

function ResultsFiguresSummary_XaxisTests(props) {
    console.log(props.dict_results);
    let dict_results = props.dict_results;

    const Plot = createPlotlyComponent(Plotly);
    var traces = [];
    var layout = {};
    var label_resultJSON_map = {};
    var customdata = [];

    // a separate trace for each model instance
    for (let model_id in dict_results) {
        for (let model_inst_id in dict_results[model_id]["model_instances"]) {
            // a seperate bar group for each test (all instances of same test within the same bar group)
            var test_labels = [];
            var test_version_labels = [];
            var test_version_result_ids = [];
            var test_version_scores = [];
            var customdata = [];
            for (let test_id in dict_results[model_id]["model_instances"][model_inst_id]["tests"]) {
                for (let test_inst_id in dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"]) {
                    dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][test_inst_id]["results"].forEach(function (result_entry, r_ind) {
                        test_labels.push(dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_name"]);
                        test_version_labels.push(dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][test_inst_id]["test_version"]);
                        // customdata is used for setting hover description
                        customdata.push([dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_name"],
                        dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][test_inst_id]["test_version"],
                        dict_results[model_id]["model_name"],
                        dict_results[model_id]["model_instances"][model_inst_id]["model_version"]])
                        test_version_result_ids.push(result_entry["result_id"]);
                        test_version_scores.push(result_entry.score);
                        label_resultJSON_map[result_entry["result_id"]] = result_entry.result_json;
                    });
                }
            }
            traces.push(
                {
                    x: [
                        test_labels,
                        test_version_labels
                    ],
                    y: test_version_scores,
                    // text:test_labels,
                    // Note: hovertext is only being used hold a unique identifier for onClick()
                    hovertext: test_version_result_ids,
                    // customdata is used for setting hover description
                    customdata: customdata,
                    hovertemplate: 'Model: <b>%{customdata[2]}</b><br>' +
                        'Model Version: <b>%{customdata[3]}</b><br>' +
                        'Test: <b>%{customdata[0]}</b><br>' +
                        'Test Version: <b>%{customdata[1]}</b><br>' +
                        'Score: <b>%{y}</b><extra></extra>',
                    name: dict_results[model_id]["model_name"] + " (" + dict_results[model_id]["model_instances"][model_inst_id]["model_version"] + ")",
                    type: 'bar',
                    // marker: { size: 16, color: Theme.plotBarColor }
                    width: 0.1
                }
            )

        }
    }

    layout = {
        // bargap: 0.1,
        // bargroupgap: 0.5,
        showlegend: true,
        legend: {
            x: 1,
            y: 0.5
        },
        hovermode: 'closest',
        // width: 640,
        // height: 480,
        // title: 'Plot Title',
        xaxis: {//tickvals: ["1", "2", "3", "4", "5"],
            //ticktext : ["a", "b", "c", "d" ,"e"],
            title: "Test Instance",
            automargin: true,
            // tickangle: -45,
            // textangle: "auto"
        },
        yaxis: { title: "Score" },
        autosize: true,
        barmode: 'group'
    };

    console.log(traces);
    return (
        <Plot
            data={traces}
            layout={layout}
            onClick={(data) => props.handleResultEntryClick(label_resultJSON_map[data["points"][0]["hovertext"]])}
            config={{
                displaylogo: false,
            }}
        />
    )
}

export default class CompareMultiGraphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            resultDetailOpen: false,
            currentResult: null,
            test_ids: [],
            summary_xaxis_models: true
        };

        this.handleResultEntryClick = this.handleResultEntryClick.bind(this);
        this.handleResultDetailClose = this.handleResultDetailClose.bind(this);
        this.handleXAxisChange = this.handleXAxisChange.bind(this);
        this.groupResults_XaxisModels = this.groupResults_XaxisModels.bind(this);
        this.groupResults_XaxisTests = this.groupResults_XaxisTests.bind(this);
    }

    groupResults_XaxisModels = (results) => {
        // will be a multi-D dict {test -> test instance -> model -> model instance} with list as values
        var dict_results = {}

        // check if test exists
        results.forEach(function (result, index) {
            if (!(result.test.id in dict_results)) {
                dict_results[result.test.id] = {
                    test_id: result.test.id,
                    test_name: result.test.name,
                    test_alias: result.test.alias,
                    test_instances: {}
                };
            }
            // check if test instance exists inside test
            if (!(result.test_instance_id in dict_results[result.test.id]["test_instances"])) {
                dict_results[result.test.id]["test_instances"][result.test_instance_id] = {
                    test_inst_id: result.test_instance_id,
                    test_version: result.test_instance.version,
                    timestamp: result.test_instance.timestamp,
                    models: {}
                };
            }
            // check if model exists for this test instance
            if (!(result.model.id in dict_results[result.test.id]["test_instances"][result.test_instance_id]["models"])) {
                dict_results[result.test.id]["test_instances"][result.test_instance_id]["models"][result.model.id] = {
                    model_id: result.model.id,
                    model_name: result.model.name,
                    model_alias: result.model.alias,
                    model_instances: {}
                };
            }
            // check if model instance exists for this model
            if (!(result.model_instance_id in dict_results[result.test.id]["test_instances"][result.test_instance_id]["models"][result.model.id]["model_instances"])) {
                dict_results[result.test.id]["test_instances"][result.test_instance_id]["models"][result.model.id]["model_instances"][result.model_instance_id] = {
                    model_inst_id: result.model_instance_id,
                    model_version: result.model_instance.version,
                    timestamp: result.model_instance.timestamp,
                    results: []
                };
            }
            // add result to list of model instance results for above test instance
            dict_results[result.test.id]["test_instances"][result.test_instance_id]["models"][result.model.id]["model_instances"][result.model_instance_id]["results"].push(
                {
                    result_id: result.id,
                    score: result.score,
                    timestamp: result.timestamp,
                    result_json: result
                })
        });

        // NOT NEEDED HERE?
        // // insert empty lists for (test_instance, model_instance) combos without results
        // results.forEach(function (result) {
        //   list_model_versions.forEach(function (m_inst) {
        //     if (!(m_inst["model_inst_id"] in dict_results[result.test.id]["test_instances"][result.test_instance_id]["results"])) {
        //       dict_results[result.test.id]["test_instances"][result.test_instance_id]["results"][m_inst["model_inst_id"]] = [];
        //     }
        //   })
        // })

        // sorting tests by test name/alias (whichever is displayed)
        var temp_sorted = {};
        Object.keys(dict_results).sort(function (a, b) {
            var parent = dict_results;
            var t_a_display = parent[a].test_alias ? parent[a].test_alias : parent[a].test_name;
            var t_b_display = parent[b].test_alias ? parent[b].test_alias : parent[b].test_name;
            if (t_a_display < t_b_display) { return -1; }
            if (t_a_display > t_b_display) { return 1; }
            return 0;
        })
            .forEach(function (key) {
                temp_sorted[key] = dict_results[key];
            });
        dict_results = temp_sorted;

        // sorting test versions within test by timestamp, oldest to newest
        Object.keys(dict_results).forEach(function (test_id) {
            var temp_sorted = {};
            Object.keys(dict_results[test_id]["test_instances"]).sort(function (a, b) {
                var parent = dict_results[test_id]["test_instances"];
                var t_a_timestamp = parent[a].timestamp;
                var t_b_timestamp = parent[b].timestamp;
                if (t_a_timestamp < t_b_timestamp) { return -1; }
                if (t_a_timestamp > t_b_timestamp) { return 1; }
                return 0;
            })
                .forEach(function (key) {
                    temp_sorted[key] = dict_results[test_id]["test_instances"][key];
                });
            dict_results[test_id]["test_instances"] = temp_sorted;
        })

        // sorting models within each test instance by model name/alias (whichever is displayed)
        Object.keys(dict_results).forEach(function (test_id) {
            Object.keys(dict_results[test_id]["test_instances"]).forEach(function (test_inst_id) {
                var temp_sorted = {};
                Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"]).sort(function (a, b) {
                    var parent = dict_results[test_id]["test_instances"][test_inst_id]["models"];
                    var t_a_display = parent[a].model_alias ? parent[a].model_alias : parent[a].model_name;
                    var t_b_display = parent[b].model_alias ? parent[b].model_alias : parent[b].model_name;
                    if (t_a_display < t_b_display) { return -1; }
                    if (t_a_display > t_b_display) { return 1; }
                    return 0;
                })
                    .forEach(function (key) {
                        temp_sorted[key] = dict_results[test_id]["test_instances"][test_inst_id]["models"][key];
                    });
                dict_results[test_id]["test_instances"][test_inst_id]["models"] = temp_sorted;
            })
        })

        // sorting model versions within each model by timestamp, oldest to newest
        Object.keys(dict_results).forEach(function (test_id) {
            Object.keys(dict_results[test_id]["test_instances"]).forEach(function (test_inst_id) {
                Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"]).forEach(function (model_id) {
                    var temp_sorted = {};
                    Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"]).sort(function (a, b) {
                        var parent = dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"];
                        var t_a_timestamp = parent[a].timestamp;
                        var t_b_timestamp = parent[b].timestamp;
                        if (t_a_timestamp < t_b_timestamp) { return -1; }
                        if (t_a_timestamp > t_b_timestamp) { return 1; }
                        return 0;
                    })
                        .forEach(function (key) {
                            temp_sorted[key] = dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][key];
                        });
                    dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"] = temp_sorted;
                })
            })
        })

        // sort each list of dicts (each dict being a result), newest to oldest
        Object.keys(dict_results).forEach(function (test_id) {
            Object.keys(dict_results[test_id]["test_instances"]).forEach(function (test_inst_id) {
                Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"]).forEach(function (model_id) {
                    Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"]).forEach(function (model_inst_id) {
                        dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_inst_id]["results"].sort(function (a, b) {
                            if (a.timestamp < b.timestamp) { return 1; }
                            if (a.timestamp > b.timestamp) { return -1; }
                            return 0;
                        });
                    });
                });
            });
        });

        return dict_results
    }

    groupResults_XaxisTests = (results) => {
        // will be a multi-D dict {model -> model instance -> test -> test instance} with list as values
        var dict_results = {}

        // check if test exists
        results.forEach(function (result, index) {
            if (!(result.model.id in dict_results)) {
                dict_results[result.model.id] = {
                    model_id: result.model.id,
                    model_name: result.model.name,
                    model_alias: result.model.alias,
                    model_instances: {}
                };
            }
            // check if model instance exists inside model
            if (!(result.model_instance_id in dict_results[result.model.id]["model_instances"])) {
                dict_results[result.model.id]["model_instances"][result.model_instance_id] = {
                    model_inst_id: result.model_instance_id,
                    model_version: result.model_instance.version,
                    timestamp: result.model_instance.timestamp,
                    tests: {}
                };
            }
            // check if test exists for this model instance
            if (!(result.test.id in dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"])) {
                dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id] = {
                    test_id: result.test.id,
                    test_name: result.test.name,
                    test_alias: result.test.alias,
                    test_instances: {}
                };
            }
            // check if test instance exists for this test
            if (!(result.test_instance_id in dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id]["test_instances"])) {
                dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id]["test_instances"][result.test_instance_id] = {
                    test_inst_id: result.test_instance_id,
                    test_version: result.test_instance.version,
                    timestamp: result.test_instance.timestamp,
                    results: []
                };
            }
            // add result to list of test instance results for above model instance
            dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id]["test_instances"][result.test_instance_id]["results"].push(
                {
                    result_id: result.id,
                    score: result.score,
                    timestamp: result.timestamp,
                    result_json: result
                })
        });

        // NOT NEEDED HERE?
        // // insert empty lists for (model_instance, test_instance) combos without results
        // results.forEach(function (result) {
        //   list_test_versions.forEach(function (t_inst) {
        //     if (!(t_inst["test_inst_id"] in dict_results[result.model.id]["model_instances"][result.model_instance_id]["results"])) {
        //       dict_results[result.model.id]["model_instances"][result.model_instance_id]["results"][t_inst["test_inst_id"]] = [];
        //     }
        //   })
        // })

        // sorting models by model name/alias (whichever is displayed)
        var temp_sorted = {};
        Object.keys(dict_results).sort(function (a, b) {
            var parent = dict_results;
            var t_a_display = parent[a].model_alias ? parent[a].model_alias : parent[a].test_model;
            var t_b_display = parent[b].model_alias ? parent[b].model_alias : parent[b].test_model;
            if (t_a_display < t_b_display) { return -1; }
            if (t_a_display > t_b_display) { return 1; }
            return 0;
        })
            .forEach(function (key) {
                temp_sorted[key] = dict_results[key];
            });
        dict_results = temp_sorted;

        // sorting model versions within model by timestamp, oldest to newest
        Object.keys(dict_results).forEach(function (model_id) {
            var temp_sorted = {};
            Object.keys(dict_results[model_id]["model_instances"]).sort(function (a, b) {
                var parent = dict_results[model_id]["model_instances"];
                var t_a_timestamp = parent[a].timestamp;
                var t_b_timestamp = parent[b].timestamp;
                if (t_a_timestamp < t_b_timestamp) { return -1; }
                if (t_a_timestamp > t_b_timestamp) { return 1; }
                return 0;
            })
                .forEach(function (key) {
                    temp_sorted[key] = dict_results[model_id]["model_instances"][key];
                });
            dict_results[model_id]["model_instances"] = temp_sorted;
        })

        // sorting tests within each model instance by test name/alias (whichever is displayed)
        Object.keys(dict_results).forEach(function (model_id) {
            Object.keys(dict_results[model_id]["model_instances"]).forEach(function (model_inst_id) {
                var temp_sorted = {};
                Object.keys(dict_results[model_id]["model_instances"][model_inst_id]["tests"]).sort(function (a, b) {
                    var parent = dict_results[model_id]["model_instances"][model_inst_id]["tests"];
                    var t_a_display = parent[a].test_alias ? parent[a].test_alias : parent[a].test_name;
                    var t_b_display = parent[b].test_alias ? parent[b].test_alias : parent[b].test_name;
                    if (t_a_display < t_b_display) { return -1; }
                    if (t_a_display > t_b_display) { return 1; }
                    return 0;
                })
                    .forEach(function (key) {
                        temp_sorted[key] = dict_results[model_id]["model_instances"][model_inst_id]["tests"][key];
                    });
                dict_results[model_id]["model_instances"][model_inst_id]["tests"] = temp_sorted;
            })
        })

        // sorting test versions within each test by timestamp, oldest to newest
        Object.keys(dict_results).forEach(function (model_id) {
            Object.keys(dict_results[model_id]["model_instances"]).forEach(function (model_inst_id) {
                Object.keys(dict_results[model_id]["model_instances"][model_inst_id]["tests"]).forEach(function (test_id) {
                    var temp_sorted = {};
                    Object.keys(dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"]).sort(function (a, b) {
                        var parent = dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"];
                        var t_a_timestamp = parent[a].timestamp;
                        var t_b_timestamp = parent[b].timestamp;
                        if (t_a_timestamp < t_b_timestamp) { return -1; }
                        if (t_a_timestamp > t_b_timestamp) { return 1; }
                        return 0;
                    })
                        .forEach(function (key) {
                            temp_sorted[key] = dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][key];
                        });
                    dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"] = temp_sorted;
                })
            })
        })

        // sort each list of dicts (each dict being a result), newest to oldest
        Object.keys(dict_results).forEach(function (model_id) {
            Object.keys(dict_results[model_id]["model_instances"]).forEach(function (model_inst_id) {
                Object.keys(dict_results[model_id]["model_instances"][model_inst_id]["tests"]).forEach(function (test_id) {
                    Object.keys(dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"]).forEach(function (test_inst_id) {
                        dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][test_inst_id]["results"].sort(function (a, b) {
                            if (a.timestamp < b.timestamp) { return 1; }
                            if (a.timestamp > b.timestamp) { return -1; }
                            return 0;
                        });
                    });
                });
            });
        });

        return dict_results
    }

    handleResultEntryClick(result) {
        this.setState({
            'resultDetailOpen': true,
            'currentResult': result
        });
        updateHash("result_id." + result.id);
    };

    handleResultDetailClose() {
        this.setState({
            'resultDetailOpen': false,
            'currentResult': null
        });
        updateHash('');
    };

    handleXAxisChange() {
        this.setState(prevState => ({
            summary_xaxis_models: !prevState.summary_xaxis_models
        }));
    }

    renderResultsFigures(dict_results) {
        var test_ids = this.state.test_ids;
        // determine list of tests to be plotted
        if (test_ids.length < 1) {
            for (const test_id of Object.keys(dict_results)) {
                test_ids.push(test_id)
            }
        }

        if (test_ids.length > 0) {
            return (
                <Grid container>
                    <Grid item xs={12} align="center">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="button"><strong>Tests</strong></Typography>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="X-axis"
                                        control={<ToggleSwitch
                                            checked={this.state.summary_xaxis_models}
                                            onChange={this.handleXAxisChange}
                                            name="X-axis"
                                        />}
                                        label="X-axis"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                            <Typography variant="button"><strong>Models</strong></Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: "900px", marginBottom: 25 }}>
                            <Typography variant="subtitle1">
                                <br />
                                <strong>Note: </strong>
                                Summary plots only display the latest result for each combination of model instance and test instance.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} align="center">
                        {
                            this.state.summary_xaxis_models
                                ?
                                <ResultsFiguresSummary_XaxisModels
                                    dict_results={dict_results}
                                    handleResultEntryClick={this.handleResultEntryClick}
                                />
                                :
                                <ResultsFiguresSummary_XaxisTests
                                    dict_results={dict_results}
                                    handleResultEntryClick={this.handleResultEntryClick}
                                />
                        }

                    </Grid>
                </Grid>
            )
        } else {
            return ""
        }
    }

    renderNoResults() {
        return (
            <Typography variant="h6">
                <br />
                No results have yet been registered for this model!
            </Typography>
        )
    }

    render() {
        var content = "";
        var resultDetail = "";

        const results = this.props.results;
        if (results.length === 0) {
            content = this.renderNoResults();
        } else {
            let results_grouped = "";
            if (this.state.summary_xaxis_models) {
                results_grouped = this.groupResults_XaxisModels(results);
            } else {
                results_grouped = this.groupResults_XaxisTests(results);
            }
            content = this.renderResultsFigures(results_grouped);
        }

        if (this.state.currentResult) {
            resultDetail = <ResultDetail open={this.state.resultDetailOpen} result={this.state.currentResult} onClose={this.handleResultDetailClose} />;
        }
        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        {content}
                    </Grid>
                </Grid>
                <div>
                    {resultDetail}
                </div>
            </>
        );
    }
}

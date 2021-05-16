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

function shortenLabels(traces) {
    // shorter group labels; preferable max length = 20
    traces = shortenLabelsUniquely(traces, 0, 20);
    // shorten instance labels; preferable max length = 10
    traces = shortenLabelsUniquely(traces, 1, 10);
    return traces
}

function shortenLabelsUniquely(traces, type, pref_length) {
    // we shorten labels so that long labels do not
    // overlap each other in the generated figures

    // simply clipping the labels to some pre-defined length
    // can result in non-unique labels. As Plotly uses the
    // labels to merge items into groups, this can cause
    // unrelated items to be merged into same group.

    // this method tries to shorten the labels, while trying
    // to keep them distinct for proper grouping.

    // Approach:
    // remove common prefix, and also suffix (if required to shorten length further)

    // sorting the labels orders them, so any prefix
    // that is common to all labels, will also be common to
    // the first and last labels. Thus we only need to compare
    // the first and last labels to determine the common prefix.
    // The same can be done for common suffix by reversing labels.

    // to avoid copy by reference - deep copy
    const traces_original = JSON.parse(JSON.stringify(traces));

    function mergeUnique(arr1, arr2){
        return arr1.concat(arr2.filter(function (item) {
            return arr1.indexOf(item) === -1;
        }));
    }

    // check if any labels too long, if yes then find them
    var labels = [];
    traces.forEach(function(entry) {
        labels = mergeUnique(labels, entry["x"][type]);
    });
    console.log(labels);
    // get subset of labels that are above pref_length
    // these need to be manipulated appropriately
    // we use this subset  to have more chance of
    // obtaining a common prefix/suffix
    var labels_long = labels.filter(function(label) {
        return label.length > pref_length;
    });
    console.log(labels_long);
    if (labels_long.length === 0) {
        return traces;
    }

    // find common prefix for long labels
    function findPrefix(strings) {
        console.log(strings)
        if(!strings.length) {
            return null;
        }
        var sorted = strings.slice(0).sort(), // copy the array before sorting!
            string1 = sorted[0],
            string2 = sorted[sorted.length-1],
            i = 0,
            l = Math.min(string1.length, string2.length);

        while(i < l && string1[i] === string2[i]) {
            i++;
        }
        return string1.slice(0, i);
    }

    var common_prefix = findPrefix(labels_long);
    console.log("common_prefix = ", common_prefix);

    if (common_prefix) {
        // update the original traces object wherever required
        traces.forEach(function(item1, ind1) {
            var trace_item = item1;
            var labels_final = trace_item["x"][type].map(function(item2) {
                if (item2.length > pref_length) {
                    if (item2.startsWith(common_prefix)) {
                        return item2.slice(common_prefix.length)
                    } else {
                        return item2;
                    }
                } else {
                    return item2;
                }
            });
            console.log(labels_final);
            this[ind1]["x"][type] = labels_final;
        }, traces);
    }

    // check if any labels too long (after removing prefix)
    // if yes then find them
    labels = [];
    traces.forEach(function(entry) {
        labels = mergeUnique(labels, entry["x"][type]);
    });
    console.log(labels);
    labels_long = labels.filter(function(label) {
        return label.length > pref_length;
    });
    console.log(labels_long);
    if (labels_long.length === 0) {
        return traces;
    }

    // else, try to remove suffix
    function reverse(string){
        return string.split('').reverse().join('');
    }

    function findSuffix(strings){
        if(!strings || strings.length === 0){
            console.log("NULL")
            return null;
        }
        return reverse(findPrefix(strings.map(reverse)));
    }

    var common_suffix = findSuffix(labels_long);
    console.log("common_suffix = ", common_suffix);

    if (common_suffix) {
        // update the original traces object wherever required
        traces.forEach(function(item1, ind1) {
            var trace_item = item1;
            var labels_final = trace_item["x"][type].map(function(item2) {
                if (item2.length > pref_length) {
                    if (item2.endsWith(common_suffix)) {
                        return item2.slice(0, -common_suffix.length)
                    } else {
                        return item2;
                    }
                } else {
                    return item2;
                }
            });
            console.log(labels_final);
            this[ind1]["x"][type] = labels_final;
        }, traces);
    }

    // check if any labels too long (after removing prefix and suffix)
    // if yes then find them
    labels = [];
    traces.forEach(function(entry) {
        labels = mergeUnique(labels, entry["x"][type]);
    });
    console.log(labels);
    labels_long = labels.filter(function(label) {
        return label.length > pref_length;
    });
    console.log(labels_long);
    if (labels_long.length === 0) {
        return traces;
    }

    // else try to create an acronym from labels
    console.log(traces_original);
    var traces_acronym = traces_original;
    traces_acronym.forEach(function(item1, ind1) {
        var trace_item = item1;
        var labels_final = trace_item["x"][type].map(function(item2) {
            if (item2.length > pref_length) {
                return item2.split(/[\s-_]+/).reduce((response,word)=> response+=word.slice(0,1),'')
            } else {
                return item2;
            }
        });
        console.log(labels_final);
        this[ind1]["x"][type] = labels_final;
    }, traces_acronym);

    // acronym labels are fine only if all are distinct
    var labels_count_before = labels.length;
    labels = [];
    traces.forEach(function(entry) {
        labels = mergeUnique(labels, entry["x"][type]);
    });
    var labels_count_after = labels.length;

    if (labels_count_before === labels_count_after) {
        console.log("Acronyms OK");
        return traces_acronym;
    } else {
        console.log("Acronyms not OK");
        return traces;
    }
}

function ResultsFiguresSummaryXaxisModels(props) {
    console.log(props.dict_results);
    let dict_results = props.dict_results;

    const Plot = createPlotlyComponent(Plotly);
    var traces = [];
    var layout = {};
    var label_resultJSON_map = {};

    // a separate trace for each test instance
    for (let test_id in dict_results) {
        for (let test_inst_id in dict_results[test_id]["test_instances"]) {
            // a seperate bar group for each model (all instances of same model within the same bar group)
            var model_labels = [];
            var model_version_labels = [];
            var model_version_scores = [];
            var customdata = [];
            for (let model_id in dict_results[test_id]["test_instances"][test_inst_id]["models"]) {
                for (let model_inst_id in dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"]) {
                    // since we have ordered the results from newest to oldest in `groupResults_XaxisModels()`, we simply take the very first result as latest
                    let result_entry = dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_inst_id]["results"][0]
                    model_labels.push(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_alias"] ? dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_alias"] : dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_name"]);
                    model_version_labels.push(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_inst_id]["model_version"]);
                    // customdata is used for setting hover description
                    customdata.push([
                                        dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_name"],
                                        dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_inst_id]["model_version"],
                                        dict_results[test_id]["test_name"],
                                        dict_results[test_id]["test_instances"][test_inst_id]["test_version"],
                                        result_entry["result_id"]
                                    ])
                    model_version_scores.push(result_entry.score);
                    label_resultJSON_map[result_entry["result_id"]] = result_entry.result_json;
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
                    // customdata is used for setting hover description
                    customdata: customdata,
                    hovertemplate:  'Model: <b>%{customdata[0]}</b><br>' +
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
            orientation: "h",
            y: -0.4
        },
        hovermode: 'closest',
        // width: 640,
        // height: 480,
        // title: 'Plot Title',
        xaxis: {
            //tickvals: ["1", "2", "3", "4", "5"],
            //ticktext : ["a", "b", "c", "d" ,"e"],
            title: "<b>Model Version</b>",
            automargin: true,
            // tickangle: -45,
            // textangle: "auto"
        },
        yaxis: { title: "<b>Score</b>" },
        autosize: true,
        barmode: 'group'
    };

    console.log(traces);
    traces = shortenLabels(traces);
    console.log(traces);

    return (
        <Plot
            data={traces}
            layout={layout}
            onClick={(data) => props.handleResultEntryClick(label_resultJSON_map[data["points"][0]["customdata"][4]])}
            config={{
                displaylogo: false,
            }}
        />
    )
}

function ResultsFiguresSummaryXaxisTests(props) {
    console.log(props.dict_results);
    let dict_results = props.dict_results;

    const Plot = createPlotlyComponent(Plotly);
    var traces = [];
    var layout = {};
    var label_resultJSON_map = {};

    // a separate trace for each model instance
    for (let model_id in dict_results) {
        for (let model_inst_id in dict_results[model_id]["model_instances"]) {
            // a seperate bar group for each test (all instances of same test within the same bar group)
            var test_labels = [];
            var test_version_labels = [];
            var test_version_scores = [];
            var customdata = [];
            for (let test_id in dict_results[model_id]["model_instances"][model_inst_id]["tests"]) {
                for (let test_inst_id in dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"]) {
                    // since we have ordered the results from newest to oldest in `groupResults_XaxisTests()`, we simply take the very first result as latest
                    let result_entry = dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][test_inst_id]["results"][0]
                    test_labels.push(dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_alias"] ? dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_alias"] : dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_name"]);
                    test_version_labels.push(dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][test_inst_id]["test_version"]);
                    // customdata is used for setting hover description
                    customdata.push([
                                        dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_name"],
                                        dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][test_inst_id]["test_version"],
                                        dict_results[model_id]["model_name"],
                                        dict_results[model_id]["model_instances"][model_inst_id]["model_version"],
                                        result_entry["result_id"]
                                    ])
                    test_version_scores.push(result_entry.score);
                    label_resultJSON_map[result_entry["result_id"]] = result_entry.result_json;
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
                    // customdata is used for setting hover description
                    customdata: customdata,
                    hovertemplate:  'Model: <b>%{customdata[2]}</b><br>' +
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
            orientation: "h",
            y: -0.4
        },
        hovermode: 'closest',
        // width: 640,
        // height: 480,
        // title: 'Plot Title',
        xaxis: {
            //tickvals: ["1", "2", "3", "4", "5"],
            //ticktext : ["a", "b", "c", "d" ,"e"],
            title: "<b>Test Version</b>",
            automargin: true,
            // tickangle: -45,
            // textangle: "auto"
        },
        yaxis: { title: "<b>Score</b>" },
        autosize: true,
        barmode: 'group'
    };

    console.log(traces);
    traces = shortenLabels(traces);
    console.log(traces);

    return (
        <Plot
            data={traces}
            layout={layout}
            onClick={(data) => props.handleResultEntryClick(label_resultJSON_map[data["points"][0]["customdata"][4]])}
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
                                <ResultsFiguresSummaryXaxisModels
                                    dict_results={dict_results}
                                    handleResultEntryClick={this.handleResultEntryClick}
                                />
                                :
                                <ResultsFiguresSummaryXaxisTests
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

import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Plotly from "plotly.js";
import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import { updateHash } from "./globals";
import LoadingIndicator from "./LoadingIndicator";
import ResultDetail from './ResultDetail';
import Theme from './theme';



function ResultsFiguresTestIntance(props) {
    const Plot = createPlotlyComponent(Plotly);
    var traces = [];
    var layout = {};
    var label_resultJSON_map = {};

    for (let model_entry of Object.values(props.test_inst_entry["models"])) {
        // a seperate bar group for each model (all instances of same model within the same bar group)
        let model_labels = [];
        let model_version_labels = [];
        let model_version_result_ids = [];
        let model_version_scores = [];
        let customdata = [];

        for (let model_inst_entry of Object.values(model_entry["model_instances"])) {
            model_inst_entry["results"].forEach(function (result_entry, r_ind) {
                model_labels.push(model_entry.model_name);
                model_version_labels.push(model_inst_entry.model_version + " (#" + r_ind + ")");
                // customdata is used for setting hover description
                customdata.push([model_inst_entry.model_version, r_ind])
                model_version_result_ids.push(result_entry["result_id"]);
                model_version_scores.push(result_entry.score);
                label_resultJSON_map[result_entry["result_id"]] = result_entry.result_json;
            });
        }
        traces.push(
            {
                x: [
                    model_labels.map(function (item) {
                        if (item.length <= 35) {
                            return item
                        } else {
                            return item.substr(0, 17) + "..." + item.substr(item.length - 15, item.length)
                        }
                    }),
                    model_version_labels.map(function (item) {
                        if (item.length <= 15) {
                            return item
                        } else {
                            return item.substr(0, 7) + "..." + item.substr(item.length - 5, item.length)
                        }
                    })
                ],
                y: model_version_scores,
                // text:model_labels,
                // Note: hovertext is only being used hold a unique identifier for onClick()
                hovertext: model_version_result_ids,
                // customdata is used for setting hover description
                customdata: customdata,
                hovertemplate: 'Model: <b>' + model_entry.model_name + '</b><br>' +
                    'Version: <b>%{customdata[0]}</b><br>' +
                    'Result #: <b>%{customdata[1]}</b><br>' +
                    'Score: <b>%{y}</b><extra></extra>',
                name: model_entry.model_name,
                type: 'bar',
                // marker: { size: 16, color: Theme.plotBarColor }
                width: 0.2
            }
        )
    }

    layout = {
        // bargap: 0.1,
        // bargroupgap: 0.5,
        showlegend: true,
        legend: {
            orientation: "h",
            y: -1
        },
        hovermode: 'closest',
        // width: 640,
        // height: 480,
        // title: 'Plot Title',
        xaxis: {//tickvals: ["1", "2", "3", "4", "5"],
            //ticktext : ["a", "b", "c", "d" ,"e"],
            title: "<b>Model Instance</b>",
            automargin: true,
            // tickangle: -45,
            // textangle: "auto"
        },
        yaxis: { title: "<b>Score</b>" },
        autosize: true,
        barmode: 'group'
    };

    return (
        <Accordion defaultExpanded={true} key={props.test_inst_id} style={{ backgroundColor: Theme.lightBackground }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={props.test_inst_id}
            >
                <Typography variant="subtitle1">Test Version: <b>{props.test_inst_entry.test_version}</b></Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Container>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Plot
                                            data={traces}
                                            layout={layout}
                                            onClick={(data) => props.handleResultEntryClick(label_resultJSON_map[data["points"][0]["hovertext"]])}
                                            config={{
                                                displaylogo: false,
                                            }}
                                        />
                                        <br /><br />
                                        <Typography variant="body2" align="center">Observation Data Type: <b>{props.test_inst_entry.data_type}</b></Typography>
                                        <Typography variant="body2" align="center">Test Score Type: <b>{props.test_inst_entry.score_type}</b></Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </AccordionDetails>
        </Accordion>
    )
}

export default class ResultGraphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            resultDetailOpen: false,
            currentResult: null,
            test_ids: []
        };

        this.handleResultEntryClick = this.handleResultEntryClick.bind(this)
        this.handleResultDetailClose = this.handleResultDetailClose.bind(this)
    }

    groupResults = (results) => {
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
                    data_type: result.test.data_type,
                    score_type: result.test.score_type,
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
                    <Grid item>
                        {test_ids.map((test_id) =>
                            <Accordion defaultExpanded={true} key={test_id} style={{ backgroundColor: Theme.tableHeader }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id={test_id}
                                >
                                    <Typography variant="subtitle1">Test: <b>{dict_results[test_id].test_alias ? dict_results[test_id].test_alias : dict_results[test_id].test_name}</b></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        {Object.entries(dict_results[test_id]["test_instances"]).map(([test_inst_id, test_inst_entry]) =>
                                            <Grid item key={test_inst_id}>
                                                <Grid container>
                                                    <Grid item>
                                                        <ResultsFiguresTestIntance
                                                            test_inst_id={test_inst_id}
                                                            test_inst_entry={test_inst_entry}
                                                            key={test_inst_id}
                                                            handleResultEntryClick={this.handleResultEntryClick}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )}
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

        if (this.props.loadingResult) {
            return <LoadingIndicator position="absolute" />
        }

        const results = this.props.results;
        if (results.length === 0) {
            content = this.renderNoResults();
        } else {
            const results_grouped = this.groupResults(results);
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

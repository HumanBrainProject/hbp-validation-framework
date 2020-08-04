import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { updateHash } from "./globals";
import LoadingIndicator from "./LoadingIndicator";
import ResultDetail from './ResultDetail';
import Theme from './theme';
import { formatTimeStampToCompact, roundFloat } from "./utils";

class ResultPerInstanceComboMT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    toggleExpanded() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const results_sublist = this.props.result_MTcombo;
        return [
            // For number of results icon
            <TableCell key="number">
                {
                    results_sublist.length > 1 ?
                        // to handle the most recent result for (model_instance, test_instance) combo
                        // Note: results are already ordered from latest to oldest
                        <Grid item align="center" onClick={this.toggleExpanded} style={{ cursor: 'pointer' }}>
                            <Tooltip title={results_sublist.length + " results available"}>
                                <Avatar style={{ width: "20px", height: "20px" }}>
                                    <Typography variant="button">
                                        {results_sublist.length}
                                    </Typography>
                                </Avatar>
                            </Tooltip>
                        </Grid>
                        :
                        // to handle all other results (except latest) for (model_instance, test_instance) combo
                        <></>
                }
            </TableCell>,
            // For score
            <TableCell key="score">
                {
                    results_sublist.map((result, ind) => {
                        return ind === 0 ?
                            // to handle the most recent result for (model_instance, test_instance) combo
                            // Note: results are already ordered from latest to oldest
                            results_sublist.length === 1 ?
                                // if just a single result exists for (model_instance, test_instance) combo
                                <Grid container key={result.result_id}>
                                    <Grid item align="center" onClick={() => this.props.handleResultEntryClick(result.result_json)} style={{ cursor: 'pointer' }}>
                                        {roundFloat(result.score, 2)}
                                    </Grid>
                                </Grid>
                                :
                                // if multiple results exist for (model_instance, test_instance) combo
                                <Grid container spacing={2} style={{ display: 'block' }} key={result.result_id} direction="row">
                                    <Grid item align="center" onClick={() => this.props.handleResultEntryClick(result.result_json)} style={{ cursor: 'pointer' }}>
                                        {roundFloat(result.score, 2)}
                                    </Grid>
                                </Grid>
                            :
                            // to handle all other results (except latest) for (model_instance, test_instance) combo
                            <Grid container style={this.state.expanded ? { display: 'block' } : { display: 'none' }} key={result.result_id}>
                                <Grid item align="center" onClick={() => this.props.handleResultEntryClick(result.result_json)} style={{ cursor: 'pointer' }}>
                                    {roundFloat(result.score, 2)}
                                </Grid>
                            </Grid>
                    })
                }
            </TableCell>,
            // For timestamp
            <TableCell key="timestamp">
                {
                    results_sublist.map((result, ind) => {
                        return ind === 0 ?
                            // to handle the most recent result for (model_instance, test_instance) combo
                            // Note: results are already ordered from latest to oldest
                            <Grid container spacing={2} style={{ display: 'block' }} key={result.result_id}>
                                <Grid item align="center">
                                    {formatTimeStampToCompact(result.timestamp)}
                                </Grid>
                            </Grid>
                            :
                            // to handle all other results (except latest) for (model_instance, test_instance) combo
                            <Grid container style={this.state.expanded ? { display: 'block' } : { display: 'none' }} key={result.result_id}>
                                <Grid item align="center">
                                    {formatTimeStampToCompact(result.timestamp)}
                                </Grid>
                            </Grid>
                    })
                }
            </TableCell>
        ];
    }
}

class ResultEntryTest extends React.Component {
    render() {
        const result_test = this.props.result_entry;
        const model_versions = this.props.model_versions;
        const handleResultEntryClick = this.props.handleResultEntryClick;
        if (result_test) {
            return (
                <React.Fragment>
                    {
                        Object.keys(result_test.test_instances).map((test_inst_id, index_tt) => (
                            <TableRow key={test_inst_id}>
                                {
                                    (index_tt === 0) ?
                                        <TableCell align="right" bgcolor={Theme.tableDataHeader} rowSpan={Object.keys(result_test.test_instances).length} style={{ fontWeight: 'bold' }}>{result_test.test_alias ? result_test.test_alias : result_test.test_name}</TableCell>
                                        : <React.Fragment></React.Fragment>
                                }
                                <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ fontWeight: 'bold' }}>{result_test.test_instances[test_inst_id].test_version}</TableCell>
                                {
                                    model_versions.map(function (model_version_entry) {
                                        return (
                                            <ResultPerInstanceComboMT result_MTcombo={result_test.test_instances[test_inst_id].results[model_version_entry.model_inst_id]}
                                                handleResultEntryClick={handleResultEntryClick}
                                                key={model_version_entry.model_inst_id} />
                                        );
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </React.Fragment>
            );
        } else {
            return ""
        }
    }
}

export default class ModelResultOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            model_versions: [],
            resultDetailOpen: false,
            currentResult: null
        };

        this.handleResultEntryClick = this.handleResultEntryClick.bind(this)
        this.handleResultDetailClose = this.handleResultDetailClose.bind(this)
    }

    getModelVersions = () => {
        // Get list of all model versions; note that not necessarily all model versions will have associated results
        // so not appropriate to locate model versions via individual results
        var list_model_versions = []
        this.props.modelJSON.instances.forEach(function (model_inst) {
            list_model_versions.push({
                model_inst_id: model_inst.id,
                model_version: model_inst.version,
                timestamp: model_inst.timestamp
            })
        })
        return list_model_versions
    }

    groupResults = (list_model_versions, results) => {
        // will be a 3-D dict {test -> test instance -> model instance} with list of results as values
        var dict_results = {};

        // sorting list_model_versions by timestamp (oldest to newest)
        list_model_versions.sort(function (a, b) {
            if (a.timestamp < b.timestamp) { return -1; }
            if (a.timestamp > b.timestamp) { return 1; }
            return 0;
        });

        results.forEach(function (result, index) {
            // check if this test was already encountered
            if (!(result.test.id in dict_results)) {
                dict_results[result.test.id] = {
                    test_id: result.test.id,
                    test_name: result.test.name,
                    test_alias: result.test.alias,
                    test_instances: {}
                };
            }
            // check if this test instance was already encountered
            if (!(result.test_instance_id in dict_results[result.test.id]["test_instances"])) {
                dict_results[result.test.id]["test_instances"][result.test_instance_id] = {
                    test_inst_id: result.test_instance_id,
                    test_version: result.test_instance.version,
                    timestamp: result.test_instance.timestamp,
                    results: {}
                };
            }
            // check if model instance exists for this test instance
            if (!(result.model_instance_id in dict_results[result.test.id]["test_instances"][result.test_instance_id]["results"])) {
                dict_results[result.test.id]["test_instances"][result.test_instance_id]["results"][result.model_instance_id] = [];
            }
            // add result to list of model instance results for above test instance
            dict_results[result.test.id]["test_instances"][result.test_instance_id]["results"][result.model_instance_id].push(
                {
                    result_id: result.id,
                    score: result.score,
                    timestamp: result.timestamp,
                    model_id: result.model.id,
                    model_name: result.model.name,
                    model_alias: result.model.alias,
                    model_inst_id: result.model_instance_id,
                    model_version: result.model_instance.version,
                    result_json: result
                })
        });

        // insert empty lists for (test_instance, model_instance) combos without results
        results.forEach(function (result) {
            list_model_versions.forEach(function (m_inst) {
                if (!(m_inst["model_inst_id"] in dict_results[result.test.id]["test_instances"][result.test_instance_id]["results"])) {
                    dict_results[result.test.id]["test_instances"][result.test_instance_id]["results"][m_inst["model_inst_id"]] = [];
                }
            })
        })

        // sorting entries by test name/alias (whichever is displayed)
        var temp_sorted = {};
        Object.keys(dict_results).sort(function (a, b) {
            var t_a_display = dict_results[a].test_alias ? dict_results[a].test_alias : dict_results[a].test_name;
            var t_b_display = dict_results[b].test_alias ? dict_results[b].test_alias : dict_results[b].test_name;
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
                var t_a_timestamp = dict_results[test_id]["test_instances"][a].timestamp;
                var t_b_timestamp = dict_results[test_id]["test_instances"][b].timestamp;
                if (t_a_timestamp < t_b_timestamp) { return -1; }
                if (t_a_timestamp > t_b_timestamp) { return 1; }
                return 0;
            })
                .forEach(function (key) {
                    temp_sorted[key] = dict_results[test_id]["test_instances"][key];
                });
            dict_results[test_id]["test_instances"] = temp_sorted;
        })

        // sort each list of dicts (each dict being a result), newest to oldest
        Object.keys(dict_results).forEach(function (test_id) {
            Object.keys(dict_results[test_id]["test_instances"]).forEach(function (test_inst_id) {
                Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["results"]).forEach(function (model_inst_id, index_m) {
                    dict_results[test_id]["test_instances"][test_inst_id]["results"][model_inst_id].sort(function (a, b) {
                        if (a.timestamp < b.timestamp) { return 1; }
                        if (a.timestamp > b.timestamp) { return -1; }
                        return 0;
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

    renderResultsSummaryTable(dict_results, model_versions) {
        return (
            <React.Fragment>
                <Grid container item direction="column">
                    <Box px={2} pb={0}>
                        <Typography variant="subtitle1"><b>Summary of Validation Results</b></Typography>
                    </Box>
                    <br />
                    <TableContainer>
                        <Table aria-label="spanning table" style={{ width: "auto", tableLayout: "auto", border: 2, borderColor: 'lightgrey', borderStyle: 'solid' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={2} rowSpan={2} bgcolor={Theme.tableRowSelectColor}>Validation Test</TableCell>
                                    <TableCell align="center" colSpan={model_versions.length * 3} bgcolor={Theme.tableRowSelectColor}>Model Version(s)</TableCell>
                                </TableRow>
                                <TableRow>
                                    {
                                        model_versions.map((item, index) => (
                                            <TableCell align="center" colSpan={3} key={item["model_inst_id"]} bgcolor={Theme.tableHeader}>{item["model_version"]}</TableCell>
                                        ))
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" bgcolor={Theme.tableHeader} style={{ width: 200, maxWidth: 200 }}>Test Name</TableCell>
                                    <TableCell align="center" bgcolor={Theme.tableHeader} style={{ width: 200, maxWidth: 200 }}>Test Version</TableCell>
                                    {
                                        model_versions.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ width: 20, maxWidth: 20 }}></TableCell>
                                                <TableCell align="right" bgcolor={Theme.tableDataHeader} style={{ width: 75, maxWidth: 75 }}>Score</TableCell>
                                                <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ width: 200, maxWidth: 200 }}>Date (Time)</TableCell>
                                            </React.Fragment>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(dict_results).map((test_id, index_t) => (
                                        <ResultEntryTest result_entry={dict_results[test_id]} model_versions={model_versions} handleResultEntryClick={this.handleResultEntryClick} key={test_id} />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </React.Fragment >
        )
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

        const model_versions = this.getModelVersions();
        const results = this.props.results;
        if (results.length === 0) {
            content = this.renderNoResults();
        } else {
            const results_grouped = this.groupResults(model_versions, results);
            content = this.renderResultsSummaryTable(results_grouped, model_versions);
        }

        if (this.state.currentResult) {
            resultDetail = <ResultDetail open={this.state.resultDetailOpen} result={this.state.currentResult} onClose={this.handleResultDetailClose} />;
        } else {
            resultDetail = "";
        }
        return (
            <div>
                <div>
                    {content}
                </div>
                <div>
                    {resultDetail}
                </div>
            </div>
        );
    }
}
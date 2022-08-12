import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import { updateHash } from "./globals";
import LoadingIndicator from "./LoadingIndicator";
import ResultDetail from "./ResultDetail";
import Theme from "./theme";
import { formatTimeStampToCompact, roundFloat } from "./utils";
import styled from "styled-components";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "white",
        borderBottom: "1px solid #DDDDDD"
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#F3F3F3",
    },
    '&:last-of-type': {
        borderBottom: "2px solid",
        borderColor: Theme.darkBackground
    },
}));

class ResultPerInstanceComboMT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
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
                {results_sublist.length > 1 ? (
                    // to handle the most recent result for (model_instance, test_instance) combo
                    // Note: results are already ordered from latest to oldest
                    <Grid
                        item
                        align="center"
                        onClick={this.toggleExpanded}
                        style={{ cursor: "pointer" }}
                    >
                        <Tooltip
                            title={
                                results_sublist.length + " results available"
                            }
                        >
                            <Avatar style={{ width: "20px", height: "20px" }}>
                                <Typography variant="button">
                                    {results_sublist.length}
                                </Typography>
                            </Avatar>
                        </Tooltip>
                    </Grid>
                ) : (
                    // to handle all other results (except latest) for (model_instance, test_instance) combo
                    <></>
                )}
            </TableCell>,
            // For score
            <TableCell key="score">
                {results_sublist.map((result, ind) => {
                    return ind === 0 ? (
                        // to handle the most recent result for (model_instance, test_instance) combo
                        // Note: results are already ordered from latest to oldest
                        results_sublist.length === 1 ? (
                            // if just a single result exists for (model_instance, test_instance) combo
                            <Grid container key={result.result_id}>
                                <Grid
                                    item
                                    align="center"
                                    onClick={() =>
                                        this.props.handleResultEntryClick(
                                            result.result_json
                                        )
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {roundFloat(result.score, 2)}
                                </Grid>
                            </Grid>
                        ) : (
                            // if multiple results exist for (model_instance, test_instance) combo
                            <Grid
                                container
                                spacing={2}
                                style={{ display: "block" }}
                                key={result.result_id}
                                direction="row"
                            >
                                <Grid
                                    item
                                    align="center"
                                    onClick={() =>
                                        this.props.handleResultEntryClick(
                                            result.result_json
                                        )
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {roundFloat(result.score, 2)}
                                </Grid>
                            </Grid>
                        )
                    ) : (
                        // to handle all other results (except latest) for (model_instance, test_instance) combo
                        <Grid
                            container
                            style={
                                this.state.expanded
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                            key={result.result_id}
                        >
                            <Grid
                                item
                                align="center"
                                onClick={() =>
                                    this.props.handleResultEntryClick(
                                        result.result_json
                                    )
                                }
                                style={{ cursor: "pointer" }}
                            >
                                {roundFloat(result.score, 2)}
                            </Grid>
                        </Grid>
                    );
                })}
            </TableCell>,
            // For timestamp
            <TableCell key="timestamp">
                {results_sublist.map((result, ind) => {
                    return ind === 0 ? (
                        // to handle the most recent result for (model_instance, test_instance) combo
                        // Note: results are already ordered from latest to oldest
                        <Grid
                            container
                            spacing={2}
                            style={{ display: "block" }}
                            key={result.result_id}
                        >
                            <Grid item align="center">
                                {formatTimeStampToCompact(result.timestamp)}
                            </Grid>
                        </Grid>
                    ) : (
                        // to handle all other results (except latest) for (model_instance, test_instance) combo
                        <Grid
                            container
                            style={
                                this.state.expanded
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                            key={result.result_id}
                        >
                            <Grid item align="center">
                                {formatTimeStampToCompact(result.timestamp)}
                            </Grid>
                        </Grid>
                    );
                })}
            </TableCell>,
        ];
    }
}

class ResultEntryModel extends React.Component {
    render() {
        const result_model = this.props.result_entry;
        const test_versions = this.props.test_versions;
        const handleResultEntryClick = this.props.handleResultEntryClick;
        if (result_model) {
            return (
                <React.Fragment>
                    {Object.keys(result_model.model_instances).map(
                        (model_inst_id, index_tt) => (
                            <StyledTableRow key={model_inst_id}>
                                {index_tt === 0 ? (
                                    <TableCell
                                        align="right"
                                        bgcolor={Theme.tableDataHeader}
                                        rowSpan={
                                            Object.keys(
                                                result_model.model_instances
                                            ).length
                                        }
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {result_model.model_alias
                                            ? result_model.model_alias
                                            : result_model.model_name}
                                    </TableCell>
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                                <TableCell
                                    align="center"
                                    bgcolor={Theme.tableDataHeader}
                                    style={{ fontWeight: "bold" }}
                                >
                                    {
                                        result_model.model_instances[
                                            model_inst_id
                                        ].model_version
                                    }
                                </TableCell>
                                {test_versions.map(function (
                                    test_version_entry
                                ) {
                                    return (
                                        <ResultPerInstanceComboMT
                                            result_MTcombo={
                                                result_model.model_instances[
                                                    model_inst_id
                                                ].results[
                                                    test_version_entry
                                                        .test_inst_id
                                                ]
                                            }
                                            handleResultEntryClick={
                                                handleResultEntryClick
                                            }
                                            key={
                                                test_version_entry.test_inst_id
                                            }
                                        />
                                    );
                                })}
                            </StyledTableRow>
                        )
                    )}
                </React.Fragment>
            );
        } else {
            return "";
        }
    }
}

export default class TestResultOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            test_versions: [],
            resultDetailOpen: false,
            currentResult: null,
        };

        this.handleResultEntryClick = this.handleResultEntryClick.bind(this);
        this.handleResultDetailClose = this.handleResultDetailClose.bind(this);
        this.handleResultUpdate = this.handleResultUpdate.bind(this);
    }

    getTestVersions = () => {
        // Get list of all test versions; note that not necessarily all test versions will have associated results
        // so not appropriate to locate test versions via individual results
        var list_test_versions = [];
        this.props.testJSON.instances.forEach(function (test_inst) {
            list_test_versions.push({
                test_inst_id: test_inst.id,
                test_version: test_inst.version,
                timestamp: test_inst.timestamp,
            });
        });
        return list_test_versions;
    };

    groupResults = (list_test_versions, results) => {
        // will be a 3-D dict {model -> model instance -> test instance} with list of results as values
        var dict_results = {};

        // sorting list_test_versions by timestamp (oldest to newest)
        list_test_versions.sort(function (a, b) {
            if (a.timestamp < b.timestamp) {
                return -1;
            }
            if (a.timestamp > b.timestamp) {
                return 1;
            }
            return 0;
        });

        results.forEach(function (result, index) {
            // check if this model was already encountered
            if (!(result.model_id in dict_results)) {
                dict_results[result.model_id] = {
                    model_id: result.model_id,
                    model_name: result.model_name,
                    model_alias: result.model_alias,
                    model_instances: {},
                };
            }
            // check if this model instance was already encountered
            if (
                !(
                    result.model_instance_id in
                    dict_results[result.model_id]["model_instances"]
                )
            ) {
                dict_results[result.model_id]["model_instances"][
                    result.model_instance_id
                ] = {
                    model_inst_id: result.model_instance_id,
                    model_version: result.model_version,
                    //timestamp: result.model_instance.timestamp,
                    results: {},
                };
            }
            // check if test instance exists for this model instance
            if (
                !(
                    result.test_instance_id in
                    dict_results[result.model_id]["model_instances"][
                        result.model_instance_id
                    ]["results"]
                )
            ) {
                dict_results[result.model_id]["model_instances"][
                    result.model_instance_id
                ]["results"][result.test_instance_id] = [];
            }
            // add result to list of test instance results for above test instance
            dict_results[result.model_id]["model_instances"][
                result.model_instance_id
            ]["results"][result.test_instance_id].push({
                result_id: result.id,
                score: result.score,
                timestamp: result.timestamp,
                test_id: result.test_id,
                test_name: result.test_name,
                test_alias: result.test_alias,
                test_inst_id: result.test_instance_id,
                test_version: result.test_version,
                result_json: result,
            });
        });

        // insert empty lists for (model_instance, test_instance) combos without results
        results.forEach(function (result) {
            list_test_versions.forEach(function (t_inst) {
                if (
                    !(
                        t_inst["test_inst_id"] in
                        dict_results[result.model_id]["model_instances"][
                            result.model_instance_id
                        ]["results"]
                    )
                ) {
                    dict_results[result.model_id]["model_instances"][
                        result.model_instance_id
                    ]["results"][t_inst["test_inst_id"]] = [];
                }
            });
        });

        // sorting entries by model name/alias (whichever is displayed)
        var temp_sorted = {};
        Object.keys(dict_results)
            .sort(function (a, b) {
                var t_a_display = dict_results[a].model_alias
                    ? dict_results[a].model_alias
                    : dict_results[a].model_name;
                var t_b_display = dict_results[b].model_alias
                    ? dict_results[b].model_alias
                    : dict_results[b].model_name;
                if (t_a_display < t_b_display) {
                    return -1;
                }
                if (t_a_display > t_b_display) {
                    return 1;
                }
                return 0;
            })
            .forEach(function (key) {
                temp_sorted[key] = dict_results[key];
            });
        dict_results = temp_sorted;

        // sorting model versions within model by timestamp, oldest to newest
        Object.keys(dict_results).forEach(function (model_id) {
            var temp_sorted = {};
            Object.keys(dict_results[model_id]["model_instances"])
                .sort(function (a, b) {
                    var t_a_timestamp =
                        dict_results[model_id]["model_instances"][a].timestamp;
                    var t_b_timestamp =
                        dict_results[model_id]["model_instances"][b].timestamp;
                    if (t_a_timestamp < t_b_timestamp) {
                        return -1;
                    }
                    if (t_a_timestamp > t_b_timestamp) {
                        return 1;
                    }
                    return 0;
                })
                .forEach(function (key) {
                    temp_sorted[key] =
                        dict_results[model_id]["model_instances"][key];
                });
            dict_results[model_id]["model_instances"] = temp_sorted;
        });

        // sort each list of dicts (each dict being a result), newest to oldest
        Object.keys(dict_results).forEach(function (model_id) {
            Object.keys(dict_results[model_id]["model_instances"]).forEach(
                function (model_instance_id) {
                    Object.keys(
                        dict_results[model_id]["model_instances"][
                            model_instance_id
                        ]["results"]
                    ).forEach(function (test_inst_id, index_m) {
                        dict_results[model_id]["model_instances"][
                            model_instance_id
                        ]["results"][test_inst_id].sort(function (a, b) {
                            if (a.timestamp < b.timestamp) {
                                return 1;
                            }
                            if (a.timestamp > b.timestamp) {
                                return -1;
                            }
                            return 0;
                        });
                    });
                }
            );
        });

        return dict_results;
    };

    handleResultEntryClick(result) {
        this.setState({
            resultDetailOpen: true,
            currentResult: result,
        });
    }

    handleResultDetailClose(sourceHash) {
        this.setState({
            resultDetailOpen: false,
            currentResult: null,
        });
        updateHash(sourceHash || "" );
    }

    handleResultUpdate(updatedResult) {
        this.setState({
            currentResult: updatedResult,
        });
    }

    renderResultsSummaryTable(dict_results, test_versions) {
        return (
            <React.Fragment>
                <Grid container item direction="column">
                    <Box px={2} pb={0} my={2}>
                        <Typography variant="subtitle1">
                            <b>Summary of Validation Results</b>
                        </Typography>
                    </Box>
                    <TableContainer>
                        <Table
                            aria-label="spanning table"
                            style={{
                                width: "auto",
                                tableLayout: "auto",
                                borderStyle: "none",
                                borderRadius: "20px 20px 0 0",
                                overflow: "hidden",
                                marginTop: "10px"
                            }}
                        >
                            <TableHead>
                                <StyledTableRow>
                                    <TableCell
                                        align="center"
                                        colSpan={2}
                                        rowSpan={2}
                                        bgcolor={Theme.tableDarkHeader}
                                        style={{ color: Theme.lightText, fontSize: "18px" }}
                                    >
                                        Model
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        colSpan={test_versions.length * 3}
                                        bgcolor={Theme.tableDarkHeader}
                                        style={{ color: Theme.lightText, fontSize: "18px" }}
                                    >
                                        Test Version(s)
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    {test_versions.map((item, index) => (
                                        <TableCell
                                            align="center"
                                            colSpan={3}
                                            key={item["test_inst_id"]}
                                            bgcolor={Theme.tableHeader}
                                            style={{ color: Theme.darkText, fontSize: "16px" }}
                                        >
                                            {item["test_version"]}
                                        </TableCell>
                                    ))}
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell
                                        align="center"
                                        bgcolor={Theme.tableHeader}
                                        style={{ width: 200, maxWidth: 200 }}
                                    >
                                        Model Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        bgcolor={Theme.tableHeader}
                                        style={{ width: 200, maxWidth: 200 }}
                                    >
                                        Model Version
                                    </TableCell>
                                    {test_versions.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <TableCell
                                                align="center"
                                                bgcolor={Theme.tableDataHeader}
                                                style={{
                                                    width: 20,
                                                    maxWidth: 20,
                                                }}
                                            ></TableCell>
                                            <TableCell
                                                align="right"
                                                bgcolor={Theme.tableDataHeader}
                                                style={{
                                                    width: 75,
                                                    maxWidth: 75,
                                                }}
                                            >
                                                Score
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                bgcolor={Theme.tableDataHeader}
                                                style={{
                                                    width: 200,
                                                    maxWidth: 200,
                                                }}
                                            >
                                                Date (Time)
                                            </TableCell>
                                        </React.Fragment>
                                    ))}
                                </StyledTableRow>
                            </TableHead>
                            <TableBody
                                style={{
                                    borderBottom: "2px solid",
                                    borderColor: Theme.darkBackground
                                }}>
                                {Object.keys(dict_results).map(
                                    (model_id, index_m) => (
                                        <ResultEntryModel
                                            result_entry={
                                                dict_results[model_id]
                                            }
                                            test_versions={test_versions}
                                            handleResultEntryClick={
                                                this.handleResultEntryClick
                                            }
                                            key={model_id}
                                        />
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </React.Fragment>
        );
    }

    renderNoResults() {
        return (
            <Typography variant="h6">
                <br />
                No results have yet been registered with this test!
            </Typography>
        );
    }

    render() {
        var content = "";
        var resultDetail = "";

        if (this.props.loadingResult) {
            return <LoadingIndicator position="absolute" />;
        }

        const test_versions = this.getTestVersions();
        const results = this.props.results;
        if (!results) {
            return (
                <Typography variant="subtitle1">
                    <b>
                        Loading...
                    </b>
                </Typography>
            );
        } else if (results.length === 0) {
            content = this.renderNoResults();
        } else {
            const results_grouped = this.groupResults(test_versions, results);
            content = this.renderResultsSummaryTable(
                results_grouped,
                test_versions
            );
        }

        if (this.state.currentResult) {
            resultDetail = (
                <ResultDetail
                    open={this.state.resultDetailOpen}
                    result={this.state.currentResult}
                    onClose={this.handleResultDetailClose}
                    onUpdate={this.handleResultUpdate}
                    sourceHash={window.location.hash.slice(1)}
                />
            );
        } else {
            resultDetail = "";
        }
        return (
            <div>
                <div>{content}</div>
                <div>{resultDetail}</div>
            </div>
        );
    }
}

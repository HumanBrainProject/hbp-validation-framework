import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import StarIcon from '@material-ui/icons/Star';
import { withSnackbar } from 'notistack';
import React from 'react';
import Theme from './theme';
import ContextMain from './ContextMain';
import LoadingIndicator from "./LoadingIndicator";
import axios from 'axios';
import { baseUrl, querySizeLimit } from "./globals";

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const MyDialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

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
                                <TableCell align="right" bgcolor={Theme.tableDataHeader} style={{ fontWeight: 'bold' }}>{result_test.test_instances[test_inst_id].test_version}</TableCell>
                                {
                                    model_versions.map(function (model_version_entry) {
                                        return (
                                            <ResultPerInstanceComboMT result_MTcombo={result_test.test_instances[test_inst_id].results[model_version_entry.model_inst_id]}
                                                model_versions={model_versions}
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

class CompareMultiResults extends React.Component {
    signal = axios.CancelToken.source();
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);
        const [authContext,] = this.context.auth;

        this.state = {
            // model_dict: {},
            // test_dict: {},
            model_dict: {
                "00f2e856-27a8-4b8d-9ec3-4e2581c546e4": {
                    "name": "CA1_pyr_cACpyr_mpg141208_B_idA_20170915151855",
                    "selected_instances": {
                        "b0ba8f05-b049-4cdd-93ea-1ed646671d21": { "version": "1.0", "timestamp": "2018-03-29T14:21:08.597975+00:00" }
                    }
                },
                "01006de7-e861-45fb-abf4-3c84e609d33b": {
                    "name": "CA1_int_cNAC_970911C_20180120154902",
                    "selected_instances": {
                        "ac33b476-2cc1-4876-8945-b9621aed45a2": { "version": "1.0", "timestamp": "2018-03-29T14:19:55.167777+00:00" }
                    }
                }
            },
            test_dict: {
                "100abccb-6d30-4c1e-a960-bc0489e0d82d": {
                    "name": "Hippocampus_SomaticFeaturesTest_CA1_pyr_cACpyr",
                    "selected_instances": {
                        "1d22e1c0-5a74-49b4-b114-41d233d3250a": { "version": "1.0", "timestamp": "2019-03-28T12:54:19.318444+00:00" }
                    }
                },
                "e316f735-42d5-43f8-8729-6ac2e626353d": {
                    "name": "Hippocampus_CA1_ObliqueIntegrationTest",
                    "selected_instances": {
                        "9067289a-11d0-4c13-b6f1-50c84a4f3cb2": { "version": "1.3.5", "timestamp": "2020-05-29T13:08:02.055709+00:00" }
                    }
                }
            },
            model_inst_ids: [],
            test_inst_ids: [],
            results: [],
            total_models: 0,
            total_model_insts: 0,
            total_tests: 0,
            total_test_insts: 0,
            open_models: [],
            open_tests: [],
            compareShow: false,
            auth: authContext,
            loadingResults: true,
        };

        this.handleModelClick = this.handleModelClick.bind(this);
        this.handleTestClick = this.handleTestClick.bind(this);
        this.handleModelDeleteClick = this.handleModelDeleteClick.bind(this);
        this.handleTestDeleteClick = this.handleTestDeleteClick.bind(this);
        this.evalModelDict = this.evalModelDict.bind(this);
        this.evalTestDict = this.evalTestDict.bind(this);
        this.fetchModelResults = this.fetchModelResults.bind(this);
        this.fetchTestResults = this.fetchTestResults.bind(this);
        this.fetchResults = this.fetchResults.bind(this);
        this.setCompare = this.setCompare.bind(this);
        this.launchCompare = this.launchCompare.bind(this);
    }

    evalModelDict() {
        let model_inst_ids = [];
        for (let m_key in this.state.model_dict) {
            model_inst_ids = model_inst_ids.concat(Object.keys(this.state.model_dict[m_key].selected_instances))
        }

        let count_models = Object.keys(this.state.model_dict).length
        let count_model_insts = model_inst_ids.length;

        this.setState({
            total_models: count_models,
            total_model_insts: count_model_insts,
            model_inst_ids: model_inst_ids
        })
        return Promise.resolve()
    }

    evalTestDict() {
        let test_inst_ids = [];
        for (let t_key in this.state.test_dict) {
            test_inst_ids = test_inst_ids.concat(Object.keys(this.state.test_dict[t_key].selected_instances))
        }

        let count_tests = Object.keys(this.state.test_dict).length
        let count_test_insts = test_inst_ids.length;

        this.setState({
            total_tests: count_tests,
            total_test_insts: count_test_insts,
            test_inst_ids: test_inst_ids
        })
        return Promise.resolve()
    }

    fetchModelResults() {
        let url = baseUrl + "/results-extended/?model_instance_id=" + this.state.model_inst_ids.join('&model_instance_id=') + "&size=" + querySizeLimit;
        let config = {
            cancelToken: this.signal.token,
            headers: {
                'Authorization': 'Bearer ' + this.state.auth.token,
            }
        }
        return axios.get(url, config)
            .then(res => {
                this.setState({
                    loadingResults: false,
                });
                console.log(res);
                return res.data;
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('Error: ', err.message);
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    this.setState({
                        loadingResults: false,
                    });
                    console.log('Error: ', err.message);
                }
            }
            );
    }

    fetchTestResults() {
        let url = baseUrl + "/results-extended/?test_instance_id=" + this.state.test_inst_ids.join('&test_instance_id=') + "&size=" + querySizeLimit;
        let config = {
            cancelToken: this.signal.token,
            headers: {
                'Authorization': 'Bearer ' + this.state.auth.token,
            }
        }
        return axios.get(url, config)
            .then(res => {
                this.setState({
                    loadingResults: false,
                });
                console.log(res);
                return res.data;
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('Error: ', err.message);
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    this.setState({
                        loadingResults: false,
                    });
                    console.log('Error: ', err.message);
                }
            }
            );
    }

    async fetchResults() {
        this.setState({
            loadingResults: true,
        });

        let results = [];
        if (this.state.total_model_insts !== 0) {
            // fetch model results if:
            // - only models specified (no tests)
            // - both models and tests specified; we will retrieve results by models and then filter them by tests
            results = await this.fetchModelResults()
        }
        else if (this.state.total_model_insts === 0 && this.state.total_test_insts !== 0) {
            // fetch test results if:
            // - only tests specified (no models)
            results = await this.fetchTestResults()
        }

        console.log(results);
        // if both models and tests specified, filter results (obtained from models) by tests
        let filtered_results = [];
        let test_inst_ids = this.state.test_inst_ids;
        if (this.state.total_model_insts !== 0 && this.state.total_test_insts !== 0) {
            results.forEach(function (result) {
                if (test_inst_ids.indexOf(result.test_instance_id) > -1) {
                    filtered_results.push(result)
                }
            });
        }

        console.log(filtered_results);
        this.setState({
            results: filtered_results
        })

    }

    setCompare(compare_type) {
        this.setState({
            compareShow: compare_type
        })
    }

    groupResultsTestsCompare(results) {
        // will be a 4-D dict {model -> model instance -> test-> test instance} with list of results as values
        let dict_results = {}

        // Get list of all test versions; note that not necessarily all test versions will have associated results
        // so not appropriate to locate test versions via individual results
        var list_test_versions = [];
        var test_dict = this.state.test_dict;
        for (let t_key in test_dict) {
            for (let t_inst_key in test_dict[t_key].selected_instances) {
                list_test_versions.push({
                    test_inst_id: t_inst_key,
                    test_version: test_dict[t_key].selected_instances[t_inst_key].version,
                    timestamp: test_dict[t_key].selected_instances[t_inst_key].timestamp
                })
            }
        }

        // sorting list_test_versions by timestamp (oldest to newest)
        list_test_versions.sort(function (a, b) {
            if (a.timestamp < b.timestamp) { return -1; }
            if (a.timestamp > b.timestamp) { return 1; }
            return 0;
        });

        results.forEach(function (result, index) {
            // check if this model was already encountered
            if (!(result.model.id in dict_results)) {
                dict_results[result.model.id] = {
                    model_id: result.model.id,
                    model_name: result.model.name,
                    model_alias: result.model.alias,
                    model_instances: {}
                };
            }
            // check if this model instance was already encountered
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
            // check if this test instance was already encountered
            if (!(result.test_instance_id in dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id]["test_instances"])) {
                console.log("++++++++++")
                console.log(result.test_instance_id);
                dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id]["test_instances"][result.test_instance_id] = {
                    test_inst_id: result.test_instance_id,
                    test_version: result.test_instance.version,
                    timestamp: result.test_instance.timestamp,
                    results: []
                };
            }
            // add result to list of test instance results for above test instance
            dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id]["test_instances"][result.test_instance_id]["results"].push(
                {
                    result_id: result.id,
                    score: result.score,
                    timestamp: result.timestamp,
                    test_id: result.test.id,
                    test_name: result.test.name,
                    test_alias: result.test.alias,
                    test_inst_id: result.test_instance_id,
                    test_version: result.test_instance.version,
                    result_json: result
                })
        });

        // insert empty entries for (model_instance, test_instance) combos without results - only for all results
        // results.forEach(function (result) {
        //     list_test_versions.forEach(function (t_inst) {
        //         if (!(t_inst["test_inst_id"] in dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id]["test_instances"])) {
        //             dict_results[result.model.id]["model_instances"][result.model_instance_id]["tests"][result.test.id]["test_instances"][t_inst["test_inst_id"]] = {
        //                 test_inst_id: t_inst["test_inst_id"],
        //                 test_version: t_inst["test_version"],
        //                 timestamp: t_inst["timestamp"],
        //                 results: []
        //             };
        //         }
        //     })
        // })

        // sorting entries by model name/alias (whichever is displayed)
        var temp_sorted = {};
        Object.keys(dict_results).sort(function (a, b) {
            var t_a_display = dict_results[a].model_alias ? dict_results[a].model_alias : dict_results[a].model_name;
            var t_b_display = dict_results[b].model_alias ? dict_results[b].model_alias : dict_results[b].model_name;
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
                var t_a_timestamp = dict_results[model_id]["model_instances"][a].timestamp;
                var t_b_timestamp = dict_results[model_id]["model_instances"][b].timestamp;
                if (t_a_timestamp < t_b_timestamp) { return -1; }
                if (t_a_timestamp > t_b_timestamp) { return 1; }
                return 0;
            })
                .forEach(function (key) {
                    temp_sorted[key] = dict_results[model_id]["model_instances"][key];
                });
            dict_results[model_id]["model_instances"] = temp_sorted;
        })

        // sorting entries by test name/alias (whichever is displayed)
        Object.keys(dict_results).forEach(function (model_id) {
            Object.keys(dict_results[model_id]["model_instances"]).forEach(function (model_inst_id) {
                var temp_sorted = {};
                Object.keys(dict_results[model_id]["model_instances"][model_inst_id]["tests"]).sort(function (a, b) {
                    var t_a_display = dict_results[model_id]["model_instances"][model_inst_id]["tests"][a].test_alias ? dict_results[model_id]["model_instances"][model_inst_id]["tests"][a].test_alias : dict_results[model_id]["model_instances"][model_inst_id]["tests"][a].test_name;
                    var t_b_display = dict_results[model_id]["model_instances"][model_inst_id]["tests"][b].test_alias ? dict_results[model_id]["model_instances"][model_inst_id]["tests"][b].test_alias : dict_results[model_id]["model_instances"][model_inst_id]["tests"][b].test_name;
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

        // sorting test versions within model by timestamp, oldest to newest
        Object.keys(dict_results).forEach(function (model_id) {
            Object.keys(dict_results[model_id]["model_instances"]).forEach(function (model_inst_id) {
                Object.keys(dict_results[model_id]["model_instances"][model_inst_id]["tests"]).forEach(function (test_id) {
                    var temp_sorted = {};
                    Object.keys(dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"]).sort(function (a, b) {
                        var t_a_timestamp = dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][a].timestamp;
                        var t_b_timestamp = dict_results[model_id]["model_instances"][model_inst_id]["tests"][test_id]["test_instances"][b].timestamp;
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
            Object.keys(dict_results[model_id]["model_instances"]).forEach(function (model_instance_id) {
                Object.keys(dict_results[model_id]["model_instances"][model_instance_id]["tests"]).forEach(function (test_id) {
                    Object.keys(dict_results[model_id]["model_instances"][model_instance_id]["tests"][test_id]["test_instances"]).forEach(function (test_instance_id) {
                        dict_results[model_id]["model_instances"][model_instance_id]["tests"][test_id]["test_instances"][test_instance_id]["results"].sort(function (a, b) {
                            if (a.timestamp < b.timestamp) { return 1; }
                            if (a.timestamp > b.timestamp) { return -1; }
                            return 0;
                        });
                    });
                });
            });
        });

        console.log(dict_results);
        return dict_results
    }

    launchCompare() {
        let results = this.state.results;
        let required_results = [];

        if (this.state.compareShow === "common_models") {
            // filter to get test instances that exist in results for every model instance
            for (let t_inst_key of this.state.test_inst_ids) {
                let t_inst_results = [];
                let t_inst_for_m_inst = [];
                results.forEach(function (result) {
                    if (result.test_instance_id === t_inst_key) {
                        t_inst_results.push(result)
                        if (t_inst_for_m_inst.indexOf(result.model_instance_id) === -1) {
                            t_inst_for_m_inst.push(result.model_instance_id)
                        }
                    }
                });
                if (t_inst_for_m_inst.sort().toString() === this.state.model_inst_ids.sort().toString()) {
                    required_results = required_results.concat(t_inst_results)
                }
            }
        } else if (this.state.compareShow === "common_tests") {
            // filter to get model instances that exist in results for every test instance
            for (let m_inst_key of this.state.model_inst_ids) {
                console.log(m_inst_key);
                let m_inst_results = [];
                let m_inst_for_t_inst = [];
                results.forEach(function (result) {
                    if (result.model_instance_id === m_inst_key) {
                        m_inst_results.push(result)
                        if (m_inst_for_t_inst.indexOf(result.test_instance_id) === -1) {
                            m_inst_for_t_inst.push(result.test_instance_id)
                        }
                    }
                });
                if (m_inst_for_t_inst.sort().toString() === this.state.test_inst_ids.sort().toString()) {
                    required_results = required_results.concat(m_inst_results)
                }
            }
        } else if (this.state.compareShow === "all") {
            required_results = results;
        } else {
            return <></>
        }
        console.log(required_results)

        // plot the selected results
        var content = "";
        if (required_results.length === 0) {
            content = this.renderNoResults();
        } else {
            const results_grouped = this.groupResultsTestsCompare(required_results);
            content = "AA";
            // content = this.renderResultsSummaryTable(results_grouped, model_versions);
        }
        return content;
    }

    componentDidMount() {
        const promise1 = this.evalModelDict();
        const promise2 = this.evalTestDict();
        Promise.allSettled([promise1, promise2]).then(() => {
            if (this.state.total_model_insts !== 0 || this.state.total_test_insts !== 0) {
                this.fetchResults()
            }
        });
    }

    handleModelClick(m_key) {
        if (this.state.open_models.indexOf(m_key) > -1) {
            this.setState({ open_models: this.state.open_models.filter(item => item !== m_key) })
        } else {
            this.setState({ open_models: [...this.state.open_models, m_key] })
        }
    };

    handleTestClick(t_key) {
        if (this.state.open_tests.indexOf(t_key) > -1) {
            this.setState({ open_tests: this.state.open_tests.filter(item => item !== t_key) })
        } else {
            this.setState({ open_tests: [...this.state.open_tests, t_key] })
        }
    };

    handleModelDeleteClick(m_key, m_inst_key) {
        let model_dict = this.state.model_dict;
        if (Object.keys(model_dict).includes(m_key)) {
            if (Object.keys(model_dict[m_key].selected_instances).includes(m_inst_key)) {
                delete model_dict[m_key].selected_instances[m_inst_key]
                if (Object.keys(model_dict[m_key].selected_instances).length === 0) {
                    delete model_dict[m_key]
                    if (this.state.open_models.indexOf(m_key) > -1) {
                        this.setState({ open_models: this.state.open_models.filter(item => item !== m_key) })
                    }
                }
                this.setState({ model_dict: model_dict })
                this.evalModelDict();
            }
        }
    }

    handleTestDeleteClick(t_key, t_inst_key) {
        let test_dict = this.state.test_dict;
        if (Object.keys(test_dict).includes(t_key)) {
            if (Object.keys(test_dict[t_key].selected_instances).includes(t_inst_key)) {
                delete test_dict[t_key].selected_instances[t_inst_key]
                if (Object.keys(test_dict[t_key].selected_instances).length === 0) {
                    delete test_dict[t_key]
                    if (this.state.open_tests.indexOf(t_key) > -1) {
                        this.setState({ open_tests: this.state.open_tests.filter(item => item !== t_key) })
                    }
                }
                this.setState({ test_dict: test_dict })
                this.evalTestDict();
            }
        }
    }

    renderNoResults() {
        return (
            <Grid item xs={12} align="center">
                <Typography variant="h6">
                    <br />
                There are no validation results matching the specified criteria!
                </Typography>
            </Grid>
        )
    }

    render() {
        var content = "";
        console.log(this.state.model_inst_ids)
        console.log(this.state.test_inst_ids)
        console.log(this.state.results)

        if (this.state.loadingResults && this.state.compareShow) {
            content = <Grid item xs={12} align="center"><LoadingIndicator position="relative" /></Grid>
        } else if (this.state.compareShow) {
            content = this.launchCompare();
            console.log(content);
        }

        return (
            <Dialog fullScreen onClose={this.props.onClose}
                aria-labelledby="simple-dialog-title"
                open={this.props.open}>
                <MyDialogTitle onClose={this.props.onClose} />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                <AccountTreeIcon color="disabled" />
                                &nbsp;
                                Compare Validation Results
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify="space-around" spacing={3}>

                                {/* Model listing */}
                                <Grid item xs={5} style={{ backgroundColor: Theme.tableRowHoverColor }}>
                                    <Typography variant="h6">
                                        Selected Models
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {this.state.total_models === 1
                                            ?
                                            this.state.total_models + " model, "
                                            :
                                            this.state.total_models + " models, "
                                        }
                                        {this.state.total_model_insts === 1
                                            ?
                                            this.state.total_model_insts + " model instance"
                                            :
                                            this.state.total_model_insts + " model instances"
                                        }
                                    </Typography>
                                    {
                                        Object.keys(this.state.model_dict).map(m_key =>
                                            <div key={m_key}>
                                                <List dense={true}>
                                                    <ListItem style={{ backgroundColor: Theme.lightBackground }} button onClick={() => this.handleModelClick(m_key)}>
                                                        <ListItemAvatar>
                                                            <Avatar style={{ backgroundColor: Theme.darkOrange }} >
                                                                <LocalActivityIcon style={{ color: Theme.bodyBackground }} />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={this.state.model_dict[m_key].name}
                                                            secondary={m_key}
                                                        />
                                                        {(this.state.open_models.indexOf(m_key) > -1) ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItem>
                                                    <Collapse in={(this.state.open_models.indexOf(m_key) > -1)} timeout="auto" unmountOnExit>
                                                        <List dense={true} component="div" disablePadding style={{ backgroundColor: Theme.bodyBackground }}>
                                                            {
                                                                Object.keys(this.state.model_dict[m_key].selected_instances).map(m_inst_key =>
                                                                    <ListItem button style={{ margin: "0 40px", width: "95%" }} key={m_inst_key}>
                                                                        <ListItemIcon>
                                                                            <StarIcon style={{ color: Theme.darkOrange }} />
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={this.state.model_dict[m_key].selected_instances[m_inst_key].version}
                                                                            secondary={m_inst_key}
                                                                        />
                                                                        <ListItemSecondaryAction>
                                                                            <IconButton edge="end" aria-label="delete" onClick={() => this.handleModelDeleteClick(m_key, m_inst_key)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                )
                                                            }
                                                        </List>
                                                    </Collapse>
                                                </List>
                                            </div>
                                        )
                                    }
                                </Grid>

                                {/* Test listing */}
                                <Grid item xs={5} style={{ backgroundColor: Theme.tableRowHoverColor }}>
                                    <Typography variant="h6">
                                        Selected Tests
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {this.state.total_tests === 1
                                            ?
                                            this.state.total_tests + " test, "
                                            :
                                            this.state.total_tests + " tests, "
                                        }
                                        {this.state.total_test_insts === 1
                                            ?
                                            this.state.total_test_insts + " test instance"
                                            :
                                            this.state.total_test_insts + " test instances"
                                        }
                                    </Typography>
                                    {
                                        Object.keys(this.state.test_dict).map(t_key =>
                                            <div key={t_key}>
                                                <List dense={true}>
                                                    <ListItem style={{ backgroundColor: Theme.lightBackground }} button onClick={() => this.handleTestClick(t_key)}>
                                                        <ListItemAvatar>
                                                            <Avatar style={{ backgroundColor: Theme.darkOrange }} >
                                                                <LocalActivityIcon style={{ color: Theme.bodyBackground }} />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={this.state.test_dict[t_key].name}
                                                            secondary={t_key}
                                                        />
                                                        {(this.state.open_tests.indexOf(t_key) > -1) ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItem>
                                                    <Collapse in={(this.state.open_tests.indexOf(t_key) > -1)} timeout="auto" unmountOnExit>
                                                        <List dense={true} component="div" disablePadding style={{ backgroundColor: Theme.bodyBackground }}>
                                                            {
                                                                Object.keys(this.state.test_dict[t_key].selected_instances).map(t_inst_key =>
                                                                    <ListItem button style={{ margin: "0 40px", width: "95%" }} key={t_inst_key}>
                                                                        <ListItemIcon>
                                                                            <StarIcon style={{ color: Theme.darkOrange }} />
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={this.state.test_dict[t_key].selected_instances[t_inst_key].version}
                                                                            secondary={t_inst_key}
                                                                        />
                                                                        <ListItemSecondaryAction>
                                                                            <IconButton edge="end" aria-label="delete" onClick={() => this.handleTestDeleteClick(t_key, t_inst_key)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                )
                                                            }
                                                        </List>
                                                    </Collapse>
                                                </List>
                                            </div>
                                        )
                                    }
                                </Grid>

                            </Grid>
                        </Grid>
                        {
                            (this.state.total_model_insts === 0 && this.state.total_test_insts === 0)
                            &&
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Typography variant="h6">
                                            <br /><br />
                                            Please select models and/or tests to compare!
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: "1000px" }}>
                                        <Typography variant="subtitle1">
                                            <br />
                                            <strong>Note: </strong><br />
                                            If no tests are selected, then all validation tests associated with the selected models will be automatically chosen.<br />
                                            Similarly, if no models are selected, then all models associated with the selected tests will be automatically chosen.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.total_model_insts === 0 && this.state.total_test_insts !== 0)
                            &&
                            <Grid container spacing={3}>
                                <Grid item xs={12} align="center">
                                    <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: "1000px" }}>
                                        <Typography variant="subtitle1">
                                            <br />
                                            <strong>Note: </strong>
                                            Since no models were selected, all models associated with the selected tests will be automatically chosen.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.total_model_insts !== 0 && this.state.total_test_insts === 0)
                            &&
                            <Grid container spacing={3}>
                                <Grid item xs={12} align="center">
                                    <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: "900px" }}>
                                        <Typography variant="subtitle1">
                                            <br />
                                            <strong>Note: </strong>
                                            Since no tests were selected, all tests associated with the selected models will be automatically chosen.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.total_model_insts !== 0 || this.state.total_test_insts !== 0)
                            &&
                            <Grid container spacing={3} style={{ marginTop: "50px" }}>
                                <Grid item xs={12} align="center">
                                    <Box display="flex" justifyContent="space-around" alignItems="center" style={{ maxWidth: "1200px" }}>
                                        <Button disabled={Boolean(!this.state.compareShow)} variant="contained" style={{ backgroundColor: Theme.disabledColor, width: "225px" }} onClick={() => this.setState({ compareShow: false })}>
                                            Clear Results
								        </Button>
                                        <Button disabled={this.state.compareShow === "common_models"} variant="contained" style={{ backgroundColor: Theme.buttonSecondary, width: "225px" }} onClick={() => this.setCompare("common_models")}>
                                            Compare Models
								        </Button>
                                        <Button disabled={this.state.compareShow === "common_tests"} variant="contained" style={{ backgroundColor: Theme.buttonSecondary, width: "225px" }} onClick={() => this.setCompare("common_tests")}>
                                            Compare Tests
								        </Button>
                                        <Button disabled={this.state.compareShow === "all"} variant="contained" style={{ backgroundColor: Theme.buttonPrimary, width: "225px" }} onClick={() => this.setCompare("all")}>
                                            Compare All
								        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.compareShow === "common_models")
                            &&
                            <Grid container spacing={3} style={{ marginTop: "50px" }}>
                                <Grid item xs={12} align="center">
                                    <Typography variant="subtitle1">
                                        <strong>Showing only results associated with validation test instances common to all model instances!</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.compareShow === "common_tests")
                            &&
                            <Grid container spacing={3} style={{ marginTop: "50px" }}>
                                <Grid item xs={12} align="center">
                                    <Typography variant="subtitle1">
                                        <strong>Showing only results associated with model instances common to all validation test instances!</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.compareShow === "all")
                            &&
                            <Grid container spacing={3} style={{ marginTop: "50px" }}>
                                <Grid item xs={12} align="center">
                                    <Typography variant="subtitle1">
                                        <strong>Showing all results!</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        {
                            this.state.compareShow
                            &&
                            content
                        }
                    </Grid>
                </DialogContent>
            </Dialog >
        );
    }
}

export default withSnackbar(CompareMultiResults);
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { datastore } from './datastore';
import CompareMultiGraphs from './CompareMultiGraphs';
import ContextMain from './ContextMain';
import { updateHash } from "./globals";
import LoadingIndicator from "./LoadingIndicator";
import ResultDetail from './ResultDetail';
import ResultGraphs from './ResultGraphs';
import Theme from './theme';
import { formatTimeStampToCompact, roundFloat } from "./utils";

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

class ResultEntryModel extends React.Component {
    render() {
        const result_model = this.props.result_entry;
        const list_tests = this.props.list_tests;
        const dict_test_versions = this.props.dict_test_versions;

        const handleResultEntryClick = this.props.handleResultEntryClick;
        if (result_model) {
            return (
                <React.Fragment>
                    {
                        Object.keys(result_model.model_instances).map((model_inst_id, index_tt) => (
                            <TableRow key={model_inst_id}>
                                {
                                    (index_tt === 0) ?
                                        <TableCell align="right" bgcolor={Theme.tableDataHeader} rowSpan={Object.keys(result_model.model_instances).length} style={{ fontWeight: 'bold' }}>
                                            <Tooltip title="Model" placement="top">
                                                <span>
                                                    {result_model.model_alias ? result_model.model_alias : result_model.model_name}
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                        : <React.Fragment></React.Fragment>
                                }
                                <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ fontWeight: 'bold' }}>
                                    <Tooltip title="Model Version" placement="top">
                                        <span>
                                            {result_model.model_instances[model_inst_id].model_version}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                {
                                    // Not every model instance will have a result associated with every test instance (i.e. columns)
                                    // thus we need to fill in the results in the correct columns (corresponding to matching test instances)
                                    list_tests.map(function (test) {
                                        return dict_test_versions[test.test_id].map(function (test_inst) {
                                            if (Object.keys(result_model.model_instances[model_inst_id].tests).includes(test.test_id)
                                                && Object.keys(result_model.model_instances[model_inst_id].tests[test.test_id].test_instances).includes(test_inst.test_inst_id)) {
                                                return <ResultPerInstanceComboMT result_MTcombo={result_model.model_instances[model_inst_id].tests[test.test_id].test_instances[test_inst.test_inst_id].results}
                                                    handleResultEntryClick={handleResultEntryClick}
                                                    key={test_inst.test_inst_id} />
                                            } else {
                                                // no result for this combination of model instance and test instance
                                                return <TableCell colSpan={3} key={test_inst.test_inst_id}></TableCell>
                                            }
                                        })
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

class ResultEntryTest extends React.Component {
    render() {
        const result_test = this.props.result_entry;
        const list_models = this.props.list_models;
        const dict_model_versions = this.props.dict_model_versions;

        const handleResultEntryClick = this.props.handleResultEntryClick;
        if (result_test) {
            return (
                <React.Fragment>
                    {
                        Object.keys(result_test.test_instances).map((test_inst_id, index_tt) => (
                            <TableRow key={test_inst_id}>
                                {
                                    (index_tt === 0) ?
                                        <TableCell align="right" bgcolor={Theme.tableDataHeader} rowSpan={Object.keys(result_test.test_instances).length} style={{ fontWeight: 'bold' }}>
                                            <Tooltip title="Test" placement="top">
                                                <span>
                                                    {result_test.test_alias ? result_test.test_alias : result_test.test_name}
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                        : <React.Fragment></React.Fragment>
                                }
                                <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ fontWeight: 'bold' }}>
                                    <Tooltip title="Test Version" placement="top">
                                        <span>
                                            {result_test.test_instances[test_inst_id].test_version}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                {
                                    // Not every test instance will have a result associated with every model instance (i.e. columns)
                                    // thus we need to fill in the results in the correct columns (corresponding to matching model instances)
                                    list_models.map(function (model) {
                                        return dict_model_versions[model.model_id].map(function (model_inst) {
                                            if (Object.keys(result_test.test_instances[test_inst_id].models).includes(model.model_id)
                                                && Object.keys(result_test.test_instances[test_inst_id].models[model.model_id].model_instances).includes(model_inst.model_inst_id)) {
                                                return <ResultPerInstanceComboMT result_MTcombo={result_test.test_instances[test_inst_id].models[model.model_id].model_instances[model_inst.model_inst_id].results}
                                                    handleResultEntryClick={handleResultEntryClick}
                                                    key={model_inst.model_inst_id} />
                                            } else {
                                                // no result for this combination of test instance and model instance
                                                return <TableCell colSpan={3} key={model_inst.model_inst_id}></TableCell>
                                            }
                                        })
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

class CompareMultiResults extends React.Component {
    signal = axios.CancelToken.source();
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);
        const [authContext,] = this.context.auth;

        this.state = {
            model_dict: context.compareModels[0],
            test_dict: context.compareTests[0],
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
            resultDetailOpen: false,
            currentResult: null,
            tabValue: 0
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
        this.handleResultEntryClick = this.handleResultEntryClick.bind(this)
        this.handleResultDetailClose = this.handleResultDetailClose.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this);
        this.clearModels = this.clearModels.bind(this);
        this.clearTests = this.clearTests.bind(this);
    }

    handleTabChange(event, newValue) {
        this.setState({ tabValue: newValue })
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
        return datastore.getResultsByModelInstances(this.state.model_inst_ids)
            .then(results => {
                this.setState({
                    loadingResults: false,
                });
                console.log(results);
                return results;
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
        return datastore.getResultsByTestInstance(this.state.test_inst_ids, this.signal)
            .then(results => {
                this.setState({
                    loadingResults: false,
                });
                console.log(results);
                return results;
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
        } else {
            filtered_results = results;
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

    getModelVersions(results) {
        // Get list of all model versions in the specified results dict
        // Order these lists as required

        var list_models = []; // list of dicts, one dict per model (with key = model_id)
        var dict_model_versions = {}; // dict (with key = model_id) of lists of dicts, one list per model, one sub-dict per model instance (with key = model_instance_id)

        for (let result of results) {
            if (list_models.map(item => item.model_id).indexOf(result.model.id) === -1) {
                list_models.push({
                    model_id: result.model.id,
                    model_name: result.model.name,
                    model_alias: result.model.alias
                })
                dict_model_versions[result.model.id] = [];
            }

            if (dict_model_versions[result.model.id].map(item => item.model_inst_id).indexOf(result.model_instance.id) === -1) {
                dict_model_versions[result.model.id].push({
                    model_inst_id: result.model_instance.id,
                    model_version: result.model_instance.version,
                    timestamp: result.model_instance.timestamp
                })
            }
        }

        // sorting list_models by name/alias
        list_models.sort(function (a, b) {
            var t_a_display = a.model_alias ? a.model_alias : a.model_name;
            var t_b_display = b.model_alias ? b.model_alias : b.model_name;
            if (t_a_display < t_b_display) { return -1; }
            if (t_a_display > t_b_display) { return 1; }
            return 0;
        })

        // sorting list_model_versions within each model by timestamp, oldest to newest
        Object.keys(dict_model_versions).forEach(function (model_id) {
            var temp_sorted = {};
            dict_model_versions[model_id].sort(function (a, b) {
                var t_a_timestamp = a.timestamp;
                var t_b_timestamp = b.timestamp;
                if (t_a_timestamp < t_b_timestamp) { return -1; }
                if (t_a_timestamp > t_b_timestamp) { return 1; }
                return 0;
            })
                .forEach(function (key) {
                    temp_sorted = dict_model_versions[model_id];
                });
            dict_model_versions[model_id] = temp_sorted;
        })
        return [list_models, dict_model_versions]
    }

    getTestVersions(results) {
        // Get list of all test versions in the specified results dict
        // Order these lists as required

        var list_tests = []; // list of dicts, one dict per test (with key = test_id)
        var dict_test_versions = {}; // dict (with key = test_id) of lists of dicts, one list per test, one sub-dict per test instance (with key = test_instance_id)

        for (let result of results) {
            if (list_tests.map(item => item.test_id).indexOf(result.test.id) === -1) {
                list_tests.push({
                    test_id: result.test.id,
                    test_name: result.test.name,
                    test_alias: result.test.alias
                })
                dict_test_versions[result.test.id] = [];
            }

            if (dict_test_versions[result.test.id].map(item => item.test_inst_id).indexOf(result.test_instance.id) === -1) {
                dict_test_versions[result.test.id].push({
                    test_inst_id: result.test_instance.id,
                    test_version: result.test_instance.version,
                    timestamp: result.test_instance.timestamp
                })
            }
        }

        // sorting list_tests by name/alias
        list_tests.sort(function (a, b) {
            var t_a_display = a.test_alias ? a.test_alias : a.test_name;
            var t_b_display = b.test_alias ? b.test_alias : b.test_name;
            if (t_a_display < t_b_display) { return -1; }
            if (t_a_display > t_b_display) { return 1; }
            return 0;
        })

        // sorting list_test_versions within each test by timestamp, oldest to newest
        Object.keys(dict_test_versions).forEach(function (test_id) {
            var temp_sorted = {};
            dict_test_versions[test_id].sort(function (a, b) {
                var t_a_timestamp = a.timestamp;
                var t_b_timestamp = b.timestamp;
                if (t_a_timestamp < t_b_timestamp) { return -1; }
                if (t_a_timestamp > t_b_timestamp) { return 1; }
                return 0;
            })
                .forEach(function (key) {
                    temp_sorted = dict_test_versions[test_id];
                });
            dict_test_versions[test_id] = temp_sorted;
        })
        return [list_tests, dict_test_versions]
    }

    addEmptyResults(results_grouped) {
        // insert empty lists for (test_instance, model_instance) combos without results
        // handles output of groupResultsModelsCompare()
        // required only for compareShow === "all"

        let model_dict = this.state.model_dict;
        let test_dict = this.state.test_dict;

        // loop every model
        Object.keys(model_dict).forEach(function (m_key, index) {
            // console.log(m_key);
            // check if model exists in results
            if (!(m_key in results_grouped)) {
                results_grouped[m_key] = {
                    model_id: m_key,
                    model_name: model_dict[m_key].name,
                    model_alias: model_dict[m_key].alias,
                    model_instances: {}
                };
            }
            // loop every model instance
            Object.keys(model_dict[m_key].selected_instances).forEach(function (m_inst_key, index) {
                // console.log(m_inst_key);
                // check if model instance exists for this model in results
                if (!(m_inst_key in results_grouped[m_key]["model_instances"])) {
                    results_grouped[m_key]["model_instances"][m_inst_key] = {
                        model_inst_id: m_inst_key,
                        model_version: model_dict[m_key].selected_instances[m_inst_key].version,
                        timestamp: model_dict[m_key].selected_instances[m_inst_key].timestamp,
                        tests: {}
                    };
                }
                // loop every test
                Object.keys(test_dict).forEach(function (t_key, index) {
                    // console.log(t_key);
                    // check if test exists in results for this model instance
                    if (!(t_key in results_grouped[m_key]["model_instances"][m_inst_key]["tests"])) {
                        results_grouped[m_key]["model_instances"][m_inst_key]["tests"][t_key] = {
                            test_id: t_key,
                            test_name: test_dict[t_key].name,
                            test_alias: test_dict[t_key].alias,
                            test_instances: {}
                        };
                    }
                    // loop every test instance
                    Object.keys(test_dict[t_key].selected_instances).forEach(function (t_inst_key, index) {
                        // console.log(t_inst_key);
                        // check if test instance exists for this test in results
                        if (!(t_inst_key in results_grouped[m_key]["model_instances"][m_inst_key]["tests"][t_key]["test_instances"])) {
                            results_grouped[m_key]["model_instances"][m_inst_key]["tests"][t_key]["test_instances"][t_inst_key] = {
                                test_inst_id: t_inst_key,
                                test_version: test_dict[t_key].selected_instances[t_inst_key].version,
                                timestamp: test_dict[t_key].selected_instances[t_inst_key].timestamp,
                                results: []
                            };
                        }
                    })
                })
            })
        })
        return results_grouped;
    }

    groupResultsModelsCompare(results) {
        // will be a 4-D dict {model -> model instance -> test -> test instance} with list of results as values
        let dict_results = {}

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

    groupResultsTestsCompare(results) {
        // will be a 4-D dict {test -> test instance -> model -> model instance} with list of results as values
        let dict_results = {}

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
            // check if this model instance was already encountered
            if (!(result.model_instance_id in dict_results[result.test.id]["test_instances"][result.test_instance_id]["models"][result.model.id]["model_instances"])) {
                dict_results[result.test.id]["test_instances"][result.test_instance_id]["models"][result.model.id]["model_instances"][result.model_instance_id] = {
                    model_inst_id: result.model_instance_id,
                    model_version: result.model_instance.version,
                    timestamp: result.model_instance.timestamp,
                    results: []
                };
            }
            // add result to list of test instance results for above test instance
            dict_results[result.test.id]["test_instances"][result.test_instance_id]["models"][result.model.id]["model_instances"][result.model_instance_id]["results"].push(
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

        // sorting entries by model name/alias (whichever is displayed)
        Object.keys(dict_results).forEach(function (test_id) {
            Object.keys(dict_results[test_id]["test_instances"]).forEach(function (test_inst_id) {
                var temp_sorted = {};
                Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"]).sort(function (a, b) {
                    var t_a_display = dict_results[test_id]["test_instances"][test_inst_id]["models"][a].test_alias ? dict_results[test_id]["test_instances"][test_inst_id]["models"][a].test_alias : dict_results[test_id]["test_instances"][test_inst_id]["models"][a].test_name;
                    var t_b_display = dict_results[test_id]["test_instances"][test_inst_id]["models"][b].test_alias ? dict_results[test_id]["test_instances"][test_inst_id]["models"][b].test_alias : dict_results[test_id]["test_instances"][test_inst_id]["models"][b].test_name;
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

        // sorting model versions within test by timestamp, oldest to newest
        Object.keys(dict_results).forEach(function (test_id) {
            Object.keys(dict_results[test_id]["test_instances"]).forEach(function (test_inst_id) {
                Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"]).forEach(function (model_id) {
                    var temp_sorted = {};
                    Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"]).sort(function (a, b) {
                        var t_a_timestamp = dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][a].timestamp;
                        var t_b_timestamp = dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][b].timestamp;
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
                    Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"]).forEach(function (model_instance_id) {
                        dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_instance_id]["results"].sort(function (a, b) {
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

    renderModelsResultsSummaryTable(dict_results, list_tests, dict_test_versions) {
        console.log(dict_results);
        console.log(list_tests);
        console.log(dict_test_versions);
        return (
            <React.Fragment >
                <Grid container item direction="column">
                    <TableContainer>
                        <Table aria-label="spanning table" style={{ width: "auto", tableLayout: "auto", border: 2, borderColor: 'lightgrey', borderStyle: 'solid' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={2} rowSpan={2} bgcolor={Theme.tableRowSelectColor}>Model \ Validation Test</TableCell>
                                    {
                                        list_tests.map((test, index) => (
                                            <TableCell align="center" colSpan={dict_test_versions[test.test_id].length * 3} key={test.test_id} bgcolor={Theme.tableRowSelectColor}>
                                                <Tooltip title="Test" placement="top">
                                                    <span>
                                                        {test.test_alias || test.test_name}
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                                <TableRow>
                                    {
                                        list_tests.map((test, index) => (
                                            dict_test_versions[test.test_id].map((test_inst, index) => (
                                                <TableCell align="center" colSpan={3} key={test_inst.test_inst_id} bgcolor={Theme.tableHeader}>
                                                    <Tooltip title="Test Version" placement="top">
                                                        <span>
                                                            {test_inst.test_version}
                                                        </span>
                                                    </Tooltip>
                                                </TableCell>
                                            ))
                                        ))
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" bgcolor={Theme.tableHeader} style={{ width: 200, maxWidth: 200 }}>Model Name</TableCell>
                                    <TableCell align="center" bgcolor={Theme.tableHeader} style={{ width: 200, maxWidth: 200 }}>Model Version</TableCell>
                                    {
                                        list_tests.map((test, index) => (
                                            dict_test_versions[test.test_id].map((test_inst, index) => (
                                                <React.Fragment key={index}>
                                                    <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ width: 20, maxWidth: 20 }}></TableCell>
                                                    <TableCell align="right" bgcolor={Theme.tableDataHeader} style={{ width: 75, maxWidth: 75 }}>Score</TableCell>
                                                    <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ width: 200, maxWidth: 200 }}>Date (Time)</TableCell>
                                                </React.Fragment>
                                            ))
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(dict_results).map((model_id, index_m) => (
                                        <ResultEntryModel result_entry={dict_results[model_id]} list_tests={list_tests} dict_test_versions={dict_test_versions} handleResultEntryClick={this.handleResultEntryClick} key={model_id} />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </React.Fragment >
        )
    }

    renderTestsResultsSummaryTable(dict_results, list_models, dict_model_versions) {
        console.log(dict_results);

        return (
            <React.Fragment >
                <Grid container item direction="column">
                    <TableContainer>
                        <Table aria-label="spanning table" style={{ width: "auto", tableLayout: "auto", border: 2, borderColor: 'lightgrey', borderStyle: 'solid' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={2} rowSpan={2} bgcolor={Theme.tableRowSelectColor}>Validation Test \ Model</TableCell>
                                    {
                                        list_models.map((model, index) => (
                                            <TableCell align="center" colSpan={dict_model_versions[model.model_id].length * 3} key={model.model_id} bgcolor={Theme.tableRowSelectColor}>
                                                <Tooltip title="Model" placement="top">
                                                    <span>
                                                        {model.model_alias || model.model_name}
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                                <TableRow>
                                    {
                                        list_models.map((model, index) => (
                                            dict_model_versions[model.model_id].map((model_inst, index) => (
                                                <TableCell align="center" colSpan={3} key={model_inst.model_inst_id} bgcolor={Theme.tableHeader}>
                                                    <Tooltip title="Model Version" placement="top">
                                                        <span>
                                                            {model_inst.model_version}
                                                        </span>
                                                    </Tooltip>
                                                </TableCell>
                                            ))
                                        ))
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" bgcolor={Theme.tableHeader} style={{ width: 200, maxWidth: 200 }}>Test Name</TableCell>
                                    <TableCell align="center" bgcolor={Theme.tableHeader} style={{ width: 200, maxWidth: 200 }}>Test Version</TableCell>
                                    {
                                        list_models.map((model, index) => (
                                            dict_model_versions[model.model_id].map((model_inst, index) => (
                                                <React.Fragment key={index}>
                                                    <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ width: 20, maxWidth: 20 }}></TableCell>
                                                    <TableCell align="right" bgcolor={Theme.tableDataHeader} style={{ width: 75, maxWidth: 75 }}>Score</TableCell>
                                                    <TableCell align="center" bgcolor={Theme.tableDataHeader} style={{ width: 200, maxWidth: 200 }}>Date (Time)</TableCell>
                                                </React.Fragment>
                                            ))
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(dict_results).map((test_id, index_t) => (
                                        <ResultEntryTest result_entry={dict_results[test_id]} list_models={list_models} dict_model_versions={dict_model_versions} handleResultEntryClick={this.handleResultEntryClick} key={test_id} />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </React.Fragment >
        )
    }

    launchCompare() {
        let results = this.state.results;
        let required_results = [];
        console.log(this.state.compareShow);
        console.log(results);
        if (this.state.compareShow === "common_models") {
            let test_inst_ids = [];
            if (this.state.test_inst_ids.length === 0) {
                results.forEach(function(item) {
                    if (test_inst_ids.indexOf(item.test_instance_id) === -1) {
                        test_inst_ids.push(item.test_instance_id);
                    }
                });
            } else {
                test_inst_ids = this.state.test_inst_ids;
            }
            console.log(test_inst_ids)
            // filter to get test instances that exist in results for every model instance
            for (let t_inst_key of test_inst_ids) {
                console.log(t_inst_key);
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
                console.log(t_inst_for_m_inst);
                console.log(this.state.model_inst_ids);
                if (t_inst_for_m_inst.sort().toString() === this.state.model_inst_ids.sort().toString()) {
                    required_results = required_results.concat(t_inst_results)
                }
            }
        } else if (this.state.compareShow === "common_tests") {
            let model_inst_ids = [];
            if (this.state.model_inst_ids.length === 0) {
                results.forEach(function(item) {
                    if (model_inst_ids.indexOf(item.model_instance_id) === -1) {
                        model_inst_ids.push(item.model_instance_id);
                    }
                });
            } else {
                model_inst_ids = this.state.model_inst_ids;
            }
            console.log(model_inst_ids)
            // filter to get model instances that exist in results for every test instance
            for (let m_inst_key of model_inst_ids) {
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
                console.log(m_inst_for_t_inst);
                console.log(this.state.test_inst_ids);
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

        // render tables and figures for the selected results
        var content_table = "";
        var content_figures = "";
        var content_summary = "";

        if (required_results.length === 0) {
            content_table = this.renderNoResults();
            content_figures = this.renderNoResults();
            content_summary = this.renderNoResults();
        } else {
            let results_grouped = null;
            if (this.state.compareShow === "common_tests") {
                const [list_models, dict_model_versions] = this.getModelVersions(required_results);
                results_grouped = this.groupResultsTestsCompare(required_results);
                console.log(results_grouped);
                content_table = this.renderTestsResultsSummaryTable(results_grouped, list_models, dict_model_versions);
            } else {
                // case for this.state.compareShow = "common_models" or "all"
                const [list_tests, dict_test_versions] = this.getTestVersions(required_results);
                results_grouped = this.groupResultsModelsCompare(required_results);
                console.log(results_grouped);
                if (this.state.compareShow === "all") {
                    // insert empty entries for (model_instance, test_instance) combos without results - only for compareShow === "all"
                    results_grouped = this.addEmptyResults(results_grouped)
                }
                console.log(results_grouped);
                content_table = this.renderModelsResultsSummaryTable(results_grouped, list_tests, dict_test_versions);
            }
            content_figures = <ResultGraphs
                results={required_results}
                loadingResult={false}
            />
            content_summary = <CompareMultiGraphs
                results={required_results}
            />
        }
        return [content_table, content_figures, content_summary];
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
        let results = this.state.results;

        if (Object.keys(model_dict).includes(m_key)) {
            if (Object.keys(model_dict[m_key].selected_instances).includes(m_inst_key)) {
                delete model_dict[m_key].selected_instances[m_inst_key]
                if (Object.keys(model_dict[m_key].selected_instances).length === 0) {
                    delete model_dict[m_key]
                    if (this.state.open_models.indexOf(m_key) > -1) {
                        this.setState({ open_models: this.state.open_models.filter(item => item !== m_key) })
                    }
                }
                results = results.filter(function (result) { return result.model_instance.id !== m_inst_key; });
                this.setState({
                    model_dict: model_dict,
                    results: results
                    // compareShow: false
                })
                this.evalModelDict().then(() => {
                    if (Object.keys(model_dict).length === 0) {
                        if (this.state.compareShow === "models") {
                            this.setState({ compareShow: false })
                        }
                        if (Object.keys(this.state.test_dict).length > 0) {
                            this.fetchResults()
                        } else {
                            this.setState({ compareShow: false })
                        }
                    }
                });
            }
        }
    }

    handleTestDeleteClick(t_key, t_inst_key) {
        let test_dict = this.state.test_dict;
        let results = this.state.results;

        if (Object.keys(test_dict).includes(t_key)) {
            if (Object.keys(test_dict[t_key].selected_instances).includes(t_inst_key)) {
                delete test_dict[t_key].selected_instances[t_inst_key]
                if (Object.keys(test_dict[t_key].selected_instances).length === 0) {
                    delete test_dict[t_key]
                    if (this.state.open_tests.indexOf(t_key) > -1) {
                        this.setState({ open_tests: this.state.open_tests.filter(item => item !== t_key) })
                    }
                }
                results = results.filter(function (result) { return result.test_instance.id !== t_inst_key; });
                this.setState({
                    test_dict: test_dict,
                    results: results
                    // compareShow: false
                })
                this.evalTestDict().then(() => {
                    if (Object.keys(test_dict).length === 0) {
                        if (this.state.compareShow === "tests") {
                            this.setState({ compareShow: false })
                        }
                        if (Object.keys(this.state.model_dict).length > 0) {
                            this.fetchResults()
                        } else {
                            this.setState({ compareShow: false })
                        }
                    }
                });
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

    clearModels() {
        let model_dict = this.state.model_dict;
        let results = this.state.results;

        Object.keys(model_dict).forEach(function (m_key) {
            Object.keys(model_dict[m_key].selected_instances).forEach(function (m_inst_key) {
                delete model_dict[m_key].selected_instances[m_inst_key]
                results = results.filter(function (result) { return result.model_instance.id !== m_inst_key; });
            })
            delete model_dict[m_key]
        })

        this.setState({
            model_dict: model_dict,
            results: results,
            compareShow: false,
            loadingResults: false
        })
        this.evalModelDict().then(() => {
            if (Object.keys(model_dict).length === 0) {
                this.fetchResults()
            }
        });
    }

    clearTests() {
        let test_dict = this.state.test_dict;
        let results = this.state.results;

        Object.keys(test_dict).forEach(function (t_key) {
            Object.keys(test_dict[t_key].selected_instances).forEach(function (t_inst_key) {
                delete test_dict[t_key].selected_instances[t_inst_key]
                results = results.filter(function (result) { return result.test_instance.id !== t_inst_key; });
            })
            delete test_dict[t_key]
        })

        this.setState({
            test_dict: test_dict,
            results: results,
            compareShow: false,
            loadingResults: false
        })
        this.evalTestDict().then(() => {
            if (Object.keys(test_dict).length === 0) {
                this.fetchResults()
            }
        });
    }

    render() {
        var content_table = "";
        var content_figures = "";
        var content_summary = "";
        var resultDetail = "";

        console.log(this.state.model_inst_ids)
        console.log(this.state.test_inst_ids)
        console.log(this.state.results)

        if (this.state.loadingResults && this.state.compareShow) {
            content_table = <Grid item xs={12} align="center"><LoadingIndicator position="relative" /></Grid>
            content_figures = <Grid item xs={12} align="center"><LoadingIndicator position="relative" /></Grid>
            content_summary = <Grid item xs={12} align="center"><LoadingIndicator position="relative" /></Grid>
        } else if (this.state.compareShow) {
            [content_table, content_figures, content_summary] = this.launchCompare();
        }

        if (this.state.currentResult) {
            resultDetail = <ResultDetail open={this.state.resultDetailOpen} result={this.state.currentResult} onClose={this.handleResultDetailClose} />;
        } else {
            resultDetail = "";
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
                                    {
                                        (this.state.total_model_insts !== 0) &&
                                        <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: 15, marginBottom: 10 }}>
                                            <Button disabled={this.state.total_model_insts === 0} variant="contained" style={{ backgroundColor: Theme.disabledColor, width: "225px" }} onClick={this.clearModels}>
                                                Clear Models
								        </Button>
                                        </Box>
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
                                    {
                                        (this.state.total_test_insts !== 0) &&
                                        <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: 15, marginBottom: 10 }}>
                                            <Button disabled={this.state.total_test_insts === 0} variant="contained" style={{ backgroundColor: Theme.disabledColor, width: "225px" }} onClick={this.clearTests}>
                                                Clear Tests
								        </Button>
                                        </Box>
                                    }
                                </Grid>

                            </Grid>
                        </Grid>
                        {
                            (this.state.total_model_insts === 0 && this.state.total_test_insts === 0)
                            &&
                            <Grid container spacing={3}>
                                <Grid item xs={12} align="center">
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
                                        <Button disabled={(this.state.compareShow === "common_models") || (this.state.total_model_insts === 0)} variant="contained" style={{ backgroundColor: Theme.buttonSecondary, width: "225px" }} onClick={() => this.setCompare("common_models")}>
                                            Compare Models
								        </Button>
                                        <Button disabled={(this.state.compareShow === "common_tests") || (this.state.total_test_insts === 0)} variant="contained" style={{ backgroundColor: Theme.buttonSecondary, width: "225px" }} onClick={() => this.setCompare("common_tests")}>
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
                            <Grid container spacing={3} style={{ marginTop: "25px" }}>
                                <Grid item xs={12} align="center">
                                    <AppBar position="static">
                                        <Tabs value={this.state.tabValue} onChange={this.handleTabChange} centered indicatorColor="secondary"
                                            style={{ backgroundColor: Theme.tableRowSelectColor, color: Theme.textPrimary }} >
                                            <Tab label="Table" />
                                            <Tab label="Figures" />
                                            <Tab label="Summary" />
                                        </Tabs>
                                    </AppBar>
                                    <TabPanel value={this.state.tabValue} index={0}>
                                        {content_table}
                                    </TabPanel>
                                    <TabPanel value={this.state.tabValue} index={1}>
                                        {content_figures}
                                    </TabPanel>
                                    <TabPanel value={this.state.tabValue} index={2}>
                                        {content_summary}
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        }
                        <div>
                            {resultDetail}
                        </div>
                    </Grid>
                </DialogContent>
            </Dialog >
        );
    }
}

export default withSnackbar(CompareMultiResults);
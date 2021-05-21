import React from 'react';
import { hot } from 'react-hot-loader/root'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import _ from 'lodash';

import { datastore } from "./datastore";
import ModelTable from "./ModelTable";
import TestTable from "./TestTable";
import ModelDetail from "./ModelDetail";
import TestDetail from "./TestDetail";
import CompareMultiResults from "./CompareMultiResults";
import ModelAddForm from "./ModelAddForm";
import TestAddForm from "./TestAddForm";
import ConfigForm from "./ConfigForm";
import Introduction from "./Introduction";
//import ConfigDisplayTop from "./ConfigDisplayTop"
import ConfigDisplayTop from "./ConfigDisplaySimple"
import LoadingIndicator from "./LoadingIndicator"
import ResultDetail from './ResultDetail';
import ErrorDialog from './ErrorDialog';
import { DevMode, collaboratoryOrigin, updateSettingsTopic, isFramedApp, settingsDelimiter, filterKeys, filterModelKeys, filterTestKeys, displayValid, queryValid, updateHash } from "./globals";
import { isUUID, showNotification } from './utils'
import ContextMain from './ContextMain';
import Theme from './theme';
import { withSnackbar } from 'notistack';

// if working on the appearance/layout set globals.DevMode=true
// to avoid loading the models and tests over the network every time;
// instead we use the local sample_data_models and sample_data_tests files
var sample_model_data = {}
var sample_test_data = {}
if (DevMode) {
    sample_model_data = require('./dev_data/sample_data_models.json');
    sample_test_data = require('./dev_data/sample_data_tests.json');
    }



const filtersEmpty = (filterDict) => {
    // return true if no filters are set
    let is_empty = true;
    for (var key in filterDict) {
        if (filterDict[key].length > 0) {
            is_empty = false;
        }
    };
    return is_empty;
};

const storeSettings = (filterDict, display) => {
    // todo: also store table column settings}
    if (isFramedApp) {
        let data = {};
        for (let key of filterKeys) {
            if (key in filterDict) {
                data[key] = filterDict[key].join(settingsDelimiter);
            }
        }
        data["display"] = display;
        data["reload"] = false;
        window.parent.postMessage(
            {
                topic: updateSettingsTopic,
                data: data
            },
            collaboratoryOrigin);
        console.log("Stored filter and display settings");

    }
};

const retrieveFilters = (context) => {
    const searchParams = new URLSearchParams(window.location.search);
    let filters = {};
    for (let key of filterKeys) {
        let param = searchParams.get(key);
        if (param) {
            filters[key] = param.split(settingsDelimiter);
        } else {
            filters[key] = [];
        }
    }

    const [, setContextFilters] = context.filters;
    setContextFilters(filters);
    return filters;
}

const retrieveDisplay = () => {
    const searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get("display");
    if (displayValid.includes(param)) {
        return param;
    } else {
        return displayValid[1]; //"Models and Tests"
    }
}

class ValidationFramework extends React.Component {
    signal = axios.CancelToken.source();
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);

        this.state = {
            'modelData': [],
            'testData': [],
            'currentModel': null,
            'currentTest': null,
            'currentResult': null,
            'modelDetailOpen': false,
            'testDetailOpen': false,
            'resultDetailOpen': false,
            'compareResultsOpen': false,
            'addModelFormOpen': false,
            'addTestFormOpen': false,
            'configOpen': false,
            'loadingOpen': false,
            'loadingModel': true,
            'loadingTest': true,
            'errorUpdate': null,
            'errorGet': null,
            'filters': retrieveFilters(context),
            'display': retrieveDisplay(),
            'modelsTableWide': false,
            'testsTableWide': false,
            'modelsTableColumns': [
                { name: 'ID', options: { display: false } },
                { name: 'Name', options: { display: true } },
                { name: 'Alias', options: { display: false } },
                { name: 'Author', options: { display: true } },
                { name: 'Visibility', options: { display: false } },
                { name: 'Project ID', options: { display: false } },
                { name: 'Species', options: { display: false } },
                { name: 'Brain region', options: { display: false } },
                { name: 'Cell type', options: { display: false } },
                { name: 'Model scope', options: { display: false } },
                { name: 'Abstraction level', options: { display: false } },
                { name: 'Owner', options: { display: false } },
                { name: 'Organization', options: { display: false } },
                { name: 'Created Date', options: { display: false } },
                { name: 'jsonObject', options: { display: false, viewColumns: false, filter: false } }
            ],
            'testsTableColumns': [
                { name: 'ID', options: { display: false } },
                { name: 'Name', options: { display: true } },
                { name: 'Alias', options: { display: false } },
                { name: 'Author', options: { display: true } },
                { name: 'Status', options: { display: false } },
                { name: 'Species', options: { display: false } },
                { name: 'Brain region', options: { display: false } },
                { name: 'Cell type', options: { display: false } },
                { name: 'Test type', options: { display: false } },
                { name: 'Score type', options: { display: false } },
                { name: 'Data type', options: { display: false } },
                { name: 'Data modality', options: { display: false } },
                { name: 'Data location', options: { display: false } },
                { name: 'Created date', options: { display: false } },
                { name: 'jsonObject', options: { display: false, viewColumns: false, filter: false } }
            ]
        };
        if (DevMode) {
            this.state['modelData'] = sample_model_data.models
            this.state['testData'] = sample_test_data.tests
            this.state['loadingModel'] = false
            this.state['loadingTest'] = false
        }
        this.handleModelDetailClose = this.handleModelDetailClose.bind(this);
        this.handleTestDetailClose = this.handleTestDetailClose.bind(this);
        this.handleResultDetailClose = this.handleResultDetailClose.bind(this);
        this.handleModelRowClick = this.handleModelRowClick.bind(this);
        this.handleTestRowClick = this.handleTestRowClick.bind(this);
        this.openConfig = this.openConfig.bind(this);
        this.handleConfigClose = this.handleConfigClose.bind(this);
        this.handleErrorGetDialogClose = this.handleErrorGetDialogClose.bind(this);
        this.handleErrorUpdateDialogClose = this.handleErrorUpdateDialogClose.bind(this);
        this.updateModels = this.updateModels.bind(this);
        this.updateTests = this.updateTests.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getModelFromInstance = this.getModelFromInstance.bind(this);
        this.getTest = this.getTest.bind(this);
        this.getTestFromInstance = this.getTestFromInstance.bind(this);
        this.modelTableFullWidth = this.modelTableFullWidth.bind(this);
        this.testTableFullWidth = this.testTableFullWidth.bind(this);
        this.openCompareResults = this.openCompareResults.bind(this);
        this.closeCompareResults = this.closeCompareResults.bind(this);
        this.openAddModelForm = this.openAddModelForm.bind(this);
        this.openAddTestForm = this.openAddTestForm.bind(this);
        this.handleAddModelFormClose = this.handleAddModelFormClose.bind(this);
        this.handleAddTestFormClose = this.handleAddTestFormClose.bind(this);
        this.updateCurrentModel= this.updateCurrentModel.bind(this);
        this.handleAddModelInstance = this.handleAddModelInstance.bind(this);
        this.handleEditModelInstance = this.handleEditModelInstance.bind(this);
        this.updateCurrentTest= this.updateCurrentTest.bind(this);
        this.handleAddTestInstance = this.handleAddTestInstance.bind(this);
        this.handleEditTestInstance = this.handleEditTestInstance.bind(this);
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
    }

    modelTableFullWidth() {
        this.setState({
            modelsTableWide: !this.state.modelsTableWide
        });
    }

    testTableFullWidth() {
        this.setState({
            testsTableWide: !this.state.testsTableWide
        });
    }

    handleColumnsChange(key, columnName, action) {

        let newColumns = [...this.state[key]];
        newColumns.forEach((col) => {
            if (col.name === columnName) {
                col.options.display = (action === 'add');
            }
        });
        this.setState({key: newColumns})
    }

    openCompareResults() {
        this.setState({ 'compareResultsOpen': true })
    }

    closeCompareResults() {
        this.setState({ 'compareResultsOpen': false })
    }

    openAddModelForm() {
        this.setState({ 'addModelFormOpen': true })
    };

    openAddTestForm() {
        this.setState({ 'addTestFormOpen': true })
    };

    handleAddModelFormClose(currentModel) {
        console.log("close add")

        this.setState({ 'addModelFormOpen': false });
        if (currentModel) {
            let models = this.state.modelData;

            models.unshift(currentModel);
            this.setState({
                modelData: models,
                currentModel: currentModel,
                modelDetailOpen: true
            });
            updateHash("model_id." + currentModel.id);
            showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Model has been added!", "info")
        }
    }

    updateCurrentModel(updatedModel) {
        let updatedModelData = [...this.state.modelData];
        for (let i = 0; i < updatedModelData.length; i++) {
            if (updatedModelData[i].id === updatedModel.id) {
                updatedModelData[i] = updatedModel;
                break;
            }
        }


        this.setState({
            modelData: updatedModelData,
            currentModel: updatedModel
        });
    }

    handleAddModelInstance(newModelInstance) {
        let updatedCurrentModel = this.state.currentModel; // need to copy?
        updatedCurrentModel.instances.push(newModelInstance);
        this.updateCurrentModel(updatedCurrentModel);
    }

    handleEditModelInstance(updatedModelInstance) {
        let updatedCurrentModel = this.state.currentModel;
        for (let i = 0; i < updatedCurrentModel.instances.length; i++) {
            if (updatedCurrentModel.instances[i].id === updatedModelInstance.id) {
                updatedCurrentModel.instances[i] = updatedModelInstance;
            }
        }
        this.updateCurrentModel(updatedCurrentModel);
    }

    handleAddTestFormClose(currentTest) {
        console.log("close add")

        this.setState({ 'addTestFormOpen': false });
        if (currentTest) {
            let tests = this.state.testData;

            tests.unshift(currentTest);
            this.setState({
                testData: tests,
                currentTest: currentTest,
                testDetailOpen: true
            });
            updateHash("test_id." + currentTest.id);
            showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Test has been added!", "info")
        }
    }

    updateCurrentTest(updatedTest) {
        let updatedTestData = [...this.state.testData];
        for (let i = 0; i < updatedTestData.length; i++) {
            if (updatedTestData[i].id === updatedTest.id) {
                updatedTestData[i] = updatedTest;
                break;
            }
        }


        this.setState({
            testData: updatedTestData,
            currentTest: updatedTest
        });
    }

    handleAddTestInstance(newTestInstance) {
        let updatedCurrentTest = this.state.currentTest; // need to copy?
        updatedCurrentTest.instances.push(newTestInstance);
        this.updateCurrentTest(updatedCurrentTest);
    }

    handleEditTestInstance(updatedTestInstance) {
        let updatedCurrentTest = this.state.currentTest;
        for (let i = 0; i < updatedCurrentTest.instances.length; i++) {
            if (updatedCurrentTest.instances[i].id === updatedTestInstance.id) {
                updatedCurrentTest.instances[i] = updatedTestInstance;
            }
        }
        this.updateCurrentTest(updatedCurrentTest);
    }

    componentDidMount() {
        document.body.style.backgroundColor = Theme.bodyBackground;
        const token = this.props.auth.tokenParsed;


        const [, setAuthContext] = this.context.auth;
        setAuthContext(this.props.auth)

        datastore.getValidFilterValues()
            .then(vocab => {
                console.log("Retrieved valid filter values");
                const [, setContextValidFilterValues] = this.context.validFilterValues;
                setContextValidFilterValues(vocab);
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('Error: ', err.message);
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    this.setState({
                        error: err
                    });
                }
            }
        );

        this.props.auth.loadUserInfo()
            .success(() => {
                const userInfo = this.props.auth.userInfo;

            })
            .error(console.log);

        if (window.location.hash) {
            let proceed = true;
            const param = window.location.hash.slice(1);
            const key = param.split(".")[0]
            const value = param.substr(param.indexOf('.') + 1)
            let error_message = ""

            if (!queryValid.includes(key)) {
                error_message = "URL query parameter must be one of the following:\n" + queryValid.join(", ");
                this.setState({ errorGet: error_message });
                proceed = false;
                updateHash('');
            }
            if (proceed && key.endsWith("_id") && !isUUID(value)) {
                error_message = "Value for query parameter '" + key + "' is not a valid UUID.\n Value: (" + value + ")";
                this.setState({ errorGet: error_message });
                proceed = false;
                updateHash('');
            }
            if (proceed) {
                this.setState({ loadingOpen: true });
                if (key.startsWith("model")) {
                    // get a specific model
                    if (key === "model_instance_id") {
                        this.getModelFromInstance(value);
                    } else {
                        this.getModel(key, value);
                    }
                } else if (key.startsWith("test")) {
                    // get a specific test
                    if (key === "test_instance_id") {
                        this.getTestFromInstance(value);
                    } else {
                        this.getTest(key, value);
                    }
                } else if (key === "result_id") {
                    // get a specific result
                    this.getResult(key, value);
                }
            }
        }
        if (!DevMode) {
            if (this.state.display !== "Only Tests") {
                this.updateModels(this.state.filters);
            }
            if (this.state.display !== "Only Models") {
                this.updateTests(this.state.filters);
            }
        }
    }

    componentWillUnmount() {
        this.signal.cancel('REST API call canceled!');
    }

    getModel(key, value) {
        let identifier = "";
        if (key === "model_id") {
            identifier = value;
        } else if (key === "model_alias") {
            identifier = encodeURI(value);
        }
        datastore.getModel(identifier, this.signal)
            .then(model => {
                this.setState({
                    currentModel: model,
                    loadingOpen: false,
                    errorGet: null,
                    modelDetailOpen: true
                });
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('errorGet: ', err.message);
                    this.setState({
                        loadingOpen: false,
                    });
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    let error_message = "";
                    try {
                        error_message = err.response.data.detail;
                    } catch {
                        error_message = err
                    }
                    this.setState({
                        loadingOpen: false,
                        errorGet: error_message
                    });
                }
                updateHash('');
            }
            );
    };

    getModelFromInstance(value) {
        datastore.getModelInstanceFromID(value, this.signal)
            .then(res => {
                datastore.getModel(encodeURI(res.data.model_id), this.signal)
                    .then(model => {
                        this.setState({
                            currentModel: model,
                            loadingOpen: false,
                            errorGet: null,
                            modelDetailOpen: true
                        });
                        updateHash('model_id.' + model.id);
                    })
                    .catch(err => {
                        if (axios.isCancel(err)) {
                            console.log('errorGet: ', err.message);
                            this.setState({
                                loadingOpen: false,
                            });
                        } else {
                            // Something went wrong. Save the error in state and re-render.
                            let error_message = "";
                            try {
                                error_message = err.response.data.detail;
                            } catch {
                                error_message = err
                            }
                            this.setState({
                                loadingOpen: false,
                                errorGet: error_message
                            });
                        }
                        updateHash('');
                    }
                    );
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('errorGet: ', err.message);
                    this.setState({
                        loadingOpen: false,
                    });
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    let error_message = "";
                    try {
                        error_message = err.response.data.detail;
                    } catch {
                        error_message = err
                    }
                    this.setState({
                        loadingOpen: false,
                        errorGet: error_message
                    });
                }
                updateHash('');
            }
            );
    };

    getTest(key, value) {
        let identifier = "";
        if (key === "test_id") {
            identifier = value;
        } else if (key === "test_alias") {
            identifier = encodeURI(value);
        }
        datastore.getTest(identifier, this.signal)
            .then(test => {
                this.setState({
                    currentTest: test,
                    loadingOpen: false,
                    errorGet: null,
                    testDetailOpen: true
                });
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('errorGet: ', err.message);
                    this.setState({
                        loadingOpen: false,
                    });
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    let error_message = "";
                    try {
                        error_message = err.response.data.detail;
                    } catch {
                        error_message = err
                    }
                    this.setState({
                        loadingOpen: false,
                        errorGet: error_message
                    });
                }
                updateHash('');
            }
            );
    };

    getTestFromInstance(value) {
        datastore.getTestInstanceFromID(encodeURI(value), this.signal)
            .then(res => {
                datastore.getTest(encodeURI(res.data.test_id), this.signal)
                    .then(test => {
                        this.setState({
                            currentTest: test,
                            loadingOpen: false,
                            errorGet: null,
                            testDetailOpen: true
                        });
                        updateHash('test_id.'+test.id);
                    })
                    .catch(err => {
                        if (axios.isCancel(err)) {
                            console.log('errorGet: ', err.message);
                            this.setState({
                                loadingOpen: false,
                            });
                        } else {
                            // Something went wrong. Save the error in state and re-render.
                            let error_message = "";
                            try {
                                error_message = err.response.data.detail;
                            } catch {
                                error_message = err
                            }
                            this.setState({
                                loadingOpen: false,
                                errorGet: error_message
                            });
                        }
                        updateHash('');
                    }
                    );
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('errorGet: ', err.message);
                    this.setState({
                        loadingOpen: false,
                    });
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    let error_message = "";
                    try {
                        error_message = err.response.data.detail;
                    } catch {
                        error_message = err
                    }
                    this.setState({
                        loadingOpen: false,
                        errorGet: error_message
                    });
                }
                updateHash('');
            }
            );
    };

    getResult(key, value) {
        return datastore.getResult(value, this.signal)
            .then(result => {
                this.setState({
                    currentResult: result,
                    loadingOpen: false,
                    errorGet: null,
                    resultDetailOpen: true
                });
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('errorGet: ', err.message);
                    this.setState({
                        loadingOpen: false,
                    });
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    let error_message = "";
                    try {
                        error_message = err.response.data.detail;
                    } catch {
                        error_message = err
                    }
                    this.setState({
                        loadingOpen: false,
                        errorGet: error_message
                    });
                }
                updateHash('');
            }
            );
    };

    updateModels(filters) {
        if (filtersEmpty(filters)) {
            this.setState({
                modelData: [],
                loadingModel: false,
                errorUpdate: null
            });
        } else {
            this.setState({ loadingModel: true });
            datastore.queryModels(filters, this.signal)
                .then(models => {

                    this.setState({
                        modelData: models,
                        loadingModel: false,
                        errorUpdate: null
                    });
                })
                .catch(err => {
                    if (axios.isCancel(err)) {
                        console.log('errorUpdate: ', err.message);
                    } else {
                        // Something went wrong. Save the error in state and re-render.
                        this.setState({
                            loadingModel: false,
                            errorUpdate: err
                        });
                    }
                }
                );
        };
    };

    updateTests(filters) {
        if (filtersEmpty(filters)) {
            this.setState({
                testData: [],
                loadingTest: false,
                errorUpdate: null
            });
        } else {
            this.setState({ loadingTest: true });
            datastore.queryTests(filters, this.signal)
                .then(tests => {

                    this.setState({
                        testData: tests,
                        loadingTest: false,
                        errorUpdate: null
                    });
                })
                .catch(err => {
                    if (axios.isCancel(err)) {
                        console.log('errorUpdate: ', err.message);
                    } else {
                        // Something went wrong. Save the error in state and re-render.
                        this.setState({
                            loadingTest: false,
                            errorUpdate: err
                        });
                    }
                }
                );
        };
    };

    handleModelRowClick(rowData, rowMeta) {
        // Note: last element of MUIDataTable (in ModelTable.js) is set to json Object of entry
        this.setState({ 'currentModel': rowData[rowData.length - 1] });
        this.setState({ 'modelDetailOpen': true });
        updateHash("model_id." + rowData[0]);
    };

    handleModelDetailClose() {
        this.setState({ 'currentModel': null });
        this.setState({ 'modelDetailOpen': false });
        updateHash('');
    };

    handleTestRowClick(rowData, rowMeta) {
        // Note: last element of MUIDataTable (in TestTable.js) is set to json Object of entry
        this.setState({ 'currentTest': rowData[rowData.length - 1] });
        this.setState({ 'testDetailOpen': true });
        updateHash("test_id." + rowData[0]);
    };

    handleTestDetailClose() {
        this.setState({ 'currentTest': null });
        this.setState({ 'testDetailOpen': false });
        updateHash('');
    };

    handleResultDetailClose() {
        this.setState({ 'currentResult': null });
        this.setState({ 'resultDetailOpen': false });
        updateHash('');
    };

    openConfig() {
        this.setState({ 'configOpen': true })
    };

    handleConfigClose(display, filters, cancel = false) {
        if (cancel) {
            this.setState({ 'configOpen': false });
            return
        }

        let modelFilters = {};
        filterModelKeys.forEach(function (key, index) {
            modelFilters[key] = filters[key]
        });

        let update_model_flag = null; // 3 states: null : needs changes, pending; false: no changes needed; true: changes made
        if (_.isMatch(this.state.filters, modelFilters)) {
            update_model_flag = false;
        }

        let testFilters = {};
        filterTestKeys.forEach(function (key, index) {
            testFilters[key] = filters[key];
        });

        let update_test_flag = null; // 3 states: null : needs changes, pending; false: no changes needed; true: changes made
        if (_.isMatch(this.state.filters, testFilters)) {
            update_test_flag = false;
        }




        let update_settings = false;

        if (update_model_flag === null || update_test_flag === null) {
            update_settings = true;
            this.setState({ 'filters': filters });

            if (update_model_flag === null && display !== "Only Tests") {
                update_model_flag = true;
                this.updateModels(modelFilters);
            }
            if (update_test_flag === null && display !== "Only Models") {
                update_test_flag = true;
                this.updateTests(testFilters);
            }
            showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "App config updated!", "success")
        }



        if (display !== this.state.display) { // compare new (display) with existing (this.state.display)
            update_settings = true;
            // if model changes made above, no need to do again
            if ((!update_model_flag) && (this.state.display === "Only Tests")) {
                this.updateModels(modelFilters);
            }
            // if test changes made above, no need to do again
            if ((!update_test_flag) && (this.state.display === "Only Models")) {
                this.updateTests(testFilters);
            }
            this.setState({ 'display': display });
            this.setState({ modelsTableWide: false });
            this.setState({ testsTableWide: false });
        }

        if (update_settings) {
            storeSettings(filters, display);
        }
        this.setState({ 'configOpen': false });
    };

    handleErrorGetDialogClose() {
        this.setState({ 'errorGet': null });
    };

    handleErrorUpdateDialogClose() {
        this.setState({ 'errorUpdate': null });
    };

    renderLoading() {
        return (
            <Paper style={{ padding: '0 0 0 16px' }}>
                <br />
                <Typography variant="h6">Loading...</Typography>
                <LoadingIndicator />
                <br /><br />
            </Paper>
        )
    }

    renderTables() {
        let model_table = <React.Fragment>
            {this.state.loadingModel ?
                <Paper style={{ padding: '0 0 0 16px' }}>
                    <br />
                    <Typography variant="h6">Models</Typography>
                    <LoadingIndicator />
                    <br /><br />
                </Paper>
                :
                <ModelTable
                    modelData={this.state.modelData}
                    display={this.state.display}
                    changeTableWidth={this.modelTableFullWidth}
                    openCompareResults={this.openCompareResults}
                    openAddModelForm={this.openAddModelForm}
                    handleRowClick={this.handleModelRowClick}
                    columns={this.state.modelsTableColumns}
                    onColumnsChange={(columnName, action) => this.handleColumnsChange('modelsTableColumns', columnName, action)}
                />
            }
        </React.Fragment>

        let test_table = <React.Fragment>
            {this.state.loadingTest ?
                <Paper style={{ padding: '0 0 0 16px' }}>
                    <br />
                    <Typography variant="h6">Tests</Typography>
                    <LoadingIndicator />
                    <br /><br />
                </Paper>
                :
                <TestTable
                    testData={this.state.testData} display={this.state.display}
                    changeTableWidth={this.testTableFullWidth}
                    openCompareResults={this.openCompareResults}
                    openAddTestForm={this.openAddTestForm}
                    handleRowClick={this.handleTestRowClick}
                    columns={this.state.testsTableColumns}
                    onColumnsChange={(columnName, action) => this.handleColumnsChange('testsTableColumns', columnName, action)}
                />
            }
        </React.Fragment>

        let content = "";
        if ((this.state.modelsTableWide && !this.state.testsTableWide) || (this.state.display === "Only Models")) {
            content = <Grid container>
                <Grid item xs={12}>
                    {model_table}
                </Grid>
            </Grid>
        } else if ((!this.state.modelsTableWide && this.state.testsTableWide) || (this.state.display === "Only Tests")) {
            content = <Grid container>
                <Grid item xs={12}>
                    {test_table}
                </Grid>
            </Grid>
        } else {
            content = <Grid container spacing={2}>
                <Grid item xs={6}>
                    {model_table}
                </Grid>
                <Grid item xs={6}>
                    {test_table}
                </Grid>
            </Grid>
        }
        return (
            <div>
                {content}
            </div>
        );
    }

    renderValidationFramework() {
        var configContent = "";
        var mainContent = "";
        var modelDetail = "";
        var testDetail = "";
        var resultDetail = "";
        var compareResults = "";
        var addModel = "";
        var addTest = "";

        if (this.state.loadingOpen) {
            return this.renderLoading();
        }
        if (this.state.errorGet) {
            return <ErrorDialog open={Boolean(this.state.errorGet)} handleErrorDialogClose={this.handleErrorGetDialogClose} error={this.state.errorGet.message || this.state.errorGet} />
        }
        if (this.state.errorUpdate) {
            return <ErrorDialog open={Boolean(this.state.errorUpdate)} handleErrorDialogClose={this.handleErrorUpdateDialogClose} error={this.state.errorUpdate.message || this.state.errorUpdate} />
        }
        if (filtersEmpty(this.state.filters)) {
            configContent = "";
            mainContent = <Introduction />;
        } else {
            configContent = <ConfigDisplayTop display={this.state.display} filters={this.state.filters} />
            mainContent = this.renderTables();
        }

        if (this.state.currentModel) {// && this.state.display!=="Only Tests") {
            modelDetail = <ModelDetail open={this.state.modelDetailOpen}
                                       modelData={this.state.currentModel}
                                       onClose={this.handleModelDetailClose}
                                       auth={this.props.auth}
                                       updateCurrentModelData={this.updateCurrentModel}
                                       onAddModelInstance={this.handleAddModelInstance}
                                       onEditModelInstance={this.handleEditModelInstance} />;
        }

        if (this.state.currentTest) {// && this.state.display!=="Only Models") {
            testDetail = <TestDetail open={this.state.testDetailOpen}
                                     testData={this.state.currentTest}
                                     onClose={this.handleTestDetailClose}
                                     auth={this.props.auth}
                                     updateCurrentTestData={this.updateCurrentTest}
                                     onAddTestInstance={this.handleAddTestInstance}
                                     onEditTestInstance={this.handleEditTestInstance} />;
        }

        if (this.state.currentResult) {
            resultDetail = <ResultDetail open={this.state.resultDetailOpen} result={this.state.currentResult} onClose={this.handleResultDetailClose} />;
        }

        if (this.state.compareResultsOpen) {
            compareResults = <CompareMultiResults open={this.state.compareResultsOpen} onClose={this.closeCompareResults} />
        }

        if (this.state.addModelFormOpen) {
            addModel = <ModelAddForm open={this.state.addModelFormOpen} onClose={this.handleAddModelFormClose} />
        }

        if (this.state.addTestFormOpen) {
            addTest = <TestAddForm open={this.state.addTestFormOpen} onClose={this.handleAddTestFormClose} />
        }

        return (
            <React.Fragment>
                <div>
                    <Grid container direction="row">
                        <Grid item xs={1}>
                            <Tooltip title={"Change Configuration"}>
                                <IconButton onClick={this.openConfig} aria-label="Configure filters">
                                    <SettingsIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Compare Validation Results"}>
                                <IconButton onClick={this.openCompareResults} aria-label="Compare results">
                                    <AccountTreeIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={11}>
                            {configContent}
                        </Grid>
                    </Grid>
                    <br />

                    <ConfigForm
                        open={this.state.configOpen}
                        onClose={this.handleConfigClose}
                        config={this.state.filters}
                        display={this.state.display} />
                    <div>
                        {modelDetail}
                    </div>
                    <div>
                        {testDetail}
                    </div>
                    <div>
                        {resultDetail}
                    </div>
                    <div>
                        {compareResults}
                    </div>
                    <div>
                        {addModel}
                    </div>
                    <div>
                        {addTest}
                    </div>
                    <main>
                        {mainContent}
                    </main>
                    <br />
                </div>
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="xl">
                    {this.renderValidationFramework()}
                </Container>
            </React.Fragment>
        );
    }
}

export default withSnackbar(hot(ValidationFramework))
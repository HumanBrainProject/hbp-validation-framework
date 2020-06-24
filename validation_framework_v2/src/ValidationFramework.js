import React from 'react';
import { hot } from 'react-hot-loader/root'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import _ from 'lodash';

import ModelTable from "./ModelTable";
import TestTable from "./TestTable";
import ModelDetail from "./ModelDetail";
import TestDetail from "./TestDetail";
import ModelAddForm from "./ModelAddForm";
import TestAddForm from "./TestAddForm";
import ConfigForm from "./ConfigForm";
import Introduction from "./Introduction";
import ConfigDisplayTop from "./ConfigDisplayTop"
import LoadingIndicator from "./LoadingIndicator"
import ResultDetail from './ResultDetail';
import ErrorDialog from './ErrorDialog';
import { DevMode, baseUrl, collaboratoryOrigin, updateSettingsTopic, isFramedApp, settingsDelimiter, filterKeys, filterModelKeys, filterTestKeys, displayValid, queryValid, updateHash } from "./globals";
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

const buildQuery = (filterDict) => {
	let q = "";
	for (var key in filterDict) {
		for (var value of filterDict[key]) {
			q += `&${key}=${value}`
		}
	}
	return q.slice(1);
};

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

const storeFilters = (filterDict) => {
	if (isFramedApp) {
		let data = {};
		for (let key of filterKeys) {
			data[key] = filterDict[key].join(settingsDelimiter);
		}
		data["reload"] = false;
		window.parent.postMessage(
			{
				topic: updateSettingsTopic,
				data: data
			},
			collaboratoryOrigin);
		console.log("Stored filter settings");
	}
};

const storeDisplay = (display) => {
	if (isFramedApp) {
		let data = {};
		data["display"] = display;
		data["reload"] = false;
		window.parent.postMessage(
			{
				topic: updateSettingsTopic,
				data: data
			},
			collaboratoryOrigin);
		console.log("Stored display settings");
	}
};

const retrieveFilters = (context) => {
	const searchParams = new URLSearchParams(window.location.search);
	console.log(searchParams.get("species"))
	let filters = {};
	for (let key of filterKeys) {
		let param = searchParams.get(key);
		if (param) {
			filters[key] = param.split(settingsDelimiter);
		} else {
			filters[key] = [];
		}
	}
	console.log(filters)
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
		return displayValid[1]; //"Models & Tests"
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
			'addModelFormOpen': false,
			'addTestFormOpen': false,
			'configOpen': false,
			'loadingOpen': false,
			'loadingModel': true,
			'loadingTest': true,
			'errorUpdate': null,
			'errorGet': null,
			'filters': retrieveFilters(context),
			'validFilterValues': this.retrieveFilterValidValues(),
			'display': retrieveDisplay(),
			'modelsTableWide': false,
			'testsTableWide': false
		};
		if (DevMode) {
			this.state['modelData'] = sample_model_data.models
			this.state['testData'] = sample_test_data.tests
			this.state['loadingModel'] = false
			this.state['loadingTest'] = false
		}
		this.retrieveFilterValidValues = this.retrieveFilterValidValues(this);
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
		this.getTest = this.getTest.bind(this);
		this.modelTableFullWidth = this.modelTableFullWidth.bind(this);
		this.testTableFullWidth = this.testTableFullWidth.bind(this);
		this.openAddModelForm = this.openAddModelForm.bind(this);
		this.openAddTestForm = this.openAddTestForm.bind(this);
		this.handleAddModelFormClose = this.handleAddModelFormClose.bind(this);
		this.handleAddTestFormClose = this.handleAddTestFormClose.bind(this);
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

	openAddModelForm() {
		this.setState({ 'addModelFormOpen': true })
	};

	openAddTestForm() {
		this.setState({ 'addTestFormOpen': true })
	};

	handleAddModelFormClose(currentModel) {
		console.log("close add")
		console.log(currentModel)
		this.setState({ 'addModelFormOpen': false });
		if (currentModel) {
			let models = this.state.modelData;
			console.log(this.state.modelData)
			models.unshift(currentModel);
			this.setState({
				data: models,
				currentModel: currentModel,
				modelDetailOpen: true
			});
            updateHash("model_id." + currentModel.id);
            showNotification(this.props.enqueueSnackbar, "Model has been added!", "info")
		}
	}

	handleAddTestFormClose(currentTest) {
		console.log("close add")
		console.log(currentTest)
		this.setState({ 'addTestFormOpen': false });
		if (currentTest) {
			let tests = this.state.testData;
			console.log(this.state.testData)
			tests.unshift(currentTest);
			this.setState({
				data: tests,
				currentTest: currentTest,
				testDetailOpen: true
			});
            updateHash("test_id." + currentTest.id);
            showNotification(this.props.enqueueSnackbar, "Test has been added!", "info")
		}
	}

	componentDidMount() {
		document.body.style.backgroundColor = Theme.bodyBackground;
		const token = this.props.auth.tokenParsed;
		console.log(token);

		const [, setAuthContext] = this.context.auth;
		setAuthContext(this.props.auth)
		// console.log("Here: ", authContext);
		// console.log("Here: ", setAuthContext);

		this.props.auth.loadUserInfo()
			.success(() => {
				const userInfo = this.props.auth.userInfo;
				console.log(userInfo);
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
			}
			if (proceed && key.endsWith("_id") && !isUUID(value)) {
				error_message = "Value for query parameter '" + key + "' is not a valid UUID.\n Value: (" + value + ")";
				this.setState({ errorGet: error_message });
				proceed = false;
			}
			if (proceed) {
				this.setState({ loadingOpen: true });
				if (key.startsWith("model")) {
					// get a specific model
					this.getModel(key, value);
				} else if (key.startsWith("test")) {
					// get a specific test
					this.getTest(key, value);
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

	retrieveFilterValidValues() {
		let url = baseUrl + "/authorizedcollabparameterrest/?python_client=true";
		let config = {
			cancelToken: this.signal.token
		}
		return axios.get(url, config)
			.then(res => {
				this.setState({
					validFilterValues: res.data
				});
				const [, setContextValidFilterValues] = this.context.validFilterValues;
				setContextValidFilterValues(res.data);
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
	}

	getModel(key, value) {
		let url = "";
		if (key === "model_id") {
			url = baseUrl + "/models/?id=" + value;
		} else if (key === "model_alias") {
			url = baseUrl + "/models/?alias=" + value;
		}
		let config = {
			cancelToken: this.signal.token,
			headers: {
				'Authorization': 'Bearer ' + this.props.auth.token,
			}
		}
		// this.setState({loadingModel: true});
		axios.get(url, config)
			.then(res => {
				if (res.data.models.length !== 1) {
					throw new Error("Specified model_alias = '" + value + "' does not exist!");
				}
				this.setState({
					currentModel: res.data.models[0],
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
					this.setState({
						loadingOpen: false,
						errorGet: "Specified model_id = '" + value + "' is invalid!"
					});
				}
			}
			);
	};

	getTest(key, value) {
		let url = "";
		if (key === "test_id") {
			url = baseUrl + "/tests/?id=" + value;
		} else if (key === "test_alias") {
			url = baseUrl + "/tests/?alias=" + value;
		}
		let config = {
			cancelToken: this.signal.token,
			headers: {
				'Authorization': 'Bearer ' + this.props.auth.token,
			}
		}
		// this.setState({loadingTest: true});
		axios.get(url, config)
			.then(res => {
				if (res.data.tests.length !== 1) {
					throw new Error("Specified test_alias = '" + value + "' does not exist!");
				}
				this.setState({
					currentTest: res.data.tests[0],
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
					this.setState({
						loadingOpen: false,
						errorGet: "Specified test_id = '" + value + "' is invalid!"
					});
				}
			}
			);
	};

	getResult(key, value) {
		let url = baseUrl + "/results/?order=&id=" + value;
		let config = {
			cancelToken: this.signal.token,
			headers: {
				'Authorization': 'Bearer ' + this.props.auth.token,
			}
		}
		return axios.get(url, config)
			.then(res => {
				if (res.data.results.length !== 1) {
					throw new Error("Specified result_id = '" + value + "' is invalid!");
				}
				this.setState({
					currentResult: res.data["results"][0],
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
					this.setState({
						loadingOpen: false,
						errorGet: err
					});
				}
			}
			);
	};

	updateModels(filters) {
		if (filtersEmpty(filters) && isFramedApp) { // TODO: remove `isFramedApp` to avoid auto load of all entries on entry page-
			this.setState({
				modelData: [],
				loadingModel: false,
				errorUpdate: null
			});
		} else {
			let query = buildQuery(filters);
			let config = {
				cancelToken: this.signal.token,
				headers: {
					'Authorization': 'Bearer ' + this.props.auth.token,
				}
			}
			let url = baseUrl + "/models/?" + query;
			this.setState({ loadingModel: true });
			axios.get(url, config)
				.then(res => {
					const models = res.data.models;
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
		if (filtersEmpty(filters) && isFramedApp) { // TODO: remove `isFramedApp` to avoid auto load of all entries on entry page
			this.setState({
				testData: [],
				loadingTest: false,
				errorUpdate: null
			});
		} else {
			let query = buildQuery(filters);
			let config = {
				cancelToken: this.signal.token,
				headers: {
					'Authorization': 'Bearer ' + this.props.auth.token,
				}
			}
			let url = baseUrl + "/tests/?" + query;
			this.setState({ loadingTest: true });
			axios.get(url, config)
				.then(res => {
					const tests = res.data.tests;
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

	handleConfigClose(display, filters) {
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

		console.log(update_model_flag)
		console.log(update_test_flag)
		if (update_model_flag === null || update_test_flag === null) {
			this.setState({ 'filters': filters });
			storeFilters(filters);

			if (update_model_flag === null && display !== "Only Tests") {
				update_model_flag = true;
				this.updateModels(modelFilters);
			}
			if (update_test_flag === null && display !== "Only Models") {
				update_test_flag = true;
				this.updateTests(testFilters);
            }
            showNotification(this.props.enqueueSnackbar, "App config updated!", "success")
		}
		console.log(update_model_flag)
		console.log(update_test_flag)

		if (display !== this.state.display) { // compare new (display) with existing (this.state.display)
			// if model changes made above, no need to do again
			if ((!update_model_flag) && (this.state.display === "Only Tests")) {
				this.updateModels(modelFilters);
			}
			// if test changes made above, no need to do again
			if ((!update_test_flag) && (this.state.display === "Only Models")) {
				this.updateTests(testFilters);
			}
			storeDisplay(display);
			this.setState({ 'display': display });
			this.setState({ modelsTableWide: false });
			this.setState({ testsTableWide: false });
		}
		this.setState({ 'configOpen': false });
	};

	handleErrorGetDialogClose() {
		this.setState({ 'errorGet': null });
	};

	handleErrorUpdateDialogClose() {
		this.setState({ 'errorUpdate': null });
	};

	// renderError() {
	//   return (
	//     <div>
	//       Uh oh: {this.state.error.message}
	//     </div>
	//   );
	// };

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
		let content = "";
		if ((this.state.modelsTableWide && !this.state.testsTableWide) || (this.state.display === "Only Models")) {
			content = <Grid container>
				<Grid item xs={12}>
					{this.state.loadingModel ?
						<Paper style={{ padding: '0 0 0 16px' }}>
							<br />
							<Typography variant="h6">Models</Typography>
							<LoadingIndicator />
							<br /><br />
						</Paper>
						:
						<ModelTable modelData={this.state.modelData} display={this.state.display} changeTableWidth={this.modelTableFullWidth} openAddModelForm={this.openAddModelForm} handleRowClick={this.handleModelRowClick} />
					}
				</Grid>
			</Grid>
		} else if ((!this.state.modelsTableWide && this.state.testsTableWide) || (this.state.display === "Only Tests")) {
			content = <Grid container>
				<Grid item xs={12}>
					{this.state.loadingTest ?
						<Paper style={{ padding: '0 0 0 16px' }}>
							<br />
							<Typography variant="h6">Tests</Typography>
							<LoadingIndicator />
							<br /><br />
						</Paper>
						:
						<TestTable testData={this.state.testData} display={this.state.display} auth={this.props.auth} changeTableWidth={this.testTableFullWidth} openAddTestForm={this.openAddTestForm} handleRowClick={this.handleTestRowClick} />
					}
				</Grid>
			</Grid>
		} else {
			content = <Grid container spacing={2}>
				<Grid item xs={6}>
					{this.state.loadingModel ?
						<Paper style={{ padding: '0 0 0 16px' }}>
							<br />
							<Typography variant="h6">Models</Typography>
							<LoadingIndicator />
							<br /><br />
						</Paper>
						:
						<ModelTable modelData={this.state.modelData} display={this.state.display} auth={this.props.auth} changeTableWidth={this.modelTableFullWidth} openAddModelForm={this.openAddModelForm} handleRowClick={this.handleModelRowClick} />
					}
				</Grid>
				<Grid item xs={6}>
					{this.state.loadingTest ?
						<Paper style={{ padding: '0 0 0 16px' }}>
							<br />
							<Typography variant="h6">Tests</Typography>
							<LoadingIndicator />
							<br /><br />
						</Paper>
						:
						<TestTable testData={this.state.testData} display={this.state.display} auth={this.props.auth} changeTableWidth={this.testTableFullWidth} openAddTestForm={this.openAddTestForm} handleRowClick={this.handleTestRowClick} />
					}
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
		var addModel = "";

		// const [ contaxtValidFilterValues, setContaxtValidFilterValues ] = this.context.validFilterValues;
		// console.log(contaxtValidFilterValues)

		if (this.state.loadingOpen) {
			return this.renderLoading();
		}
		if (this.state.errorGet) {
			return <ErrorDialog open={Boolean(this.state.errorGet)} handleErrorDialogClose={this.handleErrorGetDialogClose} error={this.state.errorGet.message || this.state.errorGet} />
		}
		if (this.state.errorUpdate) {
			return <ErrorDialog open={Boolean(this.state.errorUpdate)} handleErrorDialogClose={this.handleErrorUpdateDialogClose} error={this.state.errorUpdate.message || this.state.errorUpdate} />
		}
		if (filtersEmpty(this.state.filters) && isFramedApp) { // TODO: remove `isFramedApp` to avoid auto load of all entries on entry page
			configContent = "";
			mainContent = <Introduction />;
		} else {
			configContent = <ConfigDisplayTop display={this.state.display} filters={this.state.filters} />
			mainContent = this.renderTables();
		}

		if (this.state.currentModel) {// && this.state.display!=="Only Tests") {
			modelDetail = <ModelDetail open={this.state.modelDetailOpen} modelData={this.state.currentModel} onClose={this.handleModelDetailClose} auth={this.props.auth} />;
		}

		if (this.state.currentTest) {// && this.state.display!=="Only Models") {
			testDetail = <TestDetail open={this.state.testDetailOpen} testData={this.state.currentTest} onClose={this.handleTestDetailClose} auth={this.props.auth} />;
		}

		if (this.state.currentResult) {
			resultDetail = <ResultDetail open={this.state.resultDetailOpen} result={this.state.currentResult} onClose={this.handleResultDetailClose} auth={this.props.auth} />;
		}

		if (this.state.addModelFormOpen) {
			addModel = <ModelAddForm open={this.state.addModelFormOpen} onClose={this.handleAddModelFormClose} />
		}

		if (this.state.addTestFormOpen) {
			addModel = <TestAddForm open={this.state.addTestFormOpen} onClose={this.handleAddTestFormClose} />
		}

		return (
			<React.Fragment>
				<Grid container direction="row">
					<Grid item xs={1} sm={1} md={1} lg={1}>
						<IconButton onClick={this.openConfig} aria-label="Configure filters">
							<SettingsIcon />
						</IconButton>
					</Grid>
					<Grid item xs={11} sm={11} md={11} lg={11}>
						{configContent}
					</Grid>
				</Grid>
				<br />

				<ConfigForm open={this.state.configOpen} onClose={this.handleConfigClose} config={this.state.filters} validFilterValues={this.state.validFilterValues} display={this.state.display} />
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
					{addModel}
				</div>
				<main>
					{mainContent}
				</main>
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
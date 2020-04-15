import React from 'react';
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
import ConfigForm from "./ConfigForm";
import Introduction from "./Introduction";
import ConfigDisplayTop from "./ConfigDisplayTop"
import LoadingIndicator from "./LoadingIndicator"
import globals from "./globals";

// if working on the appearance/layout set globals.DevMode=true
// to avoid loading the models and tests over the network every time;
// instead we use the local test_data
var test_data = {}
if (globals.DevMode) {
  test_data = require('./dev_data/test_data.json');
} else {
  test_data = {models: [], tests: []};
}

const baseUrl = "https://validation-staging.brainsimulation.eu";
const collaboratoryOrigin = 'https://wiki.humanbrainproject.eu';
const hashChangedTopic = '/clb/community-app/hashchange';
const updateSettingsTopic = '/clb/community-app/settings';
const isParent = (window.opener == null);
const isIframe = (window !== window.parent);
const isFramedApp = isIframe && isParent;
const settingsDelimiter = ",";
const filterKeys = ["species", "brain_region", "cell_type",
                    "organization", "model_scope", "abstraction_level",
                    "test_type"]//, "score_type", "data_modalities"]
const displayValid = ["Only Models", "Models & Tests", "Only Tests"];

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

const updateHash = (value) => {
  window.location.hash = value;
  if (isFramedApp) {
    window.parent.postMessage({
      topic: hashChangedTopic,
      data: value
    }, collaboratoryOrigin);
  };
};

const storeFilters = (filterDict) => {
  if (isFramedApp) {
    let data = {};
    for (let key of filterKeys) {
      data[key] = filterDict[key].join(settingsDelimiter);
    }
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
    window.parent.postMessage(
      {
        topic: updateSettingsTopic,
        data: data
      },
      collaboratoryOrigin);
    console.log("Stored display settings");
  }
};

const retrieveFilters = () => {
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

export default class ValidationFramework extends React.Component {
  signal = axios.CancelToken.source();

  constructor(props) {
    super(props);

    this.state = {
      'modelData': [],
      'currentModel': null,
      'testData': [],
      'currentTest': null,
      'modelDetailOpen': false,
      'testDetailOpen': false,
      'configOpen': false,
      'loading_model': true,
      'loading_test': true,
      'filters': retrieveFilters(),
      'display': retrieveDisplay(),
      'modelsTableWide': false,
      'testsTableWide': false
    };
    if (globals.DevMode) {
      this.state['modelData'] = test_data.models
      this.state['currentModel'] = test_data.models[0]
      this.state['testData'] = test_data.tests
      this.state['currentTest'] = test_data.tests[0]
      this.state['loading_model'] = false
      this.state['loading_test'] = false
    }
    this.handleModelDetailClose = this.handleModelDetailClose.bind(this);
    this.handleTestDetailClose = this.handleTestDetailClose.bind(this);
    this.handleModelRowClick = this.handleModelRowClick.bind(this);
    this.handleTestRowClick = this.handleTestRowClick.bind(this);
    this.openConfig = this.openConfig.bind(this);
    this.handleConfigClose = this.handleConfigClose.bind(this);
    this.updateModels = this.updateModels.bind(this);
    this.updateTests = this.updateTests.bind(this);
    this.getModel = this.getModel.bind(this);
    this.getTest = this.getTest.bind(this);
    this.modelTableFullWidth = this.modelTableFullWidth.bind(this);
    this.testTableFullWidth = this.testTableFullWidth.bind(this);
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

  componentDidMount() {
    console.log(window.location.hash)
    if (window.location.hash) {
      // get a specific model
      // this.getModel(window.location.hash.slice(1));  // TODO: uncomment?
      // get a specific test
      // this.getTest(window.location.hash.slice(1));   // TODO: uncomment?
    }
    if (!globals.DevMode) {
      this.updateModels(this.state.filters);
      this.updateTests(this.state.filters);
    }
  }

  componentWillUnmount() {
    this.signal.cancel('REST API call canceled!');
  }

  getModel(model_id) {
    let url = baseUrl + "/models/?id=" + model_id;
    let config = {
      cancelToken: this.signal.token,
      headers: {
        'Authorization': 'Bearer ' + this.props.auth.token,
      }
    }
    this.setState({loading_model: true});
    axios.get(url, config)
      .then(res => {
        const models = res.data.models;
        this.setState({
          modelData: models,
          currentModel: models[0],
          loading_model: false,
          error: null,
          modelDetailOpen: true  // TODO: required?
        });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('Error: ', err.message);
        } else {
          // Something went wrong. Save the error in state and re-render.
          this.setState({
            loading_model: false,
            error: err
          });
        }
      }
    );
  };

  getTest(test_id) {
    let url = baseUrl + "/tests/?id=" + test_id;
    let config = {
      cancelToken: this.signal.token,
      headers: {
        'Authorization': 'Bearer ' + this.props.auth.token,
      }
    }
    this.setState({loading_test: true});
    axios.get(url, config)
      .then(res => {
        const tests = res.data.tests;
        this.setState({
          testData: tests,
          currentTest: tests[0],
          loading_test: false,
          error: null,
          testDetailOpen: true  // TODO: required?
        });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('Error: ', err.message);
        } else {
          // Something went wrong. Save the error in state and re-render.
          this.setState({
            loading_test: false,
            error: err
          });
        }
      }
    );
  };

  updateModels(filters) {
    if (filtersEmpty(filters) && isFramedApp) { // TODO: remove `isFramedApp` to avoid auto load of all entries on entry page-
      this.setState({
        modelData: [],
        loading_model: false,
        error: null
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
      this.setState({loading_model: true});
      axios.get(url, config)
        .then(res => {
          const models = res.data.models;
          this.setState({
            modelData: models,
            // currentModel: this.state.currentModel ? this.state.currentModel : models[0], //TODO: why?
            loading_model: false,
            error: null
          });
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            console.log('Error: ', err.message);
          } else {
            // Something went wrong. Save the error in state and re-render.
            this.setState({
              loading_model: false,
              error: err
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
        loading_test: false,
        error: null
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
      this.setState({loading_test: true});
      axios.get(url, config)
        .then(res => {
          const tests = res.data.tests;
          this.setState({
            testData: tests,
            // currentTest: this.state.currentTest ? this.state.currentTest : tests[0], //TODO: why?
            loading_test: false,
            error: null
          });
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            console.log('Error: ', err.message);
          } else {
            // Something went wrong. Save the error in state and re-render.
            this.setState({
              loading_test: false,
              error: err
            });
          }
        }
      );
    };
  };

  handleModelRowClick(rowData, rowMeta) {
    // Note: last element of MUIDataTable (in ModelTable.js) is set to json Object of entry
    this.setState({'currentModel': rowData[rowData.length-1]});
    this.setState({'modelDetailOpen': true});
    updateHash(rowData.id);
  };

  handleModelDetailClose() {
    this.setState({'currentModel': null});
    this.setState({'modelDetailOpen': false});
    updateHash('');
  };

  handleTestRowClick(rowData, rowMeta) {
    // Note: last element of MUIDataTable (in TestTable.js) is set to json Object of entry
    this.setState({'currentTest': rowData[rowData.length-1]});
    this.setState({'testDetailOpen': true});
    updateHash(rowData.id);
  };

  handleTestDetailClose() {
    this.setState({'currentTest': null});
    this.setState({'testDetailOpen': false});
    updateHash('');
  };

  openConfig() {
    this.setState({'configOpen': true})
  };

  handleConfigClose(display, filters) {
    if(!_.isEqual(filters, this.state.filters)) {
      this.setState({'filters': filters});
      storeFilters(filters);
      // if running within the Collaboratory, this reloads the page, so the filters get applied on the reload
      // when accessed stand-alone, the filters are not stored, and the following lines are executed
      this.updateModels(filters);
      this.updateTests(filters);
    }
    if(display !== this.state.display) {
      console.log(this.state.display)
      console.log(display)
      storeDisplay(display);
      this.setState({'display': display});
      this.setState({modelsTableWide: false});
      this.setState({testsTableWide: false});
    }
    this.setState({'configOpen': false});
  };

  renderError() {
    return (
      <div>
        Uh oh: {this.state.error.message}
      </div>
    );
  };

  renderTables() {
    let content = "";
    console.log(this.state.display);
      if ((this.state.modelsTableWide && !this.state.testsTableWide) || (this.state.display==="Only Models")) {
        content = <Grid container>
                    <Grid item xs={12}>
                      { this.state.loading_model ?
                      <Paper style={{padding: '0 0 0 16px'}}>
                        <br />
                        <Typography variant="h6">Models</Typography>
                        <LoadingIndicator />
                        <br /><br />
                      </Paper>
                      :
                      <ModelTable rows={this.state.modelData} display={this.state.display} changeTableWidth={this.modelTableFullWidth} handleRowClick={this.handleModelRowClick} />
                      }
                    </Grid>
                  </Grid>
      } else if ((!this.state.modelsTableWide && this.state.testsTableWide) || (this.state.display==="Only Tests")) {
        content = <Grid container>
                    <Grid item xs={12}>
                      { this.state.loading_test ?
                        <Paper style={{padding: '0 0 0 16px'}}>
                          <br />
                          <Typography variant="h6">Tests</Typography>
                          <LoadingIndicator />
                          <br /><br />
                        </Paper>
                        :
                        <TestTable rows={this.state.testData} display={this.state.display} changeTableWidth={this.testTableFullWidth}  handleRowClick={this.handleTestRowClick} />
                      }
                    </Grid>
                  </Grid>
      } else {
        content = <Grid container spacing={2}>
                    <Grid item xs={6}>
                      { this.state.loading_model ?
                        <Paper style={{padding: '0 0 0 16px'}}>
                          <br />
                          <Typography variant="h6">Models</Typography>
                          <LoadingIndicator />
                          <br /><br />
                        </Paper>
                        :
                        <ModelTable rows={this.state.modelData} display={this.state.display} changeTableWidth={this.modelTableFullWidth} handleRowClick={this.handleModelRowClick} />
                      }
                    </Grid>
                    <Grid item xs={6}>
                      { this.state.loading_test ?
                        <Paper style={{padding: '0 0 0 16px'}}>
                          <br />
                          <Typography variant="h6">Tests</Typography>
                          <LoadingIndicator />
                          <br /><br />
                        </Paper>
                        :
                        <TestTable rows={this.state.testData} display={this.state.display} changeTableWidth={this.testTableFullWidth} handleRowClick={this.handleTestRowClick} />
                      }
                    </Grid>
                  </Grid>
      }
      return(
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

    if (this.state.error) {
      return this.renderError();
    }
    if (filtersEmpty(this.state.filters) && isFramedApp) { // TODO: remove `isFramedApp` to avoid auto load of all entries on entry page
      configContent = "";
      mainContent = <Introduction />;
    } else {
      configContent = <ConfigDisplayTop filters={this.state.filters} />
      mainContent = this.renderTables();
    }

    if (this.state.currentModel && this.state.display!=="Only Tests") {
      modelDetail = <ModelDetail open={this.state.modelDetailOpen} modelData={this.state.currentModel} onClose={this.handleModelDetailClose} baseUrl={baseUrl} auth={this.props.auth} />;
    } else {
      modelDetail = "";
    }

    if (this.state.currentTest && this.state.display!=="Only Models") {
      testDetail = <TestDetail open={this.state.testDetailOpen} testData={this.state.currentTest} onClose={this.handleTestDetailClose} baseUrl={baseUrl} auth={this.props.auth} />;
    } else {
      testDetail = "";
    }

    return (
      <React.Fragment>
        <Grid container direction="row">
          <Grid item xs={1}>
          <IconButton onClick={this.openConfig} aria-label="Configure filters">
              <SettingsIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
          {configContent}
          </Grid>
        </Grid>
        <br/>

        <ConfigForm open={this.state.configOpen} onClose={this.handleConfigClose} config={this.state.filters} displayValid={displayValid} display={this.state.display} baseUrl={baseUrl} />
        <div>
          {modelDetail}
        </div>
        <div>
          {testDetail}
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

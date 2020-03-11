import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios';

import ModelTable from "./ModelTable";
import TestTable from "./TestTable";
import SearchBar from "./SearchBar";
import ModelDetail from "./ModelDetail";
import TestDetail from "./TestDetail";
import ConfigForm from "./ConfigForm";
import Introduction from "./Introduction";

// if working on the appearance/layout set devMode=true
// to avoid loading the models and tests over the network every time;
// instead we use the local test_data
import test_data from './test_data.json';
const devMode = true;
// if (!devMode) {
//   var test_data = {models: [], tests: []};
// }

const baseUrl = "https://validation-staging.brainsimulation.eu";
const collaboratoryOrigin = 'https://wiki.humanbrainproject.eu';
const hashChangedTopic = '/clb/community-app/hashchange';
const updateSettingsTopic = '/clb/community-app/settings';
const isParent = (window.opener == null);
const isIframe = (window !== window.parent);
const isFramedApp = isIframe && isParent;
const settingsDelimiter = ",";
const filterKeys = ["species", "brain_region", "organization", "cell_type",
                    "model_scope", "abstraction_level"];

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
    console.log("Stored settings");
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

const stringCapsSpaces = (str) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/g, ' ');
}

export default class ValidationFramework extends React.Component {
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
      'loading': true,
      'filters': retrieveFilters(),
      'modelsTableWide': false,
      'testsTableWide': false
    };
    if (devMode) {
      this.state['modelData'] = test_data.models
      this.state['currentModel'] = test_data.models[0]
      this.state['testData'] = test_data.tests
      this.state['currentTest'] = test_data.tests[0]
      this.state['loading'] = false
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
    if (window.location.hash) {
      // get a specific model
      // this.getModel(window.location.hash.slice(1));  // TODO: uncomment
      // get a specific test
      // this.getTest(window.location.hash.slice(1));   // TODO: uncomment
    }
    if (!devMode) {
      this.updateModels(this.state.filters);
      this.updateTests(this.state.filters);
    }
  }

  getModel(model_id) {
    let url = baseUrl + "/models/?id=" + model_id;
    console.log(url);
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.props.auth.token
      }
    }
    this.setState({loading: true});
    axios.get(url, config)
      .then(res => {
        const models = res.data.models;
        this.setState({
          modelData: models,
          currentModel: models[0],
          loading: false,
          error: null,
          modelDetailOpen: true
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      }
    );
  };

  getTest(test_id) {
    let url = baseUrl + "/tests/?id=" + test_id;
    console.log(url);
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.props.auth.token
      }
    }
    this.setState({loading: true});
    axios.get(url, config)
      .then(res => {
        const tests = res.data.tests;
        this.setState({
          testData: tests,
          currentTest: tests[0],
          loading: false,
          error: null,
          testDetailOpen: true
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      }
    );
  };

  updateModels(filters) {

    if (filtersEmpty(filters) && isFramedApp) { // TODO: remove `isFramedApp` to avoid auto load of all entries on entry page
      this.setState({
        modelData: [],
        loading: false,
        error: null
      });
    } else {
      let query = buildQuery(filters);
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.props.auth.token
        }
      }
      let url = baseUrl + "/models/?" + query;
      console.log(url);
      this.setState({loading: true});
      axios.get(url, config)
        .then(res => {
          const models = res.data.models;
          this.setState({
            modelData: models,
            currentModel: this.state.currentModel ? this.state.currentModel : models[0],
            loading: false,
            error: null
          });
        })
        .catch(err => {
          // Something went wrong. Save the error in state and re-render.
          this.setState({
            loading: false,
            error: err
          });
        }
      );
    };
  };

  updateTests(filters) {

    if (filtersEmpty(filters) && isFramedApp) { // TODO: remove `isFramedApp` to avoid auto load of all entries on entry page
      this.setState({
        testData: [],
        loading: false,
        error: null
      });
    } else {
      let query = buildQuery(filters);
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.props.auth.token
        }
      }
      let url = baseUrl + "/tests/?" + query;
      console.log(url);
      this.setState({loading: true});
      axios.get(url, config)
        .then(res => {
          const tests = res.data.tests;
          this.setState({
            testData: tests,
            currentTest: this.state.currentTest ? this.state.currentTest : tests[0],
            loading: false,
            error: null
          });
        })
        .catch(err => {
          // Something went wrong. Save the error in state and re-render.
          this.setState({
            loading: false,
            error: err
          });
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
    this.setState({'testDetailOpen': false});
    updateHash('');
  };

  openConfig() {
    this.setState({'configOpen': true})
  };

  handleConfigClose(filters) {
    this.setState({'filters': filters});
    this.setState({'configOpen': false});
    storeFilters(filters);
    // if running within the Collaboratory, this reloads the page, so the filters get applied on the reload
    // when accessed stand-alone, the filters are not stored, and the following line is executed
    this.updateModels(filters);
    this.updateTests(filters);
    // todo: if filters haven't changed, don't store them
  };

  renderLoadingIndicator() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
        <CircularProgress />
      </div>
    )
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
      if (this.state.modelsTableWide && !this.state.testsTableWide) {
        content = <Grid container>
                    <Grid item xs={12}>
                      <ModelTable rows={this.state.modelData} changeTableWidth={this.modelTableFullWidth} handleRowClick={this.handleModelRowClick} />
                    </Grid>
                  </Grid>
      } else if (!this.state.modelsTableWide && this.state.testsTableWide) {
        content = <Grid container>
                    <Grid item xs={12}>
                      <TestTable rows={this.state.testData} changeTableWidth={this.testTableFullWidth}  handleRowClick={this.handleTestRowClick} />
                    </Grid>
                  </Grid>
      } else {
        content = <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ModelTable rows={this.state.modelData} changeTableWidth={this.modelTableFullWidth} handleRowClick={this.handleModelRowClick} />
                    </Grid>
                    <Grid item xs={6}>
                      <TestTable rows={this.state.testData} changeTableWidth={this.testTableFullWidth} handleRowClick={this.handleTestRowClick} />
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
    if (this.state.error) {
      return this.renderError();
    }
    if (filtersEmpty(this.state.filters) && isFramedApp) { // TODO: remove `isFramedApp` to avoid auto load of all entries on entry page
      var configContent = "";
      var mainContent = <Introduction />;
    } else {
      var configContent = <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Box fontSize={16} fontWeight="fontWeightBold">App's Current Configuration</Box>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Box>
                                  {
                                    Object.keys(this.state.filters).map((key, index) => (
                                      <Box lineHeight={2} key={key}>
                                        <Box component="span" fontWeight="fontWeightBold">{stringCapsSpaces(key)}: </Box>
                                        <Box component="span">{this.state.filters[key].join(', ') ? this.state.filters[key].join(', ') : "<< all >>"}</Box>
                                        <br/>
                                      </Box>
                                    ))
                                  }
                                <br/>
                                To re-configure the app, click on the configure icon <SettingsIcon />  at the top left of the page.
                              </Box>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
      var mainContent = this.renderTables();
    }

    if (this.state.currentModel) {
      var modelDetail = <ModelDetail open={this.state.modelDetailOpen} modelData={this.state.currentModel} onClose={this.handleModelDetailClose} baseUrl={baseUrl} />;
    } else {
      var modelDetail = "";
    }

    if (this.state.currentTest) {
      var testDetail = <TestDetail open={this.state.testDetailOpen} testData={this.state.currentTest} onClose={this.handleTestDetailClose} baseUrl={baseUrl} />;
    } else {
      var testDetail = "";
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

        <ConfigForm open={this.state.configOpen} onClose={this.handleConfigClose} config={this.state.filters} baseUrl={baseUrl} />

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
          {this.state.loading ? this.renderLoadingIndicator(): this.renderValidationFramework()}
        </Container>
        </React.Fragment>
    );
  }
}

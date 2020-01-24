import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import SettingsIcon from '@material-ui/icons/Settings';

import axios from 'axios';

import ModelTable from "./ModelTable";
import SearchBar from "./SearchBar";
import ModelDetail from "./ModelDetail";
import ConfigForm from "./ConfigForm";
import Introduction from "./Introduction";


// if working on the appearance/layout set devMode=true
// to avoid loading the models over the network every time;
// instead we use the local test_data
//import test_data from './test_data.json';

const devMode = false;
if (!devMode) {
  var test_data = {models: []};
}

const baseUrl = "https://validation-staging.brainsimulation.eu/models/";
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

export default class ModelCatalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'modelData': [],
      'currentModel': null,
      'open': false,
      'configOpen': false,
      'loading': true,
      'filters': retrieveFilters()
    };
    if (devMode) {
      this.state['modelData'] = test_data.models
      this.state['currentModel'] = test_data.models[0]
      this.state['loading'] = false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.openConfig = this.openConfig.bind(this);
    this.handleConfigClose = this.handleConfigClose.bind(this);
    this.updateModels = this.updateModels.bind(this);
    this.getModel = this.getModel.bind(this);
  }

  componentDidMount() {
    if (window.location.hash) {
      // get a specific model
      this.getModel(window.location.hash.slice(1));
    }
    if (!devMode) {
      this.updateModels(this.state.filters);
    }
  }

  getModel(model_id) {
    let url = baseUrl + "?id=" + model_id;
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
          open: true
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

    if (filtersEmpty(filters)) {
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
      let url = baseUrl + "?" + query;
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

  handleClickOpen(event, rowData) {
    this.setState({'currentModel': rowData});
    this.setState({'open': true});
    updateHash(rowData.id);
  };

  handleClose() {
    this.setState({'open': false});
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

  renderModelCatalog() {
    if (this.state.error) {
      return this.renderError();
    }
    if (filtersEmpty(this.state.filters)) {
      var mainContent = <Introduction />;
    } else {
      var mainContent = <ModelTable rows={this.state.modelData} handleRowClick={this.handleClickOpen} />
    }

    if (this.state.currentModel) {
      var modelDetail = <ModelDetail open={this.state.open} modelData={this.state.currentModel} onClose={this.handleClose} />;
    } else {
      var modelDetail = "";
    }

    return (
      <React.Fragment>
        <Grid container direction="row" spacing={0}>
          <Grid item xs={1}>
            <IconButton onClick={this.openConfig} aria-label="Configure filters">
              <FilterListIcon />
            </IconButton>
            <ConfigForm open={this.state.configOpen} onClose={this.handleConfigClose} config={this.state.filters} />
          </Grid>
          <Grid item xs={11}>

          </Grid>
        </Grid>
        <div>
          {modelDetail}
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
          {this.state.loading ? this.renderLoadingIndicator(): this.renderModelCatalog()}
        </Container>
        </React.Fragment>
    );
  }
}

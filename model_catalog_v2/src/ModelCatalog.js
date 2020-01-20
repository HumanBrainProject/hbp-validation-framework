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

import rows from './test_data.json';

// if working on the appearance/layout set devMode=true
// to avoid loading the models over the network every time;
// instead we use the local test_data
const devMode = false;

const baseUrl = "https://validation-staging.brainsimulation.eu/models/";

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


export default class ModelCatalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'modelData': [],
      'currentModel': null,
      'open': false,
      'configOpen': false,
      'loading': true,
      'filters': {
        'species': [],
        'brain_region': [],
        'organization': [],
      }
    };
    if (devMode) {
      this.state['modelData'] = rows.models
      this.state['currentModel'] = rows.models[0]
      this.state['loading'] = false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.openConfig = this.openConfig.bind(this);
    this.handleConfigClose = this.handleConfigClose.bind(this);
    this.updateModels = this.updateModels.bind(this);
  }

  componentDidMount() {
    if (!devMode) {
      this.updateModels(this.state.filters);
    }
  }

  updateModels(filters) {

    if (filtersEmpty(filters)) {
      this.setState({
        modelData: [],
        currentModel: null,
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
            currentModel: models[0],
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
    console.log(rowData);
  };

  handleClose() {
    this.setState({'open': false});
  };

  openConfig() {
    this.setState({'configOpen': true})
  }

  handleConfigClose(filters) {
    console.log("Closed config dialog");
    this.setState({'filters': filters});
    this.setState({'configOpen': false});
    this.updateModels(filters);
  }

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
  }

  renderModelCatalog() {
    if (this.state.error) {
      return this.renderError();
    }
    if (filtersEmpty(this.state.filters)) {
      var mainContent = <Introduction />;
      var modelDetail = "";
    } else {
      var mainContent = <ModelTable rows={this.state.modelData} handleRowClick={this.handleClickOpen} />;
      var modelDetail = <ModelDetail open={this.state.open} modelData={this.state.currentModel} onClose={this.handleClose} />;
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
            <SearchBar/>
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

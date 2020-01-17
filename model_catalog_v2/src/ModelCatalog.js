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

import rows from './test_data.json';

// if working on the appearance/layout set devMode=true
// to avoid loading the models over the network every time;
// instead we use the local test_data
const devMode = true;

export default class ModelCatalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'modelData': [],
      'currentModel': null,
      'open': false,
      'configOpen': false,
      'loading': true
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
  }

  componentDidMount() {
    if (!devMode) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.props.auth.token
        }
      }
      axios.get(
          "https://validation-staging.brainsimulation.eu/models/?organization=HBP-SP6&brain_region=cerebellum",
          config)
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
        });
    }
  }

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

  handleConfigClose() {
    this.setState({'configOpen': false});
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

    return (
      <React.Fragment>
        <Grid container direction="row" spacing={0}>
          <Grid item xs={1}>
            <IconButton onClick={this.openConfig} aria-label="Configure filters">
              <FilterListIcon />
            </IconButton>
            <ConfigForm open={this.state.configOpen} onClose={this.handleConfigClose} />
          </Grid>
          <Grid item xs={11}>
            <SearchBar/>
          </Grid>
        </Grid>
        <div>
          <ModelDetail open={this.state.open} modelData={this.state.currentModel} onClose={this.handleClose} />
        </div>
        <main>
          <ModelTable rows={this.state.modelData} handleRowClick={this.handleClickOpen} />
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

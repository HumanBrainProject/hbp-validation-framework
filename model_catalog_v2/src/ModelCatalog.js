import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import ModelTable from "./ModelTable";
import SearchBar from "./SearchBar";
import ModelDetail from "./ModelDetail";
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

//import rows from './test_data.json';


export default class ModelCatalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'modelData': [], //rows.models,
      'currentModel': null, //rows.models[0],
      'open': false,
      'loading': true
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);

  }

  componentDidMount() {
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

  handleClickOpen(event, rowData) {
    this.setState({'currentModel': rowData});
    this.setState({'open': true});
    console.log(rowData);
  };

  handleClose() {
    this.setState({'open': false});
  };

  renderLoadingIndicator() {
    return <CircularProgress />
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
        <SearchBar/>
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

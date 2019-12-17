import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import ModelTable from "./ModelTable";
import SearchBar from "./SearchBar";
import ModelDetail from "./ModelDetail";

import rows from './test_data.json';


export default class ModelCatalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'modelData': rows.models,
      'currentModel': rows.models[0],
      'open': false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);

  }

  handleClickOpen(event, rowData) {
    this.setState({'currentModel': rowData});
    this.setState({'open': true});
    console.log(rowData);
  };

  handleClose() {
    this.setState({'open': false});
  };

  render() {
    return (
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
      <SearchBar/>
      <div>
        <ModelDetail open={this.state.open} modelData={this.state.currentModel} onClose={this.handleClose} />
      </div>
      <main>
        <ModelTable rows={this.state.modelData} handleRowClick={this.handleClickOpen} />
      </main>
      </Container>
      </React.Fragment>
    );
  }
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ModelTable from "./ModelTable";
import SearchBar from "./SearchBar";
import ModelDetail from "./ModelDetail";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar
}));


function createData(id, name, species, brainRegion, cellType, modelScope, abstractionLevel, authors, collabID, privacy) {
  return { id, name, species, brainRegion, cellType, modelScope, abstractionLevel, authors, collabID, privacy };
}

const rows = [
  createData(101, 'Basal ganglia network model', 'Mus musculus', 'basal ganglia', 'other', 'network: brain region', 'spiking neurons: point neuron', 'Shreyas M Suryanarayana', '1655', 'Public'),
  createData(102, 'Active Model', 'Mus musculus', 'hippocampus', 'hippocampus CA1 pyramidal cell', 'single cell', 'spiking neurons: biophysical', 'Shailesh Appukuttan', '8123', 'Public'),
  createData(103, 'Passive Model', 'Mus musculus', 'hippocampus', 'hippocampus CA1 pyramidal cell', 'single cell', 'spiking neurons: biophysical', 'Shailesh Appukuttan', '8123', 'Public'),
  createData(104, 'Spiking network model of cortical areas exploring the edge of synchronization', 'Undefined', 'cerebral cortex', 'not applicable', 'network', 'spiking neurons: point neuron', 'Maurizio Mattia, Antonio Pazienti,Andrea Galluzzi', '67068', 'Public'),
  createData(105, 'SNN modeling in vitro SWA', 'Rodentia', 'cerebral cortex', 'not applicable', 'network: brain region', 'population modelling', 'Maurizio Mattia', '60337', 'Public'),
  createData(106, 'An Olivocerebellar Spiking Neural Network With Non-linear Neuron Properties', 'Mus musculus', 'cerebellum', '', 'network: brain region', 'population modelling', "Alice Geminiani, Alessandra Pedrocchi, Egidio D'Angelo", '60337', 'Public'),
];


export default class ModelCatalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'modelData': rows,
      'currentModel': rows[0],
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

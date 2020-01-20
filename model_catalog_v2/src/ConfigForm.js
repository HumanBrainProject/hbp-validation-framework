import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MultipleSelect from './MultipleSelect';

const species = [
  "Rodentia",
  "Mus musculus",
  "Rattus norvegicus",
  "Rattus rattus",
  "Callithrix jacchus",
  "Homo sapiens",
  "Macaca mulatta",
  "Monodelphis domestica",
  "Ornithorhynchus anatinus"
];

const brainRegions = [
  'hippocampus CA1',
  'hippocampus',
  'hippocampal formation',
  'ventral hippocampus',
  'somatosensory cortex',
  'thalamus',
  'brainstem',
  'spinal cord',
  'basal ganglia',
  'cortex',
  'cerebral cortex',
  'cerebellum',
  'whole brain',
  'striatum',
  'thalamocortical',
  '5th cerebellar lobule',
  '6th cerebellar lobule',
  '7th cerebellar lobule',
  '8th cerebellar lobule',
  'lobule 5 of the cerebellar vermis',
  'lobule 6 of the cerebellar vermis',
  'lobule 7 of the cerebellar vermis',
  'lobule 8 of the cerebellar vermis',
  'primary auditory cortex'
];

const organizations = [
  // todo: build this from a query
  "HBP-SP1",
  "HBP-SP2",
  "HBP-SP3",
  "HBP-SP4",
  "HBP-SP5",
  "HBP-SP6",
  "HBP-SP7",
  "HBP-SP8",
  "HBP-SP9",
  "HBP-SP10",
  "HBP-SP11"
];


export default class ConfigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.config;
    this.handleClose = this.handleClose.bind(this);
    this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
    this.handleBrainRegionChange = this.handleBrainRegionChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
  }

  handleClose() {
    this.props.onClose(this.state);
  }

  handleSpeciesChange(event) {
    this.setState({"species": event.target.value});
  }

  handleBrainRegionChange(event) {
    this.setState({"brain_region": event.target.value});
  }

  handleOrganizationChange(event) {
    this.setState({"organization": event.target.value});
  }

  render() {
    return (
      <Dialog onClose={this.handleClose}
              aria-labelledby="simple-dialog-title"
              open={this.props.open}
              fullWidth={true}
              maxWidth="md">
        <DialogTitle>Filter models</DialogTitle>
        <DialogContent>
          <form>
            <MultipleSelect
              itemNames={species}
              label="species"
              value={this.state.species}
              handleChange={this.handleSpeciesChange} />
            <MultipleSelect
              itemNames={brainRegions}
              label="brain region"
              value={this.state.brain_region}
              handleChange={this.handleBrainRegionChange} />
            <MultipleSelect
              itemNames={organizations}
              label="organization"
              value={this.state.organization}
              handleChange={this.handleOrganizationChange} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfigForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

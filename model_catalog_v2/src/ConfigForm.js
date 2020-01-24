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

const cellTypes = [
  'hippocampus CA1 pyramidal cell',
  'hippocampus CA1 basket cell',
  'hippocampus interneuron BP',
  'hippocampus CA1 bistratified cell',
  'hippocampus CA1 lacunosum moleculare neuron',
  'hippocampus CA1 ivy neuron',
  'hippocampus CA3 pyramidal cell',
  'Purkinje cell',
  'medium spiny neuron',
  'interneuron',
  'Golgi cell',
  'pyramidal cell',
  'granule cell',
  'cerebellar granule cell',
  'L2/3 chandelier cell',
  'fast spiking interneuron',
  'spiny stellate neuron',
  'L5 tufted pyramidal cell',
  'L2/3 pyramidal cell',
  'medium spiny neuron (D2 type)',
  'L6 inverted pyramidal cell',
  'L4 Martinotti cell',
  'medium spiny neuron (D1 type)',
  'cholinergic interneuron',
  'L1 neurogliaform cell',
  'L2 inverted pyramidal cell'
];

const modelScopes = [
  'subcellular',
  'subcellular: spine',
  'subcellular: ion channel',
  'subcellular: signalling',
  'subcellular: molecular',
  'single cell',
  'network',
  'network: microcircuit',
  'network: brain region',
  'network: whole brain'
];

const abstractionLevels = [
  'protein structure',
  'systems biology',
  'systems biology: continuous',
  'systems biology: discrete',
  'systems biology: flux balance',
  'spiking neurons',
  'spiking neurons: biophysical',
  'spiking neurons: point neuron',
  'rate neurons',
  'population modelling',
  'population modelling: neural field',
  'population modelling: neural mass',
  'cognitive modelling'
];


export default class ConfigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.config;
    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleClose() {
    this.props.onClose(this.state);
  }

  handleFieldChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
              handleChange={this.handleFieldChange} />
            <MultipleSelect
              itemNames={brainRegions}
              label="brain region"
              value={this.state.brain_region}
              handleChange={this.handleFieldChange} />
            <MultipleSelect
              itemNames={cellTypes}
              label="cell type"
              value={this.state.cell_type}
              handleChange={this.handleFieldChange} />
            <MultipleSelect
              itemNames={modelScopes}
              label="model scope"
              value={this.state.model_scope}
              handleChange={this.handleFieldChange} />
            <MultipleSelect
              itemNames={abstractionLevels}
              label="abstraction_level"
              value={this.state.abstraction_level}
              handleChange={this.handleFieldChange} />
            <MultipleSelect
              itemNames={organizations}
              label="organization"
              value={this.state.organization}
              handleChange={this.handleFieldChange} />
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

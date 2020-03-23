import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import SingleSelect from './SingleSelect';
import MultipleSelect from './MultipleSelect';
import PersonSelect from './PersonSelect';
import ArrayOfModelInstanceForms from './ArrayOfModelInstanceForms';


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


// todo: validate alias (unique)


export default class AddModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);

    this.state = {
      name: "",
      alias: "",
      authors: [],
      owners: [],
      public: false,
      description: "",
      species: [],
      brain_region: [],
      cell_type: [],
      model_scope: "",
      abstraction_level: "",
      organization: [],
      instances: [{
        version: "",
        description: "",
        parameters: "",
        morphology: "",
        download_location: "",
        code_format: "",
        license: ""
      }]
    }
  }

  handleClose() {
    this.props.onClose(this.state);
  }

  handleFieldChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;

    if (name == "public") {
        value = target.checked;
    }
    console.log(name + " => ");
    console.log(value);
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Dialog onClose={this.handleClose}
              aria-labelledby="Form for adding a new model to the catalog"
              open={this.props.open}
              fullWidth={true}
              maxWidth="md">
        <DialogTitle>Add a new model to the catalog</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField name="name" label="Name" value={this.state.name}
                           onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                           helperText="Please choose an informative name that will distinguish the model from other, similar models" />
              </Grid>
              <Grid item xs={12}>
                <PersonSelect name="authors" label="Author(s)" value={this.state.authors}
                              onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                              helperText="Enter author names as 'Last name, First name'" />
              </Grid>
              <Grid item xs={12}>
                <PersonSelect name="owners" label="Custodian(s)" value={this.state.owners}
                              onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                              helperText="Enter custodian names as 'Last name, First name'" />
              </Grid>
              <Grid item xs={9}>
                <TextField name="alias" label="Short name" value={this.state.alias}
                           onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                           helperText="(optional) Please choose a short name (easier to remember than a long ID)" />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                    control={<Switch checked={this.state.public} onChange={this.handleFieldChange} name="public" />}
                    label="Public"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField multiline rows="6" name="description" label="Description" value={this.state.description}
                           onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                           helperText="The description may be formatted with Markdown" />
              </Grid>
              <Grid item xs={12}>
                <MultipleSelect
                  itemNames={species}
                  label="species"
                  value={this.state.species}
                  handleChange={this.handleFieldChange} />
              </Grid>
              <Grid item xs={12}>
                <MultipleSelect
                  itemNames={brainRegions}
                  label="brain region"
                  value={this.state.brain_region}
                  handleChange={this.handleFieldChange} />
              </Grid>
              <Grid item xs={12}>
                <MultipleSelect
                  itemNames={cellTypes}
                  label="cell type"
                  value={this.state.cell_type}
                  handleChange={this.handleFieldChange} />
              </Grid>
              <Grid item xs={12}>
                <SingleSelect
                    itemNames={modelScopes}
                    label="model scope"
                    value={this.state.model_scope}
                    handleChange={this.handleFieldChange} />
              </Grid>
              <Grid item xs={12}>
                <SingleSelect
                    itemNames={abstractionLevels}
                    label="abstraction level"
                    value={this.state.abstraction_level}
                    handleChange={this.handleFieldChange} />
              </Grid>
              <Grid item xs={12}>
                <MultipleSelect
                  itemNames={organizations}
                  label="organization"
                  value={this.state.organization}
                  handleChange={this.handleFieldChange} />
              </Grid>
              <ArrayOfModelInstanceForms
                name="instances"
                value={this.state.instances}
                onChange={this.handleFieldChange} />
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Add Model
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddModelForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

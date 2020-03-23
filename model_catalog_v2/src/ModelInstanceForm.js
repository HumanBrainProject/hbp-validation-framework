import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


export default class ModelInstanceForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(event) {
    let data = { ...this.props.value };
    data[event.target.name] = event.target.value;
    this.props.onChange({
        target: {
            value: data
        }
    });
  }

  render() {
    return (
      <React.Fragment>
      <Grid item xs={12}>
        <TextField name="version" label="Version" value={this.props.value.version}
                   onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                   helperText="If the code is under version control, the version number should match the name of a tag or a commit ID" />
      </Grid>
      <Grid item xs={12}>
        <TextField name="download_location" label="Code location (URL)" value={this.props.value.download_location}
                   onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                   helperText=" " />
      </Grid>
      <Grid item xs={12}>
        <TextField name="license" label="license" value={this.props.value.license}
                   onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                   helperText="For guidance on choosing a licence, see https://choosealicense.com" />
      </Grid>
      <Grid item xs={12}>
        <TextField name="code_format" label="description" value={this.props.value.description}
                   onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                   helperText="(optional) Short description of how this version/parameterization of the model is different from others" />
      </Grid>
      <Grid item xs={12}>
        <TextField name="description" label="code_format" value={this.props.value.code_format}
                   onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                   helperText="(optional)" />
      </Grid>
      <Grid item xs={12}>
        <TextField name="parameters" label="parameters" value={this.props.value.parameters}
                   onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                   helperText="(optional) Parameterization of the model" />
      </Grid>
      <Grid item xs={12}>
        <TextField name="morphology" label="morphology" value={this.props.value.morphology}
                   onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
                   helperText="(for single neuron models) Location of the morphology data for thr model" />
      </Grid>
      </React.Fragment>
    );
  }
}
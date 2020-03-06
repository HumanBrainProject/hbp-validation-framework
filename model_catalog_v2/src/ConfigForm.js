import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MultipleSelect from './MultipleSelect';
import axios from 'axios';

export default class ConfigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  selected: props.config,
                  validValues: null,
                  error: null
                 };

    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this.getConfigValidValues();
  }

  getConfigValidValues = () => {
    let url = this.props.baseUrl.replace("/models/", "/authorizedcollabparameterrest/?python_client=true");
    return axios.get(url)
      .then(res => {
        this.setState({
          validValues: res.data
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        console.log(err)
        this.setState({
          error: err
        });
      }
    );
  };

  handleClose() {
    this.props.onClose(this.state.selected);
  }

  handleFieldChange(event) {
    const newStateSelected = {...this.state.selected}
    newStateSelected[event.target.name] = event.target.value;
    this.setState({selected: newStateSelected});
  }

  renderError() {
    return (
      <Dialog onClose={this.handleClose}
              aria-labelledby="simple-dialog-title"
              open={this.props.open}
              fullWidth={true}
              maxWidth="md">
        <DialogTitle>Error :-(</DialogTitle>
          <DialogContent>
            <div>
              Uh oh: {this.state.error.message}
            </div>
          </DialogContent>
      </Dialog>
    );
  };

  render() {
    if (this.state.error) {
      return this.renderError();
    } else {
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
                itemNames={this.state.validValues == null ? [] : this.state.validValues.species}
                label="species"
                value={this.state.selected.species}
                handleChange={this.handleFieldChange} />
              <MultipleSelect
                itemNames={this.state.validValues == null ? [] : this.state.validValues.brain_region}
                label="brain region"
                value={this.state.selected.brain_region}
                handleChange={this.handleFieldChange} />
              <MultipleSelect
                itemNames={this.state.validValues == null ? [] : this.state.validValues.cell_type}
                label="cell type"
                value={this.state.selected.cell_type}
                handleChange={this.handleFieldChange} />
              <MultipleSelect
                itemNames={this.state.validValues == null ? [] : this.state.validValues.model_scope}
                label="model scope"
                value={this.state.selected.model_scope}
                handleChange={this.handleFieldChange} />
              <MultipleSelect
                itemNames={this.state.validValues == null ? [] : this.state.validValues.abstraction_level}
                label="abstraction_level"
                value={this.state.selected.abstraction_level}
                handleChange={this.handleFieldChange} />
              <MultipleSelect
                itemNames={this.state.validValues == null ? [] : this.state.validValues.organization}
                label="organization"
                value={this.state.selected.organization}
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
}

ConfigForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

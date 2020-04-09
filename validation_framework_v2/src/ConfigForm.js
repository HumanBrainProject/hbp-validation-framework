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
                  error: null,
                 };

    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this.getConfigValidValues();
  }

  getConfigValidValues = () => {
    let url = this.props.baseUrl + "/authorizedcollabparameterrest/?python_client=true";
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
              {Object.keys(this.state.selected).map(filter => (
                <MultipleSelect
                  itemNames={this.state.validValues == null ? [] : this.state.validValues[filter]}
                  label={filter}
                  value={this.state.selected[filter]}
                  handleChange={this.handleFieldChange}
                  key={filter} />
              ))}
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

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ErrorDialog from './ErrorDialog';

import axios from 'axios';

import SingleSelect from './SingleSelect';
import PersonSelect from './PersonSelect';
import ArrayOfModelInstanceForms from './ArrayOfModelInstanceForms';

import { baseUrl, filterModelKeys } from "./globals";

// todo: validate alias (unique)

export default class AddModelForm extends React.Component {
	signal = axios.CancelToken.source();

	constructor(props) {
		super(props);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);

		this.state = {
			errorAddModel: null,
			model: {
				name: "",
				alias: "",
				author: [],
				owner: [],
				public: false,
				description: "",
				species: "",
				brain_region: "",
				cell_type: "",
				model_scope: "",
				abstraction_level: "",
				organization: "",
				instances: [{
					version: "",
					description: "",
					parameters: "",
					morphology: "",
					source: "",
					code_format: "",
					license: ""
				}],
				app: {
					collab_id: "8123"  // TODO: change for prod! -> temp for testing: Validation Framework collab (v1)
				}
			}
		}

		this.handleErrorAddDialogClose = this.handleErrorAddDialogClose.bind(this);
	}

	handleErrorAddDialogClose() {
		this.setState({ 'errorAddModel': null });
	};

	handleCancel() {
		console.log("Hello")
		this.props.onClose();
	}

	handleSubmit() {
		console.log("Hi")
		let payload = {
			"model": { ...this.state.model },
			"model_instance": this.state.model.instances,
			"model_image": []
		}
		payload.model.private = !payload.model.public;
		delete payload.model.public;
		delete payload.model.instances;
		delete payload.model.app;
		console.log(payload);

		let url = baseUrl + "/models/?collab_id=" + this.state.model.app.collab_id;
		let config = {
			headers: {
				'Authorization': 'Bearer ' + this.props.auth.token,
				'Content-type': 'application/json'
			}
		};
		axios.post(url, payload, config)
			.then(res => {
				console.log(res);
				// this.setState({id: value}); // TODO: attach id to model object
				this.props.onClose(this.state);
			})
			.catch(err => {
				if (axios.isCancel(err)) {
					console.log('Error: ', err.message);
				} else {
					console.log(err);
					this.setState({
						errorAddModel: err,
					});
				}
			}
			);
	}

	handleFieldChange(event) {
		const target = event.target;
		let value = target.value;
		const name = target.name;

		if (name === "public") {
			value = target.checked;
		}
		console.log(name + " => ");
		console.log(value);
		this.setState({
			[name]: value
		});
	}

	render() {
		let errorMessage = "";
		if (this.state.errorAddModel) {
			errorMessage = <ErrorDialog open={Boolean(this.state.errorAddModel)} handleErrorDialogClose={this.handleErrorAddDialogClose} error={this.state.errorAddModel.message || this.state.errorAddModel} />
		}
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
								<TextField name="name" label="Name" value={this.state.model.name}
									onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
									helperText="Please choose an informative name that will distinguish the model from other, similar models" />
							</Grid>
							<Grid item xs={12}>
								<PersonSelect name="authors" label="Author(s)" value={this.state.model.author}
									onChange={this.handleFieldChange} variant="outlined" fullWidth={true} newChipKeyCodes={[13, 186]}
									helperText="Enter author names separated by semicolon: firstName1 lastName1; firstName2 lastName2" />
							</Grid>
							<Grid item xs={12}>
								<PersonSelect name="owners" label="Custodian(s)" value={this.state.model.owner}
									onChange={this.handleFieldChange} variant="outlined" fullWidth={true} newChipKeyCodes={[13, 186]}
									helperText="Enter author names separated by semicolon: firstName1 lastName1; firstName2 lastName2" />
							</Grid>
							<Grid item xs={9}>
								<TextField name="alias" label="Short name" value={this.state.model.alias}
									onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
									helperText="(optional) Please choose a short name (easier to remember than a long ID)" />
							</Grid>
							<Grid item xs={3}>
								<FormControlLabel
									control={<Switch checked={this.state.model.public} onChange={this.handleFieldChange} name="public" />}
									label="Public"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField multiline rows="6" name="description" label="Description" value={this.state.model.description}
									onChange={this.handleFieldChange} variant="outlined" fullWidth={true}
									helperText="The description may be formatted with Markdown" />
							</Grid>
							{filterModelKeys.map(filter => (
								<Grid item xs={12} key={filter}>
									<SingleSelect
										itemNames={(this.props.filters[filter] && this.props.filters[filter].length) ? this.props.filters[filter] : this.props.validFilterValues[filter]}
										label={filter}
										value={this.state.model[filter]}
										handleChange={this.handleFieldChange} />
								</Grid>
							))}
							<ArrayOfModelInstanceForms
								name="instances"
								value={this.state.model.instances}
								onChange={this.handleFieldChange} />
						</Grid>
					</form>
					<div>
						{errorMessage}
          			</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleCancel} color="default">
						Cancel
          </Button>
					<Button onClick={this.handleSubmit} color="primary">
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

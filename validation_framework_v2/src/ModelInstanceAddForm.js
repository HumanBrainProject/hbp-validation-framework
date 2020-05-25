import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import ErrorDialog from './ErrorDialog';
import { baseUrl } from "./globals";
import ModelInstanceArrayOfForms from './ModelInstanceArrayOfForms';
import ContextMain from './ContextMain';

let versionAxios = null;

export default class ModelInstanceAddForm extends React.Component {
	signal = axios.CancelToken.source();
	static contextType = ContextMain;

	constructor(props, context) {
		super(props, context);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.createPayload = this.createPayload.bind(this);
		this.checkRequirements = this.checkRequirements.bind(this);
		this.checkVersionUnique = this.checkVersionUnique.bind(this);

		const [authContext, setAuthContext] = this.context.auth;
		// console.log(authContext);
		// console.log(authContext.token);

		this.state = {
			version: "",
			description: "",
			parameters: "",
			morphology: "",
			source: "",
			code_format: "",
			license: "",
			auth: authContext
		}

		this.handleErrorAddDialogClose = this.handleErrorAddDialogClose.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.checkVersionUnique = this.checkVersionUnique.bind(this);
		this.createPayload = this.createPayload.bind(this);
	}

	handleErrorAddDialogClose() {
		this.setState({ 'errorAddModelInstance': null });
	};

	handleCancel() {
		console.log("Hello")
		this.props.onClose();
	}

	checkVersionUnique(newVersion) {
		console.log(versionAxios);
		if (versionAxios) {
			versionAxios.cancel();
		}
		versionAxios = axios.CancelToken.source();
		console.log(newVersion);
		
		let url = baseUrl + "/model-instances/?model_id=" + this.props.modelID + "&version=" + newVersion;
		let config = {
			cancelToken: versionAxios.token,
			headers: {
				'Authorization': 'Bearer ' + this.state.auth.token,
			}
		};
		axios.get(url, config)
			.then(res => {
				console.log(res.data.instances);
				if (res.data.instances.length === 0) {
					return true;
				} else {
					return false;
				}
			})
			.catch(err => {
				if (axios.isCancel(err)) {
					console.log('Error: ', err.message);
				} else {
					console.log(err);
				}
				this.setState({
					isVersionNotUnique: true
				});
			});
		return false
	}

	createPayload() {
		return [
			{
				model_id: this.props.modelID,
				version: this.state.version,
				description: this.state.description,
				parameters: this.state.parameters,
				morphology: this.state.morphology,
				source: this.state.source,
				code_format: this.state.code_format,
				license: this.state.license,
			}
		]
	}

	async checkRequirements(payload) {
		// rule 1: model instance version cannot be empty
		let error = null;
		console.log(payload.version)
		if (!payload.version) {
			error = "Model instance 'version' cannot be empty!"
		}
		// rule 2: check if version is unique
		let isUnique = await this.checkVersionUnique(payload.version);
		if (!isUnique) {
			error = "Model instance 'version' has to be unique within a model!"
		}
		if (error) {
			console.log(error);
			this.setState({
				errorAddModelInstance: error,
			});
			return false;
		} else {
			return true;
		}
	}

	handleSubmit() {
		let payload = this.createPayload();
		console.log(payload);
		if (this.checkRequirements(payload)) {
			let url = baseUrl + "/model-instances/";
			let config = {
				cancelToken: this.signal.token,
				headers: {
					'Authorization': 'Bearer ' + this.state.auth.token,
					'Content-type': 'application/json'
				}
			};

			axios.post(url, payload, config)
				.then(res => {
					console.log(res);
					this.props.onClose({
						...payload.model,
						id: res.data.uuid,
						uri: "<< missing data >>",
						app: this.state.app,
						instances: payload.model_instance,
						// TODO: add instance ID to 'instances' so that newly 
						// created models have data necessary for ModelDetail page
						images: payload.model_image
					});
				})
				.catch(err => {
					if (axios.isCancel(err)) {
						console.log('Error: ', err.message);
					} else {
						console.log(err);
						this.setState({
							errorAddModelInstance: err,
						});
					}
				}
				);
		}
	}

	handleFieldChange(event) {
		const target = event.target;
		let value = target.value;
		const name = target.name;
		console.log(name + " => " + value);
		if (name === "version") {
			this.checkVersionUnique(value)
		}
		this.setState({
			[name]: value
		});
	}

	render() {
		let errorMessage = "";
		if (this.state.errorAddModelInstance) {
			errorMessage = <ErrorDialog open={Boolean(this.state.errorAddModelInstance)} handleErrorDialogClose={this.handleErrorAddDialogClose} error={this.state.errorAddModelInstance.message || this.state.errorAddModelInstance} />
		}
		return (
			<Dialog onClose={this.handleClose}
				aria-labelledby="Form for adding a new model instance"
				open={this.props.open}
				fullWidth={true}
				maxWidth="md">
				<DialogTitle>Add a new model instance</DialogTitle>
				<DialogContent>
					<form>
						<Grid container spacing={3}>
							<ModelInstanceArrayOfForms
								name="instances"
								value={this.state.instances}
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
						Add Model Instance
          </Button>
				</DialogActions>
			</Dialog>
		);
	}
}

ModelInstanceAddForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

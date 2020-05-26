import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import Markdown from './Markdown';
import { Typography, Button } from '@material-ui/core';
import ModelInstanceAddForm from './ModelInstanceAddForm';
import ModelInstanceEditForm from './ModelInstanceEditForm';
import ErrorDialog from './ErrorDialog';
import Tooltip from '@material-ui/core/Tooltip';

function InstanceParameter(props) {
	if (props.value) {
		return <Typography variant="body2"><b>{props.label}: </b>{props.value}</Typography>
	} else {
		return ""
	}
	// return <Typography variant="body2"><b>{props.label}: </b>{props.value}</Typography>
}

export default class ModelDetailContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			openAddInstanceForm: false,
			openEditInstanceForm: false,
			instances: this.props.instances,
			instancesWithResults: [...new Set(this.props.results.map(a => a.model_version_id))],
			currentInstance: null
		}
		this.handleAddModelInstanceFormClose = this.handleAddModelInstanceFormClose.bind(this);
		this.handleEditModelInstanceFormClose = this.handleEditModelInstanceFormClose.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
	}

	handleErrorEditDialogClose() {
		this.setState({ 'errorEditModelInstance': null });
	};

	handleAddModelInstanceFormClose(newModelInstance) {
		console.log("close add")
		console.log(newModelInstance)
		this.setState({ 'openAddInstanceForm': false });
		if (newModelInstance) {
			let instances = this.state.instances;
			instances.push(newModelInstance)
			this.setState({
				instances: instances,
			});
		}
	}

	handleEditModelInstanceFormClose(modelInstance) {
		console.log("close edit")
		console.log(modelInstance)
		this.setState({ 'openEditInstanceForm': false });
		if (modelInstance) {
			let instances = this.state.instances;
			this.setState({
				instances: instances.map(obj => [modelInstance].find(o => o.id === obj.id) || obj)
			});
		}
	}

	handleEditClick(instance) {
		if (this.state.instancesWithResults.includes(instance.id)) {
			this.setState({
				errorEditModelInstance: "This model instance cannot be edited as there are validation results associated with it!",
			});
		} else {
			this.setState({ 
				openEditInstanceForm: true, 
				currentInstance : instance
			})
		}
	}

	render() {
		let errorMessage = "";
		if (this.state.errorEditModelInstance) {
			errorMessage = <ErrorDialog open={Boolean(this.state.errorEditModelInstance)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditModelInstance.message || this.state.errorEditModelInstance} />
		}

		let addInstanceForm = "";
		if (this.state.openAddInstanceForm) {
			addInstanceForm = <ModelInstanceAddForm
				open={this.state.openAddInstanceForm}
				onClose={this.handleAddModelInstanceFormClose}
				modelID={this.props.id}
			/>
		}

		let editInstanceForm = "";
		if (this.state.openEditInstanceForm) {
			editInstanceForm = <ModelInstanceEditForm
				open={this.state.openEditInstanceForm}
				onClose={this.handleEditModelInstanceFormClose}
				instance={this.state.currentInstance}
				modelID={this.props.id}
			/>
		}

		return (
			<React.Fragment>
				{console.log(this.state.instancesWithResults)}
				<Grid container xs={9} direction="column" item={true}>
					<Grid item>
						<Box p={2}>
							<Typography><b>Description: </b></Typography>
							<Markdown>{this.props.description}</Markdown>
						</Box>
					</Grid>
					<Grid item>
						<Grid container xs={9} direction="row" item={true} style={{ justify: "space-between", flex: 1 }}>
							<Grid item>
								<Box px={2} pb={0} xs={3}>
									<Typography variant="subtitle1"><b>Versions</b></Typography>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Button variant="contained" color="primary" onClick={() => this.setState({ openAddInstanceForm: true })}>
									Add new version
								</Button>
							</Grid>
						</Grid>
						{this.state.instances.map(instance => (
							<Box m={2} p={2} pb={0} style={{ backgroundColor: '#eeeeee' }} key={instance.id}>
								<div style={{
									display: "flex",
									alignItems: "center",
								}}>
									<Box display="flex" flexDirection="row">
										<p variant="subtitle2">Version: {instance.version}</p>
										<Tooltip placement="right" title={this.state.instancesWithResults.includes(instance.id) ? "Cannot Edit" : "Edit"}>
											<IconButton aria-label="edit model instance" onClick={() => this.handleEditClick(instance)}>
												<EditIcon />
											</IconButton>
										</Tooltip>
									</Box>
								</div>
								<Typography variant="body2" color="textSecondary">{instance.timestamp}</Typography>
								<InstanceParameter label="Description" value={instance.description} />
								<InstanceParameter label="Source" value={instance.source} />
								<InstanceParameter label="Parameters" value={instance.parameters} />
								<InstanceParameter label="Morphology" value={instance.morphology} />
								<InstanceParameter label="Code format" value={instance.code_format} />
								<InstanceParameter label="License" value={instance.license} />
								<Typography variant="caption" color="textSecondary">ID: {instance.id}</Typography>
								<IconButton aria-label="download code" href={instance.source}>
									<CloudDownloadIcon />
								</IconButton>
							</Box>
						))}
					</Grid>

					<Grid item>
						{/* todo: images */}
					</Grid>
				</Grid>
				<div>
					{addInstanceForm}
				</div>
				<div>
					{editInstanceForm}
				</div>
				<div>
					{errorMessage}
				</div>
			</React.Fragment>
		);
	}
}


// {
//   "code_format" : "nest, dpsnn",
//   "description" : "",
//   "hash" : "",
//   "id" : "9f4d1284-c5c1-43e9-b922-03bbb29de830",
//   "license" : "All Rights Reserved",
//   "parameters" : "",
//   "source" : "https://collab.humanbrainproject.eu/#/collab/11175/nav/83589",
//   "timestamp" : "2018-10-05T12:32:57.352445+00:00",
//   "uri" : "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/modelinstance/v0.1.1/9f4d1284-c5c1-43e9-b922-03bbb29de830",
//   "version" : "00.01.00"
// }
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import Markdown from './Markdown';
import { Typography, Button } from '@material-ui/core';
import TestInstanceAddForm from './TestInstanceAddForm';
import TestInstanceEditForm from './TestInstanceEditForm';
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

export default class TestDetailContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			openAddInstanceForm: false,
			openEditInstanceForm: false,
			instances: this.props.instances,
			instancesWithResults: [...new Set(this.props.results.map(a => a.test_code_id))],
			currentInstance: null,
			errorEditTestInstance: null
		}
		this.handleAddTestInstanceFormClose = this.handleAddTestInstanceFormClose.bind(this);
		this.handleEditTestInstanceFormClose = this.handleEditTestInstanceFormClose.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
	}

	handleErrorEditDialogClose() {
		this.setState({ 'errorEditTestInstance': null });
	};

	handleAddTestInstanceFormClose(newTestInstance) {
		console.log("close add")
		console.log(newTestInstance)
		this.setState({ 'openAddInstanceForm': false });
		if (newTestInstance) {
			let instances = this.state.instances;
			instances.push(newTestInstance)
			this.setState({
				instances: instances,
			});
		}
	}

	handleEditTestInstanceFormClose(testInstance) {
		console.log("close edit")
		console.log(testInstance)
		this.setState({ 'openEditInstanceForm': false });
		if (testInstance) {
			let instances = this.state.instances;
			this.setState({
				instances: instances.map(obj => [testInstance].find(o => o.id === obj.id) || obj)
			});
		}
	}

	handleEditClick(instance) {
		if (this.state.instancesWithResults.includes(instance.id)) {
			this.setState({
				errorEditTestInstance: "This test instance cannot be edited as there are validation results associated with it!",
			});
		} else {
			this.setState({
				openEditInstanceForm: true,
				currentInstance: instance
			})
		}
	}

	render() {
		let errorMessage = "";
		if (this.state.errorEditTestInstance) {
			errorMessage = <ErrorDialog open={Boolean(this.state.errorEditTestInstance)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditTestInstance.message || this.state.errorEditTestInstance} />
		}

		let addInstanceForm = "";
		if (this.state.openAddInstanceForm) {
			addInstanceForm = <TestInstanceAddForm
				open={this.state.openAddInstanceForm}
				onClose={this.handleAddTestInstanceFormClose}
				testID={this.props.id}
			/>
		}

		let editInstanceForm = "";
		if (this.state.openEditInstanceForm) {
			editInstanceForm = <TestInstanceEditForm
				open={this.state.openEditInstanceForm}
				onClose={this.handleEditTestInstanceFormClose}
				instance={this.state.currentInstance}
				testID={this.props.id}
			/>
		}

		return (
			<React.Fragment>
				{console.log(this.state.instancesWithResults)}
				<Grid container xs={9} direction="column" item={true}>
					<Grid item>
						<Box p={2}>
							<Typography><b>Data Location: </b>{this.props.dataLocation}</Typography>
							<br />
							<Typography><b>Protocol: </b></Typography>
							<Markdown>{this.props.protocol}</Markdown>
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
											<IconButton aria-label="edit test instance" onClick={() => this.handleEditClick(instance)}>
												<EditIcon />
											</IconButton>
										</Tooltip>
									</Box>
								</div>
								<Typography variant="body2" color="textSecondary">{instance.timestamp}</Typography>
								<InstanceParameter label="Description" value={instance.description} />
								<InstanceParameter label="Source" value={instance.repository} />
								<InstanceParameter label="Path" value={instance.path} />
								<InstanceParameter label="Parameters" value={instance.parameters} />
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
//   "description" : "",
//   "id" : "5476dea4-af1f-45b1-b0c8-f7867a3d1d42",
//   "old_uuid" : null,
//   "parameters" : null,
//   "path" : "hbp_validation_framework.sample.SampleTest",
//   "repository" : "https://github.com/HumanBrainProject/hbp-validation-client.git",
//   "timestamp" : "2019-12-18T14:50:48.295543",
//   "uri" : "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationscript/v0.1.0/5476dea4-af1f-45b1-b0c8-f7867a3d1d42",
//   "version" : "1.0"
// }

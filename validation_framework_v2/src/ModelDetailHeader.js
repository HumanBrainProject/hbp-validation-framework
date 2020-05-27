import React from 'react';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import PublicIcon from '@material-ui/icons/Public';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import ModelEditForm from './ModelEditForm';
import ErrorDialog from './ErrorDialog';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

function AccessibilityIcon(props) {
	if (props.private) {
		return (
			<Tooltip title="private" placement="top">
				<LockIcon color="disabled" />
			</Tooltip>
		)
	} else {
		return (
			<Tooltip title="public" placement="top">
				<PublicIcon color="disabled" />
			</Tooltip>
		)
	}
}

export default class ModelDetailHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			openEditForm: false,
			errorEditModel: null
		}
		this.handleEditModelFormClose = this.handleEditModelFormClose.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
	}

	handleErrorEditDialogClose() {
		this.setState({ 'errorEditModel': null });
	};

	handleEditModelFormClose(model) {
		console.log("close edit")
		console.log(model)
		this.setState({ 'openEditForm': false });
		if (model) {
			this.props.updateCurrentModelData(model)
		}
	}

	handleEditClick() {
		this.setState({
			openEditForm: true,
		})
	}

	render() {
		let errorMessage = "";
		if (this.state.errorEditModel) {
			errorMessage = <ErrorDialog open={Boolean(this.state.errorEditModel)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditModel.message || this.state.errorEditModel} />
		}

		let editForm = "";
		if (this.state.openEditForm) {
			editForm = <ModelEditForm
				open={this.state.openEditForm}
				onClose={this.handleEditModelFormClose}
				modelData={this.props.modelData}
			/>
		}

		return (
			<React.Fragment>
				<Grid item>
					<Typography variant="h4" gutterBottom>
						<AccessibilityIcon private={this.props.private} /> {this.props.name}
						<Tooltip placement="right" title="Edit Model">
							<IconButton aria-label="edit model" onClick={() => this.handleEditClick()}>
								<EditIcon />
							</IconButton>
						</Tooltip>
					</Typography>
					<Typography variant="h5" gutterBottom>
						{this.props.authors}
					</Typography>
					<Typography variant="caption" color="textSecondary" gutterBottom>
						ID: <b>{this.props.id}</b> &nbsp;&nbsp;&nbsp; Custodian: <b>{this.props.owner}</b> &nbsp;&nbsp;&nbsp; {this.props.alias ? "Alias: " : ""} <b>{this.props.alias ? this.props.alias : ""}</b>
					</Typography>
				</Grid>
				{/* <Grid item> */}
				{/* optional image goes here */}
				{/* </Grid> */}
				<div>
					{editForm}
				</div>
				<div>
					{errorMessage}
				</div>
			</React.Fragment>
		);
	}
}

//  style={{backgroundColor: "#ddddff"}}
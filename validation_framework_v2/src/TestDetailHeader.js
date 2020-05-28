import React from 'react';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import TestEditForm from './TestEditForm';
import ErrorDialog from './ErrorDialog';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default class TestDetailHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			openEditForm: false,
			errorEditTest: null
		}
		this.handleEditTestFormClose = this.handleEditTestFormClose.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
	}

	handleErrorEditDialogClose() {
		this.setState({ 'errorEditTest': null });
	};

	handleEditTestFormClose(test) {
		console.log("close edit")
		console.log(test)
		this.setState({ 'openEditForm': false });
		if (test) {
			this.props.updateCurrentTestData(test)
		}
	}

	handleEditClick() {
		this.setState({
			openEditForm: true,
		})
	}

	render() {
		let errorMessage = "";
		if (this.state.errorEditTest) {
			errorMessage = <ErrorDialog open={Boolean(this.state.errorEditTest)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditTest.message || this.state.errorEditTest} />
		}

		let editForm = "";
		if (this.state.openEditForm) {
			editForm = <TestEditForm
				open={this.state.openEditForm}
				onClose={this.handleEditTestFormClose}
				testData={this.props.testData}
			/>
		}

		return (
			<React.Fragment>
				<Grid item>
					<Typography variant="h4" gutterBottom>
						{this.props.name}
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
						ID: <b>{this.props.id}</b> &nbsp;&nbsp;&nbsp; Created: <b>{this.props.creationDate}</b> &nbsp;&nbsp;&nbsp; {this.props.alias ? "Alias: " : ""} <b>{this.props.alias ? this.props.alias : ""}</b> &nbsp;&nbsp;&nbsp; {this.props.status ? "Status: " : ""} <b>{this.props.status ? this.props.status : ""}</b>
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

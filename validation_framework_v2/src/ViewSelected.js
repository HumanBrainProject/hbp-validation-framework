import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import { formatValue, formatLabel } from "./utils";

function EntityParameter(props) {
	if (props.label === "name") {
		return (
			<TableRow>
				<TableCell align="center" style={{ backgroundColor: "grey" }}><Typography variant="body2"><b>{formatLabel(props.label)}</b></Typography></TableCell>
				{props.data.map((entity, ind) => (
					<TableCell key={ind} style={{ backgroundColor: "#194D33" }}><Typography variant="body2"><b>{formatValue(props.label, entity[props.label])}</b></Typography></TableCell>
				))}
			</TableRow>
		)
	} else {
		return (
			<TableRow>
				<TableCell align="center" style={{ backgroundColor: "grey" }}><Typography variant="body2"><b>{formatLabel(props.label)}</b></Typography></TableCell>
				{props.data.map((entity, ind) => (
					<TableCell key={ind}><Typography variant="body2">{formatValue(props.label, entity[props.label])}</Typography></TableCell>
				))}
			</TableRow>
		)
	}
}

export default class ViewSelected extends React.Component {
	render() {
		let title = (this.props.entity === "models") ? "View Model(s)" : "View Test(s)";
		const model_params = ["name", "id", "alias", "species", "brain_region", "cell_type", "model_scope", "abstraction_level", "author", "owner", "organization", "app", "private"]; // "uri",
		const test_params = ["name", "id", "alias", "species", "brain_region", "cell_type", "author", "status", "creation_date", "data_type", "data_modality", "test_type", "score_type"]; // "uri", "data_location"
		let params = (this.props.entity === "models") ? model_params : test_params;

		return (
			<Dialog onClose={this.props.onClose}
				aria-labelledby="simple-dialog-title"
				open={this.props.open}
				fullWidth={true}
				maxWidth={false}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>

					<TableContainer component={Paper}>
						<Table>
							<TableBody>
								{params.map((param) => (
									<EntityParameter label={param} data={this.props.selectedData} key={param} />
								))}
							</TableBody>
						</Table>
					</TableContainer>

				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onClose} color="primary">
						Ok
            </Button>
				</DialogActions>
			</Dialog>
		);
	}
}
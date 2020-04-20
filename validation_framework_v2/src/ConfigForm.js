import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MultipleSelect from './MultipleSelect';
import axios from 'axios';

import ThreeWaySwitch from './ThreeWaySwitch'
import { baseUrl, displayValid, filterKeys, filterModelKeys, filterTestKeys } from "./globals";

export default class ConfigForm extends React.Component {
	signal = axios.CancelToken.source();

	constructor(props) {
		super(props);
		let selectedConfig = {};
		if (props.display === 'Only Models') {
			filterModelKeys.forEach(function (key, index) {
				selectedConfig[key] = props.config[key];
			});
		} else if (props.display === 'Only Tests') {
			filterTestKeys.forEach(function (key, index) {
				selectedConfig[key] = props.config[key];
			});
		} else {
			selectedConfig = props.config;
		}

		this.state = {
			selected: selectedConfig,
			display: props.display,
			validValues: null,
			error: null,
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleDisplayChange = this.handleDisplayChange.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	componentDidMount() {
		this.getConfigValidValues();
	}

	componentWillUnmount() {
		this.signal.cancel('REST API call canceled!');
	}

	getConfigValidValues = () => {
		let url = baseUrl + "/authorizedcollabparameterrest/?python_client=true";
		let config = {
			cancelToken: this.signal.token
		}
		return axios.get(url, config)
			.then(res => {
				this.setState({
					validValues: res.data
				});
			})
			.catch(err => {
				if (axios.isCancel(err)) {
					console.log('Error: ', err.message);
				} else {
					// Something went wrong. Save the error in state and re-render.
					this.setState({
						error: err
					});
				}
			}
			);
	};

	handleClose() {
		this.props.onClose(this.state.display, this.state.selected);
	}

	handleDisplayChange(display) {
		this.setState({ display: display });
	}

	handleFieldChange(event) {
		const newStateSelected = { ...this.state.selected }
		newStateSelected[event.target.name] = event.target.value;
		this.setState({ selected: newStateSelected });
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
			let showFilters = {};
			if (this.state.display === "Only Models") {
				showFilters = filterModelKeys;
			} else if (this.state.display === "Only Tests") {
				showFilters = filterTestKeys;
			} else {
				showFilters = filterKeys;
			}
			return (
				<Dialog onClose={this.handleClose}
					aria-labelledby="simple-dialog-title"
					open={this.props.open}
					fullWidth={true}
					maxWidth="md">
					<DialogTitle>Configure App</DialogTitle>
					<DialogContent>
						<form>
							<ThreeWaySwitch
								values={displayValid}
								selected={this.state.display}
								onChange={this.handleDisplayChange} />
							{showFilters.map(filter => (
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

import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import ContextMain from './ContextMain';

export default class TestInstanceForm extends React.Component {
	static contextType = ContextMain;

	constructor(props, context) {
		super(props, context);

		const [ validFilterValuesContext, ] = this.context.validFilterValues;

		this.state = {
			validFilterValues: validFilterValuesContext
		}

		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange(event) {
		let data = { ...this.props.value };
		data[event.target.name] = event.target.value;
		this.props.onChange({
			target: {
				value: data
			}
		});
	}

	render() {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<TextField name="version" label="Version" defaultValue={this.props.value.version}
						onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
						helperText="If the code is under version control, the version number should match the name of a tag or a commit ID" />
				</Grid>
				<Grid item xs={12}>
					<TextField name="repository" label="Repository (URL)" defaultValue={this.props.value.repository}
						onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
						helperText="Specify the location of test source code (e.g. GitHub)" />
				</Grid>
				<Grid item xs={12}>
					<TextField name="path" label="path" defaultValue={this.props.value.path}
						onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
						helperText="Specify the Python path within test module" />
				</Grid>
				<Grid item xs={12}>
					<TextField name="description" label="description" defaultValue={this.props.value.description}
						onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
						helperText="(optional) Short description of how this version/parameterization of the test is different from others" />
				</Grid>
				<Grid item xs={12}>
					<TextField name="parameters" label="parameters" defaultValue={this.props.value.parameters}
						onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
						helperText="(optional) Parameterization of the test" />
				</Grid>
			</React.Fragment>
		);
	}
}
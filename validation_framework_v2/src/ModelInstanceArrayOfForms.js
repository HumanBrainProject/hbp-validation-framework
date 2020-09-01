import React from 'react';
import ModelInstanceForm from './ModelInstanceForm'

export default class ModelInstanceArrayOfForms extends React.Component {
	constructor(props) {
		super(props);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange = (index) => (event) => {
		let data = [...this.props.value];
		data[index] = event.target.value;
		this.props.onChange({
			target: {
				name: this.props.name,
				value: data
			}
		});
	}

	render() {
		return (
			<React.Fragment>
				{this.props.value.map((instance_data, index) =>
					<ModelInstanceForm
						key={index}
                        value={instance_data}
                        modelScope={this.props.modelScope}
						onChange={this.handleFieldChange(index)} />
				)}
			</React.Fragment>
		)
	}
}

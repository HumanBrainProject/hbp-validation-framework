import React from "react";
import TestInstanceForm from "./TestInstanceForm";

export default class TestInstanceArrayOfForms extends React.Component {
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
                value: data,
            },
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.props.value.map((instance_data, index) => (
                    <TestInstanceForm
                        key={index}
                        value={instance_data}
                        onChange={this.handleFieldChange(index)}
                    />
                ))}
            </React.Fragment>
        );
    }
}

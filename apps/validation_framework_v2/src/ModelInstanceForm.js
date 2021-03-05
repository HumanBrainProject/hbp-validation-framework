import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import SingleSelect from './SingleSelect';
import { filterModelInstanceKeys } from "./globals";
import ContextMain from './ContextMain';

export default class ModelInstanceForm extends React.Component {
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);

        const [validFilterValuesContext,] = this.context.validFilterValues;

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
                    <TextField name="source" label="Code location (URL)" defaultValue={this.props.value.source}
                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                        helperText=" " />
                </Grid>
                {filterModelInstanceKeys.map(filter => (
                    <Grid item xs={12} key={filter}>
                        <SingleSelect
                            itemNames={this.state.validFilterValues[filter]}
                            label={filter}
                            value={this.props.value[filter]}
                            handleChange={this.handleFieldChange}
                            helperText="For guidance on choosing a licence, see https://choosealicense.com" />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <TextField name="description" label="description" defaultValue={this.props.value.description}
                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                        helperText="(optional) Short description of how this version/parameterization of the model is different from others" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="code_format" label="code_format" defaultValue={this.props.value.code_format}
                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                        helperText="(optional)" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="parameters" label="parameters" defaultValue={this.props.value.parameters}
                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                        helperText="(optional) Parameterization of the model" />
                </Grid>
                {(this.props.modelScope === "single cell")
                    // || (this.props.modelScope.startsWith('network'))
                    ?
                    <Grid item xs={12}>
                        <TextField name="morphology" label="morphology" defaultValue={this.props.value.morphology}
                            onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                            helperText="(for single neuron models) Location of the morphology data for the model" />
                    </Grid>
                    : ""
                }
            </React.Fragment>
        );
    }
}
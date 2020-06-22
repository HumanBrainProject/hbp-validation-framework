import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ErrorDialog from './ErrorDialog';
import ContextMain from './ContextMain';
import axios from 'axios';
import Theme from './theme';

import SingleSelect from './SingleSelect';
import PersonSelect from './PersonSelect';
import ModelInstanceArrayOfForms from './ModelInstanceArrayOfForms';

import { baseUrl, filterModelKeys } from "./globals";

let aliasAxios = null;

export default class ModelAddForm extends React.Component {
    signal = axios.CancelToken.source();
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.createPayload = this.createPayload.bind(this);
        this.checkRequirements = this.checkRequirements.bind(this);
        this.checkAliasUnique = this.checkAliasUnique.bind(this);

        const [authContext,] = this.context.auth;
        const [validFilterValuesContext,] = this.context.validFilterValues;
        const [filtersContext,] = this.context.filters;

        this.state = {
            // NOTE: cannot use nested state object owing to performance issues:
            // See: https://dev.to/walecloud/updating-react-nested-state-properties-ga6
            errorAddModel: null,
            isAliasNotUnique: true,
            aliasLoading: false,
            name: "",
            alias: "",
            author: [],
            owner: [],
            private: false,
            description: "",
            species: "",
            brain_region: "",
            cell_type: "",
            model_scope: "",
            abstraction_level: "",
            organization: "",
            instances: [{
                version: "",
                description: "",
                parameters: "",
                morphology: "",
                source: "",
                code_format: "",
                license: ""
            }],
            app: {
                collab_id: "8123"  // TODO: change for prod! -> temp for testing: Validation Framework collab (v1)
            },
            auth: authContext,
            filters: filtersContext,
            validFilterValues: validFilterValuesContext
        }

        this.handleErrorAddDialogClose = this.handleErrorAddDialogClose.bind(this);
    }

    handleErrorAddDialogClose() {
        this.setState({ 'errorAddModel': null });
    };

    handleCancel() {
        console.log("Hello")
        this.props.onClose();
    }

    checkAliasUnique(newAlias) {
        console.log(aliasAxios);
        if (aliasAxios) {
            aliasAxios.cancel();
        }
        aliasAxios = axios.CancelToken.source();
        this.setState({
            aliasLoading: true,
        });
        console.log(newAlias);
        if (!newAlias) {
            this.setState({
                isAliasNotUnique: true,
                aliasLoading: false
            });
            return;
        }
        let url = baseUrl + "/models/?alias=" + newAlias;
        let config = {
            cancelToken: aliasAxios.token,
            headers: {
                'Authorization': 'Bearer ' + this.state.auth.token,
            }
        };
        axios.get(url, config)
            .then(res => {
                console.log(res.data.models);
                if (res.data.models.length === 0) {
                    this.setState({
                        isAliasNotUnique: false,
                        aliasLoading: false
                    });
                } else {
                    this.setState({
                        isAliasNotUnique: true,
                        aliasLoading: false
                    });
                }
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('Error: ', err.message);
                } else {
                    console.log(err);
                }
                this.setState({
                    isAliasNotUnique: true,
                    aliasLoading: false
                });
            });
    }

    createPayload() {
        return {
            "model": {
                name: this.state.name,
                alias: this.state.alias,
                author: this.state.author.length > 0 ? this.state.author : [{ "given_name": "", "family_name": "" }],
                owner: this.state.owner.length > 0 ? this.state.owner : [{ "given_name": "", "family_name": "" }],
                private: this.state.private,
                description: this.state.description,
                species: this.state.species,
                brain_region: this.state.brain_region,
                cell_type: this.state.cell_type,
                model_scope: this.state.model_scope,
                abstraction_level: this.state.abstraction_level,
                organization: this.state.organization,
            },
            "model_instance": this.state.instances,
            "model_image": []
        }
    }

    checkRequirements(payload) {
        // rule 1: model name cannot be empty
        let error = null;
        console.log(payload.model.name)
        if (!payload.model.name) {
            error = "Model 'name' cannot be empty!"
        }
        // rule 2: check if alias (if specified) is unique
        else if (!this.state.aliasLoading && payload.model.alias && this.state.isAliasNotUnique) {
            error = "Model 'alias' has to be unique!"
        }
        if (error) {
            console.log(error);
            this.setState({
                errorAddModel: error,
            });
            return false;
        } else {
            return true;
        }
    }

    handleSubmit() {
        let payload = this.createPayload();
        console.log(payload);
        if (this.checkRequirements(payload)) {
            let url = baseUrl + "/models/?collab_id=" + this.state.app.collab_id;
            let config = {
                cancelToken: this.signal.token,
                headers: {
                    'Authorization': 'Bearer ' + this.state.auth.token,
                    'Content-type': 'application/json'
                }
            };

            axios.post(url, payload, config)
                .then(res => {
                    console.log(res);
                    payload.model_instance.id = "<< missing data >>";
                    this.props.onClose({
                        ...payload.model,
                        id: res.data.uuid,
                        uri: "<< missing data >>",
                        app: this.state.app,
                        instances: payload.model_instance,
                        // TODO: add instance ID to 'instances' so that newly 
                        // created models have data necessary for ModelDetail page; also URI above
                        images: payload.model_image
                    });
                })
                .catch(err => {
                    if (axios.isCancel(err)) {
                        console.log('Error: ', err.message);
                    } else {
                        console.log(err);
                        this.setState({
                            errorAddModel: err,
                        });
                    }
                }
                );
        }
    }

    handleFieldChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        console.log(name + " => " + value);
        if (name === "private") {
            value = !target.checked;
        }
        else if (name === "alias") {
            this.checkAliasUnique(value)
        }
        this.setState({
            [name]: value
        });
    }

    render() {
        let errorMessage = "";
        if (this.state.errorAddModel) {
            errorMessage = <ErrorDialog open={Boolean(this.state.errorAddModel)} handleErrorDialogClose={this.handleErrorAddDialogClose} error={this.state.errorAddModel.message || this.state.errorAddModel} />
        }
        return (
            <Dialog onClose={this.handleClose}
                aria-labelledby="Form for adding a new model to the catalog"
                open={this.props.open}
                fullWidth={true}
                maxWidth="md">
                <DialogTitle style={{ backgroundColor: Theme.tableHeader }}>Add a new model to the catalog</DialogTitle>
                <DialogContent>
                    <Box my={2}>
                        <form>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField name="name" label="Model Name" defaultValue={this.state.name}
                                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                                        helperText="Please choose an informative name that will distinguish the model from other, similar models" />
                                </Grid>
                                <Grid item xs={12}>
                                    <PersonSelect name="authors" label="Author(s)" value={this.state.author}
                                        onChange={this.handleFieldChange} variant="outlined" fullWidth={true} newChipKeyCodes={[13, 186]}
                                        helperText="Enter author names separated by semicolon: firstName1 lastName1; firstName2 lastName2" />
                                </Grid>
                                <Grid item xs={12}>
                                    <PersonSelect name="owners" label="Custodian(s)" value={this.state.owner}
                                        onChange={this.handleFieldChange} variant="outlined" fullWidth={true} newChipKeyCodes={[13, 186]}
                                        helperText="Enter author names separated by semicolon: firstName1 lastName1; firstName2 lastName2" />
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField name="alias" label="Model alias / Short name" defaultValue={this.state.alias}
                                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                                        error={!this.state.alias || this.state.aliasLoading ? false : this.state.isAliasNotUnique}
                                        helperText={!this.state.alias || this.state.aliasLoading
                                            ? "(optional) Please choose a short name (easier to remember than a long ID)"
                                            : (this.state.isAliasNotUnique ? "This alias aready exists! " : "Great! This alias is unique.")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {!this.state.alias || this.state.aliasLoading
                                                        ? <RadioButtonUncheckedIcon style={{ color: "white" }} />
                                                        : (this.state.isAliasNotUnique
                                                            ? <CancelIcon style={{ color: "red" }} />
                                                            : <CheckCircleIcon style={{ color: "green" }} />
                                                        )}
                                                </InputAdornment>
                                            ),
                                        }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormLabel component="legend">Make model public?</FormLabel>
                                    <FormControlLabel
                                        labelPlacement="bottom"
                                        control={<Switch checked={!this.state.private} onChange={this.handleFieldChange} name="private" />}
                                        label={this.state.private ? "Private" : "Public"} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField multiline rows="6" name="description" label="Description" defaultValue={this.state.description}
                                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                                        helperText="The description may be formatted with Markdown" />
                                </Grid>
                                {filterModelKeys.map(filter => (
                                    <Grid item xs={12} key={filter}>
                                        <SingleSelect
                                            itemNames={(this.state.filters[filter] && this.state.filters[filter].length) ? this.state.filters[filter] : this.state.validFilterValues[filter]}
                                            label={filter}
                                            value={this.state[filter]}
                                            handleChange={this.handleFieldChange} />
                                    </Grid>
                                ))}
                                <ModelInstanceArrayOfForms
                                    name="instances"
                                    value={this.state.instances}
                                    onChange={this.handleFieldChange} />
                            </Grid>
                        </form>
                    </Box>
                    <div>
                        {errorMessage}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="default">
                        Cancel
          </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Add Model
          </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ModelAddForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

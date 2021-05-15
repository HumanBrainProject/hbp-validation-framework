import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import { datastore } from "./datastore";
import ContextMain from './ContextMain';
import ErrorDialog from './ErrorDialog';
import { filterModelKeys } from "./globals";
import { replaceEmptyStringsWithNull } from "./utils";
import LoadingIndicatorModal from './LoadingIndicatorModal';
import PersonSelect from './PersonSelect';
import SingleSelect from './SingleSelect';
import Theme from './theme';

let aliasAxios = null;

export default class ModelEditForm extends React.Component {
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
        this.getProjectList = this.getProjectList.bind(this);

        const [authContext,] = this.context.auth;
        const [validFilterValuesContext,] = this.context.validFilterValues;
        const [filtersContext,] = this.context.filters;

        this.state = {
            // NOTE: cannot use nested state object owing to performance issues:
            // See: https://dev.to/walecloud/updating-react-nested-state-properties-ga6
            errorEditModel: null,
            isAliasNotUnique: false,
            aliasLoading: false,
            id: "",
            uri: "",
            name: "",
            alias: "",
            author: [],
            owner: [],
            private: false,
            project_id: "",
            description: "",
            species: "",
            brain_region: "",
            cell_type: "",
            model_scope: "",
            abstraction_level: "",
            organization: "",
            auth: authContext,
            filters: filtersContext,
            validFilterValues: validFilterValuesContext,
            loading: false,
            projects: []
        }
        this.getProjectList();
        this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
    }

    componentDidMount() {
        console.log({ ...this.props.modelData });
        this.setState({ ...this.props.modelData })
    }

    handleErrorEditDialogClose() {
        this.setState({ 'errorEditModel': null });
    };

    handleCancel() {
        console.log("Hello")
        this.props.onClose();
    }

    checkAliasUnique(newAlias) {
        if (!newAlias) {
            this.setState({
                isAliasNotUnique: true,
                aliasLoading: false
            });
            return;
        }
        if (newAlias === this.props.modelData.alias) {
            this.setState({
                isAliasNotUnique: false,
                aliasLoading: false
            });
            return
        }

        console.log(aliasAxios);
        if (aliasAxios) {
            aliasAxios.cancel();
        }
        aliasAxios = axios.CancelToken.source();

        this.setState({
            aliasLoading: true,
        });
        console.log(newAlias);

        datastore.modelAliasIsUnique(newAlias, aliasAxios)
            .then(isUnique => {
                this.setState({
                    isAliasNotUnique: !isUnique,
                    aliasLoading: false
                });
            });
    }

    getProjectList() {
        datastore.getProjects()
            .then(editableProjects => {
                this.setState({
                    projects: editableProjects
                });
            })
            .catch(err => {
                console.log('Error: ', err.message);
            });
    }

    createPayload() {
        let payload = {
            id: this.state.id,
            uri: this.state.uri,
            name: this.state.name,
            alias: this.state.alias,
            author: this.state.author,
            owner: this.state.owner,
            private: this.state.private,
            project_id: this.state.project_id,
            description: this.state.description,
            species: this.state.species,
            brain_region: this.state.brain_region,
            cell_type: this.state.cell_type,
            model_scope: this.state.model_scope,
            abstraction_level: this.state.abstraction_level,
            organization: this.state.organization,
            images: []
        }
        return replaceEmptyStringsWithNull(payload);
    }

    checkRequirements(payload) {
        // rule 1: model name cannot be empty
        let error = null;
        console.log(payload.name)
        if (!payload.name) {
            error = "Model 'name' cannot be empty!"
        }
        // rule 2: check if alias (if specified) has been changed, and is still unique
        if (!this.state.aliasLoading && payload.alias && this.state.isAliasNotUnique) {
            error = error ? error + "\n" : "";
            error += "Model 'alias' has to be unique!"
        }

        if (error) {
            console.log(error);
            this.setState({
                errorEditModel: error,
            });
            return false;
        } else {
            return true;
        }
    }

    handleSubmit() {
        this.setState({ loading: true }, () => {
            let payload = this.createPayload();
            console.log(payload);
            if (this.checkRequirements(payload)) {
                datastore.updateModel(payload, this.signal)
                    .then(model => {
                        console.log(model);
                        this.props.onClose(model);
                    })
                    .catch(err => {
                        if (axios.isCancel(err)) {
                            console.log('Error: ', err.message);
                        } else {
                            console.log(err);
                            this.setState({
                                errorEditModel: err.response,
                            });
                        }
                        this.setState({ loading: false })
                    });
            } else {
                this.setState({ loading: false })
            }
        })
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
        if (this.state.errorEditModel) {
            errorMessage = <ErrorDialog open={Boolean(this.state.errorEditModel)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditModel.message || this.state.errorEditModel} />
        }
        console.log(this.props.modelData)
        return (
            <Dialog onClose={this.handleClose}
                aria-labelledby="Form for editing an existing model in the catalog"
                open={this.props.open}
                fullWidth={true}
                maxWidth="md">
                <DialogTitle style={{ backgroundColor: Theme.tableHeader }}>Edit an existing model in the catalog</DialogTitle>
                <DialogContent>
                    <LoadingIndicatorModal open={this.state.loading} />
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
                                        onChange={this.handleFieldChange} variant="outlined" fullWidth={true} newChipKeys={['Enter', 'Tab', ';']}
                                        helperText="Enter author names separated by semicolon: firstName1 lastName1; firstName2 lastName2" />
                                </Grid>
                                <Grid item xs={12}>
                                    <PersonSelect name="owners" label="Custodian(s)" value={this.state.owner}
                                        onChange={this.handleFieldChange} variant="outlined" fullWidth={true} newChipKeys={['Enter', 'Tab', ';']}
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
                                    <SingleSelect
                                            name="project_id"
                                            itemNames={this.state.projects}
                                            label="Collab"
                                            value={this.state.project_id}
                                            helperText="Please choose the Collab you will use to set access permissions. You may need to create a new Collab."
                                            handleChange={this.handleFieldChange} />
                                    </Grid>
                                <Grid item xs={12}>
                                    <TextField name="organization" label="Organization" defaultValue={this.state.organization}
                                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                                        helperText="Please specify the organization, if any, associated with this model (optional)." />
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
                                            value={this.state[filter] ? this.state[filter] : ""}
                                            handleChange={this.handleFieldChange} />
                                    </Grid>
                                ))}
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
                        Edit Model
          </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ModelEditForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};
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
import ErrorDialog from './ErrorDialog';
import ContextMain from './ContextMain';
import axios from 'axios';
import Theme from './theme';

import SingleSelect from './SingleSelect';
import PersonSelect from './PersonSelect';

import { baseUrl, filterTestKeys } from "./globals";

let aliasAxios = null;

export default class TestEditForm extends React.Component {
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
            errorEditTest: null,
            isAliasNotUnique: false,
            aliasLoading: false,
            id: "",
            uri: "",
            creation_date: "",
            name: "",
            alias: "",
            author: [],
            protocol: "",
            data_location: "",
            data_type: "",
            species: "",
            brain_region: "",
            cell_type: "",
            test_type: "",
            score_type: "",
            data_modality: "",
            status: "",
            auth: authContext,
            filters: filtersContext,
            validFilterValues: validFilterValuesContext
        }

        this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
    }

    componentDidMount() {
        console.log({ ...this.props.testData });
        this.setState({ ...this.props.testData })
    }

    handleErrorEditDialogClose() {
        this.setState({ 'errorEditTest': null });
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

        if (newAlias === this.props.testData.alias) {
            this.setState({
                isAliasNotUnique: false,
                aliasLoading: false
            });
            return
        }

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
        let url = baseUrl + "/tests/?alias=" + newAlias;
        let config = {
            cancelToken: aliasAxios.token,
            headers: {
                'Authorization': 'Bearer ' + this.state.auth.token,
            }
        };
        axios.get(url, config)
            .then(res => {
                console.log(res.data.tests);
                if (res.data.tests.length === 0) {
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
        let testData = this.props.testData;
        delete testData.images;
        delete testData.codes;
        return {
            id: this.state.id,
            uri: this.state.uri,
            creation_date: this.state.creation_date,
            name: this.state.name,
            alias: this.state.alias,
            author: this.state.author,
            protocol: this.state.protocol,
            data_location: this.state.data_location,
            data_type: this.state.data_type,
            species: this.state.species,
            brain_region: this.state.brain_region,
            cell_type: this.state.cell_type,
            test_type: this.state.test_type,
            score_type: this.state.score_type,
            data_modality: this.state.data_modality,
            status: this.state.status,
        }
    }

    checkRequirements(payload) {
        // rule 1: test name cannot be empty
        let error = null;
        console.log(payload.name)
        if (!payload.name) {
            error = "Test 'name' cannot be empty!"
        }
        else {
            // rule 2: check if alias (if specified) has been changed, and is still unique
            if (!this.state.aliasLoading && payload.alias && this.state.isAliasNotUnique) {
                error = "Test 'alias' has to be unique!"
            }
        }
        if (error) {
            console.log(error);
            this.setState({
                errorEditTest: error,
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
            let url = baseUrl + "/tests/";
            let config = {
                cancelToken: this.signal.token,
                headers: {
                    'Authorization': 'Bearer ' + this.state.auth.token,
                    'Content-type': 'application/json'
                }
            };

            axios.put(url, payload, config)
                .then(res => {
                    console.log(res);
                    this.props.onClose({
                        ...payload
                    });
                })
                .catch(err => {
                    if (axios.isCancel(err)) {
                        console.log('Error: ', err.message);
                    } else {
                        console.log(err);
                        this.setState({
                            errorEditTest: err,
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
        if (this.state.errorEditTest) {
            errorMessage = <ErrorDialog open={Boolean(this.state.errorEditTest)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditTest.message || this.state.errorEditTest} />
        }
        console.log(this.props.testData)
        return (
            <Dialog onClose={this.handleClose}
                aria-labelledby="Form for editing an existing test in the catalog"
                open={this.props.open}
                fullWidth={true}
                maxWidth="md">
                <DialogTitle style={{ backgroundColor: Theme.tableHeader }}>Edit a new test to the catalog</DialogTitle>
                <DialogContent>
                    <Box my={2}>
                        <form>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField name="name" label="Test Name" defaultValue={this.state.name}
                                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                                        helperText="Please choose an informative name that will distinguish the test from other, similar tests" />
                                </Grid>
                                <Grid item xs={12}>
                                    <PersonSelect name="authors" label="Author(s)" value={this.state.author}
                                        onChange={this.handleFieldChange} variant="outlined" fullWidth={true} newChipKeyCodes={[13, 186]}
                                        helperText="Enter author names separated by semicolon: firstName1 lastName1; firstName2 lastName2" />
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField name="alias" label="Test alias / Short name" defaultValue={this.state.alias}
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
                                <Grid item xs={12}>
                                    <TextField multiline rows="6" name="protocol" label="Protocol" defaultValue={this.state.protocol}
                                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                                        helperText="The protocol may be formatted with Markdown" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="data_location" label="Data Location (URL)" defaultValue={this.state.data_location}
                                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                                        helperText="Enter location of target experimental data file" />
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField name="data_type" label="Data Type" defaultValue={this.state.data_type}
                                        onBlur={this.handleFieldChange} variant="outlined" fullWidth={true}
                                        helperText="Type of target experimental data" />
                                </Grid>
                                {filterTestKeys.map(filter => (
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
                        Edit Test
          </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

TestEditForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import Markdown from './Markdown';
import { Typography, Button } from '@material-ui/core';
import ModelInstanceAddForm from './ModelInstanceAddForm';
import ModelInstanceEditForm from './ModelInstanceEditForm';
import ErrorDialog from './ErrorDialog';
import Tooltip from '@material-ui/core/Tooltip';
import Theme from './theme';
import { formatTimeStampToLongString, copyToClipboard, showNotification } from './utils';
import { withSnackbar } from 'notistack';

function openBlueNaaS(model_inst_url) {
    let match = model_inst_url.match(/https:\/\/object\.cscs\.ch\/v1\/AUTH_([^]+?)\//gi)
    let model_inst_path = model_inst_url.replace(match, '')
    match = model_inst_path.match(/\?bluenaas=true/gi)
    model_inst_path = model_inst_path.replace(match, '')
    window.open("https://blue-naas.humanbrainproject.eu/#/url/" + model_inst_path, '_blank')
}

function viewMorphology(model_inst_morph_url) {
    // var url_collab = encodeURIComponent("https://collab.humanbrainproject.eu/#/collab/" + ids.collab_id + "/nav/" + ids.app_id + "?state=model." + model_id + ",external")
    var url = "https://neuroinformatics.nl/HBP/morphology-viewer-dev/?url=" + model_inst_morph_url// + "&referrer=" + url_collab;
    window.open(url, '_blank')
}

function InstanceParameter(props) {
    if (props.value) {
        if (props.label === "Source" && props.value.match(/\?bluenaas=true/gi)) {	// contains '?bluenaas=true' in URL
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body2"><b>{props.label}: </b></Typography>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <Box component="div" my={2} bgcolor="white" overflow="auto" border={1} borderColor="grey.500" borderRadius={10} style={{ padding: 10, cursor: "pointer" }} whiteSpace="nowrap" onClick={() => copyToClipboard(props.value, props.enqueueSnackbar, props.label + " copied")}>{props.value}</Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box component="div" my={2} >
                                <Button variant="contained" style={{ 'backgroundColor': Theme.buttonPrimary, 'textTransform': 'none' }} onClick={() => openBlueNaaS(props.value)}>
                                    Launch BlueNaaS
							    </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            )
        } else if (props.label === "Morphology") {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body2"><b>{props.label}: </b></Typography>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <Box component="div" my={2} bgcolor="white" overflow="auto" border={1} borderColor="grey.500" borderRadius={10} style={{ padding: 10, cursor: "pointer" }} whiteSpace="nowrap" onClick={() => copyToClipboard(props.value, props.enqueueSnackbar, props.label + " copied")}>{props.value}</Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box component="div" my={2} >
                                <Button variant="contained" style={{ 'backgroundColor': Theme.buttonPrimary, 'textTransform': 'none' }} onClick={() => viewMorphology(props.value)}>
                                    View Morphology
						        </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body2"><b>{props.label}: </b></Typography>
                        <Box component="div" my={2} bgcolor="white" overflow="auto" border={1} borderColor="grey.500" borderRadius={10} style={{ padding: 10, cursor: "pointer" }} whiteSpace="nowrap" onClick={() => copyToClipboard(props.value, props.enqueueSnackbar, props.label + " copied")}>{props.value}</Box>
                    </Grid>
                </Grid>
            )
        }
    } else {
        return ""
    }
    // return <Typography variant="body2"><b>{props.label}: </b>{props.value}</Typography>
}

class ModelDetailContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openAddInstanceForm: false,
            openEditInstanceForm: false,
            instances: this.props.instances,
            instancesWithResults: [...new Set(this.props.results.map(a => a.model_version_id))],
            currentInstance: null,
            errorEditModelInstance: null
        }
        this.handleAddModelInstanceFormClose = this.handleAddModelInstanceFormClose.bind(this);
        this.handleEditModelInstanceFormClose = this.handleEditModelInstanceFormClose.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
    }

    handleErrorEditDialogClose() {
        this.setState({ 'errorEditModelInstance': null });
    };

    handleAddModelInstanceFormClose(newModelInstance) {
        console.log("close add")
        console.log(newModelInstance)
        this.setState({ 'openAddInstanceForm': false });
        if (newModelInstance) {
            let instances = this.state.instances;
            instances.push(newModelInstance)
            this.setState({
                instances: instances,
            });
            showNotification(this.props.enqueueSnackbar, "Model instance added!", "success")
        }
    }

    handleEditModelInstanceFormClose(modelInstance) {
        console.log("close edit")
        console.log(modelInstance)
        this.setState({ 'openEditInstanceForm': false });
        if (modelInstance) {
            let instances = this.state.instances;
            this.setState({
                instances: instances.map(obj => [modelInstance].find(o => o.id === obj.id) || obj)
            });
            showNotification(this.props.enqueueSnackbar, "Model instance edited!", "success")
        }
    }

    handleEditClick(instance) {
        if (this.state.instancesWithResults.includes(instance.id)) {
            this.setState({
                errorEditModelInstance: "This model instance cannot be edited as there are validation results associated with it!",
            });
        } else {
            this.setState({
                openEditInstanceForm: true,
                currentInstance: instance
            })
        }
    }

    render() {
        let errorMessage = "";
        if (this.state.errorEditModelInstance) {
            errorMessage = <ErrorDialog open={Boolean(this.state.errorEditModelInstance)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditModelInstance.message || this.state.errorEditModelInstance} />
        }

        let addInstanceForm = "";
        if (this.state.openAddInstanceForm) {
            addInstanceForm = <ModelInstanceAddForm
                open={this.state.openAddInstanceForm}
                onClose={this.handleAddModelInstanceFormClose}
                modelID={this.props.id}
            />
        }

        let editInstanceForm = "";
        if (this.state.openEditInstanceForm) {
            editInstanceForm = <ModelInstanceEditForm
                open={this.state.openEditInstanceForm}
                onClose={this.handleEditModelInstanceFormClose}
                instance={this.state.currentInstance}
                modelID={this.props.id}
            />
        }

        return (
            <React.Fragment>
                {console.log(this.state.instancesWithResults)}
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Box>
                            <Typography><b>Description: </b></Typography>
                            <Markdown>{this.props.description}</Markdown><br /><br />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row">
                            <Grid item xs={6}>
                                <Typography variant="subtitle1"><b>Versions</b></Typography>
                            </Grid>
                            <Grid container item justify="flex-end" xs={6}>
                                <Button variant="contained" style={{ backgroundColor: Theme.buttonPrimary }} onClick={() => this.setState({ openAddInstanceForm: true })}>
                                    Add new version
								</Button>
                            </Grid>
                        </Grid>
                        {this.state.instances.map(instance => (
                            <Box my={2} pb={0} style={{ backgroundColor: Theme.lightBackground }} key={instance.id}>
                                <Grid container style={{ display: "flex", alignItems: "center", backgroundColor: Theme.tableHeader }}>
                                    <Grid item xs={6}>
                                        <Box px={2} display="flex" flexDirection="row">
                                            <p variant="subtitle2">Version: <span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => copyToClipboard(instance.version, this.props.enqueueSnackbar, "Model version copied")}>{instance.version}</span></p>
                                            <Tooltip placement="right" title={this.state.instancesWithResults.includes(instance.id) ? "Cannot Edit" : "Edit"}>
                                                <IconButton aria-label="edit model instance" onClick={() => this.handleEditClick(instance)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip placement="right" title="Download model instance">
                                                <IconButton aria-label="download code" href={instance.source}>
                                                    <CloudDownloadIcon />
                                                </IconButton>
                                            </Tooltip>

                                        </Box>
                                    </Grid>
                                    <Grid container item justify="flex-end" xs={6}>
                                        <Box px={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="body2" color="textSecondary">ID: <span style={{ cursor: "pointer" }} onClick={() => copyToClipboard(instance.id, this.props.enqueueSnackbar, "Model instance UUID copied")}>{instance.id}</span></Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box p={2}>
                                    <Typography variant="body2" color="textSecondary" style={{ marginBottom: 10 }}>{formatTimeStampToLongString(instance.timestamp)}</Typography>
                                    <InstanceParameter label="Description" value={instance.description} enqueueSnackbar={this.props.enqueueSnackbar} />
                                    <InstanceParameter label="Source" value={instance.source} enqueueSnackbar={this.props.enqueueSnackbar} />
                                    <InstanceParameter label="Parameters" value={instance.parameters} enqueueSnackbar={this.props.enqueueSnackbar} />
                                    <InstanceParameter label="Morphology" value={instance.morphology} enqueueSnackbar={this.props.enqueueSnackbar} />
                                    <InstanceParameter label="Code format" value={instance.code_format} enqueueSnackbar={this.props.enqueueSnackbar} />
                                    <InstanceParameter label="License" value={instance.license} enqueueSnackbar={this.props.enqueueSnackbar} />
                                </Box>
                            </Box>
                        ))}
                    </Grid>

                    <Grid item>
                        {/* todo: images */}
                    </Grid>
                </Grid>
                <div>
                    {addInstanceForm}
                </div>
                <div>
                    {editInstanceForm}
                </div>
                <div>
                    {errorMessage}
                </div>
            </React.Fragment>
        );
    }
}

export default withSnackbar(ModelDetailContent);
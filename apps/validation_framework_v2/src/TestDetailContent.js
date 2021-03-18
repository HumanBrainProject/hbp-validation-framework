import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import EditIcon from '@material-ui/icons/Edit';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import { withSnackbar } from 'notistack';
import React from 'react';
import ContextMain from './ContextMain';
import ErrorDialog from './ErrorDialog';
import Markdown from './Markdown';
import TestInstanceAddForm from './TestInstanceAddForm';
import TestInstanceEditForm from './TestInstanceEditForm';
import Theme from './theme';
import { copyToClipboard, formatTimeStampToLongString, showNotification } from './utils';

function InstanceParameter(props) {
    if (props.value) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="body2"><b>{props.label}: </b></Typography>
                    <Box component="div" my={2} bgcolor="white" overflow="auto" border={1} borderColor="grey.500" borderRadius={10} style={{ padding: 10, cursor: "pointer" }} whiteSpace="nowrap" onClick={() => copyToClipboard(props.value, props.enqueueSnackbar, props.closeSnackbar, props.label + " copied")}>{props.value}</Box>
                </Grid>
            </Grid>
        )
    } else {
        return ""
    }
    // return <Typography variant="body2"><b>{props.label}: </b>{props.value}</Typography>
}

function CompareIcon(props) {
    if (props.compareFlag) {
        return (
            <Tooltip title="Remove test instance from compare" placement="top">
                <IconButton aria-label="compare test" onClick={() => props.removeTestInstanceCompare(props.instance_id)}>
                    <RemoveFromQueueIcon color="action" />
                </IconButton>
            </Tooltip>
        )
    } else {
        return (
            <Tooltip title="Add test instance to compare" placement="top">
                <IconButton aria-label="compare test" onClick={() => props.addTestInstanceCompare(props.instance_id)}>
                    <AddToQueueIcon color="action" />
                </IconButton>
            </Tooltip>
        )
    }
}

class TestDetailContent extends React.Component {
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);

        this.state = {
            openAddInstanceForm: false,
            openEditInstanceForm: false,
            instances: this.props.instances,
            instancesWithResults: this.props.results ? [...new Set(this.props.results.map(a => a.test_instance_id))] : null,
            currentInstance: null,
            errorEditTestInstance: null
        }
        this.handleAddTestInstanceFormClose = this.handleAddTestInstanceFormClose.bind(this);
        this.handleEditTestInstanceFormClose = this.handleEditTestInstanceFormClose.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
        this.checkInstanceInCompare = this.checkInstanceInCompare.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.results !== prevProps.results) {
            this.setState({ 'instancesWithResults': [...new Set(this.props.results.map(a => a.test_instance_id))] });
        }
    }

    handleErrorEditDialogClose() {
        this.setState({ 'errorEditTestInstance': null });
    };

    handleAddTestInstanceFormClose(newTestInstance) {
        console.log("close add")
        console.log(newTestInstance)
        this.setState({ 'openAddInstanceForm': false });
        if (newTestInstance) {
            let instances = this.state.instances;
            instances.push(newTestInstance)
            this.setState({
                instances: instances,
            });
            showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Test instance added!", "success")
        }
    }

    handleEditTestInstanceFormClose(testInstance) {
        console.log("close edit")
        console.log(testInstance)
        this.setState({ 'openEditInstanceForm': false });
        if (testInstance) {
            let instances = this.state.instances;
            this.setState({
                instances: instances.map(obj => [testInstance].find(o => o.id === obj.id) || obj)
            });
            showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Test instance edited!", "success")
        }
    }

    handleEditClick(instance) {
        if (this.state.instancesWithResults.includes(instance.id)) {
            this.setState({
                errorEditTestInstance: "This test instance cannot be edited as there are validation results associated with it!",
            });
        } else {
            this.setState({
                openEditInstanceForm: true,
                currentInstance: instance
            })
        }
    }

    checkInstanceInCompare(test_id, test_inst_id) {
        let [compareTests,] = this.context.compareTests;
        // check if test exists in compare
        if (!(test_id in compareTests)) {
            return false;
        }
        // check if this test instance already added to compare
        if (test_inst_id in compareTests[test_id].selected_instances) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        let errorMessage = "";
        if (this.state.errorEditTestInstance) {
            errorMessage = <ErrorDialog open={Boolean(this.state.errorEditTestInstance)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditTestInstance.message || this.state.errorEditTestInstance} />
        }

        let addInstanceForm = "";
        if (this.state.openAddInstanceForm) {
            addInstanceForm = <TestInstanceAddForm
                open={this.state.openAddInstanceForm}
                onClose={this.handleAddTestInstanceFormClose}
                testID={this.props.id}
            />
        }

        let editInstanceForm = "";
        if (this.state.openEditInstanceForm) {
            editInstanceForm = <TestInstanceEditForm
                open={this.state.openEditInstanceForm}
                onClose={this.handleEditTestInstanceFormClose}
                instance={this.state.currentInstance}
                testID={this.props.id}
            />
        }

        return (
            <React.Fragment>
                {console.log(this.state.instancesWithResults)}
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Box>
                            <Typography><b>Data Location: </b></Typography>
                            {this.props.dataLocation.map((dataItem, index) => (
                                <Box component="div" key={index} my={2} bgcolor="white" overflow="auto" border={1} borderColor="grey.500" borderRadius={10} style={{ padding: 10, cursor: "pointer" }} whiteSpace="nowrap" onClick={() => copyToClipboard(dataItem, this.props.enqueueSnackbar, this.props.closeSnackbar, "Data location copied")} width="100%">
                                    {dataItem}
                                </Box>
                            ))}
                            <Typography><b>Description: </b></Typography>
                            <Markdown source={this.props.description} /><br /><br />
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
                        {
                            (this.state.instances.length === 0)
                                ?
                                <Typography variant="h6">
                                    <br />
                                    No test instances have yet been registered for this test!
                                </Typography>
                                :
                                this.state.instances.map(instance => (
                                    <Box my={2} pb={0} style={{ backgroundColor: Theme.lightBackground }} key={instance.id}>
                                        <Grid container style={{ display: "flex", alignItems: "center", backgroundColor: Theme.tableHeader }}>
                                            <Grid item xs={6}>
                                                <Box px={2} display="flex" flexDirection="row">
                                                    <p variant="subtitle2">Version: <span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => copyToClipboard(instance.version, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test version copied")}>{instance.version}</span></p>
                                                    {
                                                        this.state.instancesWithResults &&
                                                        <Tooltip placement="top" title={this.state.instancesWithResults.includes(instance.id) ? "Cannot Edit" : "Edit"}>
                                                            <IconButton aria-label="edit test instance" onClick={() => this.handleEditClick(instance)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    }
                                                    <CompareIcon compareFlag={this.checkInstanceInCompare(this.props.id, instance.id)} instance_id={instance.id} addTestInstanceCompare={this.props.addTestInstanceCompare} removeTestInstanceCompare={this.props.removeTestInstanceCompare} />
                                                </Box>
                                            </Grid>
                                            <Grid container item justify="flex-end" xs={6}>
                                                <Box px={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography variant="body2" color="textSecondary">ID: <span style={{ cursor: "pointer" }} onClick={() => copyToClipboard(instance.id, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test instance UUID copied")}>{instance.id}</span></Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Box p={2}>
                                            <Typography variant="body2" color="textSecondary" style={{ marginBottom: 10 }}>{formatTimeStampToLongString(instance.timestamp)}</Typography>
                                            <InstanceParameter label="Description" value={instance.description} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} />
                                            <InstanceParameter label="Source" value={instance.repository} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} />
                                            <InstanceParameter label="Path" value={instance.path} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} />
                                            <InstanceParameter label="Parameters" value={instance.parameters} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} />
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

export default withSnackbar(TestDetailContent);

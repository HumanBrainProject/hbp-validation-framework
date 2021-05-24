import { Typography } from '@material-ui/core';
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
import TestEditForm from './TestEditForm';
import Theme from './theme';
import { copyToClipboard, formatTimeStampToLongString, showNotification } from './utils';

function CompareIcon(props) {
    if (props.compareFlag === null) {
        return (
            <Tooltip title="Cannot add to compare (no test instances)" placement="top">
                <IconButton aria-label="compare model" style={{ backgroundColor: Theme.disabledColor, marginLeft: 10 }}>
                    <AddToQueueIcon color="disabled" />
                </IconButton>
            </Tooltip>
        )
    } else if (props.compareFlag) {
        return (
            <Tooltip title="Remove test from compare" placement="top">
                <IconButton aria-label="compare test" onClick={() => props.removeTestCompare()} style={{ backgroundColor: Theme.disabledColor, marginLeft: 10 }}>
                    <RemoveFromQueueIcon color="action" />
                </IconButton>
            </Tooltip>
        )
    } else {
        return (
            <Tooltip title="Add test to compare" placement="top">
                <IconButton aria-label="compare test" onClick={() => props.addTestCompare()} style={{ backgroundColor: Theme.buttonSecondary, marginLeft: 10 }}>
                    <AddToQueueIcon color="action" />
                </IconButton>
            </Tooltip>
        )
    }
}

class TestDetailHeader extends React.Component {
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);

        this.state = {
            openEditForm: false,
            errorEditTest: null
        }
        this.handleEditTestFormClose = this.handleEditTestFormClose.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleErrorEditDialogClose = this.handleErrorEditDialogClose.bind(this);
    }

    handleErrorEditDialogClose() {
        this.setState({ 'errorEditTest': null });
    };

    handleEditTestFormClose(test) {
        console.log("close edit")

        this.setState({ 'openEditForm': false });
        if (test) {
            this.props.updateCurrentTestData(test)
            showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Test edited!", "success")
        }
    }

    handleEditClick() {
        this.setState({
            openEditForm: true,
        })
    }

    render() {
        let errorMessage = "";
        if (this.state.errorEditTest) {
            errorMessage = <ErrorDialog open={Boolean(this.state.errorEditTest)} handleErrorDialogClose={this.handleErrorEditDialogClose} error={this.state.errorEditTest.message || this.state.errorEditTest} />
        }

        let editForm = "";
        if (this.state.openEditForm) {
            editForm = <TestEditForm
                open={this.state.openEditForm}
                onClose={this.handleEditTestFormClose}
                testData={this.props.testData}
            />
        }

        return (
            <React.Fragment>
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        <span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.name, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test name copied")}> {this.props.name}</span>
                        <Tooltip placement="top" title="Edit Test">
                            <IconButton aria-label="edit test" onClick={() => this.handleEditClick()} style={{ backgroundColor: Theme.buttonSecondary, marginLeft: 10 }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <CompareIcon compareFlag={this.props.compareFlag} addTestCompare={this.props.addTestCompare} removeTestCompare={this.props.removeTestCompare} />
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {this.props.authors}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        ID: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.id, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test UUID copied")}>{this.props.id}</span></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {this.props.alias ? "Alias: " : ""} <b>{this.props.alias ? <span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.alias, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test alias copied")}>{this.props.alias}</span> : ""}</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Created: <b>{formatTimeStampToLongString(this.props.dateCreated)}</b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {this.props.implementation_status ? "Implementation Status: " : ""} <b>{this.props.implementation_status ? this.props.implementation_status : ""}</b>
                    </Typography>
                </Grid>
                {/* <Grid item> */}
                {/* optional image goes here */}
                {/* </Grid> */}
                <div>
                    {editForm}
                </div>
                <div>
                    {errorMessage}
                </div>
            </React.Fragment>
        );
    }
}

export default withSnackbar(TestDetailHeader);

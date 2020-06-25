import React from 'react';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import TestEditForm from './TestEditForm';
import ErrorDialog from './ErrorDialog';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withSnackbar } from 'notistack';
import { copyToClipboard, showNotification } from './utils';

class TestDetailHeader extends React.Component {
    constructor(props) {
        super(props);

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
        console.log(test)
        this.setState({ 'openEditForm': false });
        if (test) {
            this.props.updateCurrentTestData(test)
            showNotification(this.props.enqueueSnackbar, "Test edited!", "success")
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
                        <span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.name, this.props.enqueueSnackbar, "Test name copied")}> {this.props.name}</span>
                        <Tooltip placement="right" title="Edit Model">
                            <IconButton aria-label="edit model" onClick={() => this.handleEditClick()}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {this.props.authors}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        ID: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.id, this.props.enqueueSnackbar, "Test UUID copied")}>{this.props.id}</span></b>
                        &nbsp;&nbsp;&nbsp;
                        Created: <b>{this.props.createdDate}</b>
                        &nbsp;&nbsp;&nbsp;
                        {this.props.alias ? "Alias: " : ""} <b>{this.props.alias ? <span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.alias, this.props.enqueueSnackbar, "Test alias copied")}>{this.props.alias}</span> : ""}</b>
                        &nbsp;&nbsp;&nbsp;
                        {this.props.status ? "Status: " : ""} <b>{this.props.status ? this.props.status : ""}</b>
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
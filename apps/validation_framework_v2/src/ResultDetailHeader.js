import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { formatTimeStampToLongString, copyToClipboard } from './utils';
import { withSnackbar } from 'notistack';
import LoadingIndicator from './LoadingIndicator';


class ResultDetailHeader extends React.Component {
    render() {
        if (this.props.loading) {
            return (
                <React.Fragment>
                    <Grid container style={{ marginBottom: 10 }}>
                        <Grid item>
                            <Typography variant="h5" gutterBottom>
                                Validation Result ID: <b><span style={{ cursor: "pointer" }} onClick={() => copyToClipboard(this.props.id, this.props.enqueueSnackbar, this.props.closeSnackbar, "Result UUID copied")}> {this.props.id}</span></b>
                            </Typography>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                Timestamp: <b>{formatTimeStampToLongString(this.props.timestamp)}</b>
                            </Typography>
                            <br />
                            <Divider />
                            {/* <Divider light /> */}
                            <br />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <LoadingIndicator />
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Grid container style={{ marginBottom: 10 }}>
                        <Grid item>
                            <Typography variant="h5" gutterBottom>
                                Validation Result ID: <b><span style={{ cursor: "pointer" }} onClick={() => copyToClipboard(this.props.id, this.props.enqueueSnackbar, this.props.closeSnackbar, "Result UUID copied")}> {this.props.id}</span></b>
                            </Typography>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                Timestamp: <b>{formatTimeStampToLongString(this.props.timestamp)}</b>
                            </Typography>
                            <br />
                            <Divider />
                            {/* <Divider light /> */}
                            <br />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Typography variant="subtitle1" gutterBottom color="textSecondary">Validated Model: </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <span style={{cursor: "pointer" }} onClick={() => copyToClipboard(this.props.modelName, this.props.enqueueSnackbar, this.props.closeSnackbar, "Model name copied")}> {this.props.modelName}</span>
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    Alias: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.modelAlias, this.props.enqueueSnackbar, this.props.closeSnackbar, "Model alias copied")}> {this.props.modelAlias}</span></b>
                                    &nbsp;&nbsp;&nbsp;
                                    Version: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.modelVersion, this.props.enqueueSnackbar, this.props.closeSnackbar, "Model version copied")}> {this.props.modelVersion}</span></b>
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    Model ID: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.modelID, this.props.enqueueSnackbar, this.props.closeSnackbar, "Model UUID copied")}> {this.props.modelID}</span></b>
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    Instance ID: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.modelInstID, this.props.enqueueSnackbar, this.props.closeSnackbar, "Model instance UUID copied")}> {this.props.modelInstID}</span></b>
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="subtitle1" gutterBottom color="textSecondary">Validation Test: </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.testName, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test name copied")}> {this.props.testName}</span>
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    Alias: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.testAlias, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test alias copied")}> {this.props.testAlias}</span></b>
                                    &nbsp;&nbsp;&nbsp;
                                    Version: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.testVersion, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test version copied")}> {this.props.testVersion}</span></b>
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    Test ID: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.testID, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test UUID copied")}> {this.props.testID}</span></b>
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    Instance ID: <b><span style={{ marginHorizontal: 125, cursor: "pointer" }} onClick={() => copyToClipboard(this.props.testInstID, this.props.enqueueSnackbar, this.props.closeSnackbar, "Test instance UUID copied")}> {this.props.testInstID}</span></b>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
        }
    }
}

export default withSnackbar(ResultDetailHeader);
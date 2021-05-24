import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withSnackbar } from 'notistack';
import React from 'react';
import Markdown from './Markdown';
import Theme from './theme';
import { copyToClipboard, formatLabel, formatValue } from "./utils";

function CommonParameter(props) {
    var m_value = formatValue(props.label, props.m_value);
    var t_value = formatValue(props.label, props.t_value);
    return (
        <TableRow>
            <TableCell>
                <Box overflow="auto" style={{ cursor: "pointer" }} whiteSpace="wrap" onClick={() => copyToClipboard(m_value, props.enqueueSnackbar, props.closeSnackbar, "Model " + props.entity + formatLabel(props.label) + " copied")}>
                    <Typography variant="body2">
                        {m_value}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>{formatLabel(props.label)}</b></Typography></TableCell>
            <TableCell>
                <Box overflow="auto" style={{ cursor: "pointer" }} whiteSpace="wrap" onClick={() => copyToClipboard(t_value, props.enqueueSnackbar, props.closeSnackbar, "Test " + props.entity + formatLabel(props.label) + " copied")}>
                    <Typography variant="body2">
                        {t_value}
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    )
}

function OtherParameter(props) {
    var value = formatValue(props.label, props.value);
    return (
        <TableRow>
            <TableCell><Typography variant="body2"><b>{formatLabel(props.label)}</b>: </Typography></TableCell>
            <TableCell>
                <Box overflow="auto" style={{ cursor: "pointer" }} whiteSpace="wrap" onClick={() => copyToClipboard(value, props.enqueueSnackbar, props.closeSnackbar, props.entity + " " + formatLabel(props.label) + " copied")}>
                    <Typography variant="body2">
                        {value}
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    )
}

class ResultModelTestInfo extends React.Component {
    render() {
        return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Accordion defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1"><b>Model & Test: Common Parameters</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table style={{ width: 'auto', tableLayout: 'auto' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Model</b></Typography></TableCell>
                                                <TableCell width="150px" align="center" style={{ backgroundColor: Theme.tableRowSelectColor }}><Typography variant="body2"><b>Parameter</b></Typography></TableCell>
                                                <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Test</b></Typography></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {["id", "uri", "name", "alias", "date_created", "species", "brain_region", "cell_type"].map((param) => (
                                                <CommonParameter label={param} m_value={this.props.model[param]} t_value={this.props.test[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} entity="" />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_others"
                        >
                            <Typography variant="subtitle1"><b>Model & Test: Other Parameters</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }} colSpan={2}><Typography variant="body2"><b>Model</b></Typography></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {["author", "owner", "project_id", "organization", "private", "model_scope", "abstraction_level"].map((param) => (
                                                    <OtherParameter label={param} value={this.props.model[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} entity="Model" />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }} colSpan={2}><Typography variant="body2"><b>Test</b></Typography></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {["author", "implementation_status", "data_location", "data_type", "recording_modality", "test_type", "score_type"].map((param) => (
                                                    <OtherParameter label={param} value={this.props.test[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} entity="Test" />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1"><b>Model & Test: Descriptions</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Model Description</b></Typography></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>

                                                <Typography variant="body2">
                                                    {
                                                        this.props.model.description
                                                            ? <Markdown source={this.props.model.description} />
                                                            : "<< no info >>"
                                                    }
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Test Protocol</b></Typography></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {
                                                        this.props.test.description
                                                            ? <Markdown source={this.props.test.description} />
                                                            : "<< no info >>"
                                                    }
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_instance_common"
                        >
                            <Typography variant="subtitle1"><b>Model & Test Version: Common Parameters</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Model Version</b></Typography></TableCell>
                                            <TableCell width="150px" align="center" style={{ backgroundColor: Theme.tableRowSelectColor }}><Typography variant="body2"><b>Parameter</b></Typography></TableCell>
                                            <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Test Version</b></Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {["id", "uri", "version", "timestamp"].map((param) => (
                                            <CommonParameter label={param} m_value={this.props.model_instance[param]} t_value={this.props.test_instance[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} entity="instance " />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_instance_others"
                        >
                            <Typography variant="subtitle1"><b>Model & Test Version: Other Parameters</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }} colSpan={2}><Typography variant="body2"><b>Model Version</b></Typography></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {["morphology", "source", "code_format", "parameters", "hash", "license"].map((param) => (
                                                    <OtherParameter label={param} value={this.props.model_instance[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} entity="Model instance" />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }} colSpan={2}><Typography variant="body2"><b>Test Version</b></Typography></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {["repository", "path", "parameters"].map((param) => (
                                                    <OtherParameter label={param} value={this.props.test_instance[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} closeSnackbar={this.props.closeSnackbar} entity="Test instance" />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1"><b>Model & Test Version: Descriptions</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Model Version Description</b></Typography></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Typography variant="body2">{this.props.model_instance.description ? this.props.model_instance.description : "<< no info >>"}</Typography></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Test Version Description</b></Typography></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Typography variant="body2">{this.props.test_instance.description ? this.props.test_instance.description : "<< no info >>"}</Typography></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        );
    }
}

export default withSnackbar(ResultModelTestInfo);
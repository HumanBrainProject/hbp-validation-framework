import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Theme from './theme';
import { formatValue, formatLabel, copyToClipboard } from "./utils";
import { withSnackbar } from 'notistack';

function CommonParameter(props) {
    var m_value = formatValue(props.label, props.m_value);
    var t_value = formatValue(props.label, props.t_value);
    return (
        <TableRow>
            <TableCell>
                    <Box overflow="auto" style={{ cursor: "pointer" }} whiteSpace="wrap" onClick={() => copyToClipboard(m_value, props.enqueueSnackbar, "Model " + props.entity + formatLabel(props.label) + " copied")}>
                        <Typography variant="body2">
                            {m_value}
                        </Typography>
                    </Box>
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>{formatLabel(props.label)}</b></Typography></TableCell>
            <TableCell>
                    <Box overflow="auto" style={{ cursor: "pointer" }} whiteSpace="wrap" onClick={() => copyToClipboard(t_value, props.enqueueSnackbar, "Test " + props.entity + formatLabel(props.label) + " copied")}>
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
                    <Box overflow="auto" style={{ cursor: "pointer" }} whiteSpace="wrap" onClick={() => copyToClipboard(value, props.enqueueSnackbar, props.entity + " " + formatLabel(props.label) + " copied")}>
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
                    <ExpansionPanel defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1"><b>Model & Test: Common Parameters</b></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
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
                                            {["id", "uri", "name", "alias", "species", "brain_region", "cell_type"].map((param) => (
                                                <CommonParameter label={param} m_value={this.props.model[param]} t_value={this.props.test[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} entity="" />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                    <ExpansionPanel defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_others"
                        >
                            <Typography variant="subtitle1"><b>Model & Test: Other Parameters</b></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
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
                                                {["author", "owner", "organization", "app", "private", "model_scope", "abstraction_level"].map((param) => (
                                                    <OtherParameter label={param} value={this.props.model[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} entity="Model" />
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
                                                {["author", "status", "creation_date", "data_location", "data_type", "data_modality", "test_type", "score_type"].map((param) => (
                                                    <OtherParameter label={param} value={this.props.test[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} entity="Test" />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                    <ExpansionPanel defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1"><b>Model & Test: Descriptions</b></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Model Description</b></Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography variant="body2">{this.props.model.description ? this.props.model.description : "<< no info >>"}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Test Protocol</b></Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography variant="body2">{this.props.test.protocol ? this.props.test.protocol : "<< no info >>"}</Typography></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                    <ExpansionPanel defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_instance_common"
                        >
                            <Typography variant="subtitle1"><b>Model & Test Instance: Common Parameters</b></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Model Instance</b></Typography></TableCell>
                                            <TableCell width="150px" align="center" style={{ backgroundColor: Theme.tableRowSelectColor }}><Typography variant="body2"><b>Parameter</b></Typography></TableCell>
                                            <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Test Instance</b></Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {["id", "uri", "version", "timestamp"].map((param) => (
                                            <CommonParameter label={param} m_value={this.props.model_instance[param]} t_value={this.props.test_instance[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} entity="instance " />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                    <ExpansionPanel defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_instance_others"
                        >
                            <Typography variant="subtitle1"><b>Model & Test Instance: Other Parameters</b></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }} colSpan={2}><Typography variant="body2"><b>Model Instance</b></Typography></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {["morphology", "source", "code_format", "parameters", "hash", "license"].map((param) => (
                                                    <OtherParameter label={param} value={this.props.model_instance[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} entity="Model instance" />
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
                                                    <TableCell align="center" style={{ backgroundColor: Theme.tableHeader }} colSpan={2}><Typography variant="body2"><b>Test Instance</b></Typography></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {["repository", "path", "parameters"].map((param) => (
                                                    <OtherParameter label={param} value={this.props.test_instance[param]} key={param} enqueueSnackbar={this.props.enqueueSnackbar} entity="Test instance" />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                    <ExpansionPanel defaultExpanded={true} style={{ backgroundColor: Theme.lightBackground }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1"><b>Model & Test Instance: Descriptions</b></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Model Instance Description</b></Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography variant="body2">{this.props.model_instance.description ? this.props.model_instance.description : "<< no info >>"}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: Theme.tableHeader }}><Typography variant="body2"><b>Test Instance Description</b></Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography variant="body2">{this.props.test_instance.description ? this.props.test_instance.description : "<< no info >>"}</Typography></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
        );
    }
}

export default withSnackbar(ResultModelTestInfo);


// >> test
// {
//     "status": "in development",
//     "cell_type": "pyramidal cell",
//     "codes": [...],
//     "protocol": "Tests the mode and efficacy of back-propagating action potentials on the apical trunk.",
//     "name": "Hippocampus_CA1_BackpropagatingAPTest",
//     "data_type": "Mean, SD",
//     "data_modality": "electrophysiology",
//     "test_type": "single cell activity",
//     "author": [
//         {
//             "family_name": "Saray",
//             "given_name": "Sara"
//         }
//     ],
//     "creation_date": "2018-03-08T15:41:11.839826Z",
//     "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationtestdefinition/v0.1.0/4d1210a6-e674-4cb6-a9cd-981a11d31175",
//     "species": "Rattus norvegicus",
//     "alias": "hippo_ca1_bap",
//     "old_uuid": "3aab7a1c-0836-4412-bcd3-f0b3a4685ee3",
//     "brain_region": "hippocampus",
//     "score_type": "Other",
//     "id": "4d1210a6-e674-4cb6-a9cd-981a11d31175",
//     "data_location": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/sp6_validation_data/hippounit/feat_backpropagating_AP_target_data.json"
// }

// >> test_instance
// {
//     "version": "1.0",
//     "repository": "https://github.com/KaliLab/hippounit.git",
//     "timestamp": "2018-03-08T15:41:11.846933Z",
//     "path": "hippounit.tests.BackpropagatingAPTest",
//     "id": "12660f24-b1f3-4fd8-a768-63fa7ed90be7",
//     "test_definition_id": "4d1210a6-e674-4cb6-a9cd-981a11d31175",
//     "description": null,
//     "test_definition": {...},
//     "parameters": null,
//     "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationscript/v0.1.0/12660f24-b1f3-4fd8-a768-63fa7ed90be7",
//     "old_uuid": "8df4d05b-962c-4e3a-bd34-8cf55cd79c76"
// }

// >> model
// {
//     "cell_type": "hippocampus CA1 pyramidal cell",
//     "name": "Katz_et_al_2009_2stageintegration_code",
//     "images": null,
//     "author": [
//         {
//             "family_name": "Katz",
//             "given_name": "Yael"
//         },
//         {
//             "family_name": "Menon",
//             "given_name": "Vilas"
//         },
//         {
//             "family_name": "Nicholson",
//             "given_name": "Daniel A."
//         },
//         {
//             "family_name": "Geinisman",
//             "given_name": "Yuri"
//         },
//         {
//             "family_name": "Kath",
//             "given_name": "William L."
//         },
//         {
//             "family_name": "Spruston",
//             "given_name": "Nelson"
//         },
//         {
//             "family_name": "Sáray",
//             "given_name": "Sára"
//         }
//     ],
//     "app": {
//         "collab_id": 54781
//     },
//     "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/modelproject/v0.1.0/71192c8c-e46e-4b8b-b874-6eecd03df336",
//     "private": false,
//     "model_scope": "single cell",
//     "species": "Rattus norvegicus",
//     "alias": "katz_2009",
//     "old_uuid": "bcd93a30-f338-45e7-9ce2-1e20261615a9",
//     "abstraction_level": "spiking neurons: biophysical",
//     "brain_region": "hippocampus",
//     "owner": [
//         {
//             "family_name": "Sáray",
//             "given_name": "Sára"
//         }
//     ],
//     "organization": "HBP-SP6",
//     "instances": [...],
//     "id": "71192c8c-e46e-4b8b-b874-6eecd03df336",
//     "description": "The Katz et al. (2009) model(ModelDB accession number: 127351) is based on the Golding et al. (2001) model and was build to investigate the functional consequences of the distribution of strength and density of synapses on the apical dendrites, that they observed experimentally, on the mode of dendritic integration."
// }

// >> model_instance
// {
//     "model_uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/modelproject/v0.1.0/71192c8c-e46e-4b8b-b874-6eecd03df336",
//     "code_format": "hoc, mod",
//     "description": "",
//     "model_id": "71192c8c-e46e-4b8b-b874-6eecd03df336",
//     "timestamp": "2019-06-06T12:55:17.673676+00:00",
//     "morphology": null,
//     "hash": "",
//     "id": "20e69189-ab22-4967-88a0-9e719a547380",
//     "license": null,
//     "parameters": "{\"class_name\" : \"Katz_et_al_2009\"}",
//     "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/memodel/v0.1.2/20e69189-ab22-4967-88a0-9e719a547380",
//     "source": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/hippounit_paper_resources/models/Katz_et_al_2009_2stageintegration_code.zip",
//     "version": "1.0",
//     "model": {...}
// }
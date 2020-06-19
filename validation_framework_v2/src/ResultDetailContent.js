import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withSnackbar } from 'notistack';
import React from 'react';
import { copyToClipboard, formatTimeStampToLongString } from './utils';

// function ResultParameter(props) {
//     if (props.value) {
//         return (
//             <TableRow>
//                 <TableCell><Typography variant="body2"><b>{props.label}</b>: </Typography></TableCell>
//                 <TableCell><Typography variant="body2">{props.value}</Typography></TableCell>
//             </TableRow>
//         )
//     } else {
//         return <TableRow></TableRow>
//     }
// }

function ResultParameter(props) {
    if (props.value) {
        return (
            <Grid item xs={12}>
                <Typography variant="body2"><b>{props.label}: </b></Typography>
                <Box component="div" my={2} bgcolor="white" overflow="auto" border={1} borderColor="grey.500" borderRadius={10} style={{ padding: 10, cursor: "pointer" }} whiteSpace="nowrap" onClick={() => copyToClipboard(props.value, props.enqueueSnackbar, props.label + " copied")} width="75%">{props.value}</Box>
            </Grid>
        )
    } else {
        return <div></div>
    }
}

class ResultDetailContent extends React.Component {
    render() {
        return (
            <Grid container>
                {/* <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <ResultParameter label="Score" value={props.score} />
                            <ResultParameter label="Normalized Score" value={props.normalized_score} />
                            <ResultParameter label="TimeStamp" value={formatTimeStampToLongString(props.timestamp)} />
                            <ResultParameter label="Project" value={props.project} />
                            <ResultParameter label="Pass / Fail" value={props.passed} />
                            <ResultParameter label="KG URI" value={props.uri} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid> */}

                <Grid item xs={12}>
                    <ResultParameter label="Score" value={this.props.score} enqueueSnackbar={this.props.enqueueSnackbar} />
                    <ResultParameter label="Normalized Score" value={this.props.normalized_score} enqueueSnackbar={this.props.enqueueSnackbar} />
                    <ResultParameter label="TimeStamp" value={formatTimeStampToLongString(this.props.timestamp)} enqueueSnackbar={this.props.enqueueSnackbar} />
                    <ResultParameter label="Project" value={this.props.project} enqueueSnackbar={this.props.enqueueSnackbar} />
                    <ResultParameter label="Pass / Fail" value={this.props.passed} enqueueSnackbar={this.props.enqueueSnackbar} />
                    <ResultParameter label="KG URI" value={this.props.uri} enqueueSnackbar={this.props.enqueueSnackbar} />
                </Grid>

            </Grid>
        );
    }
}

export default withSnackbar(ResultDetailContent);


// {
//     "model_version_id": "20e69189-ab22-4967-88a0-9e719a547380",
//     "timestamp": "2019-11-15T17:19:55.364472",
//     "test_code": {...},
//     "model_version": {...},
//     "normalized_score": 4.577499109011697,
//     "id": "ce63d29b-a674-4311-b6c1-66a76cfda615",
//     "score": 4.577499109011697,
//     "test_code_id": "12660f24-b1f3-4fd8-a768-63fa7ed90be7",
//     "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationresult/v0.1.0/ce63d29b-a674-4311-b6c1-66a76cfda615",
//     "results_storage": [...],
//     "project": 54781,
//     "old_uuid": null,
//     "passed": null
// }
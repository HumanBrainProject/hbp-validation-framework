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
                            <ResultParameter label="Collab ID" value={props.project_id} />
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
                    <ResultParameter label="Collab ID" value={this.props.project_id} enqueueSnackbar={this.props.enqueueSnackbar} />
                    <ResultParameter label="Pass / Fail" value={this.props.passed} enqueueSnackbar={this.props.enqueueSnackbar} />
                    <ResultParameter label="KG URI" value={this.props.uri} enqueueSnackbar={this.props.enqueueSnackbar} />
                </Grid>

            </Grid>
        );
    }
}

export default withSnackbar(ResultDetailContent);
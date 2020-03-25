import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import {formatTimeStampToLongString, roundFloat} from "./utils";

function ResultParameter(props) {
    if (props.value) {
      return (
            <TableRow>
                <TableCell><Typography variant="body2"><b>{props.label}</b>: </Typography></TableCell>
                <TableCell><Typography variant="body2">{props.value}</Typography></TableCell>
            </TableRow>
        )
    } else {
      return <TableRow></TableRow>
    }
}

export default function ResultDetailContent(props) {
  return (
        <Grid container>
            <Grid item xs={12}>
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
            </Grid>
        </Grid>
  );
}


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
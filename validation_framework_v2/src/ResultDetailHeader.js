import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import {formatTimeStampToCompact} from "./utils";


export default function ResultDetailHeader(props) {
  return (
    <React.Fragment>
      <Grid item>
        <Typography variant="h5" gutterBottom>
            Validation Result ID: {props.id}
        </Typography>
        <Typography variant="caption"  color="textSecondary" gutterBottom>
            Timestamp: <b>{formatTimeStampToCompact(props.timestamp)}</b>
        </Typography>
        <br />
        <Divider light />
        <br />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom color="textSecondary">Validated Model: </Typography>
            <Typography variant="h6" gutterBottom>
              {props.modelName}
            </Typography>
            <Typography variant="subtitle2"  color="textSecondary" gutterBottom>
                Alias: <b>{props.modelAlias}</b> &nbsp;&nbsp;&nbsp; Version: <b>{props.modelVersion}</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom color="textSecondary">Validation Test: </Typography>
            <Typography variant="h6" gutterBottom>
                {props.testName}
            </Typography>
            <Typography variant="subtitle2"  color="textSecondary" gutterBottom>
                Alias: <b>{props.testAlias}</b> &nbsp;&nbsp;&nbsp; Version: <b>{props.testVersion}</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
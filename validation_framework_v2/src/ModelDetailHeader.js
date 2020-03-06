import React from 'react';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import PublicIcon from '@material-ui/icons/Public';
import { Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';


function AccessibilityIcon(props) {
    if (props.private) {
      return (
        <Tooltip title="private" placement="top">
        <LockIcon color="disabled" />
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title="public" placement="top">
          <PublicIcon color="disabled" />
        </Tooltip>
      )
    }
  }


export default function ModelDetailHeader(props) {
  return (
    <React.Fragment>
      <Grid item>
        <Typography variant="h4" gutterBottom>
            <AccessibilityIcon private={props.private} /> {props.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
            {props.authors}
        </Typography>
        <Typography variant="caption"  color="textSecondary" gutterBottom>
            ID: <b>{props.id}</b> &nbsp;&nbsp;&nbsp; Custodian: <b>{props.owner}</b> &nbsp;&nbsp;&nbsp; {props.alias ? "Alias: " : ""} <b>{props.alias ? props.alias : ""}</b>
        </Typography>
      </Grid>
      {/* <Grid item> */}
        {/* optional image goes here */}
      {/* </Grid> */}
    </React.Fragment>
  );
}

//  style={{backgroundColor: "#ddddff"}}
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Markdown from './Markdown';
import { Typography } from '@material-ui/core';


const theme = {
  spacing: 8,
}


function InstanceParameter(props) {
  if (props.value) {
    return <Typography variant="body2"><b>{props.label}</b>: {props.value}</Typography>
  } else {
    return ""
  }
}

// style={{backgroundColor: '#ddffdd'}}
// style={{backgroundColor: '#ffddff'}}
// style={{backgroundColor: '#ffdddd'}}

export default function TestDetailContent(props) {
  return (
    <React.Fragment>
      <Grid container xs={9} direction="column" item={true}>
        <Grid item>
          <Box p={2}>
            <Markdown>{props.dataLocation}</Markdown>
            <Markdown>{props.protocol}</Markdown>
          </Box>
        </Grid>
        <Grid item>
          <Box px={2} pb={0}>
            <Typography variant="subtitle1"><b>Versions</b></Typography>
          </Box>
          {props.codes.map(instance => (
            <Box m={2} p={2} pb={0} style={{backgroundColor: '#eeeeee'}} key={instance.id}>
              <Typography variant="subtitle2">{instance.version}</Typography>
              <Typography variant="body2" color="textSecondary">{instance.timestamp}</Typography>
              <InstanceParameter label="Description" value={instance.description} />
              <InstanceParameter label="Source" value={instance.repository} />
              <InstanceParameter label="Path" value={instance.path} />
              <InstanceParameter label="Parameters" value={instance.parameters} />
              <Typography variant="caption" color="textSecondary">ID: {instance.id}</Typography>
              <IconButton aria-label="download code" href={instance.source}>
                <CloudDownloadIcon />
              </IconButton>
          </Box>
          ))}
        </Grid>

        <Grid item>
          {/* todo: images */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


// {
//   "description" : "",
//   "id" : "5476dea4-af1f-45b1-b0c8-f7867a3d1d42",
//   "old_uuid" : null,
//   "parameters" : null,
//   "path" : "hbp_validation_framework.sample.SampleTest",
//   "repository" : "https://github.com/HumanBrainProject/hbp-validation-client.git",
//   "timestamp" : "2019-12-18T14:50:48.295543",
//   "uri" : "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationscript/v0.1.0/5476dea4-af1f-45b1-b0c8-f7867a3d1d42",
//   "version" : "1.0"
// }
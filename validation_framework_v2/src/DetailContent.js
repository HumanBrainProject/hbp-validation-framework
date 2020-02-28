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

export default function DetailContent(props) {
  return (
    <React.Fragment>
      <Grid container xs={9} direction="column">
        <Grid item>
          <Box p={2}>
            <Markdown>{props.description}</Markdown>
          </Box>
        </Grid>
        <Grid item>
          <Box px={2} pb={0}>
            <Typography variant="subtitle1"><b>Versions</b></Typography>
          </Box>
          {props.instances.map(instance => (
            <Box m={2} p={2} pb={0} style={{backgroundColor: '#eeeeee'}} key={instance.id}>
              <Typography variant="subtitle2">{instance.version}</Typography>
              <Typography variant="body2" color="textSecondary">{instance.timestamp}</Typography>
              <InstanceParameter label="Description" value={instance.description} />
              <InstanceParameter label="Parameters" value={instance.parameters} />
              <InstanceParameter label="Morphology" value={instance.morphology} />
              <InstanceParameter label="Code format" value={instance.code_format} />
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


// "license": "",
//                   "code_format": "",
//                   "description": "",
//                   "parameters": "",
//                   "timestamp": "2017-09-24T20:59:41.871267+00:00",
//                   "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/memodel/v0.1.2/c6994d4a-e95b-423a-81c4-f66e6f295d21",
//                   "source": "https://github.com/lbologna/bsp_data_repository",
//                   "version": "20170214164222",
//                   "morphology": null,
//                   "hash": "",
//                   "id": "c6994d4a-e95b-423a-81c4-f66e6f295d21"

import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



function MetadataItem(props) {
  if (props.value) {
    return (
      <ListItem>
        <ListItemText primary={props.value} secondary={props.label} />
      </ListItem>
    )
  } else {
    return "";
  }
}


export default function DetailMetadata(props) {
  return (
    <React.Fragment>
      <Grid item xs={3} style={{backgroundColor: '#dddddd'}}>
        <List aria-label="model metadata" alignItems="flex-start">
          <MetadataItem value={props.species} label="Species" />
          <MetadataItem value={props.brainRegion} label="Brain region" />
          <MetadataItem value={props.cellType} label="Cell type" />
          <MetadataItem value={props.modelScope} label="Model scope" />
          <MetadataItem value={props.abstractionLevel} label="Abstraction level" />
          <MetadataItem value={props.collabID} label="Collab ID" />
        </List>
      </Grid>
    </React.Fragment>
  );
}

import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Theme from './theme';

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

export default function ModelDetailMetadata(props) {
    return (
        <React.Fragment>
            {
                Object.values(props).some(element => Boolean(element))
                    ?
                    <Grid item style={{ backgroundColor: Theme.metadataInfoBox }}>
                        <List aria-label="model metadata">
                            <MetadataItem value={props.species} label="Species" />
                            <MetadataItem value={props.brainRegion} label="Brain region" />
                            <MetadataItem value={props.cellType} label="Cell type" />
                            <MetadataItem value={props.modelScope} label="Model scope" />
                            <MetadataItem value={props.abstractionLevel} label="Abstraction level" />
                            <MetadataItem value={props.projectID} label="Project ID" />
                            <MetadataItem value={props.organization} label="Organization" />
                        </List>
                    </Grid>
                    :
                    <></>
            }
        </React.Fragment>
    );
}

import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Theme from "./theme";

function MetadataItem(props) {
    if (props.value) {
        if (props.label === "Collab ID") {
            return (
                <ListItem button component="a" href={"props.value" + props.value} target="_blank">
                    <Tooltip title={"Click to open Collab"}>
                        <ListItemText primary={props.value} secondary={props.label} />
                    </Tooltip>
                </ListItem>
            );
        } else {
            return (
                <ListItem>
                    <ListItemText primary={props.value} secondary={props.label} />
                </ListItem>
            );
        }
    } else {
        return "";
    }
}

export default function ModelDetailMetadata(props) {
    return (
        <React.Fragment>
            {Object.values(props).some((element) => Boolean(element)) ? (
                <Grid item style={{ backgroundColor: Theme.metadataInfoBox }}>
                    <List aria-label="model metadata">
                        <MetadataItem value={props.species} label="Species" />
                        <MetadataItem
                            value={props.brainRegion}
                            label="Brain region"
                        />
                        <MetadataItem
                            value={props.cellType}
                            label="Cell type"
                        />
                        <MetadataItem
                            value={props.modelScope}
                            label="Model scope"
                        />
                        <MetadataItem
                            value={props.abstractionLevel}
                            label="Abstraction level"
                        />
                        { typeof props.projectID === "string" && isNaN(props.projectID) &&
                            <MetadataItem
                                value={props.projectID}
                                label="Collab ID"
                            />
                        }
                        <MetadataItem
                            value={props.organization}
                            label="Organization"
                        />
                    </List>
                        
                </Grid>
            ) : (
                <></>
            )}
            { typeof props.projectID === "string" && !isNaN(props.projectID) &&
                <Grid style={{padding:20}}>
                    Model has been migrated from Collaboratory v1. 
                    <br /><br />
                    If you are the owner of this model, please contact us via <a target="_blank" rel="noreferrer" href="https://ebrains.eu/support/">https://ebrains.eu/support/</a> to regain edit access.
                </Grid>
            }
        </React.Fragment>
    );
}

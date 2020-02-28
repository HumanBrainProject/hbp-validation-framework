import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';



const style = {
    width: "100%",
    padding: "5em",
    textAlign: 'center'
  };


export default function Introduction() {

    return (
      <Paper style={style}>
        <Typography variant="h4" component="h2" gutterBottom>
            Welcome to the Human Brain Project Validation Framework
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
            No filters are set
        </Typography>
        <Typography variant="body1" gutterBottom>
            To show a list of models and tests, select the species, brain region, model scope, etc.
            by clicking on the configure icon <SettingsIcon /> at the top left.
        </Typography>
      </Paper>
    )
};
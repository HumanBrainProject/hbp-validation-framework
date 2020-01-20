import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';



const style = {
    width: "100%",
    padding: "5em",
    textAlign: 'center'
  };


export default function Introduction() {

    return (
      <Paper style={style}>
        <Typography variant="h4" component="h2" gutterBottom>
            Welcome to the Human Brain Project Model Catalog
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
            No filters are set
        </Typography>
        <Typography variant="body1" gutterBottom>
            To show a list of models, select the species, brain region, model scope, etc.
            by clicking on the filter icon <FilterListIcon /> at the top right.
        </Typography>
      </Paper>
    )
};
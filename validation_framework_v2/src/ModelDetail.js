import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ModelDetailHeader from './ModelDetailHeader';
import ModelDetailContent from './ModelDetailContent';
import ModelDetailMetadata from './ModelDetailMetadata';
import {formatAuthors} from "./utils";


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const MyDialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


export default class ModelDetail extends React.Component {
  constructor(props) {
      super(props);

      this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.onClose();
  }

  render() {
    return (
      <Dialog fullScreen onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <MyDialogTitle onClose={this.handleClose} />
        <DialogContent>
          <Grid container spacing={3}>

            <ModelDetailHeader
              name={this.props.modelData.name}
              authors={formatAuthors(this.props.modelData.author)}
              private={this.props.modelData.private}
              id={this.props.modelData.id}
              alias={this.props.modelData.alias}
              owner={formatAuthors(this.props.modelData.owner)}
            ></ModelDetailHeader>
            <ModelDetailContent
              description={this.props.modelData.description}
              instances={this.props.modelData.instances}
            ></ModelDetailContent>
            <ModelDetailMetadata
              species={this.props.modelData.species}
              brainRegion={this.props.modelData.brain_region}
              cellType={this.props.modelData.cell_type}
              modelScope={this.props.modelData.model_scope}
              abstractionLevel={this.props.modelData.abstraction_level}
              collabID={this.props.modelData.app.collab_id}
              organization={this.props.modelData.organization}
            >
            <ul>
              <li>{this.props.modelData.id}</li>
              <li>{this.props.modelData.alias}</li>
            </ul>
            </ModelDetailMetadata>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

ModelDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

// {
//   "abstraction_level" : "spiking neurons: biophysical",
//   "alias" : "test20200116b",
//   "app" : { … },
//   "author" : [ … ],
//   "brain_region" : "cerebellum",
//   "cell_type" : "Golgi cell",
//   "description" : "description goes here. Seems like license field is disappearing though",
//   "id" : "00422555-4bdf-49c6-98cc-26fc4f5cc54c",
//   "images" : { … },
//   "instances" : [ … ],
//   "model_scope" : "single cell",
//   "name" : "test20200116b",
//   "old_uuid" : null,
//   "organization" : "HBP-SP9",
//   "owner" : [ … ],
//   "private" : true,
//   "species" : "Callithrix jacchus",
//   "uri" : "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/modelproject/v0.1.0/00422555-4bdf-49c6-98cc-26fc4f5cc54c"
// }
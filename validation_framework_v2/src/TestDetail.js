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

import TestDetailHeader from './TestDetailHeader';
import TestDetailContent from './TestDetailContent';
import TestDetailMetadata from './TestDetailMetadata';
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


export default class TestDetail extends React.Component {
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
          <Grid container spacing={2}>

            <TestDetailHeader
              name={this.props.testData.name}
              authors={formatAuthors(this.props.testData.author)}
              id={this.props.testData.id}
              alias={this.props.testData.alias}
              creationDate={this.props.testData.creation_date}
              status={this.props.testData.status}
            ></TestDetailHeader>
            <TestDetailContent
              dataLocation={this.props.testData.data_location}
              protocol={this.props.testData.protocol}
              codes={this.props.testData.codes}
            ></TestDetailContent>
            <TestDetailMetadata
              species={this.props.testData.species}
              brainRegion={this.props.testData.brain_region}
              cellType={this.props.testData.cell_type}
              dataModality={this.props.testData.data_modality}
              dataType={this.props.testData.data_type}
              testType={this.props.testData.test_type}
              scoreType={this.props.testData.score_type}
            >
            <ul>
              <li>{this.props.testData.id}</li>
              <li>{this.props.testData.alias}</li>
            </ul>
            </TestDetailMetadata>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

TestDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};


// {
//   "alias" : "Test_2019-12-18_15:50:45_integration_py3.7.2_getValTest_1",
//   "author" : [ … ],
//   "brain_region" : "basal ganglia",
//   "cell_type" : "granule cell",
//   "codes" : [ … ],
//   "creation_date" : "2019-12-18T14:50:47.764970",
//   "data_location" : "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/sp6_validation_data/test.txt",
//   "data_modality" : "electron microscopy",
//   "data_type" : "Mean, SD",
//   "id" : "005bb12c-9271-4385-a024-87b079dd1db4",
//   "name" : "IGNORE - Test Test - Test_2019-12-18_15:50:45_integration_py3.7.2_getValTest_1",
//   "old_uuid" : null,
//   "protocol" : "Later",
//   "score_type" : "Other",
//   "species" : "Mus musculus",
//   "status" : "proposal",
//   "test_type" : "network structure",
//   "uri" : "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationtestdefinition/v0.1.0/005bb12c-9271-4385-a024-87b079dd1db4"
// }
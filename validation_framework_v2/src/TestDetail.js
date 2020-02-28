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

import DetailHeader from './DetailHeader';
import DetailContent from './DetailContent';
import DetailMetadata from './DetailMetadata';
import formatAuthors from "./utils";


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

            <DetailHeader
              name={this.props.testData.name}
              authors={formatAuthors(this.props.testData.author)}
              id={this.props.testData.id}
              alias={this.props.testData.alias}
            ></DetailHeader>
            <DetailContent
              description={this.props.testData.description}
              instances={this.props.testData.instances}
            ></DetailContent>
            <DetailMetadata
              species={this.props.testData.species}
              brainRegion={this.props.testData.brain_region}
              cellType={this.props.testData.cell_type}
            >
            <ul>
              <li>{this.props.testData.id}</li>
              <li>{this.props.testData.alias}</li>
            </ul>
            </DetailMetadata>
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

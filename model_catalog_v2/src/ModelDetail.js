import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';


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
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
          <DialogTitle id="simple-dialog-title">Dialog title goes here</DialogTitle>
          <ul>
            <li>{this.props.modelData.id}</li>
            <li>{this.props.modelData.name}</li>
            <li>{this.props.modelData.species}</li>
            <li>{this.props.modelData.brainRegion}</li>
            <li>{this.props.modelData.cellType}</li>
            <li>{this.props.modelData.modelScope}</li>
            <li>{this.props.modelData.abstractionLevel}</li>
            <li>{this.props.modelData.authors}</li>
            <li>{this.props.modelData.collabID}</li>
            <li>{this.props.modelData.privacy}</li>
          </ul>
      </Dialog>
    );
  }
}

ModelDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

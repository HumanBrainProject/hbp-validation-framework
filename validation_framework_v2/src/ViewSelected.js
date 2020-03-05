import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default class ViewSelected extends React.Component {
  constructor(props) {
    super(props);
  }

  render_models() {
    let myvar = this.props.selectedData;
    return (
        <Dialog onClose={this.props.onClose}
                aria-labelledby="simple-dialog-title"
                open={this.props.open}
                fullWidth={true}
                maxWidth={false}>
          <DialogTitle>View Model(s)</DialogTitle>
          <DialogContent>
            { JSON.stringify(myvar) }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  render_tests() {
    return (
      <Dialog onClose={this.props.onClose}
              aria-labelledby="simple-dialog-title"
              open={this.props.open}
              fullWidth={true}
              maxWidth={false}>
        <DialogTitle>View Test(s)</DialogTitle>
        <DialogContent>
          {/* Add */}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
  );
}


  render() {
    if (this.props.entity == "models") {
      return this.render_models()
    } else {  // tests
      return this.render_tests()
    }
  }
}
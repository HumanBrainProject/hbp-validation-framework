import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const addLineBreaks = string =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

export default function ErrorDialog(props) {
    console.log("ErrorDialog: " + props.error)
    return (
      <Dialog open={props.open}
              onClose={props.handleErrorDialogClose}
              aria-labelledby="simple-ErrorDialog-title"
              // fullWidth={true}
              maxWidth="sm">
        <DialogTitle>There seems to be a problem...</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {addLineBreaks(props.error)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleErrorDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
};
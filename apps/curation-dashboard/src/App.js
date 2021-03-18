import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import ModelTable from './ModelTable';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://neuropsi.cnrs.fr/">
        CNRS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function App(props) {
  const classes = useStyles();

  if (props.auth.authorized) {
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="relative">
        <Toolbar>
          <MenuIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            EBRAINS Model curation dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <ModelTable auth={props.auth} />
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
  } else {
     return (<div><p>The dashboard is currently only accessible to the model curation team.</p></div>);
  }
}

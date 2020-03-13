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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import TestDetailHeader from './TestDetailHeader';
import TestDetailContent from './TestDetailContent';
import TestDetailMetadata from './TestDetailMetadata';
import TestResultOverview from './TestResultOverview';
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
      this.state = {tabValue: 0};

      this.handleClose = this.handleClose.bind(this);
      this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleClose() {
    this.props.onClose();
  }

  handleTabChange(event, newValue) {
    this.setState({tabValue:newValue})
  }

  render() {
    return (
      <Dialog fullScreen onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <MyDialogTitle onClose={this.handleClose} />
        <DialogContent>
          <Grid container spacing={3}>

            <TestDetailHeader
              name={this.props.testData.name}
              authors={formatAuthors(this.props.testData.author)}
              id={this.props.testData.id}
              alias={this.props.testData.alias}
              creationDate={this.props.testData.creation_date}
              status={this.props.testData.status}
            ></TestDetailHeader>
              <AppBar position="static">
                <Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
                  <Tab label="Info" />
                  <Tab label="Results" />
                </Tabs>
              </AppBar>
              <TabPanel value={this.state.tabValue} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
		    <TestDetailContent
		      dataLocation={this.props.testData.data_location}
		      protocol={this.props.testData.protocol}
		      codes={this.props.testData.codes}
		    ></TestDetailContent>
                  </Grid>
                  <Grid item xs={3}>
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
                </Grid>
              </TabPanel>
              <TabPanel value={this.state.tabValue} index={1}>
                <TestResultOverview
                  baseUrl={this.props.baseUrl} 
                  id={this.props.testData.id}
                  testJSON={this.props.testData}
                />
              </TabPanel>
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

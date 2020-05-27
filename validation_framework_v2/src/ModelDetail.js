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

import axios from 'axios';

import ModelDetailHeader from './ModelDetailHeader';
import ModelDetailContent from './ModelDetailContent';
import ModelDetailMetadata from './ModelDetailMetadata';
import ModelResultOverview from './ModelResultOverview';
import { formatAuthors } from "./utils";
import ResultGraphs from './ResultGraphs';
import { DevMode } from "./globals";
import { baseUrl } from "./globals";

// if working on the appearance/layout set globals.DevMode=true
// to avoid loading the models and tests over the network every time;
// instead we use the local test_data
var result_data = {}
if (DevMode) {
	result_data = require('./dev_data/sample_model_results.json');
}

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


export default class ModelDetail extends React.Component {
	signal = axios.CancelToken.source();

	constructor(props) {
		super(props);
		this.state = {
			tabValue: 0,
			results: [],
			loadingResult: true,
			error: null,
			modelData: this.props.modelData
		};
		if (DevMode) {
			this.state['results'] = result_data.results;
			this.state['loadingResult'] = false;
		}
		this.updateCurrentModelData = this.updateCurrentModelData.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleTabChange = this.handleTabChange.bind(this);
	}

	componentDidMount() {
		if (!DevMode) {
			this.getModelResults();
		}
	}

	componentWillUnmount() {
		this.signal.cancel('REST API call canceled!');
	}

	updateCurrentModelData(updatedModelData) {
		this.setState({
			modelData: updatedModelData
		})
	}

	handleClose() {
		this.props.onClose();
	}

	handleTabChange(event, newValue) {
		this.setState({ tabValue: newValue })
	}

	getModelResults = () => {
		let url = baseUrl + "/results/?order=&model_id=" + this.props.modelData.id;
		let config = {
			cancelToken: this.signal.token,
			headers: {
				'Authorization': 'Bearer ' + this.props.auth.token,
			}
		}
		return axios.get(url, config)
			.then(res => {
				this.setState({
					results: res.data["results"],
					loadingResult: false,
					error: null
				});
			})
			.catch(err => {
				if (axios.isCancel(err)) {
					console.log('Error: ', err.message);
				} else {
					// Something went wrong. Save the error in state and re-render.
					this.setState({
						loadingResult: false,
						error: err
					});
				}
			}
			);
	};

	render() {
		console.log(this.state.modelData)
		return (
			<Dialog fullScreen onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
				<MyDialogTitle onClose={this.handleClose} />
				<DialogContent>
					<Grid container spacing={3}>

						<ModelDetailHeader
							name={this.state.modelData.name}
							authors={formatAuthors(this.state.modelData.author)}
							private={this.state.modelData.private}
							id={this.state.modelData.id}
							alias={this.state.modelData.alias}
							owner={formatAuthors(this.state.modelData.owner)}
							modelData={this.state.modelData}
							updateCurrentModelData={this.updateCurrentModelData}
						></ModelDetailHeader>
						<AppBar position="static">
							<Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
								<Tab label="Info" />
								<Tab label="Results" />
								<Tab label="Figures" />
							</Tabs>
						</AppBar>
						<TabPanel value={this.state.tabValue} index={0}>
							<Grid container spacing={2}>
								<Grid item xs={9}>
									<ModelDetailContent
										description={this.state.modelData.description}
										instances={this.state.modelData.instances}
										id={this.state.modelData.id}
										results={this.state.results}
									></ModelDetailContent>
								</Grid>
								<Grid item xs={3}>
									<ModelDetailMetadata
										species={this.state.modelData.species}
										brainRegion={this.state.modelData.brain_region}
										cellType={this.state.modelData.cell_type}
										modelScope={this.state.modelData.model_scope}
										abstractionLevel={this.state.modelData.abstraction_level}
										collabID={this.state.modelData.app.collab_id}
										organization={this.state.modelData.organization}
									>
										<ul>
											<li>{this.state.modelData.id}</li>
											<li>{this.state.modelData.alias}</li>
										</ul>
									</ModelDetailMetadata>
								</Grid>
							</Grid>
						</TabPanel>
						<TabPanel value={this.state.tabValue} index={1}>
							<ModelResultOverview
								id={this.state.modelData.id}
								modelJSON={this.state.modelData}
								results={this.state.results}
								loadingResult={this.state.loadingResult}
							/>
						</TabPanel>
						<TabPanel value={this.state.tabValue} index={2}>
							<ResultGraphs
								id={this.state.modelData.id}
								results={this.state.results}
								loadingResult={this.state.loadingResult}
							/>
						</TabPanel>
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

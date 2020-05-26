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
			error: null
		};
		if (DevMode) {
			this.state['results'] = result_data.results;
			this.state['loadingResult'] = false;
		}
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
										description={this.props.modelData.description}
										instances={this.props.modelData.instances}
										id={this.props.modelData.id}
										results={this.state.results}
									></ModelDetailContent>
								</Grid>
								<Grid item xs={3}>
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
							</Grid>
						</TabPanel>
						<TabPanel value={this.state.tabValue} index={1}>
							<ModelResultOverview
								id={this.props.modelData.id}
								modelJSON={this.props.modelData}
								results={this.state.results}
								loadingResult={this.state.loadingResult}
							/>
						</TabPanel>
						<TabPanel value={this.state.tabValue} index={2}>
							<ResultGraphs
								id={this.props.modelData.id}
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

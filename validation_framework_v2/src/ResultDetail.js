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
import Theme from './theme';

import ResultDetailHeader from './ResultDetailHeader';
import ResultDetailContent from './ResultDetailContent';
import ResultRelatedFiles from './ResultRelatedFiles';
import ResultModelTestInfo from './ResultModelTestInfo';

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


export default class ResultDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tabValue: 0 };

		this.handleClose = this.handleClose.bind(this);
		this.handleTabChange = this.handleTabChange.bind(this);
	}

	handleClose() {
		this.props.onClose();
	}

	handleTabChange(event, newValue) {
		this.setState({ tabValue: newValue })
	}

	render() {
		const result = this.props.result;
		return (
			<Dialog fullScreen onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
				<MyDialogTitle onClose={this.handleClose} />
				<DialogContent>
					<Grid container spacing={3}>

						<ResultDetailHeader
							id={result.id}
                            timestamp={result.timestamp}
                            modelID={result.model_version.model.id}
							modelName={result.model_version.model.name}
                            modelAlias={result.model_version.model.alias}
                            modelInstID={result.model_version.id}
                            modelVersion={result.model_version.version}
                            testID={result.test_code.test_definition.id}
							testName={result.test_code.test_definition.name}
                            testAlias={result.test_code.test_definition.alias}
                            testInstID={result.test_code.id}
							testVersion={result.test_code.version}
						/>
						<AppBar position="static">
							<Tabs value={this.state.tabValue} onChange={this.handleTabChange}
								style={{ backgroundColor: Theme.tableRowSelectColor, color: Theme.textPrimary }}>
								<Tab label="Result Info" />
								<Tab label="Result Files" />
								<Tab label="Model/Test Info" />
							</Tabs>
						</AppBar>
						<TabPanel value={this.state.tabValue} index={0}>
							<ResultDetailContent
								score={result.score}
								normalized_score={result.normalized_score}
								timestamp={result.timestamp}
								project={result.project}
								passed={result.passed}
								uri={result.uri}
							/>
						</TabPanel>
						<TabPanel value={this.state.tabValue} index={1}>
							<ResultRelatedFiles
								result_files={result.results_storage}
							/>
						</TabPanel>
						<TabPanel value={this.state.tabValue} index={2}>
							<ResultModelTestInfo
								model={result.model_version.model}
								model_instance={result.model_version}
								test={result.test_code.test_definition}
								test_instance={result.test_code}
							/>
						</TabPanel>
					</Grid>
				</DialogContent>
			</Dialog>
		);
	}
}

ResultDetail.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};


// {
//   "model_version_id": "20e69189-ab22-4967-88a0-9e719a547380",
//   "timestamp": "2019-11-15T17:19:55.364472",
//   "test_code": {
//       "version": "1.0",
//       "repository": "https://github.com/KaliLab/hippounit.git",
//       "timestamp": "2018-03-08T15:41:11.846933Z",
//       "path": "hippounit.tests.BackpropagatingAPTest",
//       "id": "12660f24-b1f3-4fd8-a768-63fa7ed90be7",
//       "test_definition_id": "4d1210a6-e674-4cb6-a9cd-981a11d31175",
//       "description": null,
//       "test_definition": {
//           "status": "in development",
//           "cell_type": "pyramidal cell",
//           "codes": [
//               {
//                   "old_uuid": "8df4d05b-962c-4e3a-bd34-8cf55cd79c76",
//                   "version": "1.0",
//                   "repository": "https://github.com/KaliLab/hippounit.git",
//                   "timestamp": "2018-03-08T15:41:11.846933Z",
//                   "path": "hippounit.tests.BackpropagatingAPTest",
//                   "description": null,
//                   "parameters": null,
//                   "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationscript/v0.1.0/12660f24-b1f3-4fd8-a768-63fa7ed90be7",
//                   "id": "12660f24-b1f3-4fd8-a768-63fa7ed90be7"
//               }
//           ],
//           "protocol": "Tests the mode and efficacy of back-propagating action potentials on the apical trunk.",
//           "name": "Hippocampus_CA1_BackpropagatingAPTest",
//           "data_type": "Mean, SD",
//           "data_modality": "electrophysiology",
//           "test_type": "single cell activity",
//           "author": [
//               {
//                   "family_name": "Saray",
//                   "given_name": "Sara"
//               }
//           ],
//           "creation_date": "2018-03-08T15:41:11.839826Z",
//           "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationtestdefinition/v0.1.0/4d1210a6-e674-4cb6-a9cd-981a11d31175",
//           "species": "Rattus norvegicus",
//           "alias": "hippo_ca1_bap",
//           "old_uuid": "3aab7a1c-0836-4412-bcd3-f0b3a4685ee3",
//           "brain_region": "hippocampus",
//           "score_type": "Other",
//           "id": "4d1210a6-e674-4cb6-a9cd-981a11d31175",
//           "data_location": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/sp6_validation_data/hippounit/feat_backpropagating_AP_target_data.json"
//       },
//       "parameters": null,
//       "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationscript/v0.1.0/12660f24-b1f3-4fd8-a768-63fa7ed90be7",
//       "old_uuid": "8df4d05b-962c-4e3a-bd34-8cf55cd79c76"
//   },
//   "model_version": {
//       "model_uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/modelproject/v0.1.0/71192c8c-e46e-4b8b-b874-6eecd03df336",
//       "code_format": "hoc, mod",
//       "description": "",
//       "model_id": "71192c8c-e46e-4b8b-b874-6eecd03df336",
//       "timestamp": "2019-06-06T12:55:17.673676+00:00",
//       "morphology": null,
//       "hash": "",
//       "id": "20e69189-ab22-4967-88a0-9e719a547380",
//       "license": null,
//       "parameters": "{\"class_name\" : \"Katz_et_al_2009\"}",
//       "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/memodel/v0.1.2/20e69189-ab22-4967-88a0-9e719a547380",
//       "source": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/hippounit_paper_resources/models/Katz_et_al_2009_2stageintegration_code.zip",
//       "version": "1.0",
//       "model": {
//           "cell_type": "hippocampus CA1 pyramidal cell",
//           "name": "Katz_et_al_2009_2stageintegration_code",
//           "images": null,
//           "author": [
//               {
//                   "family_name": "Katz",
//                   "given_name": "Yael"
//               },
//               {
//                   "family_name": "Menon",
//                   "given_name": "Vilas"
//               },
//               {
//                   "family_name": "Nicholson",
//                   "given_name": "Daniel A."
//               },
//               {
//                   "family_name": "Geinisman",
//                   "given_name": "Yuri"
//               },
//               {
//                   "family_name": "Kath",
//                   "given_name": "William L."
//               },
//               {
//                   "family_name": "Spruston",
//                   "given_name": "Nelson"
//               },
//               {
//                   "family_name": "Sáray",
//                   "given_name": "Sára"
//               }
//           ],
//           "app": {
//               "collab_id": 54781
//           },
//           "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/modelproject/v0.1.0/71192c8c-e46e-4b8b-b874-6eecd03df336",
//           "private": false,
//           "model_scope": "single cell",
//           "species": "Rattus norvegicus",
//           "alias": "katz_2009",
//           "old_uuid": "bcd93a30-f338-45e7-9ce2-1e20261615a9",
//           "abstraction_level": "spiking neurons: biophysical",
//           "brain_region": "hippocampus",
//           "owner": [
//               {
//                   "family_name": "Sáray",
//                   "given_name": "Sára"
//               }
//           ],
//           "organization": "HBP-SP6",
//           "instances": [
//               {
//                   "license": "",
//                   "code_format": "hoc, mod",
//                   "description": "",
//                   "parameters": "{\"class_name\" : \"Katz_et_al_2009\"}",
//                   "timestamp": "2019-06-06T12:55:17.673676+00:00",
//                   "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/memodel/v0.1.2/20e69189-ab22-4967-88a0-9e719a547380",
//                   "source": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/hippounit_paper_resources/models/Katz_et_al_2009_2stageintegration_code.zip",
//                   "version": "1.0",
//                   "morphology": null,
//                   "hash": "",
//                   "id": "20e69189-ab22-4967-88a0-9e719a547380"
//               }
//           ],
//           "id": "71192c8c-e46e-4b8b-b874-6eecd03df336",
//           "description": "The Katz et al. (2009) model(ModelDB accession number: 127351) is based on the Golding et al. (2001) model and was build to investigate the functional consequences of the distribution of strength and density of synapses on the apical dendrites, that they observed experimentally, on the mode of dendritic integration."
//       }
//   },
//   "normalized_score": 4.577499109011697,
//   "id": "ce63d29b-a674-4311-b6c1-66a76cfda615",
//   "score": 4.577499109011697,
//   "test_code_id": "12660f24-b1f3-4fd8-a768-63fa7ed90be7",
//   "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationresult/v0.1.0/ce63d29b-a674-4311-b6c1-66a76cfda615",
//   "results_storage": [
//       {
//           "collab_storage ": {
//               "path ": "/8123/validation_results/2020-03-23/CA1_pyr_cACpyr_oh140807_A0_idG_20190328143451_20200323-164558/figs/somaticfeat_UCL_data/traces.pdf ",
//               "uuid ": "48739143-a949-4cb8-b8f2-fe853feabff9 "
//           },
//           "download_url ": "https://collab.humanbrainproject.eu/#/collab/8123/nav/61645?state=uuid%3D48739143-a949-4cb8-b8f2-fe853feabff9 "
//       },
//       {
//           "collab_storage ": {
//               "path ": "/8123/validation_results/2020-03-23/CA1_pyr_cACpyr_oh140807_A0_idG_20190328143451_20200323-164558/figs/somaticfeat_UCL_data/absolute_features.pdf ",
//               "uuid ": "f0d3aa22-0e25-4c67-9491-2448d2a68b08 "
//           },
//           "download_url ": "https://collab.humanbrainproject.eu/#/collab/8123/nav/61645?state=uuid%3Df0d3aa22-0e25-4c67-9491-2448d2a68b08 "
//       },
//       {
//           "collab_storage ": {
//               "path ": "/8123/validation_results/2020-03-23/CA1_pyr_cACpyr_oh140807_A0_idG_20190328143451_20200323-164558/figs/somaticfeat_UCL_data/Feature_errors.pdf ",
//               "uuid ": "c1fa93a9-469e-4553-9e5d-060dd34492fd "
//           },
//           "download_url ": "https://collab.humanbrainproject.eu/#/collab/8123/nav/61645?state=uuid%3Dc1fa93a9-469e-4553-9e5d-060dd34492fd "
//       },
//       {
//           "collab_storage ": {
//               "path ": "/8123/validation_results/2020-03-23/CA1_pyr_cACpyr_oh140807_A0_idG_20190328143451_20200323-164558/figs/somaticfeat_UCL_data/traces_subplots.pdf ",
//               "uuid ": "66ead16c-2ff3-429f-a7ef-36bcb4dc4f59 "
//           },
//           "download_url ": "https://collab.humanbrainproject.eu/#/collab/8123/nav/61645?state=uuid%3D66ead16c-2ff3-429f-a7ef-36bcb4dc4f59 "
//       },
//       {
//           "collab_storage ": {
//               "path ": "/8123/validation_results/2020-03-23/CA1_pyr_cACpyr_oh140807_A0_idG_20190328143451_20200323-164558/results/somaticfeat_UCL_data/somatic_model_features.json ",
//               "uuid ": "0802e82a-2ae3-4943-aaef-bf53272031ef "
//           },
//           "download_url ": "https://collab.humanbrainproject.eu/#/collab/8123/nav/61645?state=uuid%3D0802e82a-2ae3-4943-aaef-bf53272031ef "
//       },
//       {
//           "collab_storage ": {
//               "path ": "/8123/validation_results/2020-03-23/CA1_pyr_cACpyr_oh140807_A0_idG_20190328143451_20200323-164558/results/somaticfeat_UCL_data/somatic_model_errors.json ",
//               "uuid ": "afe17e0c-e7c2-4ece-a656-8dbea4c2c9fd "
//           },
//           "download_url ": "https://collab.humanbrainproject.eu/#/collab/8123/nav/61645?state=uuid%3Dafe17e0c-e7c2-4ece-a656-8dbea4c2c9fd "
//       },
//       {
//           "collab_storage ": {
//               "path ": "/8123/validation_results/2020-03-23/CA1_pyr_cACpyr_oh140807_A0_idG_20190328143451_20200323-164558/results/somaticfeat_UCL_data/final_score.json ",
//               "uuid ": "e495d791-96d2-433a-b3ab-0aad93f527f1 "
//           },
//           "download_url ": "https://collab.humanbrainproject.eu/#/collab/8123/nav/61645?state=uuid%3De495d791-96d2-433a-b3ab-0aad93f527f1 "
//       },
//       {
//           "collab_storage ": {
//               "path ": "/8123/validation_results/2020-03-23/CA1_pyr_cACpyr_oh140807_A0_idG_20190328143451_20200323-164558/results/somaticfeat_UCL_data/test_log.txt ",
//               "uuid ": "86e7757b-7033-4334-b09e-5e874227f6cb "
//           },
//           "download_url ": "https://collab.humanbrainproject.eu/#/collab/8123/nav/61645?state=uuid%3D86e7757b-7033-4334-b09e-5e874227f6cb "
//       }
//   ],
//   "project": 54781,
//   "old_uuid": null,
//   "passed": null
// }
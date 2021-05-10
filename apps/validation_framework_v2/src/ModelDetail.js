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

import { withSnackbar } from 'notistack';

import axios from 'axios';

import { DevMode, ADMIN_PROJECT_ID } from "./globals";
import { datastore } from './datastore';
import Theme from './theme';
import ContextMain from './ContextMain';
import { showNotification, formatAuthors } from './utils';
import ModelDetailHeader from './ModelDetailHeader';
import ModelDetailContent from './ModelDetailContent';
import ModelDetailMetadata from './ModelDetailMetadata';
import ModelResultOverview from './ModelResultOverview';
import ResultGraphs from './ResultGraphs';


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


class ModelDetail extends React.Component {
    signal = axios.CancelToken.source();
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);
        const [authContext,] = this.context.auth;

        this.state = {
            tabValue: 0,
            results: null,
            loadingResult: true,
            error: null,
            modelData: this.props.modelData,
            auth: authContext,
            canEdit: false,
            compareFlag: this.props.modelData.instances.length === 0 ? null : this.checkCompareStatus()
        };
        if (DevMode) {
            this.state['results'] = result_data.results;
            this.state['loadingResult'] = false;
        }
        this.updateCurrentModelData = this.updateCurrentModelData.bind(this);
        this.checkCompareStatus = this.checkCompareStatus.bind(this);
        this.addModelCompare = this.addModelCompare.bind(this);
        this.removeModelCompare = this.removeModelCompare.bind(this);
        this.addModelInstanceCompare = this.addModelInstanceCompare.bind(this);
        this.removeModelInstanceCompare = this.removeModelInstanceCompare.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.checkEditAccess = this.checkEditAccess.bind(this);
    }

    componentDidMount() {
        if (!DevMode) {
            this.getModelResults();
            this.checkEditAccess();
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

    checkCompareStatus() {
        // required since model could have been added to compare via table listing
        let [compareModels,] = this.context.compareModels;
        // check if model exists in compare
        if (!(this.props.modelData.id in compareModels)) {
            return false;
        }
        let model_inst_ids = this.props.modelData.instances.map(item => item.id).sort()
        let compare_model_inst_ids = Object.keys(compareModels[this.props.modelData.id].selected_instances).sort()
        // check if all the model instances already added to compare
        console.log(model_inst_ids.toString());
        console.log(compare_model_inst_ids.toString());
        if (model_inst_ids.toString() === compare_model_inst_ids.toString()) {
            return true;
        } else {
            return false;
        }
    }

    addModelCompare() {
        console.log("Add item to compare.")
        let [compareModels, setCompareModels] = this.context.compareModels;
        console.log(compareModels);
        let model = this.state.modelData;
        // check if model already added to compare
        if (!(model.id in compareModels)) {
            compareModels[model.id] = {
                "name": model.name,
                "alias": model.alias,
                "selected_instances": {}
            }
        }
        // loop through every instance of this model
        for (let model_inst of model.instances) {
            // check if model instance already added to compare
            if (!(model_inst.id in compareModels[model.id].selected_instances)) {
                compareModels[model.id].selected_instances[model_inst.id] = {
                    "version": model_inst.version,
                    "timestamp": model_inst.timestamp
                }
            }
        }
        console.log(compareModels);
        setCompareModels(compareModels);
        this.setState({ compareFlag: true })
        showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Model added to compare!", "info")
    }

    removeModelCompare() {
        console.log("Remove item from compare.")
        let [compareModels, setCompareModels] = this.context.compareModels;
        console.log(compareModels);
        let model = this.state.modelData;
        // remove if model exists for compare
        if (model.id in compareModels) {
            delete compareModels[model.id];
        }
        console.log(compareModels);
        setCompareModels(compareModels);
        this.setState({ compareFlag: false })
        showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Model removed from compare!", "info")
    }

    addModelInstanceCompare(model_inst_id) {
        console.log("Add instance to compare.")
        let [compareModels, setCompareModels] = this.context.compareModels;
        console.log(compareModels);
        let model = this.state.modelData;
        // check if model already added to compare
        if (!(model.id in compareModels)) {
            compareModels[model.id] = {
                "name": model.name,
                "alias": model.alias,
                "selected_instances": {}
            }
        }
        // add model instance to compare
        let model_inst = model.instances.find(item => item.id === model_inst_id);
        // check if model instance already added to compare
        if (!(model_inst_id in compareModels[model.id].selected_instances)) {
            compareModels[model.id].selected_instances[model_inst_id] = {
                "version": model_inst.version,
                "timestamp": model_inst.timestamp
            }
        }
        // check if all model instances are now in compare
        this.setState({ compareFlag: this.checkCompareStatus() })
        console.log(compareModels);
        setCompareModels(compareModels);
        showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Model instance added to compare!", "info")
    }

    removeModelInstanceCompare(model_inst_id) {
        console.log("Remove instance from compare.")
        let [compareModels, setCompareModels] = this.context.compareModels;
        console.log(compareModels);
        let model = this.state.modelData;
        if (model.id in compareModels) {
            if (model_inst_id in compareModels[model.id].selected_instances) {
                delete compareModels[model.id].selected_instances[model_inst_id];
            }
        }
        // remove model if it does not contain any other instances for compare
        if (Object.keys(compareModels[model.id].selected_instances).length === 0) {
            delete compareModels[model.id];
            this.setState({ compareFlag: false })
        }
        console.log(compareModels);
        setCompareModels(compareModels);
        this.forceUpdate();
        showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Model instance removed from compare!", "info")
    }

    handleClose() {
        this.props.onClose();
    }

    handleTabChange(event, newValue) {
        this.setState({ tabValue: newValue })
    }

    getModelResults() {
        return datastore.getResultsByModel(this.props.modelData.id)
            .then(res => {
                this.setState({
                    results: res.data,
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

    checkEditAccess() {
        let model = this.state.modelData;
        console.log(datastore);
        datastore.getProjects()
            .then(projects => {
                projects.forEach(proj => {
                    if ((proj.project_id === model.project_id) || (proj.project_id === ADMIN_PROJECT_ID)) {
                        this.setState({
                            canEdit: true
                        });
                    }
                })
            })
            .catch(err => {
                console.log('Error: ', err.message);
            });
    }

    render() {
        console.log(this.state.modelData)
        return (
            <Dialog fullScreen onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <MyDialogTitle onClose={this.handleClose} />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ModelDetailHeader
                                name={this.state.modelData.name}
                                authors={formatAuthors(this.state.modelData.author)}
                                private={this.state.modelData.private}
                                id={this.state.modelData.id}
                                alias={this.state.modelData.alias}
                                dateCreated={this.state.modelData.date_created}
                                owner={formatAuthors(this.state.modelData.owner)}
                                modelData={this.state.modelData}
                                canEdit={this.state.canEdit}
                                updateCurrentModelData={this.updateCurrentModelData}
                                compareFlag={this.state.compareFlag}
                                addModelCompare={this.addModelCompare}
                                removeModelCompare={this.removeModelCompare}
                            ></ModelDetailHeader>
                        </Grid>
                        <Grid item xs={12}>
                            <AppBar position="static">
                                <Tabs value={this.state.tabValue} onChange={this.handleTabChange}
                                    style={{ backgroundColor: Theme.tableRowSelectColor, color: Theme.textPrimary }} >
                                    <Tab label="Info" />
                                    <Tab label="Results" />
                                    <Tab label="Figures" />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={this.state.tabValue} index={0}>
                                <Grid container spacing={3}>
                                    <Grid item xs={9}>
                                        <ModelDetailContent
                                            description={this.state.modelData.description}
                                            instances={this.state.modelData.instances}
                                            id={this.state.modelData.id}
                                            modelScope={this.state.modelData.model_scope}
                                            canEdit={this.state.canEdit}
                                            results={this.state.results}
                                            addModelInstanceCompare={this.addModelInstanceCompare}
                                            removeModelInstanceCompare={this.removeModelInstanceCompare}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ModelDetailMetadata
                                            species={this.state.modelData.species}
                                            brainRegion={this.state.modelData.brain_region}
                                            cellType={this.state.modelData.cell_type}
                                            modelScope={this.state.modelData.model_scope}
                                            abstractionLevel={this.state.modelData.abstraction_level}
                                            projectID={this.state.modelData.project_id}
                                            organization={this.state.modelData.organization}
                                        />
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

export default withSnackbar(ModelDetail);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import { withSnackbar } from "notistack";

import axios from "axios";

import { DevMode } from "./globals";
import { datastore } from "./datastore";
import Theme from "./theme";
import ContextMain from "./ContextMain";
import { showNotification, formatAuthors } from "./utils";
import TestDetailHeader from "./TestDetailHeader";
import TestDetailContent from "./TestDetailContent";
import TestDetailMetadata from "./TestDetailMetadata";
import TestResultOverview from "./TestResultOverview";
import ResultGraphs from "./ResultGraphs";

// if working on the appearance/layout set globals.DevMode=true
// to avoid loading the models and tests over the network every time;
// instead we use the local test_data
var result_data = {};
if (DevMode) {
    result_data = require("./dev_data/sample_test_results.json");
}

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    default_tabStyle: {
        backgroundColor: Theme.tableHeader,
    },
    active_tabStyle: {
        backgroundColor: Theme.activeTabColor,
    },
    default_subTabStyle: {
        backgroundColor: Theme.subTabColor,
        fontStyle: "italic",
        opacity: 1.0
    }
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

const MyDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class TestDetail extends React.Component {
    signal = axios.CancelToken.source();
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);
        const [authContext] = this.context.auth;

        let testData = this.props.testData;
        if (!testData.data_location) {
            testData.data_location = [];
        }

        this.state = {
            tabValue: 0,
            results: null,
            loadingResult: true,
            loadingExtended: true,
            error: null,
            auth: authContext,
            compareFlag: null,
        };
        if (DevMode) {
            this.state["results"] = result_data.results;
            this.state["loadingResult"] = false;
            this.state["loadingExtended"] = false;
        }
        this.updateCurrentTestData = this.updateCurrentTestData.bind(this);
        this.checkCompareStatus = this.checkCompareStatus.bind(this);
        this.addTestCompare = this.addTestCompare.bind(this);
        this.removeTestCompare = this.removeTestCompare.bind(this);
        this.addTestInstanceCompare = this.addTestInstanceCompare.bind(this);
        this.removeTestInstanceCompare =
            this.removeTestInstanceCompare.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.getExtendedData = this.getExtendedData.bind(this);
    }

    componentDidMount() {
        if (!DevMode) {
            this.getExtendedData();
            this.getTestResults();
        }
    }

    componentWillUnmount() {
        this.signal.cancel("REST API call canceled!");
    }

    updateCurrentTestData(updatedTestData) {
        this.props.updateCurrentTestData(updatedTestData);
    }

    checkCompareStatus(testData) {
        // required since test could have been added to compare via table listing
        let [compareTests] = this.context.compareTests;
        // check if test exists in compare
        if (!(testData.id in compareTests)) {
            return false;
        }
        let test_inst_ids = testData.instances.map((item) => item.id).sort();
        let compare_test_inst_ids = Object.keys(
            compareTests[testData.id].selected_instances
        ).sort();
        // check if all the test instances already added to compare

        if (test_inst_ids.toString() === compare_test_inst_ids.toString()) {
            return true;
        } else {
            return false;
        }
    }

    addTestCompare() {
        console.log("Add item to compare.");
        let [compareTests, setCompareTests] = this.context.compareTests;

        let test = this.props.testData;
        // check if test already added to compare
        if (!(test.id in compareTests)) {
            compareTests[test.id] = {
                name: test.name,
                alias: test.alias,
                selected_instances: {},
            };
        }
        // loop through every instance of this test
        for (let test_inst of test.instances) {
            // check if test instance already added to compare
            if (!(test_inst.id in compareTests[test.id].selected_instances)) {
                compareTests[test.id].selected_instances[test_inst.id] = {
                    version: test_inst.version,
                    timestamp: test_inst.timestamp,
                };
            }
        }

        setCompareTests(compareTests);
        this.setState({ compareFlag: true });
        showNotification(
            this.props.enqueueSnackbar,
            this.props.closeSnackbar,
            "Test added to compare!",
            "info"
        );
    }

    removeTestCompare() {
        console.log("Remove item from compare.");
        let [compareTests, setCompareTests] = this.context.compareTests;

        let test = this.props.testData;
        // remove if test exists for compare
        if (test.id in compareTests) {
            delete compareTests[test.id];
        }

        setCompareTests(compareTests);
        this.setState({ compareFlag: false });
        showNotification(
            this.props.enqueueSnackbar,
            this.props.closeSnackbar,
            "Test removed from compare!",
            "info"
        );
    }

    addTestInstanceCompare(test_inst_id) {
        console.log("Add instance to compare.");
        let [compareTests, setCompareTests] = this.context.compareTests;

        let test = this.props.testData;
        // check if test already added to compare
        if (!(test.id in compareTests)) {
            compareTests[test.id] = {
                name: test.name,
                alias: test.alias,
                selected_instances: {},
            };
        }
        // add test instance to compare
        let test_inst = test.instances.find((item) => item.id === test_inst_id);
        // check if test instance already added to compare
        if (!(test_inst_id in compareTests[test.id].selected_instances)) {
            compareTests[test.id].selected_instances[test_inst_id] = {
                version: test_inst.version,
                timestamp: test_inst.timestamp,
            };
        }
        // check if all test instances are now in compare
        this.setState({ compareFlag: this.checkCompareStatus(test) });

        setCompareTests(compareTests);
        showNotification(
            this.props.enqueueSnackbar,
            this.props.closeSnackbar,
            "Test instance added to compare!",
            "info"
        );
    }

    removeTestInstanceCompare(test_inst_id) {
        console.log("Remove instance from compare.");
        let [compareTests, setCompareTests] = this.context.compareTests;

        let test = this.props.testData;
        if (test.id in compareTests) {
            if (test_inst_id in compareTests[test.id].selected_instances) {
                delete compareTests[test.id].selected_instances[test_inst_id];
            }
        }
        // remove test if it does not contain any other instances for compare
        if (
            Object.keys(compareTests[test.id].selected_instances).length === 0
        ) {
            delete compareTests[test.id];
            this.setState({ compareFlag: false });
        }

        setCompareTests(compareTests);
        this.forceUpdate();
        showNotification(
            this.props.enqueueSnackbar,
            this.props.closeSnackbar,
            "Test instance removed from compare!",
            "info"
        );
    }

    handleClose() {
        this.props.onClose();
    }

    handleTabChange(event, newValue) {
        // 0 : Model Info
        // 1 : Validations
        // 2 : Validations -> Results
        // 3 : Validations -> Figures
        if (newValue === 1) {
            newValue = 2
        }
        this.setState({ tabValue: newValue });
    }

    getExtendedData() {
        return datastore
            .getTest(this.props.testData.id, this.signal)
            .then((test) => {
                this.props.updateCurrentTestData(test);
                this.setState({
                    loadingExtended: false,
                    error: null,
                    compareFlag:
                        test.instances.length === 0
                            ? null
                            : this.checkCompareStatus(test),
                });
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("Error: ", err.message);
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    this.setState({
                        loadingExtended: false,
                        error: err,
                    });
                }
            });
    }

    getTestResults = () => {
        return datastore
            .getResultsByTest(this.props.testData.id, this.signal)
            .then((results) => {
                this.setState({
                    results: results,
                    loadingResult: false,
                    error: null,
                });
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("Error: ", err.message);
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    this.setState({
                        loadingResult: false,
                        error: err,
                    });
                }
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                fullScreen
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.props.open}
            >
                <MyDialogTitle onClose={this.handleClose} />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TestDetailHeader
                                name={this.props.testData.name}
                                authors={formatAuthors(
                                    this.props.testData.author
                                )}
                                id={this.props.testData.id}
                                alias={this.props.testData.alias}
                                dateCreated={this.props.testData.date_created}
                                implementation_status={
                                    this.props.testData.implementation_status
                                }
                                testData={this.props.testData}
                                updateCurrentTestData={
                                    this.updateCurrentTestData
                                }
                                compareFlag={this.state.compareFlag}
                                addTestCompare={this.addTestCompare}
                                removeTestCompare={this.removeTestCompare}
                            ></TestDetailHeader>
                        </Grid>
                        <Grid item xs={12}>
                            <AppBar position="static">
                                <Tabs
                                    value={this.state.tabValue}
                                    onChange={this.handleTabChange}
                                    style={{
                                        backgroundColor:
                                            Theme.pageDetailBarColor,
                                        color: Theme.textPrimary,
                                    }}
                                >
                                    <Tab label="Info" className={this.state.tabValue === 0 ? classes.active_tabStyle : classes.default_tabStyle}
                                        style={{ opacity: 1 }} />

                                    <Tab label={this.state.tabValue >= 1
                                        ? <div>Validations<DoubleArrowIcon style={{ verticalAlign: 'bottom', opacity: 1 }} /></div>
                                        : "Validations"}
                                        className={this.state.tabValue >= 1 ? classes.active_tabStyle : classes.default_tabStyle} />

                                    {this.state.tabValue >= 1 && <Tab label="Results" className={classes.default_subTabStyle}
                                        style={{
                                            borderTop: "medium solid", borderTopColor: Theme.activeTabColor,
                                            borderBottom: "medium solid", borderBottomColor: Theme.activeTabColor
                                        }} />}

                                    {this.state.tabValue >= 1 && <Tab label="Figures" className={classes.default_subTabStyle}
                                        style={{
                                            borderTop: "medium solid", borderTopColor: Theme.activeTabColor,
                                            borderBottom: "medium solid", borderBottomColor: Theme.activeTabColor
                                        }} />}
                                </Tabs>
                            </AppBar>
                            <TabPanel value={this.state.tabValue} index={0}>
                                <Grid container spacing={3}>
                                    <Grid item xs={9}>
                                        <TestDetailContent
                                            dataLocation={
                                                this.props.testData
                                                    .data_location
                                            }
                                            description={
                                                this.props.testData.description
                                            }
                                            instances={
                                                this.props.testData.instances
                                            }
                                            id={this.props.testData.id}
                                            results={this.state.results}
                                            loading={this.state.loadingExtended}
                                            addTestInstanceCompare={
                                                this.addTestInstanceCompare
                                            }
                                            removeTestInstanceCompare={
                                                this.removeTestInstanceCompare
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TestDetailMetadata
                                            species={
                                                this.props.testData.species
                                            }
                                            brainRegion={
                                                this.props.testData.brain_region
                                            }
                                            cellType={
                                                this.props.testData.cell_type
                                            }
                                            recording_modality={
                                                this.props.testData
                                                    .recording_modality
                                            }
                                            dataType={
                                                this.props.testData.data_type
                                            }
                                            testType={
                                                this.props.testData.test_type
                                            }
                                            scoreType={
                                                this.props.testData.score_type
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={1}>
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={2}>
                                <TestResultOverview
                                    id={this.props.testData.id}
                                    testJSON={this.props.testData}
                                    results={this.state.results}
                                    loadingResult={this.state.loadingResult}
                                />
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={3}>
                                <ResultGraphs
                                    id={this.props.testData.id}
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

TestDetail.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withSnackbar(withStyles(styles)(TestDetail));

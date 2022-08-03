import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Theme from "./theme";
import ContextMain from "./ContextMain";
import ResultDetailHeader from "./ResultDetailHeader";
import ResultDetailContent from "./ResultDetailContent";
import ResultRelatedFiles from "./ResultRelatedFiles";
import ResultModelTestInfo from "./ResultModelTestInfo";
import { datastore } from "./datastore";
import { updateHash } from "./globals";

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

export default class ResultDetail extends React.Component {
    signal = axios.CancelToken.source();
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);

        const [authContext] = this.context.auth;

        this.state = {
            tabValue: 0,
            auth: authContext,
            loading: true,
            sourceHash: this.props.sourceHash || "" 
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.getResult = this.getResult.bind(this);

        updateHash("result_id." + this.props.result.id);

        if (!this.props.result.model) {
            this.getResult(this.props.result.id);
        } else {
            this.state["loading"] = false;
        }
    }

    getResult(resultId) {
        return datastore
            .getResult(resultId, this.signal)
            .then((result) => {
                this.props.onUpdate(result);

                this.setState({
                    loading: false,
                });
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("errorGet: ", err.message);
                    this.setState({
                        loading: false,
                    });
                } else {
                    // Something went wrong. Save the error in state and re-render.
                    let error_message = "";
                    try {
                        error_message = err.response.data.detail;
                    } catch {
                        error_message = err;
                    }
                    this.setState({
                        loading: false,
                        errorGet: error_message,
                    });
                }
            });
    }

    componentWillUnmount() {
        this.signal.cancel("REST API call canceled!");
    }

    handleClose() {
        this.props.onClose(this.state.sourceHash);
    }

    handleTabChange(event, newValue) {
        this.setState({ tabValue: newValue });
    }

    render() {
        let result = this.props.result;
        if (!result.model) {
            result.model = {};
            result.model_instance = {};
            result.test = {};
            result.test_instance = {};
        }
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
                            <ResultDetailHeader
                                id={result.id}
                                timestamp={result.timestamp}
                                modelID={result.model.id}
                                modelName={result.model.name}
                                modelAlias={result.model.alias}
                                modelInstID={result.model_instance.id}
                                modelVersion={result.model_instance.version}
                                testID={result.test.id}
                                testName={result.test.name}
                                testAlias={result.test.alias}
                                testInstID={result.test_instance.id}
                                testVersion={result.test_instance.version}
                                loading={this.state.loading}
                            />
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
                                    project_id={result.project_id}
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
                                    model={result.model}
                                    model_instance={result.model_instance}
                                    test={result.test}
                                    test_instance={result.test_instance}
                                />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}

ResultDetail.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

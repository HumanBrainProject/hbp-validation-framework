import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import StarIcon from '@material-ui/icons/Star';
import { withSnackbar } from 'notistack';
import React from 'react';
import Theme from './theme';
import ContextMain from './ContextMain';
import axios from 'axios';
import { baseUrl, querySizeLimit } from "./globals";

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

class CompareMultiResults extends React.Component {
    signal = axios.CancelToken.source();
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);
        const [authContext,] = this.context.auth;

        // dict = { uuid : { name: NAME,
        //                   selected_instances: { inst1_uuid : INST1_NAME,  inst2_uuid : INST2_NAME, ...} }, ... }
        this.state = {
            // model_dict: {},
            // test_dict: {},
            model_dict: {
                "00f2e856-27a8-4b8d-9ec3-4e2581c546e4": {
                    "name": "CA1_pyr_cACpyr_mpg141208_B_idA_20170915151855",
                    "selected_instances": {
                        "b0ba8f05-b049-4cdd-93ea-1ed646671d21": "1.0"
                    }
                },
                "01006de7-e861-45fb-abf4-3c84e609d33b": {
                    "name": "CA1_int_cNAC_970911C_20180120154902",
                    "selected_instances": {
                        "ac33b476-2cc1-4876-8945-b9621aed45a2": "1.0"
                    }
                }
            },
            test_dict: {
                "100abccb-6d30-4c1e-a960-bc0489e0d82d": {
                    "name": "Hippocampus_SomaticFeaturesTest_CA1_pyr_cACpyr",
                    "selected_instances": {
                        "1d22e1c0-5a74-49b4-b114-41d233d3250a": "1.0"
                    }
                },
                "e316f735-42d5-43f8-8729-6ac2e626353d": {
                    "name": "Hippocampus_CA1_ObliqueIntegrationTest",
                    "selected_instances": {
                        "9067289a-11d0-4c13-b6f1-50c84a4f3cb2": "1.3.5"
                    }
                }
            },
            total_models: 0,
            total_model_insts: 0,
            total_tests: 0,
            total_test_insts: 0,
            open_models: [],
            open_tests: [],
            compareShow: false,
            auth: authContext
        };

        this.handleModelClick = this.handleModelClick.bind(this);
        this.handleTestClick = this.handleTestClick.bind(this);
        this.handleModelDeleteClick = this.handleModelDeleteClick.bind(this);
        this.handleTestDeleteClick = this.handleTestDeleteClick.bind(this);
        this.evalModelDict = this.evalModelDict.bind(this);
        this.evalTestDict = this.evalTestDict.bind(this);
        this.updateCounts = this.updateCounts.bind(this);
        this.fetchResults = this.fetchResults.bind(this);
        this.launchCompare = this.launchCompare.bind(this);
    }

    evalModelDict() {
        let count_models = Object.keys(this.state.model_dict).length
        let count_model_insts = 0;
        for (let m_key in this.state.model_dict) {
            count_model_insts = count_model_insts + Object.keys(this.state.model_dict[m_key].selected_instances).length
        }
        return [count_models, count_model_insts]
    }

    evalTestDict() {
        let count_tests = Object.keys(this.state.test_dict).length
        let count_test_insts = 0;
        for (let t_key in this.state.test_dict) {
            count_test_insts = count_test_insts + Object.keys(this.state.test_dict[t_key].selected_instances).length
        }
        return [count_tests, count_test_insts]
    }

    updateCounts() {
        let [count_models, count_model_insts] = this.evalModelDict();
        let [count_tests, count_test_insts] = this.evalTestDict();
        this.setState({
            total_models: count_models,
            total_model_insts: count_model_insts,
            total_tests: count_tests,
            total_test_insts: count_test_insts
        })
    }

    fetchResults() {
        let url = baseUrl + "/results-extended/?model_id=" + this.props.modelData.id + "&size=" + querySizeLimit;
        let config = {
            cancelToken: this.signal.token,
            headers: {
                'Authorization': 'Bearer ' + this.state.auth.token,
            }
        }
        return axios.get(url, config)
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
    }

    launchCompare(compare_type) {
        this.setState({ compareShow: compare_type })
    }

    componentDidMount() {
        this.updateCounts();
        this.fetchResults();
    }

    handleModelClick(m_key) {
        if (this.state.open_models.indexOf(m_key) > -1) {
            this.setState({ open_models: this.state.open_models.filter(item => item !== m_key) })
        } else {
            this.setState({ open_models: [...this.state.open_models, m_key] })
        }
    };

    handleTestClick(t_key) {
        if (this.state.open_tests.indexOf(t_key) > -1) {
            this.setState({ open_tests: this.state.open_tests.filter(item => item !== t_key) })
        } else {
            this.setState({ open_tests: [...this.state.open_tests, t_key] })
        }
    };

    handleModelDeleteClick(m_key, m_inst_key) {
        let model_dict = this.state.model_dict;
        if (Object.keys(model_dict).includes(m_key)) {
            if (Object.keys(model_dict[m_key].selected_instances).includes(m_inst_key)) {
                delete model_dict[m_key].selected_instances[m_inst_key]
                if (Object.keys(model_dict[m_key].selected_instances).length === 0) {
                    delete model_dict[m_key]
                    if (this.state.open_models.indexOf(m_key) > -1) {
                        this.setState({ open_models: this.state.open_models.filter(item => item !== m_key) })
                    }
                }
                this.setState({ model_dict: model_dict })
                this.updateCounts();
            }
        }
    }

    handleTestDeleteClick(t_key, t_inst_key) {
        let test_dict = this.state.test_dict;
        if (Object.keys(test_dict).includes(t_key)) {
            if (Object.keys(test_dict[t_key].selected_instances).includes(t_inst_key)) {
                delete test_dict[t_key].selected_instances[t_inst_key]
                if (Object.keys(test_dict[t_key].selected_instances).length === 0) {
                    delete test_dict[t_key]
                    if (this.state.open_tests.indexOf(t_key) > -1) {
                        this.setState({ open_tests: this.state.open_tests.filter(item => item !== t_key) })
                    }
                }
                this.setState({ test_dict: test_dict })
                this.updateCounts();
            }
        }
    }

    render() {
        return (
            <Dialog fullScreen onClose={this.props.onClose}
                aria-labelledby="simple-dialog-title"
                open={this.props.open}>
                <MyDialogTitle onClose={this.props.onClose} />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                <AccountTreeIcon color="disabled" />
                                &nbsp;
                                Compare Validation Results
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify="space-around" spacing={3}>

                                {/* Model listing */}
                                <Grid item xs={5} style={{ backgroundColor: Theme.tableRowHoverColor }}>
                                    <Typography variant="h6">
                                        Selected Models
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {this.state.total_models === 1
                                            ?
                                            this.state.total_models + " model, "
                                            :
                                            this.state.total_models + " models, "
                                        }
                                        {this.state.total_model_insts === 1
                                            ?
                                            this.state.total_model_insts + " model instance"
                                            :
                                            this.state.total_model_insts + " model instances"
                                        }
                                    </Typography>
                                    {
                                        Object.keys(this.state.model_dict).map(m_key =>
                                            <div key={m_key}>
                                                <List dense={true}>
                                                    <ListItem style={{ backgroundColor: Theme.lightBackground }} button onClick={() => this.handleModelClick(m_key)}>
                                                        <ListItemAvatar>
                                                            <Avatar style={{ backgroundColor: Theme.darkOrange }} >
                                                                <LocalActivityIcon style={{ color: Theme.bodyBackground }} />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={this.state.model_dict[m_key].name}
                                                            secondary={m_key}
                                                        />
                                                        {(this.state.open_models.indexOf(m_key) > -1) ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItem>
                                                    <Collapse in={(this.state.open_models.indexOf(m_key) > -1)} timeout="auto" unmountOnExit>
                                                        <List dense={true} component="div" disablePadding style={{ backgroundColor: Theme.bodyBackground }}>
                                                            {
                                                                Object.keys(this.state.model_dict[m_key].selected_instances).map(m_inst_key =>
                                                                    <ListItem button style={{ margin: "0 40px", width: "95%" }} key={m_inst_key}>
                                                                        <ListItemIcon>
                                                                            <StarIcon style={{ color: Theme.darkOrange }} />
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={this.state.model_dict[m_key].selected_instances[m_inst_key]}
                                                                            secondary={m_inst_key}
                                                                        />
                                                                        <ListItemSecondaryAction>
                                                                            <IconButton edge="end" aria-label="delete" onClick={() => this.handleModelDeleteClick(m_key, m_inst_key)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                )
                                                            }
                                                        </List>
                                                    </Collapse>
                                                </List>
                                            </div>
                                        )
                                    }
                                </Grid>

                                {/* Test listing */}
                                <Grid item xs={5} style={{ backgroundColor: Theme.tableRowHoverColor }}>
                                    <Typography variant="h6">
                                        Selected Tests
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {this.state.total_tests === 1
                                            ?
                                            this.state.total_tests + " test, "
                                            :
                                            this.state.total_tests + " tests, "
                                        }
                                        {this.state.total_test_insts === 1
                                            ?
                                            this.state.total_test_insts + " test instance"
                                            :
                                            this.state.total_test_insts + " test instances"
                                        }
                                    </Typography>
                                    {
                                        Object.keys(this.state.test_dict).map(t_key =>
                                            <div key={t_key}>
                                                <List dense={true}>
                                                    <ListItem style={{ backgroundColor: Theme.lightBackground }} button onClick={() => this.handleTestClick(t_key)}>
                                                        <ListItemAvatar>
                                                            <Avatar style={{ backgroundColor: Theme.darkOrange }} >
                                                                <LocalActivityIcon style={{ color: Theme.bodyBackground }} />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={this.state.test_dict[t_key].name}
                                                            secondary={t_key}
                                                        />
                                                        {(this.state.open_tests.indexOf(t_key) > -1) ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItem>
                                                    <Collapse in={(this.state.open_tests.indexOf(t_key) > -1)} timeout="auto" unmountOnExit>
                                                        <List dense={true} component="div" disablePadding style={{ backgroundColor: Theme.bodyBackground }}>
                                                            {
                                                                Object.keys(this.state.test_dict[t_key].selected_instances).map(t_inst_key =>
                                                                    <ListItem button style={{ margin: "0 40px", width: "95%" }} key={t_inst_key}>
                                                                        <ListItemIcon>
                                                                            <StarIcon style={{ color: Theme.darkOrange }} />
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={this.state.test_dict[t_key].selected_instances[t_inst_key]}
                                                                            secondary={t_inst_key}
                                                                        />
                                                                        <ListItemSecondaryAction>
                                                                            <IconButton edge="end" aria-label="delete" onClick={() => this.handleTestDeleteClick(t_key, t_inst_key)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                )
                                                            }
                                                        </List>
                                                    </Collapse>
                                                </List>
                                            </div>
                                        )
                                    }
                                </Grid>

                            </Grid>
                        </Grid>
                        {
                            (this.state.total_model_insts === 0 && this.state.total_test_insts === 0)
                            &&
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Typography variant="h6">
                                            <br /><br />
                                            Please select models and/or tests to compare!
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: "1000px" }}>
                                        <Typography variant="subtitle1">
                                            <br />
                                            <strong>Note: </strong><br />
                                            If no tests are selected, then all validation tests associated with the selected models will be automatically chosen.<br />
                                            Similarly, if no models are selected, then all models associated with the selected tests will be automatically chosen.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.total_model_insts === 0 && this.state.total_test_insts !== 0)
                            &&
                            <Grid container spacing={3}>
                                <Grid item xs={12} align="center">
                                    <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: "1000px" }}>
                                        <Typography variant="subtitle1">
                                            <br />
                                            <strong>Note: </strong>
                                            Since no models were selected, all models associated with the selected tests will be automatically chosen.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.total_model_insts !== 0 && this.state.total_test_insts === 0)
                            &&
                            <Grid container spacing={3}>
                                <Grid item xs={12} align="center">
                                    <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: "1000px" }}>
                                        <Typography variant="subtitle1">
                                            <br />
                                            <strong>Note: </strong>
                                            Since no tests were selected, all tests associated with the selected models will be automatically chosen.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.total_model_insts !== 0 || this.state.total_test_insts !== 0)
                            &&
                            <Grid container spacing={3} style={{ marginTop: "50px" }}>
                                <Grid item xs={12} align="center">
                                    <Box display="flex" justifyContent="space-around" alignItems="center" style={{ maxWidth: "800px" }}>
                                        <Button disabled={!this.state.compareShow} variant="contained" style={{ backgroundColor: Theme.disabledColor, width: "250px" }} onClick={() => this.setState({ compareShow: false })}>
                                            Clear Results
								        </Button>
                                        <Button disabled={this.state.compareShow} variant="contained" style={{ backgroundColor: Theme.buttonSecondary, width: "250px" }} onClick={() => this.launchCompare("common")}>
                                            Compare Results (Common)
								        </Button>
                                        <Button disabled={this.state.compareShow} variant="contained" style={{ backgroundColor: Theme.buttonPrimary, width: "250px" }} onClick={() => this.launchCompare("all")}>
                                            Compare Results (All)
								        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.compareShow === "common")
                            &&
                            <Grid container spacing={3} style={{ marginTop: "50px" }}>
                                <Grid item xs={12} align="center">
                                    <Typography variant="subtitle1">
                                        <strong>Showing only common results!</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        {
                            (this.state.compareShow === "all")
                            &&
                            <Grid container spacing={3} style={{ marginTop: "25px" }}>
                                <Grid item xs={12} align="center">
                                    <Typography variant="subtitle1">
                                        <strong>Showing all results!</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
            </Dialog >
        );
    }
}

export default withSnackbar(CompareMultiResults);
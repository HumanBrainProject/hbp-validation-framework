import React from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import Theme from './theme';
import { withSnackbar } from 'notistack';
import { formatLabel } from './utils';
import { filterKeys, filterModelKeys, filterTestKeys } from "./globals";

class CompareBottomPanel extends React.Component {
    render() {
        let showFilters = {};
        if (this.props.display === "Only Models") {
            showFilters = filterModelKeys;
        } else if (this.props.display === "Only Tests") {
            showFilters = filterTestKeys;
        } else {
            showFilters = filterKeys;
        }

        return (
            <ExpansionPanel style={{ backgroundColor: Theme.lightBackground }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: Theme.tableHeader }}>
                    <Box fontSize={16} my={0} py={0} fontWeight="fontWeightBold">Compare Results Across Multiple Models & Tests</Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Box style={{ width: "100%" }} my={2} >
                        <Grid container spacing={3}>
                            <Grid item style={{ minWidth: "200px" }}>
                                <Box component="span" fontWeight="fontWeightBold">Display: </Box>
                            </Grid>
                            <Grid item>
                                <Box component="span">
                                    <Chip label={this.props.display} style={{ backgroundColor: "#FFFFFF" }} variant="outlined" />
                                </Box>
                            </Grid>
                        </Grid>
                        {
                            showFilters.map((key, index) => (
                                <Grid container spacing={3} key={key}>
                                    <Grid item style={{ minWidth: "200px" }}>
                                        <Box component="span" fontWeight="fontWeightBold">{formatLabel(key)}: </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box component="span">
                                            {
                                                this.props.filters[key].length > 0
                                                    ?
                                                    this.props.filters[key].map(element => {
                                                        return <Chip key={element} label={element} style={{ backgroundColor: "#FFFFFF", marginRight: 5, marginBottom: 5 }} variant="outlined" />
                                                    })
                                                    :
                                                    <Chip key="<< all >>" label="<< all >>" style={{ backgroundColor: "#FFFFFF" }} variant="outlined" />
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))
                        }
                        <br />
                        To re-configure the app, click on the configure icon <SettingsIcon />  at the top left of the page.
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel >
        );
    }
}

export default withSnackbar(CompareBottomPanel);
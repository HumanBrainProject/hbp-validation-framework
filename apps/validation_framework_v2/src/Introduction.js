import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import InfoIcon from "@material-ui/icons/Info";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Link from "@material-ui/core/Link";
import { yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(2),
        textAlign: "center",
        backgroundColor: "#FFD878",
    },
    body: {
        paddingTop: theme.spacing(3),
    },
    panel: {
        padding: theme.spacing(3),
    },
}));

export default function Introduction() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={3} className={classes.header}>
                <Grid item xs={1}>
                    <img
                        src="/docs/static/img/ebrains_logo.png"
                        alt="EBRAINS logo"
                        width="80 px"
                    />
                </Grid>
                <Grid item xs>
                    <Typography variant="h4" component="h2" gutterBottom>
                        <b>EBRAINS Model Catalog</b>
                    </Typography>
                    <Typography variant="h5" component="h3">
                        A framework for collaborative and reproducible modelling
                        in neuroscience
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={3} className={classes.body}>
                <Grid item xs>
                    <Paper className={classes.panel}>
                        <Typography variant="h5" component="h3" gutterBottom>
                            <PlayCircleFilledIcon
                                style={{ color: yellow[700] }}
                            />{" "}
                            Getting started
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            To show a list of models and validation tests,
                            select the species, brain region, model scope, etc.
                            by clicking on the configure icon <SettingsIcon />{" "}
                            at the top left.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.panel}>
                        <Typography variant="h5" component="h3" gutterBottom>
                            <InfoIcon style={{ color: yellow[700] }} /> About
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            The EBRAINS Model Catalog contains information about
                            models developed and/or used within the EBRAINS
                            research infrastructure. It allows you to find
                            information about neuroscience models and about
                            results obtained using those models, in particular
                            about how those models have been validated against
                            experimental findings.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <Link href="/docs">More information</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

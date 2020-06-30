import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Theme from './theme';

class ColoredCircularProgress extends Component {
    render() {
        const { classes } = this.props;
        return <CircularProgress {...this.props} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />;
    }
}

const styles = props => ({
    colorPrimary: {
        backgroundColor: 'transparent',
        color: Theme.tableRowSelectColor
    },
});

export default withStyles(styles)(ColoredCircularProgress);
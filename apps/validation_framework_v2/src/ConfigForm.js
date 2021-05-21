import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MultipleSelect from './MultipleSelect';
import Box from '@material-ui/core/Box';
import Theme from './theme';

import ThreeWaySwitch from './ThreeWaySwitch';
import { displayValid, filterKeys, filterModelKeys, filterTestKeys } from "./globals";
import ContextMain from './ContextMain';


export default class ConfigForm extends React.Component {
    static contextType = ContextMain;

    constructor(props) {
        super(props);

        this.state = {
            config: props.config,
            display: props.display,
            error: null,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDisplayChange = this.handleDisplayChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleCancel() {
        this.props.onClose(this.state.display, this.state.config, true);
    }

    handleClose() {
        this.props.onClose(this.state.display, this.state.config);
    }

    handleDisplayChange(display) {
        this.setState({ display: display });
    }

    handleFieldChange(event) {
        const newConfig = { ...this.state.config }
        newConfig[event.target.name] = event.target.value;
        this.setState({ config: newConfig });
    }

    renderError() {
        return (
            <Dialog onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.props.open}
                fullWidth={true}
                maxWidth="md">
                <DialogTitle>Error :-(</DialogTitle>
                <DialogContent>
                    <div>
                        Uh oh: {this.state.error.message}
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

    render() {
        if (this.state.error) {
            return this.renderError();
        } else {
            let showFilters = {};
            if (this.state.display === "Only Models") {
                showFilters = filterModelKeys;
            } else if (this.state.display === "Only Tests") {
                showFilters = filterTestKeys;
            } else {
                showFilters = filterKeys;
            }
            const [validFilterValues,] = this.context.validFilterValues;
            console.log("validFilterValues");

            return (
                <Dialog onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title"
                    open={this.props.open}
                    fullWidth={true}
                    maxWidth="md">
                    <DialogTitle style={{ backgroundColor: Theme.tableHeader }}>Configure App</DialogTitle>
                    <DialogContent>
                        <Box my={2}>
                            <form>
                                <ThreeWaySwitch
                                    values={displayValid}
                                    selected={this.state.display}
                                    onChange={this.handleDisplayChange} />
                                {showFilters.map(filter => (
                                    <MultipleSelect
                                        itemNames={validFilterValues === null ? [] : validFilterValues[filter]}
                                        label={filter}
                                        value={this.state.config[filter]}
                                        handleChange={this.handleFieldChange}
                                        key={filter} />
                                ))}
                            </form>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="default">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Ok
           				</Button>
                    </DialogActions>
                </Dialog>
            );
        }
    }
}

ConfigForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

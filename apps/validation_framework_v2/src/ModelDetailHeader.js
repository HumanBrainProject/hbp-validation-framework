import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import RemoveFromQueueIcon from "@material-ui/icons/RemoveFromQueue";
import { withSnackbar } from "notistack";
import React from "react";
import ContextMain from "./ContextMain";
import ErrorDialog from "./ErrorDialog";
import ModelEditForm from "./ModelEditForm";
import Theme from "./theme";
import {
    copyToClipboard,
    formatTimeStampToLongString,
    showNotification,
} from "./utils";

function AccessibilityIcon(props) {
    if (props.private) {
        return (
            <Tooltip title="private" placement="top">
                <LockIcon color="disabled" />
            </Tooltip>
        );
    } else {
        return (
            <Tooltip title="public" placement="top">
                <PublicIcon color="disabled" />
            </Tooltip>
        );
    }
}

function CompareIcon(props) {
    if (props.compareFlag === null) {
        return (
            <Tooltip
                title="Cannot add to compare (no model instances)"
                placement="top"
            >
                <IconButton
                    aria-label="compare model"
                    style={{
                        backgroundColor: Theme.disabledColor,
                        marginLeft: 10,
                    }}
                >
                    <AddToQueueIcon color="disabled" />
                </IconButton>
            </Tooltip>
        );
    } else if (props.compareFlag) {
        return (
            <Tooltip title="Remove model from compare" placement="top">
                <IconButton
                    aria-label="compare model"
                    onClick={() => props.removeModelCompare()}
                    style={{
                        backgroundColor: Theme.disabledColor,
                        marginLeft: 10,
                    }}
                >
                    <RemoveFromQueueIcon color="action" />
                </IconButton>
            </Tooltip>
        );
    } else {
        return (
            <Tooltip title="Add model to compare" placement="top">
                <IconButton
                    aria-label="compare model"
                    onClick={() => props.addModelCompare()}
                    style={{
                        backgroundColor: Theme.buttonSecondary,
                        marginLeft: 10,
                    }}
                >
                    <AddToQueueIcon color="action" />
                </IconButton>
            </Tooltip>
        );
    }
}

function EditButton(props) {
    if (props.canEdit) {
        return (
            <Tooltip placement="top" title="Edit Model">
                <IconButton
                    aria-label="edit model"
                    onClick={() => props.handleEditClick()}
                    style={{
                        backgroundColor: Theme.buttonSecondary,
                        marginLeft: 10,
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
        );
    } else {
        return "";
    }
}

class ModelDetailHeader extends React.Component {
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);

        this.state = {
            openEditForm: false,
            errorEditModel: null,
        };
        this.handleEditModelFormClose =
            this.handleEditModelFormClose.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleErrorEditDialogClose =
            this.handleErrorEditDialogClose.bind(this);
    }

    handleErrorEditDialogClose() {
        this.setState({ errorEditModel: null });
    }

    handleEditModelFormClose(model) {
        console.log("close edit");

        this.setState({ openEditForm: false });
        if (model) {
            this.props.updateCurrentModelData(model);
            showNotification(
                this.props.enqueueSnackbar,
                this.props.closeSnackbar,
                "Model edited!",
                "success"
            );
        }
    }

    handleEditClick() {
        this.setState({
            openEditForm: true,
        });
    }

    render() {
        let errorMessage = "";
        if (this.state.errorEditModel) {
            errorMessage = (
                <ErrorDialog
                    open={Boolean(this.state.errorEditModel)}
                    handleErrorDialogClose={this.handleErrorEditDialogClose}
                    error={
                        this.state.errorEditModel.message ||
                        this.state.errorEditModel
                    }
                />
            );
        }

        let editForm = "";
        if (this.state.openEditForm) {
            editForm = (
                <ModelEditForm
                    open={this.state.openEditForm}
                    onClose={this.handleEditModelFormClose}
                    modelData={this.props.modelData}
                />
            );
        }

        return (
            <React.Fragment>
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        <AccessibilityIcon private={this.props.private} />
                        <span
                            style={{ marginHorizontal: 125, cursor: "pointer" }}
                            onClick={() =>
                                copyToClipboard(
                                    this.props.name,
                                    this.props.enqueueSnackbar,
                                    this.props.closeSnackbar,
                                    "Model name copied"
                                )
                            }
                        >
                            {" "}
                            {this.props.name}
                        </span>
                        <EditButton
                            canEdit={this.props.canEdit}
                            handleEditClick={this.handleEditClick}
                        />
                        <CompareIcon
                            compareFlag={this.props.compareFlag}
                            addModelCompare={this.props.addModelCompare}
                            removeModelCompare={this.props.removeModelCompare}
                        />
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {this.props.authors}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                    >
                        ID:{" "}
                        <b>
                            <span
                                style={{
                                    marginHorizontal: 125,
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    copyToClipboard(
                                        this.props.id,
                                        this.props.enqueueSnackbar,
                                        this.props.closeSnackbar,
                                        "Model UUID copied"
                                    )
                                }
                            >
                                {this.props.id}
                            </span>
                        </b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {this.props.alias ? "Alias: " : ""}{" "}
                        <b>
                            {this.props.alias ? (
                                <span
                                    style={{
                                        marginHorizontal: 125,
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        copyToClipboard(
                                            this.props.alias,
                                            this.props.enqueueSnackbar,
                                            this.props.closeSnackbar,
                                            "Model alias copied"
                                        )
                                    }
                                >
                                    {this.props.alias}
                                </span>
                            ) : (
                                ""
                            )}
                        </b>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                    >
                        Created:{" "}
                        <b>
                            {formatTimeStampToLongString(
                                this.props.dateCreated
                            )}
                        </b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Custodian:{" "}
                        <b>{this.props.owner}</b>
                    </Typography>
                </Grid>
                {/* <Grid item> */}
                {/* optional image goes here */}
                {/* </Grid> */}
                <div>{editForm}</div>
                <div>{errorMessage}</div>
            </React.Fragment>
        );
    }
}

export default withSnackbar(ModelDetailHeader);

import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PageviewIcon from "@material-ui/icons/Pageview";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
    iconButton: {
        marginRight: "24px",
        top: "50%",
        display: "inline-block",
        position: "relative",
    },
};

class CustomToolbarSelect extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={"custom-toolbar-select"}>
                <Tooltip title={"Quick View"}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() =>
                            this.props.viewSelectedItems(
                                this.props.selectedRows
                            )
                        }
                    >
                        <PageviewIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Download JSON"}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() =>
                            this.props.downloadSelectedJSON(
                                this.props.selectedRows
                            )
                        }
                    >
                        <SaveAltIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Hide Entry"}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() =>
                            this.props.hideTableRows(this.props.selectedRows)
                        }
                    >
                        <VisibilityOffIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Add to Compare"}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() =>
                            this.props.addCompare(this.props.selectedRows)
                        }
                    >
                        <AddToQueueIcon />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {
    name: "CustomToolbarSelect",
})(CustomToolbarSelect);

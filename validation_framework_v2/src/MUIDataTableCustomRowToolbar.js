import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PageviewIcon from "@material-ui/icons/Pageview";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display: "inline-block",
    position: "relative"
  }
};

class CustomToolbarSelect extends React.Component {

  viewSelectedItems = () => {
    console.log("click!", this.props.selectedRows); // a user can do something with these selectedRow values
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"View / Compare"}>
          <IconButton className={classes.iconButton}  onClick={this.viewSelectedItems}>
            <PageviewIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Download JSON"}>
          <IconButton className={classes.iconButton} onClick={() => this.props.downloadSelectedJSON(this.props.selectedRows)}>
            <SaveAltIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);
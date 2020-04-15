import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FlipIcon from "@material-ui/icons/Flip";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {
  changeTableWidth = () => {
    console.log("clicked on icon!");
  };

  render() {
    const { classes } = this.props;
    if (this.props.display === "Models & Tests") {
      return (
        <React.Fragment>
          <Tooltip title={"Table Width"}>
            <IconButton className={classes.iconButton} onClick={this.props.changeTableWidth}>
              <FlipIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    } else {
      // disable option if only showing models or tests (not both)
      return ""
    }
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);


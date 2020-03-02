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

    return (
      <React.Fragment>
        <Tooltip title={"Table Width"}>
          <IconButton className={classes.iconButton} onClick={this.props.changeTableWidth}>
            <FlipIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);


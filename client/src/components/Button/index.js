import React from "react";
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  buttonRoot: {
    borderRadius: "none",
    color: "#007cc3",
    padding: 0,
    background: "linear-gradient(0deg, #007cc3 10% ,  #f5f5f5 9%)"
  }
};

const Button = ({ classes, ...rest }) => (
  <MuiButton classes={{ root: classes.buttonRoot }} {...rest} />
);

export default withStyles(styles)(Button);

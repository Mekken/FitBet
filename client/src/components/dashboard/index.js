/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Steps from "./steps";
import Events from "./events";

const styles = () => ({});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.events}>
        <Steps totalSteps={this.props.totalSteps} />
        <Events events={this.props.events} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

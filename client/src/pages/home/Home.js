/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import Dashboard from "../../components/dashboard";
import API from "../../components/utils/App";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginTop: "50px"
  }
});

class Home extends Component {
  state = {
    events: "",
    userId: "",
    totalSteps: ""
  };

  // When this component mounts, load/clear array
  componentDidMount() {
    this.setState({ userId: localStorage.getItem("userID") }, () => {
      this.checkSession();
      this.loadDashboard();
    });
  }

  // This function updates the steps for my events
  /*
  updateSteps = () => { 
    console.log("Update Steps");
    
    API.updateSteps()
    .then(res => this.setState({ events: res.data }))
    .catch(err => API.redirectOn401(err, this.props));
  }
  */

  checkSession() {
    if (!this.state.userId) {
      this.props.history.push("/");
    }
  }

  // Get my events by first grabbing the user object and passing
  // it to getAllSteps which will pull all my steps for the year
  loadDashboard = () => {
    console.log("load my events for user ", this.state.userId);
    API.getAllStepsByUserId(this.state.userId)
      .then(res => this.setState({ totalSteps: res.data.steps }))
      .catch(err => API.redirectOn401(err, this.props));
    API.getChallengedByUserId(this.state.userId)
      .then(res => this.setState({ events: res.data }))
      .catch(err => API.redirectOn401(err, this.props));
  };

  logout = () => {
    API.logout()
      .then()
      .catch(err => {
        API.redirectOn401(err, this.props);
      });
    this.props.history.push("/login");
  };

  renderSteps = () => {
    console.log("rendering Steps");
    return <h1>Steps: 25,000</h1>;
  };

  renderEvents = () => {
    console.log("rendering events");
    console.log("Events = ", this.state.events);
    if (this.state.events) {
      return (
        <Dashboard
          events={this.state.events}
          totalSteps={this.state.totalSteps}
        />
      );
    }
  };

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.renderEvents()}</div>;
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

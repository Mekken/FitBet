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
    events: ""
  };

  // When this component mounts, load/clear array
  componentDidMount() {
    //   this.updateSteps();
    this.loadDashboard();
  }

  // This function updates the steps for my events
  /*
  updateSteps = () => { 
    console.log("Update Steps");
    
    API.updateSteps()
    .then(res => this.setState({ events: res.data }))
    .catch(err => console.log(err));
  }
  */

  loadDashboard = () => {
    console.log("load my events");
    API.getChallengedByUserId(localStorage.getItem("userID"))
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  };

  logout = () => {
    API.logout()
      .then()
      .catch(err => {
        console.log(err);
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
          redirectToEvents={this.redirectToEvents}
          events={this.state.events}
        />
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dashboard />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

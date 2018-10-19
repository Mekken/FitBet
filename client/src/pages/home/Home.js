import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard'
import API from '../../components/utils/App'

import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
})

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

  // This function gets the available events
  loadDashboard = () => { 
    console.log("load my events");

    API.getMyEvents(localStorage.getItem("userID"))
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  };

  logout = () => {
    API.logout()
      .then(x => {})
      .catch(err => { console.log(err); });
    this.props.history.push('/login');
  }

  // This renders Steps
  renderSteps = () => {
    console.log("rendering Steps");
    //TODO: Display Steps
    return (
      <h1>Steps: 25,000</h1>
    )
  };

  // This renders events I'm in if they exist
  renderEvents = () => {
    const { classes } = this.props;
    console.log("rendering events");
    console.log("Events = ", this.state.events);
    if (this.state.events) {
      return ( 
      <Dashboard
        redirectToEvents={this.redirectToEvents}
        events={this.state.events} />
      )
    }
  };

  render() {
    const { classes } = this.props; 
    return (
      <div className={classes.root}>
        <Dashboard />
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);

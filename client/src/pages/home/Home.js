import React, { Component } from "react";
import styled from "react-emotion";
import MyEvents from '../../components/home/home.js'
import API from '../../components/utils/App.js'

const HomePageWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

class Home extends Component {
  state = {
    events: ""
  };

  // When this component mounts, load/clear array
  componentDidMount() {
 //   this.updateSteps();
    this.loadMyEvents();
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
  loadMyEvents = () => { 
    console.log("load my events");

    API.getMyEvents(localStorage.getItem("userID"))
    .then(res => this.setState({ events: res.data }))
    .catch(err => console.log(err));
  }

  // This renders events I'm in if they exist
  renderPage = () => {
    console.log("rendering events");
    console.log("Events = ", this.state.events);
    if (this.state.events) {
      return <MyEvents 
        events={this.state.events}
      />;
    }
  };

  render() {
    return (
      <HomePageWrapper>
        Hello, welcome to my Home page!
        {this.renderPage()}
      </HomePageWrapper>
    )
  }
}

export default Home;

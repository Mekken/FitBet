import React, { Component } from "react";
import styled from 'react-emotion'
import EventsToJoin from '../../components/events/events.js'
import API from '../../components/utils/App.js'

const EventsPageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

class Events extends Component {
  state = {
    events: "",
    playerObj: ""
  };

// When this component mounts, load/clear array
componentDidMount() {
  this.loadEvents();
}

// This function gets the available events
loadEvents = () => { 
  API.getChallenges()
  .then(res => this.setState({ events: res.data }))
  .catch(err => console.log(err));
}

// This function handles when a user clicks to join event
handleJoinClick = (id) => { 
  console.log("Got into HandleJoinClick");
  API.getChallenge(id)
  .then(function(response) {
    console.log("got this event object ", response);
  })
    //res => this.setState({ playerObj: res.data }))
  //.then(res => this.setState({ events: res.data }))
  .catch(err => console.log(err));
}

// Get this player
handlePlayerInput = id => {
  API.getUser(id)
  .then(function(response) {
    console.log("got this player object ", response);
  })
    //res => this.setState({ playerObj: res.data }))
  .catch(err => console.log(err));
}

// This renders the Results section if they exist
renderPage = () => {
  console.log("rendering events");
  console.log("Events = ", this.state.events);
  if (this.state.events) {
    return <EventsToJoin 
      events={this.state.events}
      handleJoinClick={this.handleJoinClick}
    />;
  }
};

render() {
  return (
    <EventsPageWrapper>
      {this.renderPage()}
    </EventsPageWrapper>
  )
}
}
export default Events
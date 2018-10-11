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
    playerObj: "",
    playerID: "",
    addEventID: ""
  };

  // When this component mounts, load/clear array
  componentDidMount() {
    this.loadEvents();
  }

  // This function gets the available events
  loadEvents = () => { 
    console.log("load events");
    API.getChallenges()
    .then(res => this.setState({ events: res.data }))
    .catch(err => console.log(err));
  }

  // This function handles when a user clicks to join event
  handleJoinClick = (id) => { 
    console.log("Got into HandleJoinClick, challenge to join is ", id);
    var self = this

    // Get the user data
    // We fudge the data here since it should be stored locally
    // 5bbbeacc77452191168edb0b -- Note for testing if you drop DB,
    // You'll need to get another one
    API.getUser("5bbbeacc77452191168edb0b")
    .then(function(respPlayer) {
      console.log("got this player object ", respPlayer);

      let newPlayerObj = {
        _id: respPlayer.data._id,
      name: respPlayer.data.nickname,
      challenge_steps: 0
      }

      console.log("data to stuff into challenge ", newPlayerObj);

      // Get the challenge data
      API.getChallenge(id)
      .then(function(response) {
        console.log("got this event object ", response);
        // Push player data onto challenge object

        let newPlayerArray = response.data.players;
        newPlayerArray.push(newPlayerObj);

        console.log("new player array", newPlayerArray);
        response.data.players = newPlayerArray;
        console.log("Response to push to DB = ", response.data);

        // Update the challenge object and add the new player
        API.updateChallenge(response.data._id, response.data)
        .then(function(upd) {
          // Now need to update the player object with the new challenge
          console.log("return from Update challenge ", upd);
          
          let newChallengeObj = {
            _id: id
          }

          let newChallengeArray = respPlayer.data.challenges;

          console.log("current challenges ", respPlayer.data.challenges);
          console.log("this challenge ", id);

          if (respPlayer.data.challenges[0] !== "") {
            newChallengeArray.push(newChallengeObj);
          }
          else 
            newChallengeArray[0] = newChallengeObj;

          respPlayer.data.challenges = newChallengeArray;

          console.log("Sending this to get stuffed to user array ", respPlayer.data);
          // Update the user array with new challenge
          
          API.updateUser(respPlayer.data._id, respPlayer.data)
          .then (function(playerResp) {
              console.log("Player Resp ", playerResp);
              self.loadEvents();
          })
        })  // UpdateChallenge
        .catch(err => console.log(err))
      }) // Get challenge
      .catch(err => console.log(err));
    }) // Get user
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
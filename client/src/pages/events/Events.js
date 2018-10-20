import React, { Component } from "react";
import styled from "react-emotion";
import EventsToJoin from "../../components/events/events.js";
import API from "../../components/utils/App.js";

const EventsPageWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

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
    // API.getNotChallenge(localStorage.getItem("userID"))
    API.getChallenges()
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  };

  // This function handles when a user clicks to join event
  handleJoinClick = id => {
    var self = this;

    // Get the user data
    // We fudge the data here since it should be stored locally
    API.getUser(localStorage.getItem("userID"))
      .then(function(respPlayer) {
        // Creating a new player object to add to the challenge array
        let newPlayerObj = {
          _id: respPlayer.data._id,
          name: respPlayer.data.nickname,
          cell: localStorage.getItem("cell"),
          challengeSteps: 0
        };

        // Get the challenge data so we can add the new player
        API.getChallenge(id)
          .then(function(response) {
            // Create new player array from existing one in the challenge
            let newPlayerArray = response.data.players;

            // Create a message to notify all existing players in this challenge
            // that a new player is joining
            let msg = newPlayerObj.name + " has joined.";

            // Send the text messages out
            API.textUsers(response.data.title, response.data.players, msg);

            // Add the new player to the Challenge player object array and set this
            // new array as the player object array
            newPlayerArray.push(newPlayerObj);
            response.data.players = newPlayerArray;

            // Update the challenge object and add the new player
            API.updateChallenge(response.data._id, response.data)
              .then(function() {
                // Now need to update the player collection in mongo with this new challenge
                let newChallengeObj = {
                  _id: id
                };

                let newChallengeArray = respPlayer.data.challenges;

                // If this player ha other challenges, add this to the array
                // otherwise, create the challenges array
                if (respPlayer.data.challenges[0] !== "") {
                  newChallengeArray.push(newChallengeObj);
                } else {
                  newChallengeArray[0] = newChallengeObj;
                }

                respPlayer.data.challenges = newChallengeArray;

                // Update the user array with new challenge
                API.updateUser(respPlayer.data._id, respPlayer.data).then(
                  function(playerResp) {
                    // console.log("Player Resp ", playerResp);
                    self.loadEvents();
                  }
                );
              }) // UpdateChallenge
              .catch(err => console.log(err));
          }) // Get challenge
          .catch(err => console.log(err));
      }) // Get user
      .catch(err => console.log(err));
  };

  // This renders the Results section if they exist
  renderPage = () => {
    if (this.state.events) {
      return (
        <EventsToJoin
          events={this.state.events}
          handleJoinClick={this.handleJoinClick}
        />
      );
    }
  };

  render() {
    return <EventsPageWrapper> {this.renderPage()} </EventsPageWrapper>;
  }
}
export default Events;

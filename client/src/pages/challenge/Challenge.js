/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import styled from "react-emotion";
import moment from "moment";
import ChallengeDetail from "../../components/challenge/challenge.js";
import API from "../../components/utils/App.js";

const ChallengePageWrapper = styled('div')({

})

class Challenge extends Component {
  state = {
    event: "",
    chat: "",
    formValid: false
  };

  // When this component mounts, load/clear array
  componentDidMount() {

    //   this.updateSteps();
    this.loadChallenge();
  }

  // Sets state as chat input entered
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.validateInput);
  };

  // Validate chat input
  validateInput() {
    // Chat must be at least 2 characters
    if (this.state.chat.length > 1) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }
  }

  // This function gets the challenge object and stuffs it into
  // "event"
  loadChallenge = () => {
    //console.log("Challenge ID ", this.props.match.params.id);
    API.getChallenge(this.props.match.params.id)
      .then(res => this.setState({ event: res.data }))
      .catch(err => console.log(err));
  };

  // Manages actions after user submits.  Will add the chat
  // to the challenge object
  handleSubmit = () => {
    // Get a timestamp, convert it to a string for storage
    var dateTime = new Date();

    dateTime = moment(dateTime)
      .format("MM-DD-YYYY HH:mm:ss")
      .toString();

    // Create a chat object to add to the challenge
    let newChatObj = {
      date: dateTime,
      name: localStorage.getItem("nickname"),
      text: this.state.chat
    };

    // Push chat data onto challenge object
    var eventObj = this.state.event;
    let newChatArray = eventObj.chat;

    newChatArray.push(newChatObj);
    eventObj.chat = newChatArray;

    // Create a message to notify all existing players in this challenge
    // that about this smack talk
    let msg = newChatObj.name + ": " + newChatObj.text;

    // Send the text message to notify the other players
    API.textUsers(eventObj.title, eventObj.players, msg);

    // Update the challenge object and add the new chat object
    API.updateChallenge(this.props.match.params.id, eventObj)
      .then(function(upd) {
        console.log("return from Update challenge ", upd);
      })
      .catch(err => console.log(err));

    // Clear out parameters
    this.setState({
      chat: "",
      formValid: false
    });
  };

  // Render the page
  renderPage = () => {
    if (this.state.event) {
      return (
        <ChallengeDetail
          events={this.state.event}
          chat={this.state.chat}
          formValid={this.state.formValid}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };

  render() {
    return (
      <ChallengePageWrapper>
      
        {this.renderPage()}
      </ChallengePageWrapper>
    );
  }
}

export default Challenge;

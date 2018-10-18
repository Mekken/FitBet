import React, { Component } from "react";
import styled from 'react-emotion'
import moment from 'moment'
import ChallengeDetail from '../../components/challenge/challenge.js'
import API from '../../components/utils/App.js'

const ChallengePageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
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

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]: value}, this.validateInput);
  }

  validateInput () {
    // Chat must be at least 2 characters
    if (this.state.chat.length > 1)
      this.setState({ formValid: true });
    else
      this.setState({ formValid: false });
  }

  // This function gets the event passed
  loadChallenge = () => { 
    console.log("Challenge ID ", this.props.match.params.id);
    
    API.getChallenge(this.props.match.params.id)
    .then(res => this.setState({ event: res.data }))
    .catch(err => console.log(err));
    
  }

  handleSubmit = () => {

    // Need to get the chat
    var dateTime = new Date();

    dateTime = (moment(dateTime).format("MM-DD-YYYY HH:mm:ss")).toString();

    let newChatObj = {
      date: dateTime,
      name: localStorage.getItem("nickname"),
      text: this.state.chat
    }

    // Push chat data onto challenge object
    var eventObj = this.state.event;
    let newChatArray = eventObj.chat;

    newChatArray.push(newChatObj);
    eventObj.chat = newChatArray;

    // Update the challenge object and add the new player
    API.updateChallenge(this.props.match.params.id, eventObj)
    .then(function(upd) {
      // Now need to update the player object with the new challenge
      console.log("return from Update challenge ", upd);
    })  // UpdateChallenge
    .catch(err => console.log(err))

    // Clear out parameters
    this.setState({
      chat: "",
      formValid: false
    });

  }

  // This renders events I'm in if they exist
  renderPage = () => {
    if (this.state.event) {
      return <ChallengeDetail 
        events={this.state.event}
        chat={this.state.chat}
        formValid={this.state.formValid}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />;
    }
  };

  render() {
    return (
      <ChallengePageWrapper>
        Hello, welcome to my Challenge page!
        {this.renderPage()}
      </ChallengePageWrapper>
    )
  }
}

export default Challenge
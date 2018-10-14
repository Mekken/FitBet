import React, { Component } from "react";
import styled from 'react-emotion'
import ChallengeDetail from '../../components/challenge/challenge.js'
import API from '../../components/utils/App.js'

const ChallengePageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

class Challenge extends Component {
  state = {
    events: ""
  };

  // When this component mounts, load/clear array
  componentDidMount() {
    //   this.updateSteps();
    this.loadChallenge();
  }

  // This function gets the available events
  loadChallenge = () => { 
    console.log("Challenge ID ", this.props.match.params.id);
    
    API.getChallenge(this.props.match.params.id)
    .then(res => this.setState({ events: res.data }))
    .catch(err => console.log(err));
    
  }

  // This renders events I'm in if they exist
  renderPage = () => {
    console.log("rendering events");
    console.log("Events = ", this.state.events);
    if (this.state.events) {
      return <ChallengeDetail 
        events={this.state.events}
      />;
    }
  };

  render() {
    return (
      <ChallengePageWrapper>
        Hello, welcome to my Home page!
        {this.renderPage()}
      </ChallengePageWrapper>
    )
  }
}

export default Challenge
// To Dos:
// Date defaults to today + 1
// Need to add check to make sure it's at least today + 1

import React, { Component } from 'react'
import styled from 'react-emotion'
import FormItem from '../../components/FormItem'
import API from '../../components/utils/App.js'

const CreateWrapper = styled('div')({
  maxWidth: 500,
  minHeight: 300,
  margin: '0 auto',
  boxShadow: '1px 1px 2px 2px rgba(0,0,0,.3)',
  display: 'flex',
  flexDirection: 'column',
  padding: 20
})

const WelcomeMessage = styled('div')({
  padding: 24
})

const SubmitButton = styled('button')({
  padding: 15,
  textTransform: 'uppercase',
  border: '1px solid black',
  borderRadius: 5
})

class Create extends Component {

  state = {
    title: '',
    stakes: '',
    desc: "",
    startDate: "",
    endDate: "",
    lastDate: '',
    players: []
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  // Save user data to DB
  processCreate = challengeObject => {
    // This needs to be sent to the DB for saving
    console.log("Create challenge data ", challengeObject);
    API.saveChallenge(challengeObject)
    .then()
    .catch(err => console.log(err));
  }

  handleSubmit = () => {
    // post my state to the api to save the contact form,
    // then set the state to some kind of success message
    // and show the user some feedback
    let today = new Date();
    
    // Convert date to YYYY-MM-DD
    // Stuff first element of players array to be me

    let myObj = {
      _id: localStorage.getItem("userID"),
      name: localStorage.getItem("nickname"),
      challenge_steps: 0
    }

    var challengeObj = {
      title: this.state.title,
      desc: this.state.desc,
      stakes: this.state.stakes,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      lastDate: today,
      players: [ myObj ]
    }
    console.log("challenge obj ", challengeObj);

    this.processCreate(challengeObj);

    this.setState({
        title: '',
        desc: "",
        stakes: '',
        startDate: "",
        endDate: "",
        lastDate: "",
        players: []
    });
  }

  render() {
    return (
      <CreateWrapper>
        <WelcomeMessage>
          Create Challenge
        </WelcomeMessage>
        <FormItem
          name="title"
          label="Title of your challenge"
          onChangeFn={this.handleChange}
          value={this.state.title}
        />
        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          label="Description"
          onChange={this.handleChange}
          value={this.state.desc}
        />
        <label htmlFor="title">Stakes</label>
        <textarea
          name="stakes"
          label="Stakes"
          onChange={this.handleChange}
          value={this.state.stakes}
        />
        <FormItem
          name="startDate"
          label="Start (MM/DD/YY)"
          onChangeFn={this.handleChange}
          value={this.state.startDate}
        />
        <FormItem
          name="endDate"
          label="End (MM/DD/YY)"
          onChangeFn={this.handleChange}
          value={this.state.endDate}
        />
        <SubmitButton onClick={this.handleSubmit}>
          Submit!
        </SubmitButton>
      </CreateWrapper>
    )
  }
}

export default Create
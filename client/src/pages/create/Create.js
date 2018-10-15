// To Dos:
// Date defaults to today + 1
// Need to add check to make sure it's at least today + 1

import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment'
import styled from 'react-emotion'
import FormItem from '../../components/FormItem'
import API from '../../components/utils/App.js'
import 'react-datepicker/dist/react-datepicker.css';

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
    startDate: moment().add(1, "days"),
    endDate: moment().add(2, "days"),
    minDate: moment().add(2, "days"),
    lastDate: '',
    players: []
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleStartDateChange = (e) => {
    //moment(e).add(1, "days")
    let min = moment(e).add(1, "days");
    this.setState({
      startDate: e,
      minDate: min,
      endDate: min
    })
  }

  handleEndDateChange = (e) => {
    this.setState({
      endDate: e
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

    let strStartDate = moment(this.state.startDate).format("MM/DD/YYYY");
    let strEndDate = moment(this.state.endDate).format("MM/DD/YYYY");

    var challengeObj = {
      title: this.state.title,
      desc: this.state.desc,
      stakes: this.state.stakes,
      startDate: strStartDate,
      endDate: strEndDate,
      lastDate: today,
      players: [ myObj ]
    }
    console.log("challenge obj ", challengeObj);

    this.processCreate(challengeObj);

    this.setState({
        title: '',
        desc: "",
        stakes: '',
        startDate: moment().add(1, "days"),
        endDate: moment(this.state.startDate).add(1, "days"),
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
        <div>
          Start Date
          <DatePicker
            name="startDate"
            dateFormat="MM/DD/YYYY"
            minDate={moment().add(1, "days")}
            placeholderText="Start Date"
            onChange={this.handleStartDateChange}
            selected={this.state.startDate}
          />
        </div>
        <div>
          End Date
          <DatePicker
            name="endDate"
            dateFormat="MM/DD/YYYY"
            minDate={moment(this.state.minDate)}
            placeholderText="End Date"
            onChange={this.handleEndDateChange}
            selected={this.state.endDate}
          />
        </div>
        <SubmitButton onClick={this.handleSubmit}>
          Submit!
        </SubmitButton>
      </CreateWrapper>
    )
  }
}

export default Create
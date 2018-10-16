// To Dos:
// Date defaults to today + 1
// Need to add check to make sure it's at least today + 1

import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment'
import styled from 'react-emotion'
import FormItem from '../../components/FormItem'
import FormErrors from '../../components/FormErrors'
import API from '../../components/utils/App.js'
import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
  card: {
    minWidth: 300,
    marginTop: "2%",
    padding: "1% 10% 1%",
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    alignItems: "center"
  }
});

class Create extends Component {
  state = {
    title: "",
    stakes: "",
    desc: "",
    titleValid: false,
    descValid: false,
    stakesValid: false,
    formErrors: {title: '', stakes: '', desc: ''},
    startDate: moment().add(1, "days"),
    endDate: moment().add(2, "days"),
    minDate: moment().add(2, "days"),
    lastDate: '',
    players: []
  };

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.titleValid;
    let descValid = this.state.descValid; 
    let stakesValid = this.state.stakesValid;
  
    switch(fieldName) {
      case 'title':
        titleValid = value.length >= 6;
        fieldValidationErrors.title = titleValid ? '' : ' is invalid';
        break;

      case 'desc':
        descValid = value.length >= 6;
        fieldValidationErrors.desc = descValid ? '': ' is invalid';
        break;

      case 'stakes':
        stakesValid = value.length >= 3;
        fieldValidationErrors.stakes = stakesValid ? '': ' is invalid';
        break;

      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    titleValid: titleValid,
                    descValid: descValid,
                    stakesValid: stakesValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: 
      this.state.titleValid && this.state.descValid &&
      this.state.stakesValid
    });
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
  };

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
    };

    let strStartDate = moment(this.state.startDate).format("MM/DD/YYYY");
    let strEndDate = moment(this.state.endDate).format("MM/DD/YYYY");

    var challengeObj = {
      title: this.state.title,
      desc: this.state.desc,
      stakes: this.state.stakes,
      startDate: strStartDate,
      endDate: strEndDate,
      lastDate: today,
      players: [myObj]
    };
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
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        alignContent="center">
        <Paper className={classes.card}>
        <Typography align='center' variant='headline' color='secondary'>
          Create Challenge
        </Typography> 
          <Grid item xs={12}>
            <TextField
              className={classes.TextField}
              fullWidth
              name="title"
              label="Title of your challenge"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="desc"
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows="4"
              defaultValue="Default Value"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.desc}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="stakes"
              id="outlined-multiline-static"
              label="Stakes"
              multiline
              rows="4"
              defaultValue="Default Value"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.stakes}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              name="startDate"
              label="Start Date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              value={this.state.startDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="endDate"
              label="End Date"
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              onChange={this.handleChange}
              value={this.state.endDate}
            />
          </Grid>
          <SubmitButton
            variant="text"
            color="secondary"
            fullWidth={true}
            type="submit"
            onClick={this.handleSubmit}>
            Submit
          </SubmitButton>
        </Paper>
      </Grid>
    );
        </WelcomeMessage>
        <FormItem
          name="title"
          label="Title of your challenge (> 6 characters)"
          onChangeFn={this.handleChange}
          value={this.state.title}
        />
        <label htmlFor="desc">Description (> 6 characters)</label>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.state.desc}
        />
        <label htmlFor="title">Stakes (> 3 characters)</label>
        <textarea
          name="stakes"
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
        <FormErrors formErrors={this.state.formErrors} />
      </CreateWrapper>
    )
  }
}

export default withStyles(styles)(Create);

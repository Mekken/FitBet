// To Dos:
// Date defaults to today + 1
// Need to add check to make sure it's at least today + 1

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import API from "../../components/utils/App.js";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SubmitButton from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography'

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
    startDate: "",
    endDate: "",
    lastDate: "",
    players: []
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

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

    var challengeObj = {
      title: this.state.title,
      desc: this.state.desc,
      stakes: this.state.stakes,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      lastDate: today,
      players: [myObj]
    };
    console.log("challenge obj ", challengeObj);

    this.processCreate(challengeObj);

    this.setState({
      title: "",
      desc: "",
      stakes: "",
      startDate: "",
      endDate: "",
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
  }
}

export default withStyles(styles)(Create);

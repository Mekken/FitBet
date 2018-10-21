import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core";
import EventsToJoin from "../../components/events/events";
import API from "../../components/utils/App";

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  header: {
    textAlign: "center",
    marginTop: "4%",
    marginBottom: "2%"
  },
  text: {
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "5%"
  }
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

            // Send the text message to notify the other players
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
                  function(/*playerResp*/) {
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
    // console.log("rendering events");
    // console.log("Events = ", this.state.events);
    const { classes } = this.props;
    return this.state.events ? (
      <EventsToJoin
        events={this.state.events}
        handleJoinClick={this.handleJoinClick}
      />
    ) : (
      <Typography className={classes.text}>
        No Events Currently Available
      </Typography>
    );
  };

  render() {
    const { classes } = this.props;
    // console.log(classes);
    return (
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={12}>
          <Typography component="h3" variant="h3" className={classes.header}>
            Events
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {this.renderPage()}
        </Grid>
      </Grid>
    );
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Events);

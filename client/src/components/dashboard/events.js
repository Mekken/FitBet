import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardContent } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

import API from '../../components/utils/App'

const styles = theme => ({
  card: {
    minWidth: 300,
    minHeight: 200,
    marginTop: "10%",
    textAlign: "center"
  },
  icon: {
    transform: "scale(1.8)",
    marginBottom: "5%"
  },
  text: {
    marginBottom: "5%",
    borderBottom: "2px solid"
  }
});

class Events extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    API.getChallenges()
    .then(res => this.setState({ events: res.data }))
    .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      alignContent="center">
        <Card className={classes.card}>
          <CardContent>
            <PeopleIcon
              className={classes.icon} 
              color='primary' 
              fontSize='large'/>
            <Typography 
              variant="h5"
              className={classes.text}>
              Events
            </Typography>
            {
              this.state.events.map(result => (
                <div key={result._id}>
                  <h3><a href={"/challenge/" + result._id} target="">Event name: {result.title}</a></h3>
                  <h3>Event description: {result.desc}</h3>
                  <h3>Stakes: {result.stakes}</h3>
                  <h3>Start date: {result.startDate}</h3>
                  <h3>End date: {result.endDate}</h3>
                  { 
                    result.players.map(res => (
                      <h3 key={res._id}>Participants: {res.name} </h3>
                  ))
                  }
                </div>
              ))
            }
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Events);
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import {
  Grid,
  Typography,
  Card,
  Button,
  CardMedia,
  Divider,
  List,
  ListItem
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";

import API from "../../components/utils/App";

const styles = () => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  card: {
    marginBottom: "5%"
  },
  icon: {
    transform: "scale(1.8)",
    marginTop: "8%",
    marginBottom: "5%"
  },
  media: {
    width: 50,
    margin: "1%"
  },
  header: {
    marginBottom: "5%"
  },
  text: {
    padding: "inherit"
  },
  divider: {
    marginBottom: "0%"
  }
});

class Events extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    this.setState({ events: this.props.events });
  }

  // loadEvents = () => {
  //   API.getChallengedByUserId(localStorage.getItem("userID"))
  //     .then(res => this.setState({ events: res.data }))
  //     .catch(err => API.redirectOn401(err, this.props));
  // };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.header}>
            <PeopleIcon
              className={classes.icon}
              color="primary"
              fontSize="large"
            />
            <Typography variant="h5"> Events </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={12}>
            <List>
              {!this.state.events.length ? (
                <Typography
                  style={{ textAlign: "center", marginBottom: "10%" }}
                >
                  Navigate to Events Page to Join an Event
                </Typography>
              ) : (
                this.state.events.slice(0, 5).map(result => (
                  <Card key={result._id} className={classes.card}>
                    <ListItem component={Link} to={"/challenge/" + result._id}>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        image="/images/event_cover.png"
                      />
                      <List className={classes.text}>
                        <Typography component="p" variant="body2">
                          <b>Event Name:</b> {result.title}
                        </Typography>
                        <Typography component="p" variant="body2">
                          <b>Start date:</b>
                          {` ${moment(result.startDate).format("MM-DD-YYYY")}`}
                        </Typography>
                        <Typography component="p" variant="body2">
                          <b>Players:</b>
                          {" " +
                            result.players
                              .map(player => player.name)
                              .join(", ")}
                        </Typography>
                      </List>
                    </ListItem>
                  </Card>
                ))
              )}
            </List>
          </Grid>
          <Grid item xs={12} classes={classes.button}>
            <Button component={Link} to="/events">
              More Events
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Events);

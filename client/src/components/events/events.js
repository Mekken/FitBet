import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  CardMedia,
  Divider,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    justifyContent: "center"
  },
  media: {
    width: 25,
    height: 25,
    paddingTop: "1%",
    marginRight: "2%"
  },
  placing: {
    fontWeight: "bold",
    fontSize: "22px",
    padding: "0px 3px 0px 0px"
  },
  eventHeader: {
    margin: "auto",
    fontWeight: "bolder"
  },
  expansionHeader: {
    textAlign: "left",
    fontWeight: "bolder",
    marginBottom: "1%"
  },
  expansionDetails: {
    flexDirection: "column"
  },
  indent: {
    textIndent: "1em",
    textAlign: "left"
  },
  button: {
    margin: theme.spacing.unit
  },
  link: {
    textAlign: "center",
    marginTop: "3%",
    marginBottom: "3%"
  }
});

class EventsToJoin extends Component {
  state = {
    expanded: null,
    events: []
  };

  handleExpanded(state) {
    this.setState({ expanded: state });
  }

  componentDidMount() {
    this.setState({ events: this.props.events });
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.props;
    const { events } = this.props;
    // console.log("Events");
    // console.log(events);
    return (
      <Grid container spacing={24} className={classes.root}>
        {events.map(result => (
          <Grid key={result._id} item xs={12} style={{ marginTop: "5%" }}>
            <ExpansionPanel
              expanded={expanded}
              onChange={() => this.handleExpanded(!expanded)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.placing}>1st</Typography>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image="/images/place.png"
                />
                <Typography className={classes.eventHeader}>
                  {result.title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionDetails}>
                {/* Full Description of the Event */}
                <Typography className={classes.expansionHeader} xs={12}>
                  Event description: <br />
                </Typography>
                <Typography xs={12} className={classes.indent}>
                  {result.desc}
                </Typography>
                {/* Event Stakes */}
                <Typography className={classes.expansionHeader} xs={12}>
                  Stakes: <br />
                </Typography>
                <Typography xs={12} className={classes.indent}>
                  {result.stakes}
                </Typography>
                {/* Start Date */}
                <Typography className={classes.expansionHeader} xs={12}>
                  Start Date: {moment(result.startDate).format("MM-DD-YYYY")}
                </Typography>
                {/* End Date */}
                <Typography className={classes.expansionHeader} xs={12}>
                  End Date: {moment(result.endDate).format("MM-DD-YYYY")}
                </Typography>
                {/* Participants */}
                <Typography className={classes.expansionHeader} xs={12}>
                  Participants:
                </Typography>
                <Typography xs={12} className={classes.indent}>
                  {" " + result.players.map(player => player.name).join(", ")}
                </Typography>
                <Typography className={classes.link} xs={12}>
                  <Button color="primary">Details</Button>
                </Typography>
                <Divider />
                {false ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.props.handleJoinClick(result._id)}
                  >
                    Joinable
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled
                    className={classes.button}
                  >
                    Joined
                  </Button>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        ))}
      </Grid>
    );
  }
}

EventsToJoin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsToJoin);

{
  /* {props.events.map(result => (
  <ExpansionPanel key={result._id}>
    <li>
      <h3>Event name: {result.title}</h3>
      <h3>Event description: {result.desc}</h3>
      <h3>Stakes: {result.stakes}</h3>
      <h3>Start date: {result.startDate}</h3>
      <h3>End date: {result.endDate}</h3>
      {result.players.map(res => (
        <h3 key={res._id}>Participants: {res.name} </h3>
      ))}
      <button onClick={() => props.handleJoinClick(result._id)}>
        Join
      </button>
    </li>
  </ExpansionPanel>
))} */
}

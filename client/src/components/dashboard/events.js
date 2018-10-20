import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";

import API from "../../components/utils/App";

const styles = () => ({
  card: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 200,
    marginTop: "10%",
    textAlign: "center"
  },
  icon: {
    transform: "scale(1.8)",
    marginBottom: "5%"
  },
  media: {
    width: 50
  },
  header: {
    marginBottom: "5%"
  },
  text: {
    padding: "inherit"
  },
  divider: {
    marginBottom: "5%"
  }
});

class Events extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    this.loadEvents();
  }

  loadEvents = () => {
    API.getChallenges()
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        alignContent="center"
      >
        <Card className={classes.card}>
          <CardContent>
            <PeopleIcon
              className={classes.icon}
              color="primary"
              fontSize="large"
            />
            <Typography variant="h5" className={classes.header}>
              Events
            </Typography>
            <Divider className={classes.divider} />
            <List>
              {this.state.events.map(result => (
                <ListItem
                  key={result._id}
                  component={Link}
                  to={"/challenge/" + result._id}
                >
                  <CardMedia
                    className={classes.media}
                    component="img"
                    image="/images/event_cover.png"
                  />
                  <List className={classes.text}>
                    <Typography component="p" variant="body2">
                      Event Name: {result.title}
                    </Typography>
                    {/* <Typography component="p">Description: {result.}</Typography> */}
                    {/* <Typography component="p">Stakes: 35000</Typography> */}
                    <Typography component="p" variant="body2">
                      Start date:
                      {result.startDate}
                    </Typography>
                    {/* <Typography component="p">End date: 35000</Typography> */}
                    <Typography component="p" variant="body2">
                      Players:
                      {" " +
                        result.players.map(player => player.name).join(",")}
                    </Typography>
                  </List>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Events);

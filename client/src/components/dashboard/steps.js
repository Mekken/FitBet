import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider
} from "@material-ui/core";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

const styles = () => ({
  card: {
    minWidth: 300,
    minHeight: 200,
    marginTop: "10%",
    textAlign: "center"
  },
  icon: {
    transform: "scale(1.8)",
    marginTop: "2%",
    marginBottom: "5%"
  },
  text: {
    marginBottom: "2%"
  },
  divider: {
    marginBottom: "3%"
  }
});

const Steps = props => {
  const { classes } = props;
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
          <DirectionsRunIcon
            className={classes.icon}
            color="primary"
            fontSize="large"
          />
          <Typography variant="h5" className={classes.text}>
            Total Steps
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="h4">5,583,580</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Steps);

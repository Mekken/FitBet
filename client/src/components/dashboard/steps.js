import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

const styles = () => ({
  header: {
    marginTop: "10%",
    textAlign: "center"
  },
  icon: {
    transform: "scale(1.8)",
    marginTop: "2%",
    marginBottom: "5%"
  },
  text: {
    textAlign: "center"
  },
  divider: {
    marginBottom: "4%"
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
      <Grid item xs={12} className={classes.header}>
        <DirectionsRunIcon
          className={classes.icon}
          color="primary"
          fontSize="large"
        />
        <Typography variant="h5" className={classes.text}>
          Total Steps
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12} className={classes.text}>
          <Typography variant="h4">5,583,580</Typography>
      </Grid>
    </Grid>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Steps);

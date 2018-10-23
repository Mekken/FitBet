import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, TextField } from "@material-ui/core";
import Form from "@material-ui/core/FormControl";
import API from "../../components/utils/App";
import SubmitButton from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const styles = theme => ({
  paper: {
    padding: "2% 6% 2%",
    marginTop: "3%"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: "block"
  }
});

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  // Save user data to DB
  loginUser = userObject => {
    // This needs to be sent to the DB for saving
    var self = this;

    API.login(userObject)
      .then(function(response) {
        // update localStorage
        console.log("Response ", response);
        localStorage.setItem("userID", response.data.id);
        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("cell", response.data.cellphone);
        console.log("userID ", localStorage.getItem("userID"));
        console.log("nickname ", localStorage.getItem("nickname"));
        console.log("cell ", localStorage.getItem("cell"));
        self.props.history.push("/dashboard");
      })
      // res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = () => {
    var userObj = {
      emailaddress: this.state.email,
      password: this.state.password
    };
    this.loginUser(userObj);

    this.setState({
      emailaddress: "",
      password: ""
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
        <Paper className={classes.paper}>
        <Typography variant='headline' align='center' color='primary'>-Welcome- <br /> <hr /></Typography>
          <Form>
            <Grid item xs={12}>
              <TextField
                required
                name="email"
                label="Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Password"
                onChange={this.handleChange}
                value={this.state.password}
                type={this.state.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <SubmitButton
              variant="text"
              color="primary"
              fullWidth={true}
              type="submit"
              onClick={this.handleSubmit}
            >
              Login
            </SubmitButton>

            <SubmitButton component={Link} to="/register">
              Sign up
            </SubmitButton>
          </Form>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);

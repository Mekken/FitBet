import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, TextField } from "@material-ui/core";
import Form from "@material-ui/core/FormControl";
import API from "../../components/utils/App.js";
import SubmitButton from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = theme => ({
  paper: {
    padding: "4% 10% 4%",
    minWidth: 300,
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
    email: '',
    password: '',
  }

  // Save user data to DB
  loginUser = userObject => {
    // This needs to be sent to the DB for saving
    API.login(userObject)
    .then(function (response) {
      // update localStorage
      console.log("Response ", response);
      localStorage.setItem("userID", response.data.id);
      localStorage.setItem("nickname", response.data.nickname);
      console.log("userID ", localStorage.getItem("userID"));
      console.log("nickname ", localStorage.getItem("nickname"));
    })
      // res => this.setState({ user: res.data }))
    .catch(err => console.log(err));
  }

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
                        onClick={this.handleClickShowPassword}>
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
              color="secondary"
              fullWidth="true"
              type="submit"
              onClick={this.handleSubmit}>
              Submit
            </SubmitButton>
          </Form>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);

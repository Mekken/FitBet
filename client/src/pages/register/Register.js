import React, { Component } from "react";
import API from "../../components/utils/App.js";
import SubmitButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Form from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styled from "react-emotion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormErrors from "../../components/FormErrors";
import { isValidNumber } from "libphonenumber-js";

const styles = theme => ({
  card: {
    minWidth: 300,
    marginTop: "3%",
    padding: "1% 7% 1%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class Register extends Component {
  state = {
    email: "",
    password: "",
    nickname: "",
    cellphone: "",
    device: "",
    formErrors: { email: "", password: "", nickname: "", cell: "" },
    emailValid: false,
    cellValid: false,
    passwordValid: false,
    nicknameValid: false,
    deviceValid: false,
    formValid: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleCell = e => {
    if (!e) return;
    this.validateField("cellphone", e);
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let cellValid = this.state.cellValid;
    let passwordValid = this.state.passwordValid;
    let nicknameValid = this.state.nicknameValid;
    let deviceValid = this.state.deviceValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;

      case "cellphone":
        cellValid = isValidNumber(value);
        fieldValidationErrors.cell = cellValid ? "" : " is invalid";
        break;

      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is invalid";
        break;

      case "nickname":
        nicknameValid = value.length >= 4;
        fieldValidationErrors.nickname = nicknameValid ? "" : " is invalid";
        break;

      case "device":
        deviceValid = value.length >= 1;
        fieldValidationErrors.device = deviceValid ? "" : " is invalid";
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        cellValid: cellValid,
        passwordValid: passwordValid,
        nicknameValid: nicknameValid,
        deviceValid: deviceValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.cellValid &&
        this.state.passwordValid &&
        this.state.nicknameValid &&
        this.state.deviceValid
    });
  }

  // Save user data to DB
  processUser = userObject => {
    // This needs to be sent to the DB for saving
    API.saveUser(userObject)
      .then()
      .catch(err => console.log(err));
  };

  handleSubmit = () => {
    // post my state to the api to save the contact form,
    // then set the state to some kind of success message
    // and show the user some feedback
    console.log("cell = ", this.state.cellphone);
    var userObj = {
      emailaddress: this.state.email,
      password: this.state.password,
      nickname: this.state.nickname,
      cellphone: this.state.cellphone,
      deviceType: this.state.device,
      deviceToken: "default",
      refreshToken: "default",
      passwordSalt: "default"
    };
    this.processUser(userObj);

    this.setState({
      emailaddress: "",
      password: "",
      nickname: "",
      cellphone: "",
      deviceType: ""
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
        <Card className={classes.card}>
          <CardContent>
            <Form>
              {/* <WelcomeMessage>
          Hello {this.state.nickname ? this.state.nickname : 'there' }!
        </WelcomeMessage> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  className={classes.textField}
                  name="email"
                  label="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  className={classes.textField}
                  name="password"
                  label="Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  className={classes.textField}
                  name="nickname"
                  label="Nickname"
                  onChange={this.handleChange}
                  value={this.state.nickname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  className={classes.textField}
                  name="cellphone"
                  label="Cellphone"
                  onChange={this.handleChange}
                  value={this.state.cellphone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  className={classes.textField}
                  name="device"
                  label="Device Type"
                  onChange={this.handleChange}
                  value={this.state.device}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  placeholder="Enter phone number"
                  name="cellphone"
                  value={this.state.cellphone}
                  country="US"
                  indicateInvalid="true"
                  onChange={this.handleCell}
                />
              </Grid>
              <Grid item xs={12}>
                <CardActions>
                  <SubmitButton
                    variant="text"
                    color="secondary"
                    fullWidth
                    type="submit"
                    onClick={this.handleSubmit}>
                    Register
                  </SubmitButton>
                </CardActions>
              </Grid>
              <FormErrors formErrors={this.state.formErrors} />
            </Form>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
export default withStyles(styles)(Register);

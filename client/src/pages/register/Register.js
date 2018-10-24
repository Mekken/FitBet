/* eslint react/prop-types: 0 */
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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormErrors from "../../components/FormErrors";
import { isValidNumber } from "libphonenumber-js";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

var fitbitPath =
  "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22D8HT&scope=activity&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fdevices%2Ffitbit%2Fcallback&prompt=&state=";

var misfitPath =
  "https://api.misfitwearables.com/auth/dialog/authorize?response_type=code&client_id=vqLcjvasg1cbYUvB&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdevices%2Fmisfitcallback&scope=tracking";

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
    device: "fitbit",
    formErrors: { email: "", password: "", nickname: "", cell: "" },
    emailValid: false,
    cellValid: false,
    passwordValid: false,
    nicknameValid: false,
    formValid: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleCell = e => {
    if (!e) {
      return;
    }

    this.validateField("cellphone", e);
    this.setState({ cellphone: e });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let cellValid = this.state.cellValid;
    let passwordValid = this.state.passwordValid;
    let nicknameValid = this.state.nicknameValid;

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

      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        cellValid: cellValid,
        passwordValid: passwordValid,
        nicknameValid: nicknameValid
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
        this.state.nicknameValid
    });
  }

  // Save user data to DB
  processUser = userObject => {
    // This needs to be sent to the DB for saving
    console.log("User = ", userObject);
    API.createUser(userObject)
      .then(function() {
        if (userObject.deviceType === "fitbit") {
          window.location.href = fitbitPath + userObject.emailaddress;
        } else if (userObject.deviceType === "misfit") {
          window.location.href = misfitPath + userObject.emailaddress;
        }
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response);
      });
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
      deviceType: "fitbit"
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
        alignContent="center"
      >
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
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  className={classes.textField}
                  name="cellphone"
                  label="Cellphone"
                  onChange={this.handleChange}
                  value={this.state.cellphone}
                />
              </Grid> */}
              <Grid item style={{ margin: "1%" }}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="age-native-helper">
                    My Device
                  </InputLabel>
                  <NativeSelect
                    fullWidth
                    value={this.state.device}
                    onChange={this.handleChange}
                    input={
                      <Input name="device" id="age-native-label-placeholder" />
                    }
                  >
                    <option value={"fitbit"}>Fitbit</option>
                    <option value={"misfit"}>Misfit</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{ margin: "1% auto" }}>
                <PhoneInput
                  placeholder="Enter phone number"
                  name="cellphone"
                  value={this.state.cellphone}
                  country="US"
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
                    onClick={this.handleSubmit}
                    disabled={!this.state.formValid}
                  >
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

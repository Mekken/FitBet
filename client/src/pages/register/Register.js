import React, { Component } from 'react'
import styled from 'react-emotion'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import FormItem from '../../components/FormItem'
import FormErrors from '../../components/FormErrors'
import API from '../../components/utils/App.js'
import { isValidNumber } from 'libphonenumber-js';

const ContactWrapper = styled('div')({
  maxWidth: 500,
  minHeight: 300,
  margin: '0 auto',
  boxShadow: '1px 1px 2px 2px rgba(0,0,0,.3)',
  display: 'flex',
  flexDirection: 'column',
  padding: 20
})

const WelcomeMessage = styled('div')({
  padding: 24
})

const SubmitButton = styled('button')({
  padding: 15,
  textTransform: 'uppercase',
  border: '1px solid black',
  borderRadius: 5
})

class Register extends Component {

  state = {
    email: '',
    password: '',
    nickname: '',
    cellphone: "",
    device: "",
    formErrors: {email: '', cell: ''},
    emailValid: false,
    cellValid: false,
    passwordValid: false,
    nicknameValid: false,
    deviceValid: false,
    formValid: false
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
    /*
    this.setState({
      [name]: value
    })
    */
  }

  handleCell = (e) => {
    if (!e)
      return;
    this.validateField("cellphone", e);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let cellValid = this.state.cellValid; 
    let passwordValid = this.state.passwordValid;
    let nicknameValid = this.state.nicknameValid;
    let deviceValid = this.state.deviceValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;

      case 'cellphone':
        cellValid = isValidNumber(value);
        fieldValidationErrors.cell = cellValid ? '': ' is invalid';
        break;

      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is invalid';
        break;

      case 'nickname':
        nicknameValid = value.length >= 4;
        fieldValidationErrors.nickname = nicknameValid ? '': ' is invalid';
        break;

      case 'device':
        deviceValid = value.length >= 1;
        fieldValidationErrors.device = deviceValid ? '': ' is invalid';
        break;

      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    cellValid: cellValid,
                    passwordValid: passwordValid,
                    nicknameValid: nicknameValid,
                    deviceValid: deviceValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: 
      this.state.emailValid && this.state.cellValid &&
      this.state.passwordValid && this.state.nicknameValid &&
      this.state.deviceValid
    });
  }
  

  // Save user data to DB
  processUser = userObject => {
    // This needs to be sent to the DB for saving
    API.saveUser(userObject)
    .then()
    .catch(err => console.log(err));
  }

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
    }
    this.processUser(userObj);

    this.setState({
        emailaddress: '',
        password: '',
        nickname: '',
        cellphone: "",
        deviceType: ""
    });
  }

  render() {
    return (
      <ContactWrapper>
        <WelcomeMessage>
          Hello {this.state.nickname ? this.state.nickname : 'there' }!
        </WelcomeMessage>
        <FormItem
          name="email"
          label="Email"
          onChangeFn={this.handleChange}
          value={this.state.email}
        />
        <FormItem
          name="password"
          label="Password (at least 6 characters)"
          onChangeFn={this.handleChange}
          value={this.state.password}
        />
        <FormItem
          name="nickname"
          label="Nickname (at least 4 characters)"
          onChangeFn={this.handleChange}
          value={this.state.nickname}
        />
        <FormItem
          name="device"
          label="Device Type"
          onChangeFn={this.handleChange}
          value={this.state.device}
        />
        <PhoneInput
          placeholder="Enter phone number"
          name="cellphone"
          value={ this.state.cellphone }
          country="US"
          indicateInvalid="true"
          onChange={ this.handleCell }
        />
        <br></br>
        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary" 
          disabled={!this.state.formValid}>Sign up!</button>
        <FormErrors formErrors={this.state.formErrors} />
      </ContactWrapper>
    )
  }
}

export default Register
import React, { Component } from 'react'
import styled from 'react-emotion'
import FormItem from '../../components/FormItem'
import FormErrors from '../../components/FormErrors'
import API from '../../components/utils/App.js'

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

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let cellValid = this.state.cellValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;

      case 'cell':
        cellValid = value.length >= 6;
        fieldValidationErrors.cell = cellValid ? '': ' is invalid';
        break;

      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    cellValid: cellValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.cellValid});
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
          label="Password"
          onChangeFn={this.handleChange}
          value={this.state.password}
        />
        <FormItem
          name="nickname"
          label="Nickname"
          onChangeFn={this.handleChange}
          value={this.state.nickname}
        />
        <FormItem
          name="cellphone"
          label="Cellphone"
          onChangeFn={this.handleChange}
          value={this.state.cellphone}
        />
        <FormItem
          name="device"
          label="Device Type"
          onChangeFn={this.handleChange}
          value={this.state.device}
        />
        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary" 
          disabled={!this.state.formValid}>Sign up!</button>
        <FormErrors formErrors={this.state.formErrors} />
      </ContactWrapper>
    )
  }
}

export default Register
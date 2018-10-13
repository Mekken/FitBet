import React, { Component } from 'react'
import styled from 'react-emotion'
import FormItem from '../../components/FormItem'
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

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    var userObj = {
      emailaddress: this.state.email,
      password: this.state.password,
    }
    this.loginUser(userObj);

    this.setState({
        emailaddress: '',
        password: ''
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
        <SubmitButton onClick={this.handleSubmit}>
          Submit!
        </SubmitButton>
      </ContactWrapper>
    )
  }
}

export default Login;
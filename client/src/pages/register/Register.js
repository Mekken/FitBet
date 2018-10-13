import React, { Component } from 'react'
/* import FormItem from '../../components/FormItem' */
import API from '../../components/utils/App.js'
import Button from '../../components/Button'
import SubmitButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import FormItem from '../../components/FormItem';
import { Grid} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
 
  card: {
    minWidth: 300,
    marginTop: '3%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

class Register extends Component {

  state = {
    email: '',
    password: '',
    nickname: '',
    cellphone: "",
    device: ""
  }
  
  
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
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
    const { classes } = this.props;
    return (
    
      <Grid container spacing={0} alignItems='center' justify='center' alignContent='center'>
      <Card className={classes.card}>
      <CardContent>
      <form  noValidate autoComplete="off">
        {/* <WelcomeMessage>
          Hello {this.state.nickname ? this.state.nickname : 'there' }!
        </WelcomeMessage> */}
        <Grid item xs={12}>
        <FormItem
        className={classes.textField}
          name="email"
          label="Email"
          onChangeFn={this.handleChange}
          value={this.state.email}
        />
        </Grid>
        <Grid item xs={12}>
        <FormItem
          className={classes.textField}
          name="password"
          label="Password"
          onChangeFn={this.handleChange}
          value={this.state.password}
        /></Grid>
        <Grid item xs={12}>
        <FormItem
        className={classes.textField}
          name="nickname"
          label="Nickname"
          onChangeFn={this.handleChange}
          value={this.state.nickname}
        /></Grid>
        <Grid item xs={12}>
        <FormItem
        className={classes.textField}
          name="cellphone"
          label="Cellphone"
          onChangeFn={this.handleChange}
          value={this.state.cellphone}
        /></Grid>
        <Grid item xs={12}>
        <FormItem
        className={classes.textField}
          name="device"
          label="Device Type"
          onChangeFn={this.handleChange}
          value={this.state.device}
        />
        </Grid>
        <Grid item xs={12}>
        <CardActions>
      <SubmitButton variant='text' color='secondary' fullWidth='true' type='submit' onClick={this.handleSubmit}>
      Submit!
    </SubmitButton>
    </CardActions>
    </Grid>
      </form>
      
    </CardContent>
    </Card>
    </Grid>
  
    )
  }
}
export default withStyles(styles)(Register)
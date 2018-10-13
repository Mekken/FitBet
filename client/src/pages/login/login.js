import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Grid, Card, CardActions, CardContent} from '@material-ui/core'
import FormItem from '../../components/FormItem'
import API from '../../components/utils/App.js'
import SubmitButton from '@material-ui/core/Button'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';


const styles = theme => ({
 
  card: {
    minWidth: 300,
    marginTop: '3%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display:'block'
  }
});


class Login extends Component {

  state = {
    email: '',
    password: '',
    showPassword: false
  }

    // Save user data to DB
  loginUser = userObject => {
    // This needs to be sent to the DB for saving
    API.login(userObject)
    .then()
    .catch(err => console.log(err));
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

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
    const { classes } = this.props;
    return (
      <Grid container spacing={0} alignItems='center' justify='center' alignContent='center'>
      <Card className={classes.card}>
      <CardContent>
        <form>
        <Grid item xs={12}>
        <FormItem
          name="email"
          label="Email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        </Grid>
        <Grid item xs={12}>
        <FormItem
          name="password"
          label="Password"
          onChange={this.handleChange}
          value={this.state.password}
          type={this.state.showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Grid>
        <CardActions>
        <SubmitButton variant='text' color='secondary' fullWidth='true' type='submit' onClick={this.handleSubmit}>
      Submit
    </SubmitButton>
    </CardActions>
    </form>
    </CardContent>
    </Card>
    </Grid>
    )
  }
}

export default withStyles(styles)(Login)
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import theme from "../../utils/theme-util";
import Button from '../../components/Button';
import { MuiThemeProvider } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const Header = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar
      color="primary"
      position="static"
      >

      <Toolbar variant="regular" style={{
        display: "flex",
        justifyContent: 'space-between'
      }}>
      
        <Typography variant="subtitle1" align="justify">
          <Link to="/" style={{ textDecoration: "none" , fontFamily:"Quicksand"}}>
            <Button>Home</Button>
          </Link>
        </Typography>

        <Typography variant="subtitle1" align="left">
          <Link
            to="/challenge"
            style={{ textDecoration: "none", fontFamily:"Quicksand"}}>
            <Button>Challenge</Button>
          </Link>
        </Typography>

        <Typography variant="subtitle1" align="justify">
          <Link
            to="/register"
            style={{ textDecoration: "none", fontFamily:"Quicksand" }}>
            <Button>Register</Button>
          </Link>
        </Typography>
        <Typography variant="subtitle1" align="center">
          <Link to="/login" style={{ textDecoration: "none", fontFamily:"Quicksand" }}>
          <Button>Login</Button>
          </Link>
        </Typography>
        <Typography variant="subtitle1" align="justify">
          <Link to="/events" style={{ textDecoration: "none", fontFamily:"Quicksand"}}>
            <Button>Events</Button>
          </Link>
        </Typography>

        <Typography variant="subtitle1" align="right">
          <Link to="/create" style={{ textDecoration: "none", fontFamily:"Quicksand" }}>
            <Button>Create</Button>
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  </MuiThemeProvider>
);

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import theme from "../../utils/theme-util";
import { MuiThemeProvider } from "@material-ui/core/styles";

const HeaderWrapper = styled("header")({
  width: "100%",
  height: 60,
  boxShadow: "0 2px 2px 2px rgba(0,0,0,.3)",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around"
});

const Header = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar
      color="secondary"
      position="static"
      >

      <Toolbar variant="regular" style={{
        display: "flex",
        justifyContent: 'space-between'
      }}>
      
        <Typography variant="subtitle1" align="justify" gutterBottom>
          <Link to="/" style={{ color: "white", textDecoration: "none" , fontFamily:"Quicksand"}}>
            Home
          </Link>
        </Typography>

        <Typography variant="subtitle1" align="left" gutterBottom>
          <Link
            to="/challenge"
            style={{ color: "white", textDecoration: "none", fontFamily:"Quicksand"}}>
            Challenge
          </Link>
        </Typography>

        <Typography variant="subtitle1" align="justify" gutterBottom>
          <Link
            to="/register"
            style={{ color: "white", textDecoration: "none", fontFamily:"Quicksand" }}>
            Register
          </Link>
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          <Link to="/login" style={{ color: "white", textDecoration: "none", fontFamily:"Quicksand" }}>
            Login
          </Link>
        </Typography>
        <Typography variant="subtitle1" align="justify" gutterBottom>
          <Link to="/events" style={{ color: "white", textDecoration: "none", fontFamily:"Quicksand"}}>
            Events
          </Link>
        </Typography>

        <Typography variant="subtitle1" align="right" gutterBottom>
          <Link to="/create" style={{ color: "white", textDecoration: "none", fontFamily:"Quicksand" }}>
            Create
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  </MuiThemeProvider>
);

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import theme from "../../utils/theme-util";
import Button from "../../components/Button";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const Header = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar color="primary" position="static">
      <Toolbar
        variant="regular"
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <Typography variant="subtitle1" align="justify">
          <Button
            component={Link}
            to="/"
            style={{ textDecoration: "none", fontFamily: "Quicksand" }}>
            Home
          </Button>
        </Typography>

        <Typography variant="subtitle1" align="left">
          <Button
            component={Link}
            to="/challenge"
            style={{ textDecoration: "none", fontFamily: "Quicksand" }}>
            Challenge
          </Button>
        </Typography>

        <Typography variant="subtitle1" align="justify">
          <Button
            component={Link}
            to="/register"
            style={{ textDecoration: "none", fontFamily: "Quicksand" }}>
            Register
          </Button>
        </Typography>
        <Typography variant="subtitle1" align="center">
          <Button
            component={Link}
            to="/login"
            style={{ textDecoration: "none", fontFamily: "Quicksand" }}>
            Login
          </Button>
        </Typography>
        <Typography variant="subtitle1" align="justify">
          <Button
            component={Link}
            to="/events"
            style={{ textDecoration: "none", fontFamily: "Quicksand" }}>
            Events
          </Button>
        </Typography>

        <Typography variant="subtitle1" align="right">
          <Button
            component={Link}
            to="/create"
            style={{ textDecoration: "none", fontFamily: "Quicksand" }}>
            Create
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  </MuiThemeProvider>
);

export default Header;

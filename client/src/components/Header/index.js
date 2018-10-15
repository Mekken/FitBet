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
            to="/">
            Home
          </Button>
        </Typography>

        <Typography variant="subtitle1" align="left">
          <Button
            component={Link}
            to="/challenge">
            Challenge
          </Button>
        </Typography>

        <Typography variant="subtitle1" align="justify">
          <Button
            component={Link}
            to="/register">
            Register
          </Button>
        </Typography>
        <Typography variant="subtitle1" align="center">
          <Button
            component={Link}
            to="/login">
            Login
          </Button>
        </Typography>
        <Typography variant="subtitle1" align="justify">
          <Button
            component={Link}
            to="/events">
            Events
          </Button>
        </Typography>

        <Typography variant="subtitle1" align="right">
          <Button
            component={Link}
            to="/create">
            Create
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  </MuiThemeProvider>
);

export default Header;

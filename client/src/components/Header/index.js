import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import theme from "../../utils/theme-util";

import { MuiThemeProvider } from "@material-ui/core/styles";
//import Grid from "@material-ui/core/Grid";
import HamburgerMenu from "../../components/HamburgerMenu";
import ProfileMenu from "../../components/Profile";
const Header = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar color="primary" position="static">
      <Toolbar
        variant="regular"
        style={{
          display: "flex",
          justifyContent: 'space-between'
        }}
      >
          <HamburgerMenu />

        <ProfileMenu />
      </Toolbar>
    </AppBar>
  </MuiThemeProvider>
);

export default Header;

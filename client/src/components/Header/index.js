import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import theme from "../../utils/theme-util";
import { MuiThemeProvider } from "@material-ui/core/styles";
//import Grid from "@material-ui/core/Grid";
import HamburgerMenu from "../../components/HamburgerMenu";
import ProfileMenu from "../../components/Profile";
import Typography from '@material-ui/core/Typography'

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
        <Typography variant='display2' style={{fontFamily:'Faster One', color:'#ff8302', display:'inline-block'}}>F<Typography variant='display1'style={{fontFamily:'Righteous', color:'orange', display:'inline-block'}}>itBet</Typography></Typography>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  </MuiThemeProvider>
);

export default Header;

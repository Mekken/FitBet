import React, { Component } from "react";
import styled from "react-emotion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles'

import Header from "./components/Header";
import Home from "./pages/home/Home";
import Challenge from "./pages/challenge/Challenge";
import Create from "./pages/create/Create";
import Register from "./pages/register/Register";
import Events from "./pages/events/Events";
import Login from "./pages/login/login";
import theme from './utils/theme-util'

class App extends Component {

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={ theme }>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/challenge" component={Challenge} />
              <Route path="/register" component={Register} />
              <Route path="/create" component={Create} />
              <Route path="/events" component={Events} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;

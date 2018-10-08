import React, { Component } from "react";
import styled from "react-emotion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/home/Home";
import Challenge from "./pages/challenge/Challenge";
import Create from "./pages/create/Create";
import Register from "./pages/register/Register";
import Events from "./pages/events/Events";

const Content = styled("div")({
  marginTop: 50
});

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/challenge" component={Challenge} />
              <Route path="/register" component={Register} />
              <Route path="/create" component={Create} />
              <Route path="/events" component={Events} />
            </Switch>
          </Content>
        </div>
      </Router>
    );
  }
}

export default App;

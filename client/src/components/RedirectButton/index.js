/* RedirectButton is a component used to take a user from the homepage to another page. For the each race summary card on the homepage, clicking this button will take the user into the event route and display more details on the selected race, as well as available events to join. */

import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";

class RedirectButton extends React.Component {
  state = {
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      //needs to update the route such that it takes a specific event id
      return <Redirect to="/events" />;
    }
  };

  render() {
    return (
      <div className="button">
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Join more races</button>
      </div>
    );
  }
}

export default RedirectButton;

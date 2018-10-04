import React, { Component } from "react";
import styled from 'react-emotion'

const Header = styled('div')({
  width: '100%',
  height: 50,
  boxShadow: '0 2px 2px 2px rgba(0,0,0,.3)',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Content = styled('div')({
  marginTop: 50,
  textAlign: 'center'
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
          Welcome!
        </Header>
        <Content>
          Mern boilerplate with react-emotion
        </Content>
      </div>
    );
  }
}

export default App;

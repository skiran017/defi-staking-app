import React, { Component } from 'react';

import Navbar from './Navbar';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
    };
  }
  render() {
    return (
      <div className="text-center">
        <Navbar account={this.state.account} />
      </div>
    );
  }
}

export default App;

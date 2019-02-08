import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {container, row, col} from 'react-bootstrap';
import Navigation from './Components/Navigation';
import Layout from './Components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Layout />
      </div>
    );
  }
}

export default App;

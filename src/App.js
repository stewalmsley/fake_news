import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.jsx';
import Topic from './components/Topic.jsx';
import User from './components/User.jsx';
import FullArticle from './components/FullArticle.jsx';
import Sidebar from './components/Sidebar.jsx'
import { Router } from '@reach/router';

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
        <h1>Fake News</h1>
        </header> 
        <nav></nav>
      <Router>
      <Home path="/" />
      <FullArticle path="/articles/:articleId" />
      <User path="/users/:username" />
      <Topic path="/topics/:topic_slug/articles" />
      </Router>
      <section><Sidebar/></section>
        <footer></footer>
      </div>
    );
  }
}

export default App;

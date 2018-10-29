import React, { Component } from 'react';
import './App.css';
import Articles from './components/Articles.jsx';
import Home from './components/Home.jsx';
import Topic from './components/Topic.jsx';
import FullArticle from './components/FullArticle.jsx';
import { Router } from '@reach/router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header> 
        <nav></nav>
      <Router>
      <Home path="/" />
      <Topic path="/topics/:topic_slug/articles" />
      <FullArticle path="/articles/:articleId" />
      </Router>
        <sidebar></sidebar>
        <footer></footer>
      </div>
    );
  }
}

export default App;

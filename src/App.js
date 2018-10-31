import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.jsx';
import * as api from './api';
import Topic from './components/Topic.jsx';
import User from './components/User.jsx';
import FullArticle from './components/FullArticle.jsx';
import CreateArticle from './components/CreateArticle.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Router } from '@reach/router';
import { Link } from '@reach/router';


class App extends Component {
  state = {
    user: {}, 
    topics: [],
    users: [],
    loaded: false
  }
  render() {
    const { user, loaded, topics, users } = this.state
    return (
      <div className="App">
        <header className="App-header">
        <Link to="/"><h1>Fake News</h1></Link>
        </header> 
        <nav></nav>
      <Router>
      <Home path="/" />
      <FullArticle path="/articles/:articleId" />
      <User path="/users/:username" />
      <Topic path="/topics/:topic_slug/articles" />
      <CreateArticle topics={topics} path="/create"/>
      </Router>
      <section><Sidebar user={user} users={users} topics={topics} loaded={loaded}/></section>
        <footer></footer>
      </div>
    );
  }
  componentDidMount() {
    this.setUser()
    this.fetchTopics()
    this.fetchUsers()
  }

  setUser() {
    api.getRandomUser()
    .then(user => {
      this.setState({
        user, 
        loaded: true
      })
    })
  }

  fetchTopics() {
    api.getTopics()
    .then(topics => {
      this.setState({
        topics
      })
    })
  }

  fetchUsers() {
    api.getUsers()
    .then(users => {
      this.setState({
        users
      })
    })
  }

}

export default App;

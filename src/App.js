import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.jsx';
import * as api from './api';
import Topic from './components/Topic.jsx';
import User from './components/User.jsx';
import FullArticle from './components/FullArticle.jsx';
import CreateArticle from './components/CreateArticle.jsx';
import Sidebar from './components/Sidebar.jsx';
import NotFound from './components/NotFound';
import LoggedInUser from './components/LoggedInUser';
import { Router } from '@reach/router';
import { Link } from '@reach/router';


class App extends Component {
  state = {
    user: {}, 
    topics: [],
    users: [],
    loaded: false, 
  }
  render() {
    const { user, loaded, topics, users } = this.state
    if (!loaded) return <div className="loader"></div>
    return (
      <div className="App">
        <header className="App-header">
        <Link to="/"><h2 className="fakeNews">Fake News</h2></Link>
        <LoggedInUser user={user} loaded={loaded}></LoggedInUser>
        </header> 
        <nav>
         <Link to="/create"><button className="create">Create Article</button></Link>
        </nav>
      <Router>
      <Home user={user} path="/" />
      <FullArticle user={user} path="/articles/:articleId" />
      <User user={user} path="/users/:username/:content" />
      <Topic user={user} path="/topics/:topic_slug/articles" />
      <CreateArticle topics={topics} user={user} path="/create"/>
      <NotFound default/>
      </Router>
      <section><Sidebar user={user} users={users} topics={topics} loaded={loaded}/></section>
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

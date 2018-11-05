import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import LogIn from "./components/LogIn.jsx";
import Nav from "./components/Nav.jsx";
import * as api from "./api";
import Topic from "./components/Topic.jsx";
import User from "./components/User.jsx";
import FullArticle from "./components/FullArticle.jsx";
import CreateArticle from "./components/CreateArticle.jsx";
import Sidebar from "./components/Sidebar.jsx";
import NotFound from "./components/NotFound";
import LoggedInUser from "./components/LoggedInUser";
import { Router } from "@reach/router";
import { Link } from "@reach/router";

class App extends Component {
  state = {
    user: {},
    topics: [],
    users: [],
    loaded: false
  };
  render() {
    const { user, loaded, topics, users } = this.state;
    if (!loaded) return <div className="loader" />;
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <h2 className="fakeNews">Fake News</h2>
          </Link>
          <LoggedInUser user={user} loaded={loaded} />
        </header>
        <Nav />
        <Router>
          <Home user={user} path="/" />
          <LogIn users={users} setUser={this.setUser} path="/login" />
          <FullArticle user={user} path="/articles/:articleId" />
          <User user={user} path="/users/:username/:content" />
          <Topic user={user} path="/topics/:topic_slug/articles" />
          <CreateArticle topics={topics} user={user} path="/create" />
          <NotFound default />
        </Router>
        <section>
          <Sidebar user={user} users={users} topics={topics} loaded={loaded} />
        </section>
      </div>
    );
  }
  componentDidMount() {
    const storedUser = localStorage.getItem("user")
    const user = storedUser ? JSON.parse(storedUser) : null
    this.setUser(user);
    this.fetchTopics();
    this.fetchUsers();
  }

  setUser = async (selectedUser) => {
    const user = selectedUser
      ? selectedUser
        : await api.getRandomUser();
    this.setState({
      user,
      loaded: true
    });
    localStorage.setItem("user", JSON.stringify(user));
  };

  fetchTopics() {
    api.getTopics().then(topics => {
      this.setState({
        topics
      });
    });
  }

  fetchUsers() {
    api.getUsers().then(users => {
      this.setState({
        users
      });
    });
  }
}

export default App;

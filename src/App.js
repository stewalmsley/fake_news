import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import LogIn from "./components/LogIn.jsx";
import Nav from "./components/Nav.jsx";
import * as api from "./api";
import Menu from "./components/Menu.jsx";
import Topic from "./components/Topic.jsx";
import User from "./components/User.jsx";
import FullArticle from "./components/FullArticle.jsx";
import CreateArticle from "./components/CreateArticle.jsx";
import Sidebar from "./components/Sidebar.jsx";
import NotFound from "./components/NotFound";
import LoggedInUser from "./components/LoggedInUser";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import * as utils from "./utils";

class App extends Component {
  state = {
    user: {},
    topics: [],
    users: [],
    loaded: false,
    trendingUsers: [],
    trendingTopics: []
  };
  render() {
    const {
      user,
      loaded,
      topics,
      users,
      trendingUsers,
      trendingTopics
    } = this.state;
    if (!loaded) return <div className="loader" />;
    return (
      <div className="App">
        <header className="App-header">
          <div className="fakeNews">
            <div className="headingContainer">
              <Link to="/">
                <h1> Fake News</h1>
              </Link>
            </div>
          </div>
          <div className="loggedIn">
            <div className="loggedInContainer">
              <LoggedInUser user={user} loaded={loaded} />
            </div>
          </div>
        </header>
        <Nav topics={topics} users={users} />
        <Router>
          <Home user={user} path="/" />
          <LogIn users={users} setUser={this.setUser} path="/login" />
          <FullArticle user={user} path="/articles/:articleId" />
          <User user={user} path="/users/:username/:content" />
          <Topic user={user} path="/topics/:topic_slug/articles" />
          <Menu topics={trendingTopics} users={trendingUsers} path="/menu" />
          <CreateArticle topics={topics} user={user} path="/create" />
          <NotFound default />
        </Router>
        <Sidebar
          updateSort={this.updateSort}
          user={user}
          users={trendingUsers}
          topics={trendingTopics}
          loaded={loaded}
        />
      </div>
    );
  }
  componentDidMount() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    this.setUser(user);
    this.fetchTopics();
    this.fetchUsers();
    this.fetchArticles();
  }

  setUser = async selectedUser => {
    const user = selectedUser ? selectedUser : await api.getRandomUser();
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

  fetchArticles() {
    api.getArticles().then(({ authors, topicsWithTitle }) => {
      const sortedAuthors = utils.sort(authors, "commentCount");
      const sortedTopics = utils.sort(topicsWithTitle, "commentCount");
      this.setState({
        trendingUsers: sortedAuthors,
        trendingTopics: sortedTopics
      });
    });
  }

  updateSort = event => {
    const sortedTopics = utils.sort(
      this.state.trendingTopics,
      event.target.value
    );
    const sortedUsers = utils.sort(
      this.state.trendingUsers,
      event.target.value
    );
    this.setState({
      trendingUsers: sortedUsers,
      trendingTopics: sortedTopics
    });
  };
}

export default App;

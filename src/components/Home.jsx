import React, { Component } from "react";
import Articles from "./Articles";
import * as api from "../api";
import * as utils from "../utils";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

class Home extends Component {
  state = {
    articles: [],
    loaded: false
  };
  render() {
    const { user } = this.props;
    const { articles, loaded } = this.state;
    if (!loaded) return <div className="loader" />;
    return (
      <div>
        <main>
          <Articles
            updateSort={this.updateSort}
            source="home"
            articles={articles}
            user={user}
          />
        </main>
      </div>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles() {
    api
      .getArticles()
      .then(({ articles }) => {
        const sortedArticles = utils.sort(
          articles,
          "commentCount"
        );
        this.setState({
          articles: sortedArticles,
          loaded: true
        });
      })
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.response.data.msg
          }
        });
      });
  }

  updateSort = event => {
    const sortedArticles = utils.sort(
      this.state.articles,
      event.target.value
    );
    this.setState({
      articles: sortedArticles
    });
  };
}

Home.propTypes = {
  user: PropTypes.object.isRequired
};

export default Home;

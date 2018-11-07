import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import { Link } from "@reach/router";
import ArticleComments from "./ArticleComments";
import Delete from "./Delete";
import Vote from "./Vote";
import { navigate } from "@reach/router";
import * as utils from "../utils";

class FullArticle extends Component {
  state = {
    article: {},
    loaded: false,
    deleted: false
  };
  render() {
    const { loaded, deleted } = this.state;
    const {
      _id,
      topic,
      title,
      dayjsDate,
      created_by,
      belongs_to,
      body,
      commentCount,
      votes
    } = this.state.article;
    const { user, articleId, location } = this.props;
    if (!loaded) return <div className="loader" />;
    if (deleted)
      return (
        <main>
          <div>
            {" "}
            <p>Article Deleted</p>
            <Link to={`/users/${user.username}/articles`}>
              View Your Profile
            </Link>{" "}
          </div>
        </main>
      );
    const newArticle = location.state._id ? true : false;
    return (
      <main>
        <div>
          {location.state._id && <p>Article Created</p>}
          <h2>
            <span>
              <Link to={`/topics/${belongs_to}/articles`}>{topic}: </Link>
            </span>{" "}
            {title}
          </h2>
          <Delete
            id={_id}
            newArticle={newArticle}
            user_id={user._id}
            author_id={created_by._id}
            deleteItem={this.deleteArticle}
          />
          <div className="author">
            <Link to={`/users/${created_by.username}/articles`}>
              {created_by.name}{" "}
            </Link>
          </div>
          <div className="date">{dayjsDate}</div>
          <p> {body} </p>
          <Vote
            contentType={"article"}
            newArticle={newArticle}
            user_id={user._id}
            author_id={created_by._id}
            votes={votes}
          />
          <ArticleComments
            commentCount={commentCount}
            articleId={articleId}
            user={user}
          />
        </div>
      </main>
    );
  }
  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle() {
    const { location } = this.props;
    if (location && location.state && location.state._id) {
      location.state.topic = utils.createTopicKey(location.state);
      this.setState({
        article: location.state,
        loaded: true
      });
    } else {
      api
        .getArticle(this.props.articleId)
        .then(article => {
          this.setState({
            article,
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
  }

  deleteArticle = id => {
    api.deleteArticle(id).then(status => {
      if (status < 300)
        this.setState({
          deleted: true
        });
    });
  };
}

FullArticle.propTypes = {
  articleId: PropTypes.string,
  user: PropTypes.object.isRequired,
  location: PropTypes.object
};

export default FullArticle;

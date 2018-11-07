import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import Vote from "./Vote";
import Delete from "./Delete";
import * as api from "../api";

class ArticleSnapshot extends Component {
  state = {
    deleted: false,
    deleteError: false
  };
  render() {
    const { article, user, source, userProfile } = this.props;
    const {
      _id,
      title,
      dayjsDate,
      created_by,
      croppedBody,
      commentCount,
      votes,
      topic,
      belongs_to
    } = article;
    const author_id = source === "user" ? userProfile._id : created_by._id;
    const { deleteError, deleted } = this.state;
    return (
      <div className="article">
        <div>
          {source !== "user" && (
            <span className="author">
              <Link to={`/users/${created_by.username}/articles`}>
                {created_by.name}{" "}
              </Link>
            </span>
          )}
          <span className="title">
          <Link to={`/articles/${article._id}`}> {title} </Link>
          </span>
        </div>
        <div className="date">{dayjsDate}</div>
        <Link to={`/articles/${article._id}`}>
          <p>
            {deleted && "article deleted"} {!deleted && croppedBody}
            <br />{" "}
          </p>
        </Link>
        {deleteError && <h5>Encountered an Error trying to Delete </h5>}
        <Delete
          id={_id}
          user_id={user._id}
          author_id={author_id}
          deleteItem={this.deleteArticle}
        />
        <div className="stats">
          <Link to={`/topics/${belongs_to}/articles`}>{topic}</Link>
          <Link to={`/articles/${article._id}`}>Comments: {commentCount}</Link>
        </div>
        <Vote
          contentType="article"
          user_id={user._id}
          author_id={author_id}
          id={_id}
          votes={votes}
        />
      </div>
    );
  }

  deleteArticle = articleId => {
    api.deleteArticle(articleId).then(status => {
      if (status < 300)
        this.setState({
          deleted: true
        });
      else
        this.setState({
          deleteError: true
        });
    });
  };
}

ArticleSnapshot.propTypes = {
  article: PropTypes.object.isRequired, 
  user: PropTypes.object.isRequired, 
  source: PropTypes.string,
  userProfile: PropTypes.object
};

export default ArticleSnapshot;

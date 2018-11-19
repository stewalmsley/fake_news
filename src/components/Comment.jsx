import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import Delete from "./Delete";
import Vote from "./Vote";
import * as api from "../api";

class Comment extends Component {
  state = {
    expand: false,
    deleted: false,
    deleteError: false
  };
  render() {
    const { comment, user, userProfile, source } = this.props;
    const { expand, deleted, deleteError } = this.state;
    const user_id = user._id;
    const author_id =
      source === "user" ? userProfile._id : comment.created_by._id;
    return (
      <div>
        {user_id === author_id && (
          <Delete
            key={comment._id}
            id={comment._id}
            deleteItem={this.deleteComment}
          />
        )}
        {deleteError && <p>Encountered and Error trying to Delete </p>}
        <button className="comment" onClick={() => this.expandComment()}>
          <h3>
            {source === "user" && <Link to={`/articles/${comment.belongs_to}`}> Click for Article</Link>}
            <Link
              key={comment._id}
              to={`/users/${comment.created_by.username}/articles`}
            >
              {comment.created_by.name}
            </Link>{" "}
            {comment.dayjsDate}
          </h3>
          <p>
            {" "}
            {deleted && "comment deleted"}{" "}
            {!deleted && !expand && comment.croppedBody}{" "}
            {!deleted && expand && comment.body}{" "}
          </p>{" "}
        </button>
        <Vote
          contentType={"comment"}
          id={comment._id}
          user_id={user_id}
          author_id={author_id}
          votes={comment.votes}
        />
      </div>
    );
  }

  expandComment() {
    const expand = !this.state.expand;
    this.setState({
      expand
    });
  }

  deleteComment = commentId => {
    api.deleteComment(commentId).then(status => {
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

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  source: PropTypes.string,
  userProfile: PropTypes.object
};

export default Comment;

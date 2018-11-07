import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import * as utils from "../utils";
import Comments from "./Comments";
import AddComment from "./AddComment";
import Sort from "./Sort";

class ArticleComments extends Component {
  state = {
    comments: [],
    loaded: false
  };
  render() {
    const { commentCount, user } = this.props;
    const { comments, loaded } = this.state;
    if (!loaded) return <div className="loader" />;
    return !comments.length ? (
      <div>
        <AddComment addComment={this.addComment} />
        <div className="noComments"> No Comments </div>
      </div>
    ) : (
      <div className="articleComments">
        <AddComment addComment={this.addComment} />
        Comments ({commentCount}
        ):
        <Sort updateSort={this.updateSort} />
        <Comments comments={comments} user={user} />
      </div>
    );
  }
  componentDidMount() {
    this.fetchArticleComments();
  }

  fetchArticleComments = () => {
    api
      .getArticleComments(this.props.articleId)
      .then(comments => {
        const sortedCroppedComments = comments.length
          ? utils.sortArticlesOrComments(comments, "votes")
          : comments;
        this.setState({
          comments: sortedCroppedComments,
          loaded: true
        });
      })
      .catch(err => {
        this.setState({
          loaded: true
        });
      });
  };

  addComment = newCommentBody => {
    const { comments } = this.state;
    const { articleId, user } = this.props;
    const newComment = { body: newCommentBody, created_by: user._id };
    api.postComment(articleId, newComment).then(addedComment => {
      const updatedComments = [addedComment, ...comments];
      this.setState({
        comments: updatedComments
      });
    });
  };

  updateSort = event => {
    const sortedComments = utils.sortArticlesOrComments(
      this.state.comments,
      event.target.value
    );
    this.setState({
      comments: sortedComments
    });
  };
}

ArticleComments.propTypes = {
  commentCount: PropTypes.number,
  user: PropTypes.object.isRequired, 
  articleId: PropTypes.string
};

export default ArticleComments;

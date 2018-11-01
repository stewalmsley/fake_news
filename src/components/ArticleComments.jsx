import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import Comments from './Comments';
import AddComment from './AddComment';

class ArticleComments extends Component {
    state = {
        comments: [],
        deleteError: false
    };
    render() {
        const { loaded, commentCount, user } = this.props;
        const { comments, deleteError } = this.state;
        if (!loaded) return null
    return (
         <div className="articleComments">
         <AddComment addComment={this.addComment}></AddComment>
        <h6>Comments ({commentCount}): </h6>
        <Comments comments={comments} user={user} ></Comments>
        </div>   
        );
    }
    componentDidMount() {
        this.fetchArticleComments();
      }

    fetchArticleComments = () => {
        api.getArticleComments(this.props.articleId)
        .then(comments => {
            const sortedCroppedComments = utils.sortArticlesOrComments(comments, "votes");
            this.setState ({
                comments: sortedCroppedComments
            })
        })
    }
    
    addComment = (newCommentBody) => {
        const { comments } = this.state
        const { articleId,  user_id} = this.props
        const newComment = { body: newCommentBody, created_by: user_id}
        api.postComment(articleId, newComment)
        .then(addedComment => {
            const updatedComments = [addedComment,...comments]
            this.setState({
                comments: updatedComments, 
            })
        })
    }
}

ArticleComments.propTypes = {
    loaded: PropTypes.bool.isRequired,
    commentCount: PropTypes.number
};

export default ArticleComments;
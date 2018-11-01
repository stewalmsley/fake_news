import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import Comment from './Comment';
import AddComment from './AddComment';

class ArticleComments extends Component {
    state = {
        comments: [],
        deleteError: false
    };
    render() {
        const { loaded, commentCount, user_id } = this.props;
        const { comments, deleteError } = this.state;
    return (
         <div className="articleComments">
         {loaded && <AddComment addComment={this.addComment}></AddComment>}
        {loaded && <h6>Comments ({commentCount}): </h6>}
        {comments.map(comment => {
            return ( 
            <Comment deleteError={deleteError} user_id={user_id} 
            key={comment._id} comment={comment}></Comment>)
        })}
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
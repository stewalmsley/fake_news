import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import Comments from './Comments';
import AddComment from './AddComment';
import Sort from './Sort'

class ArticleComments extends Component {
    state = {
        comments: [],
        loaded: false
    };
    render() {
        const { commentCount, user } = this.props;
        const { comments, loaded} = this.state;
        if (!loaded) return <div className="loader"></div>
    return (
         <div className="articleComments">
         <AddComment addComment={this.addComment}></AddComment>
        <h6>Comments ({commentCount}): </h6>
        <Sort updateSort={this.updateSort}></Sort>
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
                comments: sortedCroppedComments, 
                loaded: true
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

    updateSort = event => {
        const sortedComments = utils.sortArticlesOrComments(this.state.comments, event.target.value)
        this.setState({
            comments: sortedComments
        })
      }
}

ArticleComments.propTypes = {
    loaded: PropTypes.bool.isRequired,
    commentCount: PropTypes.number
};

export default ArticleComments;
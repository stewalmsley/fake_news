import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import CommentSnapshot from './CommentSnapshot'

class ArticleComments extends Component {
    state = {
        comments: [],
    };
    render() {
        const { loaded, commentCount } = this.props;
        const { comments } = this.state;
    return (
         <div className="articleComments">
        {loaded && <h6>Comments ({commentCount}): </h6>}
        {comments.map(comment => {
            return <CommentSnapshot key={comment._id} comment={comment}></CommentSnapshot>
        })}
        </div>   
        );
    }
    componentDidMount() {
        this.fetchArticleComments();
      }

    fetchArticleComments() {
        api.getArticleComments(this.props.articleId)
        .then(comments => {
            const sortedCroppedComments = utils.sortArticlesOrComments(comments, "votes");
            this.setState ({
                comments: sortedCroppedComments,
            })
        })
    }   
}

ArticleComments.propTypes = {
    loaded: PropTypes.bool.isRequired,
    commentCount: PropTypes.number
};

export default ArticleComments;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import AddComment from './AddComment';

class Comments extends Component {
    state = {
        deleteError: false
    };
    render() {
        const { comments, user, source } = this.props
        return <div>
        {comments.map(comment => {
        return <Comment user={user} key={comment._id} source={source} comment={comment}></Comment>
        })}</div>
    }
}

    Comments.propTypes = {
        comments: PropTypes.array.isRequired, 
        user: PropTypes.object.isRequired
    }; 
    
export default Comments;
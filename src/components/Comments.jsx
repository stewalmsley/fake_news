import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const Comments = ({ comments, user, source }) => {
    return <div>
        {comments.map(comment => {
        return <Comment user={user} key={comment._id} source={source} comment={comment}></Comment>
        })}</div>
    }
    Comments.propTypes = {
        comments: PropTypes.array.isRequired, 
        user: PropTypes.object.isRequired, 
        source: PropTypes.string.isRequired
    }; 
    
export default Comments;
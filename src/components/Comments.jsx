import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const Comments = ({ comments, user, source, userProfile }) => {
    return <div>
        {comments.map(comment => {
        return <Comment user={user} userProfile={userProfile} key={comment._id} source={source} comment={comment}></Comment>
        })}</div>
    }
    Comments.propTypes = {
        comments: PropTypes.array.isRequired, 
        user: PropTypes.object.isRequired, 
        source: PropTypes.string,
        userProfile: PropTypes.object
    }; 
    
export default Comments;
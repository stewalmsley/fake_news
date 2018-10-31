import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Delete from './Delete'

class CommentSnapshot extends Component {
    state = {
        expand: false,
    };
    render() {
        const { comment, deleteComment, user_id, deleteError } = this.props
        const { expand } = this.state
        return (
            <div className="comment"> 
            {user_id === comment.created_by._id && <Delete key={comment._id} commentId={comment._id} deleteItem={deleteComment}></Delete>}
            {deleteError && <h5>Unable to Delete</h5>}
            <button onClick={() => this.expandComment()}><h6><Link key={comment._id} to={`/users/${comment.created_by.username}`}>{comment.created_by.name }</Link> {comment.created_at} Votes: {comment.votes}</h6>
            <p>{!expand && comment.croppedBody} {expand && comment.body} </p> </button></div>
        );
    }

    expandComment() {
        const expand = !this.state.expand;
        this.setState({
            expand
        })
    }
}

CommentSnapshot.propTypes = {
    comment: PropTypes.object.isRequired
};

export default CommentSnapshot;
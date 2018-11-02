import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Delete from './Delete'
import Vote from './Vote'
import * as api from '../api';

class Comment extends Component {
    state = {
        expand: false,
        deleted: false, 
        deleteError: false
    };
    render() {
        const { comment, user_id } = this.props
        const { expand, deleted, deleteError} = this.state
        return (
            <div className="comment"> 
            {user_id === comment.created_by._id && <Delete key={comment._id} commentId={comment._id} deleteItem={this.deleteComment}></Delete>}
            {deleteError && <h5>Unable to Delete</h5>}
            <button onClick={() => this.expandComment()}><h6><Link key={comment._id} to={`/users/${comment.created_by.username}`}>{comment.created_by.name }</Link> 
            {comment.dayjsDate}</h6>
             <p> {deleted && "comment deleted"}  {(!deleted && !expand) && comment.croppedBody} {(!deleted && expand) && comment.body} </p> </button>
            <Vote id={comment._id} user_id={user_id} author_id ={comment.created_by._id} updateVotes={this.updateVotes} votes={comment.votes}></Vote>
            </div>
        );
    }

    expandComment() {
        const expand = !this.state.expand;
        this.setState({
            expand
        })
    }

    updateVotes = (id, voteChange) => {
        api.patchCommentVotes(id, voteChange)
    }

    deleteComment = (commentId) => {
        api.deleteComment(commentId)
        .then(status => {
        if (status < 300) this.setState({
            deleted: true
        })
        else this.setState({
            deleteError: true
            })
        })
    }

}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default Comment;
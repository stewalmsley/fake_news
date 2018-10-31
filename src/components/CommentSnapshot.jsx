import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

class CommentSnapshot extends Component {
    state = {
        expand: false,
    };
    render() {
        const { comment } = this.props
        const { expand } = this.state
        return (
            <div className="comment"> 
            <button onClick={() => this.expandComment()}><h6><Link to={`/users/${comment.created_by.username}`}>{comment.created_by.name }</Link> {comment.created_at} Votes: {comment.votes}</h6>
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
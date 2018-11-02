import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class Vote extends Component {
    state = {
        voteChange: 0
    }
    render() {
        const { votes, user_id, newArticle, author_id } = this.props
        const { voteChange } = this.state
        if (newArticle || user_id === author_id) return <span className="votes"> Votes: {votes} </span>
        if (voteChange !== 0) return (
            <div>
                <button name="Reset" onClick={() => this.handleVote(0)}>Undo</button>
                <span className="votes"> {votes + voteChange} </span>
            </div>
        )
        return (
            <div>
                <button name="Up" onClick={() => this.handleVote(1)}>Vote Up</button>
                <span className="votes"> {votes + voteChange} </span>
                <button name="Down" onClick={() => this.handleVote(-1)}>Vote Down</button>
            </div>
        );
    }

    handleVote(change) {
        const { contentType } = this.props
        this.setState({
            voteChange: change
        })
            api.patchVotes(this.props.id, change, contentType)
    }
}

Vote.propTypes = {
    votes: PropTypes.number.isRequired, 
    user_id: PropTypes.string.isRequired, 
    author_id: PropTypes.string.isRequired
};

export default Vote;
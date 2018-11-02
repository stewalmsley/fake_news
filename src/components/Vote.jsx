import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Vote extends Component {
    state = {
        voteChange: 0
    }
    render() {
        const { votes, user_id, author_id } = this.props
        const { voteChange } = this.state
        if (user_id === author_id) return <span className="votes"> Votes: {votes} </span>
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
        const { updateVotes } = this.props
        this.setState({
            voteChange: change
        })
        updateVotes(this.props.id, change)
    }
}

Vote.propTypes = {
    votes: PropTypes.number.isRequired, 
    user_id: PropTypes.string.isRequired, 
    author_id: PropTypes.string.isRequired
};

export default Vote;
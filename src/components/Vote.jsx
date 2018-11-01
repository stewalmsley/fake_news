import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Vote extends Component {
    state = {
        voteChange: 0
    }
    render() {
        const { votes, user_id, author_id } = this.props
        const { voteChange } = this.state
        return (
            <div>
                <h6>Votes: {votes + voteChange}</h6>
                <button disabled={voteChange === 1 || user_id === author_id} name="Up" onClick={() => this.handleVote(1)}>Vote Up</button>
                <button disabled={voteChange === -1 || user_id === author_id} name="Down" onClick={() => this.handleVote(-1)}>Vote Down</button>
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

};

export default Vote;
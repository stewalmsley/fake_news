import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddComment extends Component {
    state = {
        body: '', 
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea name="body" value={this.state.body} onChange={this.handleChange} placeholder="Write Comment here" cols="100" rows="3"></textarea><br></br>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
    handleChange = event => {
        this.setState({
            body: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { body } = this.state;
        this.props.addComment(body)
        this.setState({
            body: ''
        })
    }
}

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired
};

export default AddComment;
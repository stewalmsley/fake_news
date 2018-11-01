import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
    state = {
        errorCount: 0
    }
    render() {
        const { avatar_url } = this.props
        return <div><img src={avatar_url}alt="Avatar" onError={this.state.errorCount ? null : this.switchURL} height="100px" width="100px"></img></div> 
    }
    switchURL = (event) => {
        event.target.src= "/dog.jpg"
        this.setState({
            errorCount: 1
        })
    }
};
    Avatar.propTypes = {
       avatar_url: PropTypes.string.isRequired
}

export default Avatar
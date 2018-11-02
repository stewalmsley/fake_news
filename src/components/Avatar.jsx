import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
    state = {
        imgError: false
    }
    render() {
        const { avatar_url, height, width } = this.props
        return <div><img src={avatar_url}alt="Avatar" onError={this.state.imgError ? null : this.switchURL} height={height} width={width}></img></div> 
    }
    switchURL = (event) => {
        event.target.src= "/dog.jpg"
        this.setState({
            imgError: true
        })
    }
};
    Avatar.propTypes = {
       avatar_url: PropTypes.string.isRequired, 
       height: PropTypes.string.isRequired, 
       width: PropTypes.string.isRequired
}

export default Avatar
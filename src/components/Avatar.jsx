import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
    state = {
        url: this.props.avatar_url
    }
    render() {
    
                const { url } = this.state
        return <div><img src={url}alt="Avatar" onError={()=>{this.switchURL()}} height="100px" width="100px"></img></div> 
    }
    switchURL() {
        this.setState({
            url: "/dog.jpg"
        })
    }
};
    Avatar.propTypes = {
       url: PropTypes.string.isRequired
}

export default Avatar
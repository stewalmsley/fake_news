import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class User extends Component {
    state = {
        user: {}
    }
    render() {
        return (
            <div>
                <h1>{this.state.user.name}</h1>
            </div>
        );
    }
    componentDidMount() {
        this.fetchUser();
      }

    fetchUser() {
        api.getUser(this.props.username)
        .then(user => {
            this.setState ({
                user
            })
        })
    }
}

User.propTypes = {

};

export default User;
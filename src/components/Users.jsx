import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const Users = props => {
    const { users } = props
    return (
        <div>
            <h6>Trending Users: </h6>
            {users.map(user => {
                return <Link to={`/users/${user.username}`}><h6>{user.username}</h6></Link>
            })}
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
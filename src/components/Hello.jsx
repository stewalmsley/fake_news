import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { Link } from '@reach/router';

const Hello = ({ user }) => {
    return (
        <div className="hello">
            <Link to={`/users/${user.username}/articles`}><Avatar avatar_url={user.avatar_url} height="50px" width="50px"></Avatar></Link>
            <Link to={`/users/${user.username}/articles`}>{user.username}</Link>
        </div>
    );
};

Hello.propTypes = {
    user: PropTypes.object.isRequired, 
};

export default Hello;
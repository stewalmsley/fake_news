import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { Link } from '@reach/router';

const Hello = props => {
    const { user, loaded } = props;
    return (
        <div>
            <h4> Hello <Link to={`/users/${user.username}`}>{user.username}</Link></h4>
            {loaded && <Link to={`/users/${user.username}`}><Avatar avatar_url={user.avatar_url}></Avatar></Link>}
        </div>
    );
};

Hello.propTypes = {
    user: PropTypes.object.isRequired, 
    loaded: PropTypes.bool.isRequired
};

export default Hello;
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const Hello = props => {
    const { user, loaded } = props;
    return (
        <div>
            <h4> Hello {user.username}</h4>
            {loaded && <Avatar avatar_url={user.avatar_url}></Avatar>}
        </div>
    );
};

Hello.propTypes = {
    user: PropTypes.object.isRequired, 
    loaded: PropTypes.bool.isRequired
};

export default Hello;
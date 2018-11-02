import React from 'react';
import PropTypes from 'prop-types';
import Topics from './Topics';
import Users from './Users';
import { Link } from '@reach/router';

const Sidebar = ({ topics, users}) => {
    return (
        <div>
            {/* <Link to="/create">Create Article</Link> */}
            <Topics topics={topics}></Topics>
            <Users users={users}></Users>
        </div>
    );
};

Sidebar.propTypes = {
    user: PropTypes.object.isRequired, 
    loaded: PropTypes.bool.isRequired
};

export default Sidebar;
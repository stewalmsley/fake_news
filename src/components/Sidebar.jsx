import React from 'react';
import PropTypes from 'prop-types';
import Hello from './Hello';
import Topics from './Topics';
import Users from './Users';
import { Link } from '@reach/router';

const Sidebar = props => {
    const { user, loaded, topics, users} = props;
    return (
        <div>
            <Hello user={user} loaded={loaded}></Hello>
            <Link to="/create">Create Article</Link>
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
import React from "react";
import PropTypes from "prop-types";
import NavLink from "./NavLink";

const Users = props => {
  const { users } = props;
  return (
    <div>
      <h3>Trending Users: </h3>
      <ul>
        {users.map(user => {
          return (
            <li key={user._id} className="user">
              <NavLink to={`/users/${user.username}/articles`}>
                {user.username}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;

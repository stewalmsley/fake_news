import React from "react";
import PropTypes from "prop-types";
import NavLink from "./NavLink";

const Users = props => {
  const { users } = props;
  return (
    <div>
      <h6>Trending Users: </h6>
      {users.map(user => {
        return (
          <NavLink key={user._id} to={`/users/${user.username}/articles`}>
            <h6>{user.username}</h6>
          </NavLink>
        );
      })}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;

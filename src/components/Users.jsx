import React from "react";
import PropTypes from "prop-types";
import NavLink from "./NavLink";
import { Link } from "@reach/router";

const Users = props => {
  const { users } = props;
  return <div className="users">
      <ul>
        {users.slice(0, 2).map(user => {
          return <li key={user._id} className="user">
              <NavLink to={`/users/${user.username}/articles`}>
                <div>{user.username}</div>
                <div className="sidebarStats">
                  ({user.articleCount} articles, receiving {user.commentCount} comments and {user.votes} votes)
                </div>
              </NavLink>
            </li>;
        })}
        <li className="browse"><Link to="/menu"> See All Users</Link></li>
      </ul>
    </div>;
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;

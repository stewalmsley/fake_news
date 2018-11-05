import React from "react";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import { Link } from "@reach/router";

const LoggedInUser = ({ user }) => {
  return (
    <div className="hello">
      <Link to={`/users/${user.username}/articles`}>
        <Avatar avatar_url={user.avatar_url} height="50px" width="50px" />
      </Link>
      <Link to={`/users/${user.username}/articles`}>{user.username}</Link>
    </div>
  );
};

LoggedInUser.propTypes = {
  user: PropTypes.object.isRequired
};

export default LoggedInUser;

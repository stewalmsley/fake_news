import React from "react";
import PropTypes from "prop-types";
import Topics from "./Topics";
import Users from "./Users";

const Sidebar = ({ topics, users }) => {
  return (
    <div role="navigation" className="sidebar">
      <Topics topics={topics} />
      <Users users={users} />
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  topics: PropTypes.array.isRequired
};

export default Sidebar;

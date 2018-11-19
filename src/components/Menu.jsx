import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

const Menu = ({ topics, users }) => {
  return (
    <div className="menu">
      <div className="topicMenu">
        <h3> Topics: </h3>
        <ul>
          {topics.map(topic => {
            return (
              <li key={topic.slug} className="menuItem">
                <Link to={`/topics/${topic.slug}/articles`}>
                  <div>{topic.title}</div>
                  <div className="sidebarStats">
                    ({topic.articleCount} articles, {topic.commentCount}{" "}
                    comments)
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="userMenu">
        <h3> Users: </h3>
        <ul>
          {users.map(user => {
            return (
              <li key={user._id} className="menuItem">
                <Link to={`/users/${user.username}/articles`}>
                  <div>{user.username}</div>
                  <div className="sidebarStats">
                    ({user.articleCount} articles, receiving{" "}
                    {user.commentCount} comments)
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

Menu.propTypes = {
  topics: PropTypes.array.isRequired, 
  users: PropTypes.array.isRequired
};

export default Menu;

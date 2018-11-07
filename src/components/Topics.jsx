import React from "react";
import PropTypes from "prop-types";
import NavLink from "./NavLink";

const Topics = props => {
  const { topics } = props;
  return (
    <div>
      <h3>Trending Topics: </h3>
      <ul>
        {topics.map(topic => {
          return (
            <li key={topic._id} className="topic">
              <NavLink to={`/topics/${topic.slug}/articles`}>
                {topic.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Topics.propTypes = {
  topics: PropTypes.array.isRequired
};

export default Topics;

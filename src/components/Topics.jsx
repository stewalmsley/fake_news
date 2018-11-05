import React from "react";
import PropTypes from "prop-types";
import NavLink from "./NavLink";

const Topics = props => {
  const { topics } = props;
  return (
    <div>
      <h6>Trending Topics: </h6>
      {topics.map(topic => {
        return (
          <NavLink key={topic._id} to={`/topics/${topic.slug}/articles`}>
            <h6>{topic.title}</h6>
          </NavLink>
        );
      })}
    </div>
  );
};

Topics.propTypes = {
  topics: PropTypes.array.isRequired
};

export default Topics;

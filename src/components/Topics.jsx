import React from "react";
import PropTypes from "prop-types";
import NavLink from "./NavLink";
import { Link } from "@reach/router";

const Topics = ({ topics }) => {
  return <div className="topics">
      <ul>
        {topics.slice(0, 2).map(topic => {
          return <li key={topic.slug} className="topic">
              <NavLink to={`/topics/${topic.slug}/articles`}>
                <div>{topic.title}</div>
                <div className="sidebarStats">
                  ({topic.articleCount} articles with {topic.commentCount} comments and {topic.votes} votes)
                </div>
              </NavLink>
            </li>;
        })}
      <li className="browse"><Link to="/menu"> See All Topics</Link></li>
      </ul>
    </div>;
};

Topics.propTypes = {
  topics: PropTypes.array.isRequired
};

export default Topics;

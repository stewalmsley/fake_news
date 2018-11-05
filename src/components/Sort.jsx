import React from "react";
import PropTypes from "prop-types";

const Sort = ({ updateSort, content }) => {
  return (
    <div className="sort">
      <select onChange={updateSort}>
        {content === "articles" && (
          <option value="commentCount">Most Comments</option>
        )}
        <option value="votes">Most Votes</option>
        <option value="created_at">Most Recent </option>
      </select>
    </div>
  );
};

Sort.propTypes = {
  updateSort: PropTypes.func.isRequired,
  content: PropTypes.string
};

export default Sort;

import React from "react";
import PropTypes from "prop-types";

const Sort = ({ updateSort, content, filter }) => {
  return <div>
      <select name="sort" disabled={filter} aria-label="sort" onChange={updateSort}>
        {content !== "comments" && <option value="commentCount">
            Most Comments
          </option>}
        <option value="votes">Most Votes</option>
        {content === "topicsAndUsers" && <option value="articleCount">Article Count</option>}
        {content!== "topicsAndUsers" && <option value="created_at">Most Recent </option>}
      </select>
    </div>;
};

Sort.propTypes = {
  updateSort: PropTypes.func.isRequired,
  content: PropTypes.string
};

export default Sort;

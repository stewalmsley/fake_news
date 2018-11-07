import React from "react";
import PropTypes from "prop-types";

const Delete = props => {
  const { deleteItem, id, user_id, author_id, newArticle } = props;
  if (!newArticle && user_id !== author_id) return null;
  return (
    <div>
      <button className="delete" onClick={() => deleteItem(id)}>Delete</button>
    </div>
  );
};

Delete.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, 
  user_id: PropTypes.string.isRequired, 
  author_id: PropTypes.string.isRequired, 
  newArticle: PropTypes.bool
};

export default Delete;

import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

const Comments = ({ comments, user, source, userProfile, updateSort }) => {
  return (
    <div>
      {source === "user" && <h3>Comments ({comments.length})</h3>}
      {comments.map(comment => {
        return (
          <Comment
            user={user}
            userProfile={userProfile}
            key={comment._id}
            source={source}
            comment={comment}
          />
        );
      })}
    </div>
  );
};
Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  source: PropTypes.string,
  userProfile: PropTypes.object
};

export default Comments;

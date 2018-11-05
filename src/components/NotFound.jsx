import React from "react";
import PropTypes from "prop-types";

const NotFound = ({ location }) => {
  if (location.state)
    return (
      <div>
        <h3> Error: {location.state.code} </h3>
      </div>
    );
  return (
    <div>
      <h3>Sorry you seem to have used a Fake URL </h3>
    </div>
  );
};

NotFound.propTypes = {
  location: PropTypes.object
};

export default NotFound;

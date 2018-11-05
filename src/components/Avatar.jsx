import React from "react";
import PropTypes from "prop-types";
import dogImg from "../assets/dog.jpg";

const Avatar = ({ avatar_url, height, width }) => {
  return (
    <div>
      <img
        src={avatar_url}
        alt="Avatar"
        onError={switchURL}
        height={height}
        width={width}
      />
    </div>
  );
};
const switchURL = event => {
  const src = event.target.src;
  event.target.src = src === dogImg ? null : dogImg;
};

Avatar.propTypes = {
  avatar_url: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
};

export default Avatar;

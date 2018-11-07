import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        className: isCurrent ? "active" : "inactive"
      };
    }}
  />
);

NavLink.propTypes = {
  isCurrent: PropTypes.bool
};

export default NavLink;

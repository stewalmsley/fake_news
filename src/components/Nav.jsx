import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

const Nav = props => {
  return (
    <div>
      <nav>
        <Link to="/create">
          <button className="navbutton">Create Article</button>
        </Link>
        <Link to="/login">
          <button className="navbutton">Log In / Switch User</button>
        </Link>
      </nav>
    </div>
  );
};

Nav.propTypes = {};

export default Nav;

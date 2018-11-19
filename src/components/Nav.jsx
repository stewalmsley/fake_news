import React from "react";
import { Link } from "@reach/router";

const Nav = ({ topics, users }) => {
  return (
    <nav>
      <div className="create">
        <div className="buttonContainer">
          <Link to="/create">
            <button className="navbutton">Create Article</button>
          </Link>
        </div>
      </div>
      <div className="login">
        <div className="buttonContainer">
          <Link to="/login">
            <button className="navbutton">Log In / Switch User</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
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

export default Nav;

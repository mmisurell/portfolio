import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Import CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/gallery-one">Gallery One</Link>
        </li>
        <li>
          <Link to="/gallery-two">Gallery Two</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

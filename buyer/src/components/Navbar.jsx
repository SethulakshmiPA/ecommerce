import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Ensure the correct path to your CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">Ecommerce</h2>
      <ul className="navbar-links">
        <li>
          <Link to="/category/women">Women</Link>
        </li>
        <li>
          <Link to="/category/men">Men</Link>
        </li>
        <li>
          <Link to="/category/kids">Kids</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-button">
        Home
      </Link>
      <Link to="/products" className="nav-button">
        Products
      </Link>
      <Link to="/orders" className="nav-button">
        Orders
      </Link>
      <Link to="/settings" className="nav-button">
        Settings
      </Link>
    </nav>
  );
}

export default Navbar;

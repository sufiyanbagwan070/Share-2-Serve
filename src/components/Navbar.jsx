import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact us</Link>
      <Link to="/submit-food">Order</Link>
    </nav>
  );
};

export default Navbar;

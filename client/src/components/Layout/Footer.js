import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All Right Reserved &copy; Pro</h4>
      <p className="text-center m-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy policy</Link>
      </p>
    </div>
  );
};

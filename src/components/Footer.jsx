import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">🍲 Share2Serve</div>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/submit-food">Submit Food</a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Share2Serve</div>
      </div>
    </footer>
  );
};

export default Footer;



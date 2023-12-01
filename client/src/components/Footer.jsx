import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "footer-dark" : "footer-light";
  return (
    <div className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/">HIRR.IN</Link>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Services</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

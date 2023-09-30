import "./Navbar.css";
import React, { useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link, Navigate } from "react-router-dom";

const Navbar = ({
  buttonLabel,
  buttonLink,
  button2Label,
  button2Link,
  funcBtn,
  funcBtnName,
  dropdownName,
  dropdown1,
  dropdown1Link,
  dropdown2,
  dropdown2Link,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const checkLoginStatus = () => {
    const token = document.cookie.includes("mytoken");
    console.log("status", token);
    setIsLoggedIn(!!token);
  };

  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleDropdownClick = () => {
    const dropdownContent = document.querySelector(".dropdown-content-1");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  };

  return (
    <nav className="navbar">
      <div className="navbar-right">
        <div className="navbar-brand">
          <Link to="/">HIRR.IN</Link>
        </div>
      </div>
      <div className="navbar-left">
        <div className="navbar-btn-group">
          {isLoggedIn && (
            <div className="dropdown-1">
              <button
                className="emp-btn dropdown-button-1"
                onClick={handleDropdownClick}
              >
                <div className="notification-icon">
                  <NotificationsNoneIcon />
                  {/* <div className="notification-count">5</div> */}
                </div>
              </button>
              <div className="dropdown-content-1">
                <p>No new notifications</p>
              </div>
            </div>
          )}

          <Link to={buttonLink}>
            <button>{buttonLabel}</button>
          </Link>
          <Link to={button2Link}>
            <button>{button2Label}</button>
          </Link>
          <div className="dropdown">
            <button className="emp-btn dropdown-button" onClick={()=>{setIsOpen(!isOpen)}}>
              {dropdownName || "Employer Login"}&#8628;
            </button>
            {isOpen && (
              <div className="dropdown-content">
                <Link to={dropdown1Link || "/org/login"}>
                  {dropdown1 || "Employer Login"}
                </Link>
                <Link to={dropdown2Link || "/org/signup"}>
                  {dropdown2 || "Register"}
                </Link>
                {isLoggedIn && (
                  <a onClick={funcBtn} href="">
                    {funcBtnName}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

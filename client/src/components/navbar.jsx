import "./Navbar.css";
import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeToggle from "./DarkModeToggle";
import { Link } from "react-router-dom";
import Button from "./Button";

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
  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "navbar-dark" : "navbar-light";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside of the dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Add event listener to the entire document
    document.addEventListener("mousedown", handleClickOutside);
    console.log("mosue down added");

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      console.log("mosue down removed");
    };
  }, []);

  const checkLoginStatus = () => {
    const token = document.cookie.includes("mytoken");
    const orgtoken = document.cookie.includes("orgtoken");
    setIsLoggedIn(!!(token || orgtoken));
  };

  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleDropdownClick = () => {
    const dropdownContent = document.querySelector(".dropdown-content-1");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-right">
        <div className={mode === "dark" ? "navbar-brand dark-brand" : "navbar-brand light-brand"}>
          <Link to="/">HIRR.IN</Link>
        </div>
      </div>
      <div className="navbar-left">
        <div className="navbar-btn-group">
          <DarkModeToggle />
          {isLoggedIn && (
            <div className="dropdown-1">
              <button className="emp-btn dropdown-button-1" onClick={handleDropdownClick}>
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
          <Button link={buttonLink}>{buttonLabel}</Button>
          <Button link={button2Link}>{button2Label}</Button>
          <div className="dropdown" ref={dropdownRef}>
            <Button
              className="emp-btn dropdown-button"
              handleClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {dropdownName || "Employer Login"}&#8628;
            </Button>
            {isOpen && (
              <div className="dropdown-content">
                <Link to={dropdown1Link || "/org/login"}>{dropdown1 || "Employer Login"}</Link>
                <Link to={dropdown2Link || "/org/signup"}>{dropdown2 || "Register"}</Link>
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

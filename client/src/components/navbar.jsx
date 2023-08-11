import "./Navbar.css";
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
  dropdown2,
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-right">
        <div className="navbar-brand">
          <Link to="/">HIRR.IN</Link>
        </div>
      </div>
      <div className="navbar-left">
        <div className="navbar-btn-group">
          <Link to={buttonLink}>
            <button>{buttonLabel}</button>
          </Link>
          <Link to={button2Link}>
            <button>{button2Label}</button>
          </Link>
          <div className="dropdown">
            <button className="emp-btn dropdown-button">
              {dropdownName || "Employer Login"}&#8628;
            </button>
            <div className="dropdown-content">
              <Link to="/org/login">{dropdown1 || "Employer Login"}</Link>
              <Link to="/org/signup">{dropdown2 || "Register"}</Link>
              <a onClick={funcBtn} href="">
                {funcBtnName}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

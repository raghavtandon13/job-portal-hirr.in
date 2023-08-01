import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ buttonLabel, buttonLink, button2Label, button2Link }) => {
  return (
    <nav className="navbar">
      <div className="navbar-right">
        <div className="navbar-brand">
          <Link to='/'>HIRR.IN</Link>
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
          {/* <Link to={"/signup"}>
            <button>Register</button>
          </Link> */}
          <div className="dropdown">
            <button className="emp-btn dropdown-button">
              For employers&#8628;
            </button>
            <div className="dropdown-content">
              <Link to="/org/login">Employer Login</Link>
              <Link to="/org/signup">Register</Link>
              <a href="#">Post a Job</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

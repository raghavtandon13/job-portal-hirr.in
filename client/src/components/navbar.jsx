import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ buttonLabel, buttonLink }) => {
  return (
    <nav className="navbar">
      <div className="navbar-right">
        <div className="navbar-brand">HIRR.IN</div>
      </div>
      <div className="navbar-left">
        <div className="navbar-btn-group">
          <Link to={buttonLink}>
            <button>{buttonLabel}</button>
          </Link>
          <button>Register</button>
          <div className="dropdown">
            <button className="emp-btn dropdown-button">
              For employers&#8628;
            </button>
            <div class="dropdown-content">
              <a href="#">Employer Login</a>
              <a href="#">Register</a>
              <a href="#">Post a Job</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

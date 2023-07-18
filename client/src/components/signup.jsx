import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const handleReset = () => {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("pin").value = "";
    document.getElementById("password").value = "";
    document.getElementById("re-password").value = "";
  };
  return (
    <div className="signup-box">
      <div className="signup-heading">
        <h1>Register to find jobs and grow your career</h1>
      </div>
      <div className="signup-input">
        <input type="text" name="name" id="name" placeholder="Full Name" />
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="Mobile Number"
        />
        <input type="email" name="email" id="email" placeholder="E-mail" />
        <input type="text" name="address" id="address" placeholder="Address" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input
          type="password"
          name="password"
          id="re-password"
          placeholder="Re-enter Password"
        />
      </div>
      <div className="signup-button">
        <button>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Signup;

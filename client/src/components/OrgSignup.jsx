import React from "react";
import "./OrgSignup.css";

const OrgSignup = () => {
  const handleReset = () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("pin").value = "";
    document.getElementById("password").value = "";
    document.getElementById("re-password").value = "";
  };
  return (
    <div className="signup-box">
      <div className="signup-heading">
        <h1>Register your Organisation to recruit candidates</h1>
      </div>
      <div className="signup-input">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Organisation Name"
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
export default OrgSignup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleReset = () => {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("pin").value = "";
    document.getElementById("password").value = "";
    document.getElementById("re-password").value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    try {
      const response = await fetch("http://localhost:3000/signup/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token; // Assuming your token key in the response is "token"

        console.log("Signup successful!");
        localStorage.setItem("token", token);
        console.log("token stored");
        navigate("/home"); // change this to resume builder
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="signup-box">
      <div className="signup-heading">
        <h1>Register to find jobs and grow your career</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="signup-input">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Mobile Number"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="re-password"
            placeholder="Re-enter Password"
          />
        </div>
        <div className="signup-button">
          <button type="submit">Submit</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

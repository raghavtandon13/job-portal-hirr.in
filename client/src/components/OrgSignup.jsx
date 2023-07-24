import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrgSignup.css";

const OrgSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { companyName, industry, email, password };
    try {
      const response = await fetch("http://localhost:3000/signup/company/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token; // Assuming your token key in the response is "token"

        console.log("Login successful!");
        localStorage.setItem("token", token);
        console.log("token stored");
        navigate("/org/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <div className="signup-heading">
          <h1>Register your Organisation to recruit candidates</h1>
        </div>
        <div className="signup-input">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Organisation Name"
            value={companyName}
            onChange={(e) => setcompanyName(e.target.value)}
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
            type="text"
            name="industry"
            id="industry"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup-button">
          <button>Submit</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};
export default OrgSignup;

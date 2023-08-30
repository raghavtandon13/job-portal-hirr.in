import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await fetch("http://localhost:3000/login/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Login successful!");
        window.location.reload();
        navigate("/home");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        setLoginError(true); // Set the login error message
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="login-box">
      <div className="login-heading">
        <h1>Login</h1>
      </div>
      <div className="googlediv2">
        <button className="googleBtn2" type="button" onClick={handleGoogleAuth}>
          <GoogleIcon />
          Log in with Google
        </button>
      </div>
      <p>or</p>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && (
            <div className="error-message">Incorrect email or password</div>
          )}
          <button type="submit">Submit</button>
        </form>
        <a href="">Use OTP to login</a>
      </div>
    </div>
  );
};

export default Login;

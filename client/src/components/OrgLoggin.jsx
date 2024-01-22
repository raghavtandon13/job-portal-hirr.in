import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./OrgLoggin.css";

const OrgLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "l2-dark" : "l2-light";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await fetch("http://hirr.in/api/login/company/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        // console.log("Login successful!");

        ////////////////////////////////////////////
        //----------For Development---------------//
        ////////////////////////////////////////////

        const responseData = await response.json();
        // console.log(responseData);
        const token = responseData.token;
        // console.log(token);
        document.cookie = `orgtoken=${token}`;

        ////////////////////////////////////////////
        ////////////////////////////////////////////
        ////////////////////////////////////////////

        window.location.reload();
        navigate("/org/home");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        setLoginError(true); // Set the login error message
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={`login-box ${theme}`}>
      <div className="login-heading">
        <h1>Employer Login</h1>
        <h2>India's no. 1 Recruitment Platform</h2>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {loginError && <div className="error-message">Incorrect email or password</div>}
          <button type="submit">Submit</button>
        </form>
        <a href="">Use OTP to login</a>
      </div>
    </div>
  );
};

export default OrgLogin;

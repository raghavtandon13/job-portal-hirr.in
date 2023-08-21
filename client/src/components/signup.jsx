import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);

  const navigate = useNavigate();
  const handleReset = () => {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  };

  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (file) => {
    setProfilePicture(file);
    setIsFileSelected(true);
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("phone", phone);
    if (profilePicture) {
      data.append("profilePicture", profilePicture);
    }

    try {
      const response = await fetch("http://localhost:3000/signup/user/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        const token = responseData.token;
        console.log(token);
        document.cookie = `mytoken=${token}`;

        console.log("Signup successful!");
        navigate("/resume-builder");
        window.location.reload();
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
        <div className="googlediv">
          <button
            className="googleBtn"
            type="button"
            onClick={handleGoogleAuth}
          >
            <GoogleIcon />
            Sign up with Google
          </button>
        </div>
        <p>or</p>
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
            onChange={(e) => setPhone(e.target.value)}
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
          <div className="file-input-container">
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              id="profilePictureInput"
              onChange={(e) => handleProfilePictureChange(e.target.files[0])}
              title="Upload profile picture"
              required
            />
            {isFileSelected && (
              <span className="file-selected-icon">&#10003;</span>
            )}
          </div>
        </div>
        <div className="signup-button">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

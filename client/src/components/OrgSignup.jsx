import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./OrgSignup.css";

const OrgSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const navigate = useNavigate();
  const [orgPicture, setOrgPicture] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "s2-dark" : "s2-light";

  const handleOrgPictureChange = (file) => {
    setOrgPicture(file);
    setIsFileSelected(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("companyName", companyName);
    data.append("email", email);
    data.append("password", password);
    data.append("industry", industry);
    if (orgPicture) {
      data.append("orgPicture", orgPicture);
    }

    try {
      const response = await fetch("https://hirrin-backend.vercel.app/api/signup/company/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;

        // console.log("Signup successful!");
        toast.success("Signup successful! You can now log in.", {
          onClose: () => {},
        });
        navigate("/org/login");
        localStorage.setItem("token", token);
        // console.log("token stored");
        // navigate("/org/home");
      } else {
        console.error("Signup failed");
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
    <div className={`signup-box ${theme}`}>
      <form onSubmit={handleSubmit}>
        <div className="signup-heading">
          <h1>Register your Organisation to recruit candidates</h1>
        </div>
        <div className="signup-input">
          <input type="text" name="name" id="name" placeholder="Organisation Name" value={companyName} onChange={(e) => setcompanyName(e.target.value)} />

          <input type="email" name="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" name="address" id="address" placeholder="Address" />
          <input type="text" name="industry" id="industry" placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="file-input-container">
            <input type="file" name="profilePicture" accept="image/*" id="profilePictureInput" onChange={(e) => handleOrgPictureChange(e.target.files[0])} title="Upload profile picture" required />
            {isFileSelected && <span className="file-selected-icon">&#10003;</span>}
          </div>
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

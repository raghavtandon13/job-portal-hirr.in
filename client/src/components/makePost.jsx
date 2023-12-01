import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./makePost.css";

const MakePost = () => {
  const navigate = useNavigate();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("orgtoken");

  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleReset = () => {
    document.getElementById("name").value = "";
    document.getElementById("title").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("location").value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      companyName,
      title,
      skills,
      experience,
      jobDescription,
      location,
    };
    try {
      const response = await fetch("http://34.131.250.17/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Job posting successful!", {
          onClose: () => {},
        });
        navigate("/org/home");

        // console.log("Job posted succesfully");
      } else {
        console.error("Job posting failed");
        // toast.error("Job posting failed", {
        //   onClose: () => {
        //     // Redirect the user to the login page
        //     navigate("/login");
        //   },
        // });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="signup-box">
      <div className="signup-heading">
        <h1>Make a Job Post to recruit candidates</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="signup-input">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Organization's Name "
            value={companyName}
            onChange={(e) => setcompanyName(e.target.value)}
          />
          <input type="text" id="title" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" id="skills" placeholder="Skills Required" value={skills} onChange={(e) => setSkills(e.target.value)} />

          <input
            type="number"
            id="experience"
            placeholder="Experience in number of years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <input type="text" id="location" placeholder="Location of work" value={location} onChange={(e) => setLocation(e.target.value)} />
          {/* Job Description Textarea */}
          <textarea id="jobDescription" placeholder="Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </div>
        <div className="signup-button">
          <button type="submit">Submit</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default MakePost;
